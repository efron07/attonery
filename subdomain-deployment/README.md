# 🚀 Republica Attorneys CMS - Backend Deployment Package

## 📦 **What's Included**

This package contains the complete backend application for Republica Attorneys CMS, optimized for production deployment on DirectAdmin.

### **Core Application**
- ✅ **Node.js/Express API** - Complete REST API with authentication
- ✅ **MySQL Database** - Optimized database configuration
- ✅ **Security Middleware** - Rate limiting, CORS, authentication
- ✅ **File Upload System** - Image upload handling
- ✅ **Caching System** - Redis and Node-cache support
- ✅ **Logging System** - Winston logging with file rotation
- ✅ **Error Handling** - Comprehensive error management

### **Deployment Scripts**
- ✅ **quick-setup.sh** - Initial setup and configuration
- ✅ **deploy.sh** - Full deployment automation
- ✅ **backend.htaccess** - Apache proxy configuration

### **Configuration**
- ✅ **env-template.txt** - Environment variables template
- ✅ **Database Scripts** - Initialization and seeding
- ✅ **Security Headers** - Production-ready security

---

## 🎯 **Quick Deployment**

### **1. Upload to Server**
```bash
# Upload this entire folder to:
/home/republic/backend.republicaattorneys.co.tz/
```

### **2. Configure Environment**
```bash
# Copy environment template
cp env-template.txt .env

# Edit .env with your actual values
nano .env
```

### **3. Run Quick Setup**
```bash
# Make script executable
chmod +x quick-setup.sh

# Run setup
./quick-setup.sh
```

### **4. Start Application**
```bash
# Start with npm
npm start

# Or with PM2 (recommended)
pm2 start src/app.js --name republica-backend
```

---

## 🔧 **Configuration**

### **Environment Variables**
Edit `.env` file with your production values:

```env
# Database
DB_HOST=localhost
DB_USER=republic_cms
DB_PASSWORD=YOUR_SECURE_PASSWORD
DB_NAME=republic_cms_db

# JWT
JWT_SECRET=YOUR_SUPER_SECURE_JWT_SECRET_KEY_HERE

# CORS
CORS_ORIGINS=https://republicaattorneys.co.tz,https://www.republicaattorneys.co.tz

# Admin
ADMIN_USERNAME=admin@republicaattorneys.co.tz
ADMIN_PASSWORD=republica2024
```

### **DirectAdmin Node.js Configuration**
- **App Name:** `republica-backend`
- **Node.js Version:** `18.x`
- **App Root:** `/home/republic/backend.republicaattorneys.co.tz`
- **App URL:** `backend.republicaattorneys.co.tz`
- **App Startup File:** `src/app.js`
- **App Port:** `3001`

---

## 📊 **API Endpoints**

### **Public Endpoints**
- `GET /api/health` - Health check
- `GET /api/blogs` - Get all blogs
- `GET /api/services` - Get all services
- `GET /api/team` - Get team members
- `POST /api/inquiries` - Submit contact inquiry

### **Admin Endpoints** (Authentication Required)
- `POST /api/auth/login` - Admin login
- `GET /api/blogs/admin/all` - Get all blogs (admin)
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/upload/image` - Upload image

---

## 🔒 **Security Features**

### **Authentication & Authorization**
- JWT-based authentication
- Role-based access control
- Secure password hashing (bcrypt)
- Token refresh mechanism

### **Rate Limiting & Protection**
- Request rate limiting
- Slow-down protection
- CORS configuration
- Security headers (Helmet.js)

### **Input Validation**
- Request validation (Joi)
- SQL injection protection
- XSS protection
- File upload validation

---

## 📁 **Directory Structure**

```
subdomain-deployment/
├── src/
│   ├── app.js                 # Main application file
│   ├── routes/                # API routes
│   ├── controllers/           # Business logic
│   ├── middleware/            # Custom middleware
│   ├── config/                # Configuration files
│   └── utils/                 # Utility functions
├── scripts/
│   ├── init-database.js       # Database initialization
│   └── seed-database.js       # Sample data seeding
├── uploads/                   # File upload directory
├── logs/                      # Application logs
├── quick-setup.sh            # Setup script
├── deploy.sh                 # Deployment script
├── backend.htaccess          # Apache configuration
├── env-template.txt          # Environment template
└── package.json              # Dependencies
```

---

## 🚀 **Production Features**

### **Performance Optimizations**
- Database connection pooling
- Response compression
- Static file caching
- Query optimization
- Memory management

### **Monitoring & Logging**
- Winston logging system
- Request timing
- Error tracking
- Performance metrics
- Health check endpoints

### **Scalability**
- Cluster mode support
- Load balancing ready
- Horizontal scaling support
- Database optimization

---

## 🆘 **Troubleshooting**

### **Common Issues**

#### **Application Won't Start**
```bash
# Check logs
tail -f logs/app.log

# Check Node.js process
ps aux | grep node

# Check port availability
netstat -tlnp | grep 3001
```

#### **Database Connection Issues**
```bash
# Test database connection
mysql -u republic_cms -p republic_cms_db

# Check MySQL status
systemctl status mysql
```

#### **File Upload Issues**
```bash
# Check uploads directory permissions
ls -la uploads/

# Set correct permissions
chmod 755 uploads/
```

### **Health Check**
```bash
# Test API health
curl https://backend.republicaattorneys.co.tz/api/health

# Expected response:
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "version": "2.0.0"
}
```

---

## 📞 **Support**

### **Log Locations**
- **Application Logs:** `logs/app.log`
- **Node.js Logs:** `/home/republic/.nodejs/republica-backend/logs/`
- **Apache Logs:** DirectAdmin log viewer

### **Monitoring Commands**
```bash
# PM2 Status
pm2 status
pm2 logs republica-backend

# Application Logs
tail -f logs/app.log

# Database Performance
mysql -u republic_cms -p -e "SHOW PROCESSLIST;"
```

---

## ✅ **Deployment Checklist**

- [ ] Environment variables configured
- [ ] Database created and initialized
- [ ] Node.js app configured in DirectAdmin
- [ ] SSL certificate installed
- [ ] Apache proxy configured
- [ ] File permissions set correctly
- [ ] Application starts successfully
- [ ] Health check endpoint responding
- [ ] Admin login working
- [ ] File uploads functional

---

**🎯 Ready for Production Deployment!**

Your Republica Attorneys CMS backend is now ready for deployment on DirectAdmin with enterprise-level security, performance, and monitoring capabilities.
