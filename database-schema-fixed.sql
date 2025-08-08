-- MLRIT Campus Event Hub Database Schema (Fixed)
-- This file contains all the necessary SQL to set up the database tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'student', 'club')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    roll_no VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100),
    year VARCHAR(20),
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clubs table
CREATE TABLE IF NOT EXISTS clubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    club_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(255),
    contact_person VARCHAR(255),
    phone VARCHAR(20),
    description TEXT,
    logo_url TEXT,
    workspace_location VARCHAR(255),
    social_media_handles JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    venue VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    capacity INTEGER NOT NULL DEFAULT 100,
    registered INTEGER NOT NULL DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    club_id UUID REFERENCES clubs(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    team_allowed BOOLEAN DEFAULT FALSE,
    team_size INTEGER,
    proof_url TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    payment_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    team_name VARCHAR(255),
    team_members JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, student_id)
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, student_id)
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    budget_doc_url TEXT,
    summary TEXT,
    uploaded_on TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Queries table
CREATE TABLE IF NOT EXISTS queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT,
    answered_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Platform settings table
CREATE TABLE IF NOT EXISTS platform_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default platform settings
INSERT INTO platform_settings (setting_key, setting_value) VALUES
('platform_fee_percentage', '5'),
('max_team_size', '10'),
('min_event_price', '0'),
('max_event_price', '10000')
ON CONFLICT (setting_key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_club_id ON events(club_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_student_id ON registrations(student_id);
CREATE INDEX IF NOT EXISTS idx_feedback_event_id ON feedback(event_id);
CREATE INDEX IF NOT EXISTS idx_queries_event_id ON queries(event_id);

-- Create function to increment event registration count
CREATE OR REPLACE FUNCTION increment_event_registration(event_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE events 
    SET registered = registered + 1 
    WHERE id = event_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_platform_settings_updated_at BEFORE UPDATE ON platform_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- Users policies (simplified to avoid recursion)
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Students policies
CREATE POLICY "Students can view their own data" ON students
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can update their own data" ON students
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Students can insert their own data" ON students
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Clubs policies
CREATE POLICY "Clubs can view their own data" ON clubs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Clubs can update their own data" ON clubs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Clubs can insert their own data" ON clubs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Events policies
CREATE POLICY "Anyone can view approved events" ON events
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Clubs can view their own events" ON events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM clubs 
            WHERE clubs.user_id = auth.uid() 
            AND clubs.id = events.club_id
        )
    );

CREATE POLICY "Clubs can insert events" ON events
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM clubs 
            WHERE clubs.user_id = auth.uid() 
            AND clubs.id = club_id
        )
    );

CREATE POLICY "Clubs can update their own events" ON events
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM clubs 
            WHERE clubs.user_id = auth.uid() 
            AND clubs.id = club_id
        )
    );

-- Registrations policies
CREATE POLICY "Students can view their own registrations" ON registrations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students 
            WHERE students.user_id = auth.uid() 
            AND students.id = registrations.student_id
        )
    );

CREATE POLICY "Students can insert their own registrations" ON registrations
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM students 
            WHERE students.user_id = auth.uid() 
            AND students.id = student_id
        )
    );

-- Clubs can view registrations for their events
CREATE POLICY "Clubs can view registrations for their events" ON registrations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            JOIN clubs ON events.club_id = clubs.id 
            WHERE clubs.user_id = auth.uid() 
            AND events.id = registrations.event_id
        )
    );

-- Feedback policies
CREATE POLICY "Students can view their own feedback" ON feedback
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students 
            WHERE students.user_id = auth.uid() 
            AND students.id = feedback.student_id
        )
    );

CREATE POLICY "Students can insert their own feedback" ON feedback
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM students 
            WHERE students.user_id = auth.uid() 
            AND students.id = student_id
        )
    );

-- Clubs can view feedback for their events
CREATE POLICY "Clubs can view feedback for their events" ON feedback
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            JOIN clubs ON events.club_id = clubs.id 
            WHERE clubs.user_id = auth.uid() 
            AND events.id = feedback.event_id
        )
    );

-- Queries policies
CREATE POLICY "Students can view their own queries" ON queries
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students 
            WHERE students.user_id = auth.uid() 
            AND students.id = queries.student_id
        )
    );

CREATE POLICY "Students can insert their own queries" ON queries
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM students 
            WHERE students.user_id = auth.uid() 
            AND students.id = student_id
        )
    );

-- Clubs can view and answer queries for their events
CREATE POLICY "Clubs can view queries for their events" ON queries
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            JOIN clubs ON events.club_id = clubs.id 
            WHERE clubs.user_id = auth.uid() 
            AND events.id = queries.event_id
        )
    );

CREATE POLICY "Clubs can update queries for their events" ON queries
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM events 
            JOIN clubs ON events.club_id = clubs.id 
            WHERE clubs.user_id = auth.uid() 
            AND events.id = queries.event_id
        )
    );

-- Reports policies
CREATE POLICY "Clubs can view reports for their events" ON reports
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM events 
            JOIN clubs ON events.club_id = clubs.id 
            WHERE clubs.user_id = auth.uid() 
            AND events.id = reports.event_id
        )
    );

CREATE POLICY "Clubs can insert reports for their events" ON reports
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM events 
            JOIN clubs ON events.club_id = clubs.id 
            WHERE clubs.user_id = auth.uid() 
            AND events.id = event_id
        )
    );

-- Platform settings policies (admin only)
CREATE POLICY "Admin can view platform settings" ON platform_settings
    FOR SELECT USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
    );

CREATE POLICY "Admin can update platform settings" ON platform_settings
    FOR UPDATE USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
    );

-- Create a function to check if user is admin (to avoid recursion)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (SELECT role FROM users WHERE id = auth.uid()) = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies using the function
CREATE POLICY "Admin can view all users" ON users
    FOR SELECT USING (is_admin());

CREATE POLICY "Admin can view all students" ON students
    FOR SELECT USING (is_admin());

CREATE POLICY "Admin can view all clubs" ON clubs
    FOR SELECT USING (is_admin());

CREATE POLICY "Admin can view all events" ON events
    FOR SELECT USING (is_admin());

CREATE POLICY "Admin can update all events" ON events
    FOR UPDATE USING (is_admin());

CREATE POLICY "Admin can view all registrations" ON registrations
    FOR SELECT USING (is_admin());

CREATE POLICY "Admin can view all feedback" ON feedback
    FOR SELECT USING (is_admin());

CREATE POLICY "Admin can view all queries" ON queries
    FOR SELECT USING (is_admin());

CREATE POLICY "Admin can view all reports" ON reports
    FOR SELECT USING (is_admin()); 