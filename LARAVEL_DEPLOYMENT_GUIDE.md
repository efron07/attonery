# Republica Attorneys - Laravel Backend Deployment Guide

This guide covers the complete deployment of the Republica Attorneys website with Laravel backend and React frontend.

## 🏗️ **Architecture Overview**

- **Frontend**: React SPA (Single Page Application)
- **Backend**: Laravel 12.x API with JWT Authentication
- **Database**: MySQL
- **File Storage**: Local storage with public access

## 📁 **Project Structure**

```
project/
├── laravel-backend/          # Laravel API backend
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── public/
├── src/                      # React frontend
├── dist/                     # Built frontend files
└── deployment files
```

## 🚀 **STEP 1: LARAVEL BACKEND DEPLOYMENT**

### 1.1 **Server Requirements**
- PHP 8.1 or higher
- MySQL 5.7 or higher
- Composer
- Apache/Nginx with mod_rewrite enabled

### 1.2 **Upload Laravel Backend**
```bash
# Upload laravel-backend/ folder to:
/home/republic/backend.republicaattorneys.co.tz/
```

### 1.3 **Install Dependencies**
```bash
cd /home/republic/backend.republicaattorneys.co.tz
composer install --no-dev --optimize-autoloader
```

### 1.4 **Environment Configuration**
Create `.env` file:
```env
APP_NAME="Republica Attorneys API"
APP_ENV=production
APP_KEY=base64:your-generated-key
APP_DEBUG=false
APP_URL=https://backend.republicaattorneys.co.tz

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=republic_cms_db
DB_USERNAME=republic_cms
DB_PASSWORD=YOUR_SECURE_PASSWORD

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

VITE_APP_NAME="${APP_NAME}"

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-change-this
JWT_TTL=1440
JWT_REFRESH_TTL=20160

# File Upload Configuration
UPLOAD_PATH=uploads
MAX_FILE_SIZE=5242880

# Admin Credentials
ADMIN_USERNAME=admin@republicaattorneys.co.tz
ADMIN_PASSWORD=republica2024

# CORS Configuration
CORS_ORIGINS=https://republicaattorneys.co.tz,https://www.republicaattorneys.co.tz
```

### 1.5 **Generate Application Key**
```bash
php artisan key:generate
```

### 1.6 **Database Setup**
```bash
# Run migrations
php artisan migrate

# Seed database with admin user
php artisan db:seed
```

### 1.7 **Create Storage Link**
```bash
php artisan storage:link
```

### 1.8 **Set Permissions**
```bash
# Set proper permissions
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### 1.9 **Configure Apache Virtual Host**
Create virtual host configuration for `backend.republicaattorneys.co.tz`:

```apache
<VirtualHost *:80>
    ServerName backend.republicaattorneys.co.tz
    DocumentRoot /home/republic/backend.republicaattorneys.co.tz/public
    
    <Directory /home/republic/backend.republicaattorneys.co.tz/public>
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/backend_error.log
    CustomLog ${APACHE_LOG_DIR}/backend_access.log combined
</VirtualHost>
```

### 1.10 **Create .htaccess for Laravel**
Create `/home/republic/backend.republicaattorneys.co.tz/public/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>

# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# CORS Headers
Header always set Access-Control-Allow-Origin "https://republicaattorneys.co.tz"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
Header always set Access-Control-Allow-Credentials "true"

# Handle preflight requests
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]
```

## 🌐 **STEP 2: FRONTEND DEPLOYMENT**

### 2.1 **Build Production Frontend**
```bash
# On your development machine
npm run build:production
```

### 2.2 **Upload Frontend Files**
```bash
# Upload dist/ folder contents to:
/home/republic/public_html/
```

### 2.3 **Configure Frontend Domain**
Point `republicaattorneys.co.tz` to `/home/republic/public_html/`

### 2.4 **Frontend .htaccess Configuration**
The `.htaccess` file in the frontend directory should proxy API requests to the Laravel backend:

```apache
RewriteEngine On
RewriteBase /

# Handle API requests (proxy to Laravel backend)
RewriteCond %{REQUEST_URI} ^/api/(.*)$
RewriteRule ^api/(.*)$ https://backend.republicaattorneys.co.tz/api/$1 [P,L]

# Handle React Router (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

## 🔧 **STEP 3: SSL CERTIFICATES**

### 3.1 **Enable SSL for Both Domains**
- `https://republicaattorneys.co.tz` (Frontend)
- `https://backend.republicaattorneys.co.tz` (Laravel API)

### 3.2 **Update CORS Configuration**
After SSL is enabled, update the CORS origins in Laravel `.env`:
```env
CORS_ORIGINS=https://republicaattorneys.co.tz,https://www.republicaattorneys.co.tz
```

## 🧪 **STEP 4: TESTING**

### 4.1 **Test Laravel API**
```bash
# Test API health
curl https://backend.republicaattorneys.co.tz/api/public/services

# Test admin login
curl -X POST https://backend.republicaattorneys.co.tz/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin@republicaattorneys.co.tz","password":"republica2024"}'
```

### 4.2 **Test Frontend**
- Visit `https://republicaattorneys.co.tz`
- Test admin panel at `https://republicaattorneys.co.tz/admin`
- Verify API calls work from frontend

## 🔒 **STEP 5: SECURITY**

### 5.1 **Change Default Credentials**
```bash
# Update admin password in Laravel
php artisan tinker
>>> $user = App\Models\User::where('username', 'admin@republicaattorneys.co.tz')->first();
>>> $user->update(['password_hash' => Hash::make('NEW_SECURE_PASSWORD')]);
```

### 5.2 **Update JWT Secret**
```bash
# Generate new JWT secret
php artisan tinker
>>> echo Str::random(32);
# Copy the generated string and update JWT_SECRET in .env
```

### 5.3 **File Permissions**
```bash
# Secure file permissions
find /home/republic/backend.republicaattorneys.co.tz -type f -exec chmod 644 {} \;
find /home/republic/backend.republicaattorneys.co.tz -type d -exec chmod 755 {} \;
chmod -R 775 storage bootstrap/cache
```

## 📊 **STEP 6: MONITORING**

### 6.1 **Laravel Logs**
```bash
# Monitor Laravel logs
tail -f /home/republic/backend.republicaattorneys.co.tz/storage/logs/laravel.log
```

### 6.2 **Apache Logs**
```bash
# Monitor access logs
tail -f /var/log/apache2/backend_access.log
tail -f /var/log/apache2/backend_error.log
```

## 🔄 **STEP 7: MAINTENANCE**

### 7.1 **Database Backups**
```bash
# Create backup script
mysqldump -u republic_cms -p republic_cms_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 7.2 **Laravel Maintenance**
```bash
# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 🚨 **TROUBLESHOOTING**

### Common Issues:

1. **CORS Errors**: Check CORS_ORIGINS in Laravel .env
2. **500 Errors**: Check Laravel logs and file permissions
3. **404 Errors**: Verify Apache rewrite rules
4. **Database Connection**: Check database credentials and permissions

### Debug Mode (Temporary)
```env
APP_DEBUG=true
APP_ENV=local
```

## 📞 **SUPPORT**

For deployment issues, check:
1. Laravel logs: `storage/logs/laravel.log`
2. Apache logs: `/var/log/apache2/`
3. PHP error logs: `/var/log/php/`

---

**✅ Deployment Complete!**

Your Republica Attorneys website is now running with:
- **Frontend**: React SPA on `https://republicaattorneys.co.tz`
- **Backend**: Laravel API on `https://backend.republicaattorneys.co.tz`
- **Admin Panel**: `https://republicaattorneys.co.tz/admin` 