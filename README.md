# 🏛️ Republica Attorneys & Consultants

A modern, professional website for Republica Attorneys & Consultants - a leading law firm in Tanzania. Built with React, Laravel, and modern web technologies.

![Republica Attorneys](https://img.shields.io/badge/Republica-Attorneys-blue?style=for-the-badge&logo=law)
![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)
![Laravel](https://img.shields.io/badge/Laravel-12.0-red?style=for-the-badge&logo=laravel)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [🌐 API Documentation](#-api-documentation)
- [📱 Screenshots](#-screenshots)
- [🛠️ Development](#-development)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🌐 Public Website
- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **Team Showcase**: Professional team member profiles with specialties
- **Services Overview**: Comprehensive legal services presentation
- **Blog System**: News and legal insights with categories
- **Contact Forms**: Easy client communication
- **About Section**: Company history and values
- **SEO Optimized**: Meta tags, structured data, and performance

### 🔐 Admin Panel
- **Secure Authentication**: JWT-based admin login system
- **Content Management**: Full CRUD operations for all content
- **Team Management**: Add, edit, delete team members with image uploads
- **Blog Management**: Create and manage blog posts
- **Services Management**: Update service offerings
- **About Content**: Manage company information and statistics
- **Contact Settings**: Update contact information and social links
- **Image Upload**: Drag & drop image upload functionality

### 🔧 Technical Features
- **RESTful API**: Complete Laravel backend with authentication
- **Real-time Updates**: Instant content updates across the site
- **Image Optimization**: Automatic image processing and storage
- **Search Functionality**: Advanced search across all content
- **Data Validation**: Comprehensive input validation and error handling
- **Performance Optimized**: Fast loading times and efficient queries

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Laravel 12** - PHP framework
- **MySQL** - Database
- **JWT Authentication** - Secure API authentication
- **Eloquent ORM** - Database abstraction
- **File Storage** - Image upload and management
- **CORS** - Cross-origin resource sharing
- **Validation** - Request validation and sanitization

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **Composer** - PHP dependency management
- **npm** - Node.js package management

## 📁 Project Structure

```
project/
├── src/                          # Frontend React application
│   ├── admin/                    # Admin panel components
│   ├── components/               # Reusable UI components
│   ├── hooks/                    # Custom React hooks
│   ├── pages/                    # Public pages
│   ├── utils/                    # Utility functions
│   └── App.tsx                   # Main application component
├── laravel-backend/              # Laravel backend application
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/      # API controllers
│   │   │   └── Middleware/       # Custom middleware
│   │   └── Models/               # Eloquent models
│   ├── database/
│   │   ├── migrations/           # Database migrations
│   │   └── seeders/              # Database seeders
│   ├── routes/
│   │   └── api.php               # API routes
│   └── storage/                  # File storage
├── public/                       # Public assets
├── package.json                  # Frontend dependencies
├── composer.json                 # Backend dependencies
└── README.md                     # This file
```

## ⚡ Quick Start

### Prerequisites
- **Node.js** 18+ and **npm**
- **PHP** 8.1+ and **Composer**
- **MySQL** 5.7+ or **MariaDB** 10.3+
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/republica-attorneys.git
cd republica-attorneys
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd laravel-backend
composer install
```

### 3. Environment Setup
```bash
# Copy environment files
cp laravel-backend/.env.example laravel-backend/.env

# Generate Laravel application key
cd laravel-backend
php artisan key:generate
php artisan jwt:secret
```

### 4. Database Setup
```bash
# Configure database in .env file
# Then run migrations and seeders
php artisan migrate --seed
```

### 5. Start Development Servers
```bash
# Start Laravel backend (in laravel-backend directory)
php artisan serve --port=8002

# Start React frontend (in project root)
npm run dev
```

Visit `http://localhost:5174` for the frontend and `http://localhost:8002` for the API.

## 🔧 Installation

### Detailed Setup Instructions

#### 1. Backend Setup (Laravel)

```bash
cd laravel-backend

# Install dependencies
composer install

# Environment configuration
cp .env.example .env
php artisan key:generate
php artisan jwt:secret

# Database configuration
# Edit .env file with your database credentials
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=republica_attorneys
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Run migrations and seeders
php artisan migrate --seed

# Create storage link for file uploads
php artisan storage:link

# Set proper permissions
chmod -R 755 storage bootstrap/cache
```

#### 2. Frontend Setup (React)

```bash
# Install dependencies
npm install

# Environment configuration
# Create .env file if needed for custom configurations

# Start development server
npm run dev
```

#### 3. Admin Access

Default admin credentials (created by seeder):
- **Username**: `admin@republicaattorneys.co.tz`
- **Password**: `republica2024`

Access admin panel at: `http://localhost:5174/admin/login`

## 🌐 API Documentation

### Authentication Endpoints

```http
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
```

### Public Endpoints

```http
GET  /api/public/team          # Get active team members
GET  /api/public/services      # Get active services
GET  /api/public/blogs         # Get published blogs
GET  /api/public/about         # Get about content
GET  /api/public/contact       # Get contact settings
POST /api/public/contact       # Submit contact form
POST /api/public/subscribe     # Newsletter subscription
```

### Protected Endpoints (Admin)

```http
# Team Management
GET    /api/team              # List all team members
POST   /api/team              # Create team member
GET    /api/team/{id}         # Get specific member
PUT    /api/team/{id}         # Update member
DELETE /api/team/{id}         # Delete member

# Blog Management
GET    /api/blogs             # List all blogs
POST   /api/blogs             # Create blog
GET    /api/blogs/{id}        # Get specific blog
PUT    /api/blogs/{id}        # Update blog
DELETE /api/blogs/{id}        # Delete blog

# Services Management
GET    /api/services          # List all services
POST   /api/services          # Create service
GET    /api/services/{id}     # Get specific service
PUT    /api/services/{id}     # Update service
DELETE /api/services/{id}     # Delete service

# Content Management
GET    /api/content/about     # Get about content
PUT    /api/content/about     # Update about content
GET    /api/content/contact   # Get contact settings
PUT    /api/content/contact   # Update contact settings

# File Upload
POST   /api/upload/image      # Upload image
DELETE /api/upload/image/{filename}  # Delete image
```

## 📱 Screenshots

### Public Website
- **Homepage**: Modern landing page with hero section
- **Team Page**: Professional team member profiles
- **Services Page**: Comprehensive legal services
- **Blog Page**: News and legal insights
- **Contact Page**: Easy client communication

### Admin Panel
- **Dashboard**: Overview of content and statistics
- **Team Manager**: Full CRUD for team members
- **Blog Manager**: Content management system
- **Services Manager**: Service offerings management
- **About Manager**: Company information management

## 🛠️ Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
php artisan serve    # Start Laravel development server
php artisan migrate  # Run database migrations
php artisan seed     # Run database seeders
php artisan cache:clear  # Clear application cache
```

### Code Style

This project follows modern coding standards:

- **Frontend**: ESLint + Prettier configuration
- **Backend**: PSR-12 coding standards
- **Git**: Conventional commit messages

### Database Schema

Key tables:
- `users` - Admin users
- `team_members` - Team member profiles
- `blogs` - Blog posts
- `services` - Legal services
- `about_contents` - Company information
- `contact_settings` - Contact information
- `subscribers` - Newsletter subscribers
- `contact_inquiries` - Contact form submissions

## 🚀 Deployment

### Production Deployment

#### 1. Backend Deployment (Laravel)

```bash
# Set production environment
APP_ENV=production
APP_DEBUG=false

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

#### 2. Frontend Deployment (React)

```bash
# Build for production
npm run build

# Deploy dist/ folder to web server
```

#### 3. Server Requirements

- **Web Server**: Apache/Nginx
- **PHP**: 8.1+ with required extensions
- **Database**: MySQL 5.7+ or MariaDB 10.3+
- **SSL Certificate**: For HTTPS

### Environment Variables

#### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

#### Backend (.env)
```env
APP_NAME="Republica Attorneys"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=republica_attorneys
DB_USERNAME=your_username
DB_PASSWORD=your_password

JWT_SECRET=your-jwt-secret
JWT_TTL=60
JWT_REFRESH_TTL=20160

UPLOAD_PATH=uploads
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- **Email**: support@republicaattorneys.co.tz
- **Website**: https://republicaattorneys.co.tz
- **Issues**: [GitHub Issues](https://github.com/yourusername/republica-attorneys/issues)

---

**Built with ❤️ for Republica Attorneys & Consultants**

*Empowering legal excellence in Tanzania*
