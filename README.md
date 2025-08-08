# 🎓 MLRIT Campus Event Hub

A modern, responsive event management platform for MLRIT campus, built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🌟 Features

### 🔐 Authentication & Authorization
- **Domain-restricted registration**: Only `@mlrit.ac.in` emails allowed
- **Role-based access**: Admin, Club, and Student roles
- **Secure authentication**: Supabase Auth with Row Level Security (RLS)
- **Fixed admin credentials**: `admin@mlrit.ac.in` / `Admin@1234`

### 👥 User Roles

#### 🧑‍💼 **Admin**
- Full system access and data management
- Event approval/rejection workflow
- Platform fee management
- Comprehensive analytics and reports
- Club and student management

#### 🏢 **Club**
- Club profile management with logo and details
- Event creation and management
- Registration tracking and revenue analytics
- Feedback collection and event reports
- Student query management
- Academic calendar integration

#### 🎓 **Student**
- Profile management with academic details
- Event discovery and registration
- Payment integration with platform fees
- Feedback submission for attended events
- Query system for event-related questions
- Personal academic calendar

### 🎯 Core Features

#### 📅 **Calendar System**
- **General Calendar**: Color-coded events by club
- **Personal Calendar**: Individual event tracking
- **Admin Calendar**: Complete overview of all events
- **Club Calendar**: Event management and scheduling

#### 💳 **Payment System**
- Integrated payment gateway (Razorpay/Stripe ready)
- Platform fee management
- Payment receipts and tracking
- Team registration support

#### 📊 **Analytics & Reports**
- Event performance metrics
- Revenue tracking for clubs
- Student participation analytics
- Year-end academic reports

#### 💬 **Communication**
- Student query system
- Club response management
- Feedback collection
- Notification system

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Supabase account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Event-management-website-1
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

#### Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Set Up Database
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Execute the SQL to create all tables and policies

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

The application uses the following main tables:

- **users**: User accounts and authentication
- **students**: Student-specific profile data
- **clubs**: Club information and details
- **events**: Event listings and details
- **registrations**: Event registration records
- **feedback**: Student feedback for events
- **queries**: Student questions and club responses
- **reports**: Event reports and documentation
- **platform_settings**: System configuration

## 🔧 Configuration

### Admin Access
Default admin credentials:
- **Email**: `admin@mlrit.ac.in`
- **Password**: `Admin@1234`

### Test Credentials
For testing purposes, you can register with:
- **Student**: `student@mlrit.ac.in` / `password123`
- **Club**: `club@mlrit.ac.in` / `password123`

## 📱 Features Overview

### 🏠 Homepage
- Featured events showcase
- Quick registration access
- Recent events display
- Club highlights

### 🎫 Event Management
- **Event Creation**: Clubs can create events with detailed information
- **Event Approval**: Admin approval workflow
- **Event Discovery**: Students can browse and search events
- **Registration**: Secure payment-based registration
- **Team Events**: Support for team registrations

### 👤 Profile Management
- **Student Profiles**: Academic details, event history, feedback
- **Club Profiles**: Logo, description, social media, past events
- **Admin Dashboard**: Complete system overview

### 📊 Analytics
- **Club Analytics**: Registration counts, revenue tracking
- **Admin Analytics**: System-wide statistics
- **Student Analytics**: Participation history

### 💬 Communication
- **Query System**: Students can ask questions about events
- **Feedback System**: Post-event feedback collection
- **Notification System**: Real-time updates

## 🎨 UI/UX Features

- **Dark Modern Theme**: Professional dark interface
- **Responsive Design**: Works on all devices
- **Interactive Elements**: Hover effects, animations
- **Accessibility**: WCAG compliant design
- **Loading States**: Smooth user experience

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Domain Restriction**: MLRIT email validation
- **Role-based Access**: Granular permissions
- **Secure Authentication**: Supabase Auth integration
- **Data Validation**: Input sanitization and validation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Event Endpoints
- `GET /api/events` - List events
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Registration Endpoints
- `POST /api/registrations` - Register for event
- `GET /api/registrations/:eventId` - Get event registrations

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration (Student/Club)
- [ ] User login/logout
- [ ] Event creation by clubs
- [ ] Event approval by admin
- [ ] Event registration by students
- [ ] Payment flow
- [ ] Feedback submission
- [ ] Query system
- [ ] Calendar views
- [ ] Profile management

### Test Data
Sample events and users are included for testing purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🎯 Roadmap

### Phase 2 Features
- [ ] Google OAuth integration
- [ ] Email notifications
- [ ] QR code check-in system
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with college systems

### Phase 3 Features
- [ ] AI-powered event recommendations
- [ ] Advanced reporting tools
- [ ] Multi-language support
- [ ] Advanced payment gateways
- [ ] Real-time collaboration features

---

**Built with ❤️ for MLRIT Campus**
