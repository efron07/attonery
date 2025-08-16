# ✅ DIRECTADMIN DEPLOYMENT CHECKLIST
## Republica Attorneys CMS - Production Deployment

### 📋 **PRE-DEPLOYMENT CHECKLIST**

#### 🔧 **Server Requirements**
- [ ] DirectAdmin access with Node.js support
- [ ] MySQL/MariaDB database access
- [ ] SSH access (recommended)
- [ ] Domain: `republicaattorneys.co.tz` configured
- [ ] Subdomain: `backend.republicaattorneys.co.tz` configured
- [ ] SSL certificates available
- [ ] Node.js 18.x or later installed
- [ ] PM2 installed (recommended)

#### 📦 **Local Preparation**
- [ ] Frontend built: `npm run build:production`
- [ ] Backend code ready in `subdomain-deployment/`
- [ ] Environment variables prepared
- [ ] Database credentials ready
- [ ] SSL certificates obtained

---

### 🚀 **DEPLOYMENT STEPS**

#### **STEP 1: BACKEND DEPLOYMENT**

##### 1.1 **Upload Backend Files**
- [ ] Upload `subdomain-deployment/` to `/home/republic/backend.republicaattorneys.co.tz/`
- [ ] Verify all files uploaded correctly
- [ ] Check file permissions

##### 1.2 **Configure DirectAdmin Node.js**
- [ ] Login to DirectAdmin
- [ ] Navigate to Advanced Features → Node.js
- [ ] Create new app:
  - [ ] App Name: `republica-backend`
  - [ ] Node.js Version: `18.x`
  - [ ] App Root: `/home/republic/backend.republicaattorneys.co.tz`
  - [ ] App URL: `backend.republicaattorneys.co.tz`
  - [ ] App Startup File: `src/app.js`
  - [ ] App Port: `3001`

##### 1.3 **Environment Configuration**
- [ ] Create `.env` file in backend directory
- [ ] Configure database settings:
  - [ ] DB_HOST: `localhost`
  - [ ] DB_USER: `republic_cms`
  - [ ] DB_PASSWORD: `YOUR_SECURE_PASSWORD`
  - [ ] DB_NAME: `republic_cms_db`
- [ ] Configure JWT settings:
  - [ ] JWT_SECRET: `YOUR_SUPER_SECURE_JWT_SECRET_KEY_HERE`
  - [ ] JWT_EXPIRES_IN: `24h`
- [ ] Configure CORS origins:
  - [ ] CORS_ORIGINS: `https://republicaattorneys.co.tz,https://www.republicaattorneys.co.tz`
- [ ] Set admin credentials:
  - [ ] ADMIN_USERNAME: `admin@republicaattorneys.co.tz`
  - [ ] ADMIN_PASSWORD: `republica2024`

##### 1.4 **Database Setup**
- [ ] Create database via DirectAdmin:
  - [ ] Database Name: `republic_cms_db`
  - [ ] Database User: `republic_cms`
  - [ ] Password: `YOUR_SECURE_PASSWORD`
- [ ] Run database initialization:
  - [ ] `npm run init-db`
  - [ ] `npm run seed-db`

##### 1.5 **Install Dependencies & Start**
- [ ] Install dependencies: `npm install --production`
- [ ] Create necessary directories:
  - [ ] `mkdir -p uploads`
  - [ ] `mkdir -p logs`
- [ ] Set permissions:
  - [ ] `chmod 755 uploads/`
  - [ ] `chmod 755 logs/`
  - [ ] `chmod 644 .env`
- [ ] Start application: `npm start`

##### 1.6 **Configure Apache Proxy**
- [ ] Upload `backend.htaccess` to backend directory
- [ ] Configure subdomain to proxy to Node.js
- [ ] Test proxy configuration

#### **STEP 2: FRONTEND DEPLOYMENT**

##### 2.1 **Build Production Frontend**
- [ ] Run: `npm run build:production`
- [ ] Verify `dist/` folder contains all files
- [ ] Check build output for errors

##### 2.2 **Upload Frontend Files**
- [ ] Upload `dist/` contents to `/home/republic/public_html/`
- [ ] Verify all files uploaded correctly
- [ ] Check file permissions

##### 2.3 **Configure Frontend Domain**
- [ ] Point domain to `/home/republic/public_html/`
- [ ] Upload `.htaccess` to frontend directory
- [ ] Enable SSL certificate

##### 2.4 **Test Frontend Configuration**
- [ ] Test React Router navigation
- [ ] Verify API proxy working
- [ ] Check security headers

#### **STEP 3: SECURITY CONFIGURATION**

##### 3.1 **SSL Certificates**
- [ ] Frontend SSL: `republicaattorneys.co.tz`
- [ ] Backend SSL: `backend.republicaattorneys.co.tz`
- [ ] Enable HSTS
- [ ] Force HTTPS redirects

##### 3.2 **Database Security**
- [ ] Create dedicated database user
- [ ] Grant minimal required privileges
- [ ] Test database connection
- [ ] Verify user permissions

##### 3.3 **File Permissions**
- [ ] Backend files: `644` for files, `755` for directories
- [ ] Frontend files: `644` for files, `755` for directories
- [ ] Uploads directory: `755`
- [ ] Logs directory: `755`
- [ ] `.env` file: `644`

#### **STEP 4: TESTING & VERIFICATION**

##### 4.1 **Backend Testing**
- [ ] Health check: `https://backend.republicaattorneys.co.tz/api/health`
- [ ] API endpoints responding
- [ ] Database connection working
- [ ] File uploads functional
- [ ] Admin login working

##### 4.2 **Frontend Testing**
- [ ] Website loads: `https://republicaattorneys.co.tz`
- [ ] All pages accessible
- [ ] API calls working
- [ ] Images loading
- [ ] Admin panel accessible

##### 4.3 **Security Testing**
- [ ] HTTPS redirects working
- [ ] Security headers present
- [ ] CORS configured correctly
- [ ] Rate limiting active
- [ ] No sensitive files accessible

#### **STEP 5: MONITORING SETUP**

##### 5.1 **Log Monitoring**
- [ ] Backend logs: `/home/republic/backend.republicaattorneys.co.tz/logs/`
- [ ] Node.js logs: `/home/republic/.nodejs/republica-backend/logs/`
- [ ] Apache logs: DirectAdmin log viewer
- [ ] Error monitoring setup

##### 5.2 **Performance Monitoring**
- [ ] Database performance monitoring
- [ ] Node.js memory usage monitoring
- [ ] Server load monitoring
- [ ] Response time monitoring

##### 5.3 **Backup Setup**
- [ ] Database backup schedule
- [ ] File backup schedule
- [ ] Backup verification
- [ ] Recovery testing

---

### 🔍 **POST-DEPLOYMENT VERIFICATION**

#### **Functional Testing**
- [ ] **Homepage:** Loads correctly with all content
- [ ] **About Page:** Content displays properly
- [ ] **Services Page:** All services listed
- [ ] **Team Page:** Team members displayed
- [ ] **Blog Page:** Blog posts loading
- [ ] **Contact Page:** Contact form functional
- [ ] **Admin Login:** Authentication working
- [ ] **Admin Dashboard:** All features functional
- [ ] **File Uploads:** Image uploads working
- [ ] **API Endpoints:** All endpoints responding

#### **Performance Testing**
- [ ] **Page Load Times:** Under 3 seconds
- [ ] **Image Loading:** All images load quickly
- [ ] **API Response Times:** Under 1 second
- [ ] **Database Queries:** Optimized and fast
- [ ] **Mobile Responsiveness:** Works on all devices

#### **Security Testing**
- [ ] **HTTPS:** All pages use HTTPS
- [ ] **Security Headers:** All headers present
- [ ] **CORS:** Properly configured
- [ ] **Rate Limiting:** Active and working
- [ ] **SQL Injection:** Protected against
- [ ] **XSS Protection:** Active
- [ ] **File Upload Security:** Validated

#### **Browser Testing**
- [ ] **Chrome:** All features working
- [ ] **Firefox:** All features working
- [ ] **Safari:** All features working
- [ ] **Edge:** All features working
- [ ] **Mobile Browsers:** Responsive design working

---

### 🆘 **TROUBLESHOOTING CHECKLIST**

#### **Common Issues & Solutions**

##### **Backend Issues**
- [ ] **Node.js not starting:** Check logs, verify port availability
- [ ] **Database connection failed:** Verify credentials, check MySQL status
- [ ] **CORS errors:** Check CORS_ORIGINS in .env
- [ ] **File uploads failing:** Check uploads directory permissions
- [ ] **API not responding:** Check Node.js process, verify proxy configuration

##### **Frontend Issues**
- [ ] **Page not loading:** Check .htaccess, verify file permissions
- [ ] **API calls failing:** Check proxy configuration, verify backend URL
- [ ] **Images not loading:** Check file paths, verify uploads directory
- [ ] **Routing not working:** Check React Router configuration
- [ ] **SSL errors:** Verify certificate installation

##### **Performance Issues**
- [ ] **Slow page loads:** Check caching, optimize images
- [ ] **High memory usage:** Monitor Node.js memory, optimize queries
- [ ] **Database slow:** Check indexes, optimize queries
- [ ] **Large bundle size:** Check build optimization

---

### 📞 **SUPPORT CONTACTS**

- **DirectAdmin Support:** Your hosting provider
- **Domain Issues:** Domain registrar
- **SSL Issues:** DirectAdmin SSL Manager
- **Database Issues:** DirectAdmin MySQL Manager
- **Node.js Issues:** DirectAdmin Node.js Manager

---

### ✅ **DEPLOYMENT COMPLETE**

**🎯 Your Republica Attorneys CMS is now live!**

**Access URLs:**
- **Website:** https://republicaattorneys.co.tz
- **Admin Panel:** https://republicaattorneys.co.tz/admin/login
- **API:** https://backend.republicaattorneys.co.tz/api
- **Health Check:** https://backend.republicaattorneys.co.tz/api/health

**Default Admin Credentials:**
- **Username:** admin@republicaattorneys.co.tz
- **Password:** republica2024

**Remember to change the default password after first login!** 