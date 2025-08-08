# 📚 MLRIT Campus Event Hub - API Documentation

This document provides comprehensive API documentation for the MLRIT Campus Event Hub backend integration.

## 🔐 Authentication

All API calls require authentication via Supabase Auth. The authentication token is automatically handled by the Supabase client.

### Authentication Flow

1. **User Registration**
   ```typescript
   POST /api/auth/register
   {
     "email": "user@mlrit.ac.in",
     "password": "password123",
     "name": "User Name",
     "role": "student" | "club"
   }
   ```

2. **User Login**
   ```typescript
   POST /api/auth/login
   {
     "email": "user@mlrit.ac.in",
     "password": "password123"
   }
   ```

3. **User Logout**
   ```typescript
   POST /api/auth/logout
   ```

## 👥 User Management

### Get Current User
```typescript
GET /api/user/current
Response: {
  "user": {
    "id": "uuid",
    "email": "user@mlrit.ac.in",
    "name": "User Name",
    "role": "student" | "club" | "admin",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Get Student Profile
```typescript
GET /api/student/profile
Response: {
  "student": {
    "id": "uuid",
    "user_id": "uuid",
    "roll_no": "21CS001",
    "department": "CSE",
    "year": "3rd Year",
    "phone": "+91 9876543210",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Get Club Profile
```typescript
GET /api/club/profile
Response: {
  "club": {
    "id": "uuid",
    "user_id": "uuid",
    "club_name": "CIE",
    "full_name": "Center for Innovation & Entrepreneurship",
    "contact_person": "Dr. John Doe",
    "phone": "+91 9876543210",
    "description": "Club description",
    "logo_url": "https://example.com/logo.png",
    "workspace_location": "Block A, Room 101",
    "social_media_handles": {
      "instagram": "@cie_mlrit",
      "linkedin": "cie-mlrit"
    },
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

## 🎫 Event Management

### Create Event
```typescript
POST /api/events
{
  "title": "Tech Workshop",
  "description": "Learn the latest technologies",
  "venue": "Auditorium",
  "date": "2024-02-15",
  "time": "14:00:00",
  "price": 500,
  "capacity": 100,
  "category": "technical",
  "team_allowed": false,
  "team_size": null,
  "proof_url": "https://example.com/proof.pdf",
  "image_url": "https://example.com/event.jpg"
}
```

### Get Events
```typescript
GET /api/events?status=approved&category=technical&search=workshop
Response: {
  "events": [
    {
      "id": "uuid",
      "title": "Tech Workshop",
      "description": "Learn the latest technologies",
      "venue": "Auditorium",
      "date": "2024-02-15",
      "time": "14:00:00",
      "price": 500,
      "capacity": 100,
      "registered": 25,
      "category": "technical",
      "club_id": "uuid",
      "status": "approved",
      "team_allowed": false,
      "team_size": null,
      "proof_url": "https://example.com/proof.pdf",
      "image_url": "https://example.com/event.jpg",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Event by ID
```typescript
GET /api/events/{eventId}
Response: {
  "event": {
    // Event object with full details
  }
}
```

### Update Event Status (Admin Only)
```typescript
PUT /api/events/{eventId}/status
{
  "status": "approved" | "rejected" | "completed"
}
```

### Get Events by Club
```typescript
GET /api/club/events
Response: {
  "events": [
    // Array of events created by the club
  ]
}
```

## 📝 Registration Management

### Register for Event
```typescript
POST /api/registrations
{
  "event_id": "uuid",
  "payment_id": "pay_123456789",
  "amount": 525,
  "team_name": "Team Alpha", // Optional
  "team_members": ["member1@mlrit.ac.in", "member2@mlrit.ac.in"] // Optional
}
```

### Get Event Registrations (Club/Admin)
```typescript
GET /api/events/{eventId}/registrations
Response: {
  "registrations": [
    {
      "id": "uuid",
      "event_id": "uuid",
      "student_id": "uuid",
      "payment_id": "pay_123456789",
      "amount": 525,
      "team_name": "Team Alpha",
      "team_members": ["member1@mlrit.ac.in"],
      "created_at": "2024-01-01T00:00:00Z",
      "students": {
        "roll_no": "21CS001",
        "department": "CSE",
        "year": "3rd Year",
        "phone": "+91 9876543210",
        "users": {
          "name": "Student Name",
          "email": "student@mlrit.ac.in"
        }
      }
    }
  ]
}
```

### Get Student Registrations
```typescript
GET /api/student/registrations
Response: {
  "registrations": [
    {
      "id": "uuid",
      "event_id": "uuid",
      "payment_id": "pay_123456789",
      "amount": 525,
      "created_at": "2024-01-01T00:00:00Z",
      "events": {
        "title": "Tech Workshop",
        "date": "2024-02-15",
        "time": "14:00:00",
        "venue": "Auditorium"
      }
    }
  ]
}
```

## 💬 Feedback System

### Submit Feedback
```typescript
POST /api/feedback
{
  "event_id": "uuid",
  "rating": 5,
  "comments": "Great event! Learned a lot."
}
```

### Get Event Feedback (Club/Admin)
```typescript
GET /api/events/{eventId}/feedback
Response: {
  "feedback": [
    {
      "id": "uuid",
      "event_id": "uuid",
      "student_id": "uuid",
      "rating": 5,
      "comments": "Great event! Learned a lot.",
      "created_at": "2024-01-01T00:00:00Z",
      "students": {
        "roll_no": "21CS001",
        "department": "CSE",
        "year": "3rd Year",
        "users": {
          "name": "Student Name",
          "email": "student@mlrit.ac.in"
        }
      }
    }
  ]
}
```

### Get Student Feedback
```typescript
GET /api/student/feedback
Response: {
  "feedback": [
    {
      "id": "uuid",
      "event_id": "uuid",
      "rating": 5,
      "comments": "Great event! Learned a lot.",
      "created_at": "2024-01-01T00:00:00Z",
      "events": {
        "title": "Tech Workshop",
        "date": "2024-02-15"
      }
    }
  ]
}
```

## ❓ Query System

### Submit Query
```typescript
POST /api/queries
{
  "event_id": "uuid",
  "question": "What should I bring to the workshop?"
}
```

### Get Event Queries (Club/Admin)
```typescript
GET /api/events/{eventId}/queries
Response: {
  "queries": [
    {
      "id": "uuid",
      "event_id": "uuid",
      "student_id": "uuid",
      "question": "What should I bring to the workshop?",
      "answer": "Please bring your laptop and charger.",
      "answered_by": "uuid",
      "created_at": "2024-01-01T00:00:00Z",
      "students": {
        "roll_no": "21CS001",
        "department": "CSE",
        "year": "3rd Year",
        "users": {
          "name": "Student Name",
          "email": "student@mlrit.ac.in"
        }
      }
    }
  ]
}
```

### Answer Query (Club/Admin)
```typescript
PUT /api/queries/{queryId}
{
  "answer": "Please bring your laptop and charger."
}
```

### Get Student Queries
```typescript
GET /api/student/queries
Response: {
  "queries": [
    {
      "id": "uuid",
      "event_id": "uuid",
      "question": "What should I bring to the workshop?",
      "answer": "Please bring your laptop and charger.",
      "answered_by": "uuid",
      "created_at": "2024-01-01T00:00:00Z",
      "events": {
        "title": "Tech Workshop",
        "date": "2024-02-15"
      }
    }
  ]
}
```

## 💳 Payment System

### Create Payment Order
```typescript
POST /api/payment/create-order
{
  "amount": 500,
  "currency": "INR",
  "description": "Tech Workshop Registration",
  "customer_email": "student@mlrit.ac.in",
  "customer_name": "Student Name",
  "event_id": "uuid",
  "student_id": "uuid"
}
Response: {
  "success": true,
  "payment_id": "pay_123456789",
  "redirect_url": "/payment/confirm?order_id=order_123&payment_id=pay_123456789"
}
```

### Confirm Payment
```typescript
POST /api/payment/confirm
{
  "payment_id": "pay_123456789",
  "event_id": "uuid",
  "student_id": "uuid",
  "amount": 525
}
Response: {
  "success": true
}
```

### Get Payment History (Student)
```typescript
GET /api/student/payments
Response: {
  "payments": [
    {
      "id": "uuid",
      "event_id": "uuid",
      "payment_id": "pay_123456789",
      "amount": 525,
      "created_at": "2024-01-01T00:00:00Z",
      "events": {
        "title": "Tech Workshop",
        "date": "2024-02-15",
        "time": "14:00:00",
        "venue": "Auditorium"
      }
    }
  ]
}
```

### Get Payment Analytics (Club)
```typescript
GET /api/club/payment-analytics
Response: {
  "analytics": {
    "total_revenue": 26250,
    "total_registrations": 50,
    "average_ticket_price": 525,
    "events": 5,
    "recent_payments": [
      // Array of recent payment records
    ]
  }
}
```

## 📊 Analytics & Reports

### Get Club Analytics
```typescript
GET /api/club/analytics
Response: {
  "analytics": {
    "total_events": 10,
    "total_registrations": 250,
    "total_revenue": 125000,
    "average_rating": 4.5,
    "events_by_status": {
      "pending": 2,
      "approved": 6,
      "completed": 2
    }
  }
}
```

### Get Admin Analytics
```typescript
GET /api/admin/analytics
Response: {
  "analytics": {
    "total_users": 500,
    "total_events": 50,
    "total_registrations": 1000,
    "total_revenue": 500000,
    "platform_fee_revenue": 25000,
    "users_by_role": {
      "students": 400,
      "clubs": 50,
      "admins": 1
    }
  }
}
```

## ⚙️ Platform Settings (Admin Only)

### Get Platform Settings
```typescript
GET /api/admin/settings
Response: {
  "settings": {
    "platform_fee_percentage": 5,
    "max_team_size": 10,
    "min_event_price": 0,
    "max_event_price": 10000
  }
}
```

### Update Platform Fee
```typescript
PUT /api/admin/settings/platform-fee
{
  "fee_percentage": 7
}
```

## 🔍 Search & Filter

### Search Events
```typescript
GET /api/events/search?q=workshop&category=technical&date_from=2024-01-01&date_to=2024-12-31
Response: {
  "events": [
    // Array of matching events
  ]
}
```

### Get Event Categories
```typescript
GET /api/events/categories
Response: {
  "categories": [
    "technical",
    "cultural",
    "business",
    "sports",
    "academic"
  ]
}
```

## 📅 Calendar System

### Get General Calendar
```typescript
GET /api/calendar/general?month=2024-02
Response: {
  "events": [
    {
      "id": "uuid",
      "title": "Tech Workshop",
      "date": "2024-02-15",
      "time": "14:00:00",
      "venue": "Auditorium",
      "club_name": "CIE",
      "category": "technical"
    }
  ]
}
```

### Get Personal Calendar (Student)
```typescript
GET /api/calendar/personal?month=2024-02
Response: {
  "events": [
    // Events the student is registered for
  ]
}
```

### Get Club Calendar
```typescript
GET /api/calendar/club?month=2024-02
Response: {
  "events": [
    // Events created by the club
  ]
}
```

## 🗂️ File Upload

### Upload Event Image
```typescript
POST /api/upload/event-image
Content-Type: multipart/form-data
{
  "file": File,
  "event_id": "uuid"
}
Response: {
  "success": true,
  "url": "https://example.com/event-image.jpg"
}
```

### Upload Proof Document
```typescript
POST /api/upload/proof-document
Content-Type: multipart/form-data
{
  "file": File,
  "event_id": "uuid"
}
Response: {
  "success": true,
  "url": "https://example.com/proof-document.pdf"
}
```

## 🔒 Error Handling

All API endpoints return consistent error responses:

```typescript
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE" // Optional
}
```

### Common Error Codes
- `AUTH_REQUIRED`: Authentication required
- `PERMISSION_DENIED`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid input data
- `NOT_FOUND`: Resource not found
- `ALREADY_EXISTS`: Resource already exists
- `DOMAIN_RESTRICTED`: Email domain not allowed

## 📝 Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **Authentication endpoints**: 5 requests per minute
- **Event creation**: 10 requests per hour
- **Registration**: 20 requests per hour
- **General endpoints**: 100 requests per minute

## 🔐 Security

### Row Level Security (RLS)
All database operations are protected by RLS policies:
- Users can only access their own data
- Clubs can only manage their own events
- Students can only register once per event
- Admins have full access to all data

### Input Validation
All API inputs are validated:
- Email format validation
- Domain restriction (@mlrit.ac.in)
- Required field validation
- Data type validation

### CORS Configuration
```typescript
{
  "origin": ["http://localhost:3000", "https://your-domain.com"],
  "credentials": true
}
```

## 📊 Monitoring

### Health Check
```typescript
GET /api/health
Response: {
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0"
}
```

### API Status
```typescript
GET /api/status
Response: {
  "database": "connected",
  "auth": "active",
  "storage": "available"
}
```

---

**For additional support, refer to the [README.md](README.md) and [SETUP.md](SETUP.md) files.** 