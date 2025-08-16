#!/bin/bash

echo "🚀 Republica Attorneys CMS - Quick Setup"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the backend root directory."
    exit 1
fi

# Check Node.js version
print_status "Checking Node.js version..."
NODE_VERSION=$(node --version 2>/dev/null)
if [ $? -eq 0 ]; then
    print_success "Node.js version: $NODE_VERSION"
else
    print_error "Node.js is not installed or not in PATH"
    exit 1
fi

# Check npm
print_status "Checking npm..."
NPM_VERSION=$(npm --version 2>/dev/null)
if [ $? -eq 0 ]; then
    print_success "npm version: $NPM_VERSION"
else
    print_error "npm is not installed or not in PATH"
    exit 1
fi

# Install dependencies
print_status "Installing dependencies..."
npm install --production
if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Create uploads directory
print_status "Creating uploads directory..."
mkdir -p uploads
chmod 755 uploads
if [ -d "uploads" ]; then
    print_success "Uploads directory created"
else
    print_error "Failed to create uploads directory"
    exit 1
fi

# Create logs directory
print_status "Creating logs directory..."
mkdir -p logs
chmod 755 logs
if [ -d "logs" ]; then
    print_success "Logs directory created"
else
    print_warning "Failed to create logs directory"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Please create it with your configuration."
    print_status "Creating sample .env file..."
    cat > .env.example << EOF
# Production Environment
NODE_ENV=production
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=republic_cms
DB_PASSWORD=YOUR_SECURE_PASSWORD
DB_NAME=republic_cms_db
DB_CHARSET=utf8mb4
DB_CONNECTION_LIMIT=20
DB_QUEUE_LIMIT=0

# JWT Configuration
JWT_SECRET=YOUR_SUPER_SECURE_JWT_SECRET_KEY_HERE
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGINS=https://republicaattorneys.co.tz,https://www.republicaattorneys.co.tz

# File Upload Configuration
UPLOAD_PATH=uploads
MAX_FILE_SIZE=5242880

# Admin Credentials
ADMIN_USERNAME=admin@republicaattorneys.co.tz
ADMIN_PASSWORD=republica2024
BCRYPT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
SLOW_DOWN_WINDOW=15
SLOW_DOWN_DELAY=500
EOF
    print_success "Sample .env file created. Please copy .env.example to .env and configure it."
else
    print_success ".env file found"
fi

# Initialize database
print_status "Initializing database..."
npm run init-db
if [ $? -eq 0 ]; then
    print_success "Database initialized successfully"
else
    print_warning "Database initialization failed. Please check your database configuration."
fi

# Seed database
print_status "Seeding database..."
npm run seed-db
if [ $? -eq 0 ]; then
    print_success "Database seeded successfully"
else
    print_warning "Database seeding failed. This is normal if the database already has data."
fi

# Set permissions
print_status "Setting file permissions..."
chmod 644 .env 2>/dev/null || true
chmod 755 src/app.js
chmod 755 uploads/
chmod 755 logs/

print_success "File permissions set"

# Check if PM2 is available
if command -v pm2 &> /dev/null; then
    print_status "PM2 is available. You can use PM2 to manage the application."
    print_status "To start with PM2: pm2 start src/app.js --name republica-backend"
else
    print_warning "PM2 not found. Consider installing PM2 for process management."
fi

echo ""
print_success "Setup completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Configure your .env file with your database credentials"
echo "2. Start the application: npm start"
echo "3. Or use PM2: pm2 start src/app.js --name republica-backend"
echo ""
echo "🌐 Your application will be available at:"
echo "   - Backend API: https://backend.republicaattorneys.co.tz/api"
echo "   - Health Check: https://backend.republicaattorneys.co.tz/api/health"
echo "" 