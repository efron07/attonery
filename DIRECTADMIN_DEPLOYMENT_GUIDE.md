# 🚀 DIRECTADMIN DEPLOYMENT GUIDE
## Republica Attorneys CMS - Production Deployment

### 📋 **PREREQUISITES**
- DirectAdmin access with Node.js support
- MySQL database access
- SSH access (recommended)
- Domain: `republicaattorneys.co.tz`
- Subdomain: `backend.republicaattorneys.co.tz`

---

## 🎯 **DEPLOYMENT OVERVIEW**

```
Production Setup:
├── Frontend: https://republicaattorneys.co.tz
├── Backend: https://backend.republicaattorneys.co.tz/api
└── Admin: https://republicaattorneys.co.tz/admin/login
```

---

## 🔧 **STEP 1: BACKEND DEPLOYMENT**

### 1.1 **Upload Backend Files**
```bash
# Via DirectAdmin File Manager or FTP
Upload: subdomain-deployment/ → /home/republic/backend.republicaattorneys.co.tz/
```

### 1.2 **Configure DirectAdmin Node.js**
1. **Login to DirectAdmin**
2. **Navigate to:** Advanced Features → Node.js
3. **Create New App:**
   - **App Name:** `republica-backend`
   - **Node.js Version:** `18.x` (or latest LTS)
   - **App Root:** `/home/republic/backend.republicaattorneys.co.tz`
   - **App URL:** `backend.republicaattorneys.co.tz`
   - **App Startup File:** `src/app.js`
   - **App Port:** `3001`

### 1.3 **Environment Configuration**
Create `.env` file in `/home/republic/backend.republicaattorneys.co.tz/`:

```env
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
```

### 1.4 **Database Setup**
1. **Create Database via DirectAdmin:**
   - **Database Name:** `republic_cms_db`
   - **Database User:** `republic_cms`
   - **Password:** `YOUR_SECURE_PASSWORD`

2. **Initialize Database:**
```bash
# SSH into server
cd /home/republic/backend.republicaattorneys.co.tz
npm run init-db
npm run seed-db
```

### 1.5 **Install Dependencies & Start**
```bash
# Install dependencies
npm install --production

# Start the application
npm start
```

### 1.6 **Configure Apache/Nginx Proxy**
In DirectAdmin, configure the subdomain to proxy to Node.js:

**Apache Configuration (via DirectAdmin):**
```apache
# Add to .htaccess or virtual host
ProxyPass /api http://localhost:3001/api
ProxyPassReverse /api http://localhost:3001/api
```

---

## 🌐 **STEP 2: FRONTEND DEPLOYMENT**

### 2.1 **Build Production Frontend**
```bash
# Local build (run this on your development machine)
npm run build:production
```

### 2.2 **Upload Frontend Files**
```bash
# Upload dist/ folder contents to:
/home/republic/public_html/
```

### 2.3 **Configure Frontend Domain**
1. **Point Domain:** `republicaattorneys.co.tz` → `/home/republic/public_html/`
2. **Enable SSL Certificate** via DirectAdmin

### 2.4 **Configure Apache for React Router**
Create `.htaccess` in `/home/republic/public_html/`:

```apache
RewriteEngine On
RewriteBase /

# Handle API requests (proxy to backend)
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

# Cache Control
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</FilesMatch>

<FilesMatch "\.(html)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 hour"
    Header set Cache-Control "public, must-revalidate"
</FilesMatch>
```

---

## 🔒 **STEP 3: SECURITY CONFIGURATION**

### 3.1 **SSL Certificates**
1. **Frontend SSL:** `republicaattorneys.co.tz`
2. **Backend SSL:** `backend.republicaattorneys.co.tz`
3. **Enable HSTS** in DirectAdmin

### 3.2 **Firewall Configuration**
```bash
# Allow only necessary ports
ufw allow 80
ufw allow 443
ufw allow 22
ufw enable
```

### 3.3 **Database Security**
```sql
-- Create dedicated database user with limited privileges
CREATE USER 'republic_cms'@'localhost' IDENTIFIED BY 'YOUR_SECURE_PASSWORD';
GRANT SELECT, INSERT, UPDATE, DELETE ON republic_cms_db.* TO 'republic_cms'@'localhost';
FLUSH PRIVILEGES;
```

---

## 📊 **STEP 4: MONITORING & MAINTENANCE**

### 4.1 **Health Check Endpoints**
- **Backend Health:** `https://backend.republicaattorneys.co.tz/api/health`
- **Frontend Status:** `https://republicaattorneys.co.tz`

### 4.2 **Log Monitoring**
```bash
# Backend logs
tail -f /home/republic/backend.republicaattorneys.co.tz/logs/app.log

# Node.js app logs
tail -f /home/republic/.nodejs/republica-backend/logs/app.log
```

### 4.3 **Performance Monitoring**
- **Database:** Monitor slow queries
- **Memory:** Check Node.js memory usage
- **CPU:** Monitor server load

---

## 🚀 **STEP 5: DEPLOYMENT SCRIPTS**

### 5.1 **Quick Setup Script**
Create `/home/republic/backend.republicaattorneys.co.tz/quick-setup.sh`:

```bash
#!/bin/bash

echo "🚀 Republica Attorneys CMS - Quick Setup"
echo "========================================"

# Check Node.js version
echo "📦 Checking Node.js version..."
node --version

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads
chmod 755 uploads

# Initialize database
echo "🗄️ Initializing database..."
npm run init-db

# Seed database
echo "🌱 Seeding database..."
npm run seed-db

# Set permissions
echo "🔐 Setting permissions..."
chmod 644 .env
chmod 755 src/app.js

echo "✅ Setup completed successfully!"
echo "🎯 Start the application: npm start"
```

### 5.2 **Deployment Script**
Create `/home/republic/deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Republica Attorneys CMS - Deployment"
echo "======================================="

# Stop current application
echo "⏹️ Stopping current application..."
cd /home/republic/backend.republicaattorneys.co.tz
npm stop 2>/dev/null || true

# Pull latest changes (if using git)
echo "📥 Pulling latest changes..."
git pull origin main 2>/dev/null || echo "No git repository found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Restart application
echo "🔄 Restarting application..."
npm start

echo "✅ Deployment completed!"
echo "🌐 Frontend: https://republicaattorneys.co.tz"
echo "🔧 Backend: https://backend.republicaattorneys.co.tz/api"
echo "👤 Admin: https://republicaattorneys.co.tz/admin/login"
```

---

## 🔍 **STEP 6: VERIFICATION CHECKLIST**

### ✅ **Backend Verification**
- [ ] Node.js app is running on port 3001
- [ ] Database connection successful
- [ ] API endpoints responding
- [ ] SSL certificate installed
- [ ] CORS configured correctly
- [ ] File uploads working
- [ ] Admin login functional

### ✅ **Frontend Verification**
- [ ] React app loads correctly
- [ ] All pages accessible
- [ ] API calls working
- [ ] SSL certificate installed
- [ ] Images loading properly
- [ ] Admin panel accessible

### ✅ **Security Verification**
- [ ] HTTPS redirects working
- [ ] Security headers present
- [ ] Database user has limited privileges
- [ ] Environment variables secured
- [ ] Rate limiting active

---

## 🆘 **TROUBLESHOOTING**

### Common Issues:

1. **Node.js App Not Starting**
   ```bash
   # Check logs
   tail -f /home/republic/.nodejs/republica-backend/logs/app.log
   
   # Check permissions
   ls -la /home/republic/backend.republicaattorneys.co.tz/
   ```

2. **Database Connection Issues**
   ```bash
   # Test database connection
   mysql -u republic_cms -p republic_cms_db
   
   # Check database status
   systemctl status mysql
   ```

3. **CORS Issues**
   - Verify CORS_ORIGINS in .env
   - Check browser console for errors
   - Ensure frontend URL is included in CORS origins

4. **File Upload Issues**
   ```bash
   # Check uploads directory permissions
   ls -la /home/republic/backend.republicaattorneys.co.tz/uploads/
   
   # Set correct permissions
   chmod 755 uploads/
   ```

---

## 📞 **SUPPORT CONTACTS**

- **Technical Issues:** Check logs in DirectAdmin
- **Domain Issues:** Contact hosting provider
- **SSL Issues:** DirectAdmin SSL Manager

---

**🎯 DEPLOYMENT COMPLETE!**

Your Republica Attorneys CMS is now live at:
- **Website:** https://republicaattorneys.co.tz
- **Admin Panel:** https://republicaattorneys.co.tz/admin/login
- **API:** https://backend.republicaattorneys.co.tz/api 