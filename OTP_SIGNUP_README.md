# OTP-Based Signup System

This document describes the new OTP-based signup functionality implemented in the Wellvas backend.

## Overview

The signup process now includes email verification through OTP (One-Time Password) to ensure user authenticity and prevent fake registrations.

## New API Endpoints

### 1. Generate Signup OTP
**POST** `/auth/generate-signup-otp`

Generates and sends a 6-digit OTP to the user's email address.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "userName": "johndoe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "OTP sent to your email. Please check and verify.",
  "email": "john@example.com"
}
```

### 2. Verify Signup OTP
**POST** `/auth/verify-signup-otp`

Verifies the OTP and completes the user registration.

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "message": "Account created successfully!",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "userName": "johndoe",
    "email": "john@example.com",
    "phone": "1234567890",
    "isEmailVerified": true,
    "emailVerifiedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Resend Signup OTP
**POST** `/auth/resend-signup-otp`

Resends a new OTP if the previous one expired or wasn't received.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "New OTP sent to your email. Please check and verify.",
  "email": "john@example.com"
}
```

## Features

### Security Features
- **6-digit OTP**: Randomly generated 6-digit numeric code
- **10-minute expiry**: OTP expires after 10 minutes for security
- **Rate limiting**: Maximum 5 OTP attempts per hour per email
- **One-time use**: Each OTP can only be used once
- **Automatic cleanup**: Expired OTPs are automatically removed

### User Experience
- **Professional email template**: Beautiful HTML email with Wellvas branding
- **Clear instructions**: User-friendly messages and error handling
- **Resend functionality**: Users can request new OTPs if needed
- **Session management**: Temporary user data storage during verification

## Database Changes

### New OTP Model
```javascript
{
  email: String,           // User's email address
  otp: String,            // 6-digit OTP code
  expiresAt: Date,        // Expiration timestamp
  isUsed: Boolean,        // Whether OTP has been used
  purpose: String,        // 'signup' or 'password-reset'
  createdAt: Date,        // Creation timestamp
  updatedAt: Date         // Last update timestamp
}
```

### Updated User Model
```javascript
{
  // ... existing fields ...
  isEmailVerified: Boolean,    // Email verification status
  emailVerifiedAt: Date        // When email was verified
}
```

## Implementation Details

### OTP Generation
- Uses cryptographically secure random number generation
- Validates OTP format (6 digits)
- Checks rate limits before sending

### Email Sending
- Professional HTML email template
- Responsive design for mobile and desktop
- Clear call-to-action and instructions

### Session Management
- Temporary storage of user data during OTP verification
- Automatic cleanup after successful verification
- Secure session configuration

### Error Handling
- Comprehensive error messages
- Rate limit enforcement
- Input validation
- Database error handling

## Configuration

### Environment Variables
```bash
SESSION_SECRET=your-secret-key-here
NODE_ENV=production  # For secure cookies
```

### Session Configuration
```javascript
{
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 10 * 60 * 1000 // 10 minutes
  }
}
```

## Maintenance

### Automatic Cleanup
- Cron job runs every 5 minutes
- Removes expired OTPs automatically
- Logs cleanup activities

### Monitoring
- Rate limit tracking
- Failed OTP attempts logging
- Email delivery status monitoring

## Migration Notes

### Backward Compatibility
- Legacy `/auth/signup` endpoint still available
- Existing users unaffected
- Gradual migration possible

### Frontend Changes Required
- Update signup flow to use new endpoints
- Implement OTP input field
- Handle OTP verification process
- Add resend OTP functionality

## Security Considerations

1. **OTP Expiry**: 10-minute expiration prevents long-term attacks
2. **Rate Limiting**: Prevents OTP flooding attacks
3. **One-time Use**: Each OTP can only be used once
4. **Session Security**: Secure session configuration
5. **Input Validation**: Comprehensive input sanitization
6. **Database Indexing**: Optimized queries with proper indexes

## Testing

### Test Cases
1. Valid OTP generation and verification
2. Invalid OTP handling
3. Expired OTP handling
4. Rate limit enforcement
5. Email delivery verification
6. Session management
7. Error handling scenarios

### Test Data
- Use test email addresses
- Verify OTP delivery
- Test rate limiting
- Validate error responses

## Future Enhancements

1. **SMS OTP**: Add phone number verification
2. **2FA Integration**: Extend to two-factor authentication
3. **Advanced Rate Limiting**: IP-based rate limiting
4. **Analytics**: Track OTP usage and success rates
5. **Template Customization**: User-configurable email templates
