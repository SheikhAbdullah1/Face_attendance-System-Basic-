/*
  # Initial Schema Setup for Facial Recognition Attendance System

  1. New Tables
    - users (handled by Supabase Auth)
    - profiles
      - Extends user data with role and additional info
    - courses
      - Stores course information
    - enrollments
      - Links students to courses
    - attendance_records
      - Stores attendance data
    - face_data
      - Stores facial recognition data

  2. Security
    - Enable RLS on all tables
    - Add policies for different user roles
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role user_role NOT NULL DEFAULT 'student',
  full_name text,
  student_id text UNIQUE,
  department text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  teacher_id uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id),
  course_id uuid REFERENCES courses(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id)
);

-- Create attendance_records table
CREATE TABLE attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id),
  course_id uuid REFERENCES courses(id),
  date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  verification_method text NOT NULL CHECK (verification_method IN ('facial', 'manual')),
  marked_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

-- Create face_data table
CREATE TABLE face_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) UNIQUE,
  descriptor jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE face_data ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Courses policies
CREATE POLICY "Courses are viewable by everyone"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Teachers can insert courses"
  ON courses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'teacher'
    )
  );

CREATE POLICY "Teachers can update own courses"
  ON courses FOR UPDATE
  USING (
    teacher_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'teacher'
    )
  );

-- Enrollments policies
CREATE POLICY "Users can view enrollments"
  ON enrollments FOR SELECT
  USING (true);

CREATE POLICY "Teachers can manage enrollments"
  ON enrollments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'teacher')
    )
  );

-- Attendance policies
CREATE POLICY "Users can view attendance records"
  ON attendance_records FOR SELECT
  USING (true);

CREATE POLICY "Teachers can manage attendance"
  ON attendance_records FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'teacher')
    )
  );

-- Face data policies
CREATE POLICY "Users can view own face data"
  ON face_data FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own face data"
  ON face_data FOR ALL
  USING (user_id = auth.uid());