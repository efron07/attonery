#!/bin/bash

echo "🚀 Republica Attorneys CMS - Deployment Script"
echo "=============================================="

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

# Configuration
BACKEND_DIR="/home/republic/backend.republicaattorneys.co.tz"
FRONTEND_DIR="/home/republic/public_html"
BACKUP_DIR="/home/republic/backups"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Get current timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Function to create backup
create_backup() {
    print_status "Creating backup..."
    
    if [ -d "$BACKEND_DIR" ]; then
        BACKUP_NAME="backend_backup_$TIMESTAMP.tar.gz"
        tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$(dirname "$BACKEND_DIR")" "$(basename "$BACKEND_DIR")"
        if [ $? -eq 0 ]; then
            print_success "Backend backup created: $BACKUP_NAME"
        else
            print_warning "Failed to create backend backup"
        fi
    fi
    
    if [ -d "$FRONTEND_DIR" ]; then
        FRONTEND_BACKUP_NAME="frontend_backup_$TIMESTAMP.tar.gz"
        tar -czf "$BACKUP_DIR/$FRONTEND_BACKUP_NAME" -C "$(dirname "$FRONTEND_DIR")" "$(basename "$FRONTEND_DIR")"
        if [ $? -eq 0 ]; then
            print_success "Frontend backup created: $FRONTEND_BACKUP_NAME"
        else
            print_warning "Failed to create frontend backup"
        fi
    fi
}

# Function to stop application
stop_application() {
    print_status "Stopping application..."
    
    # Try to stop with PM2
    if command -v pm2 &> /dev/null; then
        pm2 stop republica-backend 2>/dev/null || true
        pm2 delete republica-backend 2>/dev/null || true
        print_success "PM2 process stopped"
    fi
    
    # Kill any existing Node.js processes on port 3001
    PID=$(lsof -ti:3001 2>/dev/null)
    if [ ! -z "$PID" ]; then
        kill -TERM $PID 2>/dev/null || true
        sleep 2
        kill -KILL $PID 2>/dev/null || true
        print_success "Existing Node.js process stopped"
    fi
}

# Function to deploy backend
deploy_backend() {
    print_status "Deploying backend..."
    
    if [ ! -d "$BACKEND_DIR" ]; then
        print_error "Backend directory not found: $BACKEND_DIR"
        return 1
    fi
    
    cd "$BACKEND_DIR"
    
    # Pull latest changes if git repository exists
    if [ -d ".git" ]; then
        print_status "Pulling latest changes from git..."
        git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || print_warning "Git pull failed or no remote configured"
    else
        print_warning "No git repository found. Skipping git pull."
    fi
    
    # Install dependencies
    print_status "Installing dependencies..."
    npm install --production
    if [ $? -ne 0 ]; then
        print_error "Failed to install dependencies"
        return 1
    fi
    
    # Create necessary directories
    mkdir -p uploads logs
    chmod 755 uploads logs
    
    # Set permissions
    chmod 644 .env 2>/dev/null || true
    chmod 755 src/app.js
    
    print_success "Backend deployment completed"
}

# Function to deploy frontend
deploy_frontend() {
    print_status "Deploying frontend..."
    
    if [ ! -d "$FRONTEND_DIR" ]; then
        print_error "Frontend directory not found: $FRONTEND_DIR"
        return 1
    fi
    
    # Check if dist directory exists in current location
    if [ -d "dist" ]; then
        print_status "Copying frontend files..."
        cp -r dist/* "$FRONTEND_DIR/"
        if [ $? -eq 0 ]; then
            print_success "Frontend files copied successfully"
        else
            print_error "Failed to copy frontend files"
            return 1
        fi
    else
        print_warning "dist directory not found. Skipping frontend deployment."
        print_status "Please build the frontend first: npm run build:production"
    fi
}

# Function to start application
start_application() {
    print_status "Starting application..."
    
    cd "$BACKEND_DIR"
    
    # Try to start with PM2
    if command -v pm2 &> /dev/null; then
        pm2 start src/app.js --name republica-backend --env production
        if [ $? -eq 0 ]; then
            print_success "Application started with PM2"
            pm2 save
            pm2 startup
        else
            print_warning "Failed to start with PM2, trying npm start..."
            npm start &
        fi
    else
        print_warning "PM2 not found, starting with npm..."
        npm start &
    fi
    
    # Wait a moment for the application to start
    sleep 3
    
    # Check if application is running
    if curl -s http://localhost:3001/api/health > /dev/null; then
        print_success "Application is running and responding"
    else
        print_warning "Application may not be fully started yet"
    fi
}

# Function to verify deployment
verify_deployment() {
    print_status "Verifying deployment..."
    
    # Check backend health
    if curl -s https://backend.republicaattorneys.co.tz/api/health > /dev/null; then
        print_success "Backend API is responding"
    else
        print_warning "Backend API may not be accessible yet"
    fi
    
    # Check frontend
    if curl -s https://republicaattorneys.co.tz > /dev/null; then
        print_success "Frontend is accessible"
    else
        print_warning "Frontend may not be accessible yet"
    fi
    
    # Check admin panel
    if curl -s https://republicaattorneys.co.tz/admin/login > /dev/null; then
        print_success "Admin panel is accessible"
    else
        print_warning "Admin panel may not be accessible yet"
    fi
}

# Function to cleanup old backups
cleanup_backups() {
    print_status "Cleaning up old backups (keeping last 5)..."
    
    cd "$BACKUP_DIR"
    ls -t *.tar.gz | tail -n +6 | xargs -r rm
    print_success "Old backups cleaned up"
}

# Main deployment process
main() {
    print_status "Starting deployment process..."
    
    # Create backup
    create_backup
    
    # Stop application
    stop_application
    
    # Deploy backend
    deploy_backend
    if [ $? -ne 0 ]; then
        print_error "Backend deployment failed"
        exit 1
    fi
    
    # Deploy frontend
    deploy_frontend
    if [ $? -ne 0 ]; then
        print_warning "Frontend deployment had issues"
    fi
    
    # Start application
    start_application
    
    # Verify deployment
    verify_deployment
    
    # Cleanup old backups
    cleanup_backups
    
    echo ""
    print_success "Deployment completed successfully!"
    echo ""
    echo "🌐 Your application is now live at:"
    echo "   - Website: https://republicaattorneys.co.tz"
    echo "   - Admin Panel: https://republicaattorneys.co.tz/admin/login"
    echo "   - Backend API: https://backend.republicaattorneys.co.tz/api"
    echo "   - Health Check: https://backend.republicaattorneys.co.tz/api/health"
    echo ""
    echo "📊 Monitoring:"
    echo "   - PM2 Status: pm2 status"
    echo "   - PM2 Logs: pm2 logs republica-backend"
    echo "   - Application Logs: tail -f $BACKEND_DIR/logs/app.log"
    echo ""
}

# Check if script is run with correct permissions
if [ "$EUID" -ne 0 ]; then
    print_warning "This script should be run as root or with sudo for full functionality"
fi

# Run main function
main "$@" 