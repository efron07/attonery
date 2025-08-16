# Republica Attorneys - Laravel Backend API

A modern Laravel-based REST API for the Republica Attorneys website, providing comprehensive content management and public access endpoints.

## Features

- **JWT Authentication** - Secure API authentication with JWT tokens
- **Content Management** - Full CRUD operations for blogs, services, team members
- **Public API** - Public endpoints for frontend consumption
- **File Upload** - Image upload functionality with validation
- **Contact Management** - Contact form submissions and newsletter subscriptions
- **CORS Support** - Cross-origin request handling
- **Database Migrations** - Complete database schema with relationships
- **Validation** - Comprehensive input validation and error handling

## Requirements

- PHP 8.1 or higher
- Composer
- MySQL 5.7 or higher
- Laravel 12.x

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laravel-backend
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database**
   Update the `.env` file with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=cms_database
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

5. **Run migrations and seeders**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Create storage link**
   ```bash
   php artisan storage:link
   ```

7. **Start the server**
   ```bash
   php artisan serve
   ```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login with username and password
- `POST /api/auth/logout` - Logout (requires authentication)
- `POST /api/auth/refresh` - Refresh JWT token (requires authentication)
- `GET /api/auth/me` - Get current user info (requires authentication)

### Protected Routes (Admin)

#### Blogs
- `GET /api/blogs` - List all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/{id}` - Get specific blog
- `PUT /api/blogs/{id}` - Update blog
- `DELETE /api/blogs/{id}` - Delete blog
- `GET /api/blogs/featured` - Get featured blogs
- `GET /api/blogs/category/{category}` - Get blogs by category

#### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create new service
- `GET /api/services/{id}` - Get specific service
- `PUT /api/services/{id}` - Update service
- `DELETE /api/services/{id}` - Delete service
- `GET /api/services/active` - Get active services

#### Team Members
- `GET /api/team` - List all team members
- `POST /api/team` - Create new team member
- `GET /api/team/{id}` - Get specific team member
- `PUT /api/team/{id}` - Update team member
- `DELETE /api/team/{id}` - Delete team member
- `GET /api/team/active` - Get active team members

#### Content Management
- `GET /api/content/about` - Get about content
- `PUT /api/content/about` - Update about content
- `GET /api/content/contact` - Get contact settings
- `PUT /api/content/contact` - Update contact settings

#### File Upload
- `POST /api/upload/image` - Upload image
- `DELETE /api/upload/image/{filename}` - Delete image

### Public Routes

#### Blogs
- `GET /api/public/blogs` - Get published blogs
- `GET /api/public/blogs/{slug}` - Get blog by slug
- `GET /api/public/blogs/featured` - Get featured blogs
- `GET /api/public/blogs/category/{category}` - Get blogs by category

#### Services
- `GET /api/public/services` - Get active services
- `GET /api/public/services/{slug}` - Get service by slug

#### Team
- `GET /api/public/team` - Get active team members

#### Content
- `GET /api/public/about` - Get about content
- `GET /api/public/contact` - Get contact settings

#### Contact & Newsletter
- `POST /api/public/contact` - Submit contact form
- `POST /api/public/subscribe` - Subscribe to newsletter
- `POST /api/public/unsubscribe` - Unsubscribe from newsletter

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

### Users
- `id` - Primary key
- `username` - Unique username
- `password_hash` - Hashed password
- `role` - User role (admin)
- `last_login` - Last login timestamp
- `login_attempts` - Failed login attempts
- `locked_until` - Account lock timestamp

### Blogs
- `id` - Primary key
- `title` - Blog title
- `content` - Blog content
- `excerpt` - Blog excerpt
- `date` - Publication date
- `author` - Author name
- `read_time` - Estimated read time
- `views` - View count
- `category` - Blog category
- `published` - Publication status
- `featured` - Featured status
- `slug` - URL slug

### Services
- `id` - Primary key
- `title` - Service title
- `description` - Service description
- `icon` - Service icon
- `active` - Active status
- `order_index` - Display order
- `slug` - URL slug

### Team Members
- `id` - Primary key
- `name` - Member name
- `title` - Job title
- `bio` - Biography
- `image` - Profile image
- `active` - Active status
- `order_index` - Display order

### Other Tables
- `about_contents` - About page content
- `contact_settings` - Contact information
- `subscribers` - Newsletter subscribers
- `contact_inquiries` - Contact form submissions

## Environment Variables

```env
# Application
APP_NAME="Republica Attorneys API"
APP_ENV=production
APP_DEBUG=false
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cms_database
DB_USERNAME=root
DB_PASSWORD=

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_TTL=1440
JWT_REFRESH_TTL=20160

# File Upload
UPLOAD_PATH=uploads
MAX_FILE_SIZE=5242880

# Admin Credentials
ADMIN_USERNAME=admin@republicaattorneys.co.tz
ADMIN_PASSWORD=republica2024

# CORS
CORS_ORIGINS=https://republicaattorneys.co.tz,https://www.republicaattorneys.co.tz
```

## Default Admin User

The system creates a default admin user with these credentials:
- **Username**: admin@republicaattorneys.co.tz
- **Password**: republica2024

**Important**: Change these credentials in production!

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": ["validation error"]
  }
}
```

## Success Responses

Successful operations return:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

## Development

### Running Tests
```bash
php artisan test
```

### Code Style
```bash
./vendor/bin/pint
```

### Database Reset
```bash
php artisan migrate:fresh --seed
```

## Production Deployment

1. Set `APP_ENV=production` and `APP_DEBUG=false`
2. Configure your web server (Apache/Nginx)
3. Set up SSL certificates
4. Configure database with proper credentials
5. Set up proper file permissions
6. Configure caching (Redis recommended)
7. Set up monitoring and logging

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Account lockout after failed attempts
- CORS protection
- Input validation and sanitization
- SQL injection protection (Laravel Eloquent)
- XSS protection
- CSRF protection (where applicable)

## Support

For support and questions, please contact the development team.

## License

This project is proprietary software for Republica Attorneys.
