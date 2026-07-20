-- ============================================
-- MOKAYAKOUBI DATABASE SCHEMA
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- 1. Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  tags TEXT[] DEFAULT ARRAY[]::text[],
  views INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Courses
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  price INTEGER DEFAULT 0,
  stripe_product_id TEXT,
  stripe_price_id TEXT,
  lessons_count INTEGER DEFAULT 0,
  total_duration INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Course Lessons
CREATE TABLE IF NOT EXISTS public.course_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  video_duration INTEGER DEFAULT 0,
  lesson_order INTEGER NOT NULL,
  resources TEXT[] DEFAULT ARRAY[]::text[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Course Enrollments
CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  UNIQUE(user_id, course_id)
);

-- 6. Lesson Progress
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  lesson_id UUID NOT NULL REFERENCES public.course_lessons(id),
  watched_duration INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  UNIQUE(user_id, lesson_id)
);

-- 7. Coaching Sessions
CREATE TABLE IF NOT EXISTS public.coaching_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  scheduled_at TIMESTAMP NOT NULL,
  duration INTEGER DEFAULT 60,
  notes TEXT,
  recording_url TEXT,
  status TEXT DEFAULT 'scheduled',
  payment_intent_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed BOOLEAN DEFAULT TRUE,
  verified BOOLEAN DEFAULT FALSE,
  verification_token TEXT,
  tags TEXT[] DEFAULT ARRAY[]::text[],
  created_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP
);

-- 9. Resources (Lead Magnets)
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_type TEXT,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 10. Payments
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  amount INTEGER,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT UNIQUE,
  product_type TEXT,
  product_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 11. Analytics Events
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  page_path TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Blog Posts: Public read for published posts
CREATE POLICY "Blog posts are publicly readable" ON public.blog_posts
  FOR SELECT USING (published = TRUE);

-- Courses: Public read
CREATE POLICY "Courses are publicly readable" ON public.courses
  FOR SELECT USING (published = TRUE);

-- Course Lessons: Public read
CREATE POLICY "Course lessons are publicly readable" ON public.course_lessons
  FOR SELECT USING (TRUE);

-- Resources: Public read
CREATE POLICY "Resources are publicly readable" ON public.resources
  FOR SELECT USING (TRUE);

-- Profiles: Users can view and edit their own
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Course Enrollments: Users can view their own
CREATE POLICY "Users can view own enrollments" ON public.course_enrollments
  FOR SELECT USING (auth.uid() = user_id);

-- Lesson Progress: Users can view their own
CREATE POLICY "Users can view own progress" ON public.lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Coaching Sessions: Users can view their own
CREATE POLICY "Users can view own coaching sessions" ON public.coaching_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Payments: Users can view their own
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

-- Newsletter Subscribers: Public insert
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (TRUE);

-- ============================================
-- INDEXES (for performance)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses(published);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_user_id ON public.course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course_id ON public.course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON public.analytics_events(user_id);
