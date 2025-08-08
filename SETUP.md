# 🚀 MLRIT Campus Event Hub - Setup Guide

This guide will help you set up the MLRIT Campus Event Hub with Supabase backend integration.

## 📋 Prerequisites

- Node.js 18 or higher
- npm or pnpm package manager
- Supabase account (free tier available)
- Git

## 🔧 Step-by-Step Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd Event-management-website-1

# Install dependencies
npm install
```

### 2. Set Up Supabase

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `mlrit-event-hub`
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to your location
6. Click "Create new project"
7. Wait for project to be created (2-3 minutes)

#### Get Project Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xyz.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Replace the values with your actual Supabase credentials.**

### 4. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `database-schema.sql`
4. Paste it into the SQL editor
5. Click **Run** to execute the schema

This will create:
- All necessary tables
- Row Level Security policies
- Database functions and triggers
- Default platform settings

### 5. Configure Authentication

#### Set Up Email Templates (Optional)
1. Go to **Authentication** → **Email Templates**
2. Customize the email templates for:
   - Confirm signup
   - Magic link
   - Change email address
   - Reset password

#### Configure Auth Settings
1. Go to **Authentication** → **Settings**
2. Configure:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add your deployment URL when ready
   - **Email confirmations**: Enable if needed

### 6. Test the Setup

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing the Application

### 1. Test Registration
- Go to `/register`
- Try registering as a student with `student@mlrit.ac.in`
- Try registering as a club with `club@mlrit.ac.in`
- Verify that non-MLRIT emails are rejected

### 2. Test Login
- Use the admin credentials: `admin@mlrit.ac.in` / `Admin@1234`
- Test student and club login with your registered accounts

### 3. Test Event Creation
- Login as a club
- Create a new event
- Verify the event appears in the admin dashboard

### 4. Test Event Approval
- Login as admin
- Approve the created event
- Verify it appears in the public events page

## 🔒 Security Configuration

### Row Level Security (RLS)
The database schema includes comprehensive RLS policies that ensure:
- Users can only access their own data
- Clubs can only manage their own events
- Students can only register for events once
- Admins have full access to all data

### Domain Restriction
The application validates that all registrations use `@mlrit.ac.in` emails.

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Update Supabase Settings**
   - Go to your Supabase dashboard
   - Update **Authentication** → **Settings**
   - Add your Vercel deployment URL to redirect URLs

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 📊 Database Management

### Viewing Data
- **Supabase Dashboard**: Go to **Table Editor** to view all tables
- **SQL Editor**: Run custom queries for data analysis

### Backup and Restore
- **Automatic Backups**: Supabase provides daily backups
- **Manual Export**: Use the SQL editor to export data
- **Schema Changes**: Always test schema changes in development first

## 🔧 Troubleshooting

### Common Issues

#### 1. "Invalid API key" Error
- Verify your Supabase URL and anon key are correct
- Check that the `.env.local` file is in the root directory
- Restart the development server after changing environment variables

#### 2. "Table doesn't exist" Error
- Ensure you've run the complete `database-schema.sql`
- Check that all tables were created successfully
- Verify RLS policies are in place

#### 3. Authentication Issues
- Check Supabase Auth settings
- Verify email templates are configured
- Test with the provided admin credentials

#### 4. Permission Denied Errors
- Ensure RLS policies are correctly set up
- Check user roles in the database
- Verify authentication is working

### Debug Mode
Enable debug logging by adding to `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

## 📈 Monitoring

### Supabase Dashboard
- **Database**: Monitor query performance
- **Authentication**: Track user signups and logins
- **Storage**: Monitor file uploads (if using)
- **Logs**: View real-time logs

### Application Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Consider adding Sentry for error tracking

## 🔄 Updates and Maintenance

### Regular Tasks
1. **Database Backups**: Supabase handles this automatically
2. **Security Updates**: Keep dependencies updated
3. **Performance Monitoring**: Monitor slow queries
4. **User Feedback**: Collect and address user feedback

### Schema Updates
When updating the database schema:
1. Test changes in development first
2. Create migration scripts
3. Backup production data
4. Apply changes during low-traffic periods

## 📞 Support

### Getting Help
1. Check the [README.md](README.md) for general information
2. Review this setup guide for configuration issues
3. Check Supabase documentation for database issues
4. Create an issue in the repository for bugs

### Useful Links
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**🎉 Congratulations! Your MLRIT Campus Event Hub is now set up and ready to use!** 