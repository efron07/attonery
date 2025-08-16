require('dotenv').config();
const bcrypt = require('bcryptjs');
const dbManager = require('../src/config/database');
const logger = require('../src/utils/logger');

async function initializeDatabase() {
  try {
    logger.info('🚀 Starting database initialization...');

    // Connect to database
    await dbManager.connect();
    logger.info('✅ Database connected successfully');

    // Check if admin user exists
    const existingAdmin = await dbManager.queryOne(
      'SELECT id FROM users WHERE username = ?',
      [process.env.ADMIN_USERNAME || 'admin@republicaattorneys.co.tz']
    );

    if (existingAdmin) {
      logger.info('✅ Admin user already exists');
    } else {
      // Create admin user
      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
      const passwordHash = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || 'republica2024',
        saltRounds
      );

      await dbManager.query(
        'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
        [
          process.env.ADMIN_USERNAME || 'admin@republicaattorneys.co.tz',
          passwordHash,
          'admin'
        ]
      );

      logger.info('✅ Admin user created successfully');
      logger.info(`📧 Username: ${process.env.ADMIN_USERNAME || 'admin@republicaattorneys.co.tz'}`);
      logger.info(`🔑 Password: ${process.env.ADMIN_PASSWORD || 'republica2024'}`);
    }

    // Insert sample data if needed
    await insertSampleData();

    logger.info('🎉 Database initialization completed successfully!');
    process.exit(0);

  } catch (error) {
    logger.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

async function insertSampleData() {
  try {
    // Check if sample data already exists
    const existingBlogs = await dbManager.queryOne('SELECT COUNT(*) as count FROM blogs');
    const existingServices = await dbManager.queryOne('SELECT COUNT(*) as count FROM services');
    const existingTeam = await dbManager.queryOne('SELECT COUNT(*) as count FROM team_members');

    if (existingBlogs.count > 0 && existingServices.count > 0 && existingTeam.count > 0) {
      logger.info('✅ Sample data already exists');
      return;
    }

    logger.info('📝 Inserting sample data...');

    // Insert sample services
    if (existingServices.count === 0) {
      await dbManager.query(`
        INSERT INTO services (title, description, icon, gradient, order_index, active, overview, features, process_steps, requirements, benefits, slug) VALUES
        ('Corporate Law', 'Comprehensive corporate legal services for businesses of all sizes', '🏢', 'from-blue-500 to-purple-600', 1, 1, 'Expert corporate legal guidance for your business success', 'Business Formation, Contract Review, Compliance, Mergers & Acquisitions', 'Consultation, Documentation, Review, Implementation', 'Business registration documents, Financial statements', 'Legal protection, Risk mitigation, Growth support', 'corporate-law'),
        ('Family Law', 'Compassionate family law services for personal legal matters', '👨‍👩‍👧‍👦', 'from-pink-500 to-red-600', 2, 1, 'Supporting families through legal challenges with care and expertise', 'Divorce, Child Custody, Adoption, Estate Planning', 'Initial consultation, Case preparation, Court representation, Settlement', 'Personal identification, Financial documents, Court records', 'Family stability, Legal clarity, Peace of mind', 'family-law'),
        ('Criminal Defense', 'Strong criminal defense representation for your rights', '⚖️', 'from-gray-500 to-black', 3, 1, 'Protecting your rights with aggressive criminal defense strategies', 'DUI Defense, Drug Charges, Assault, Theft, White Collar Crime', 'Case analysis, Evidence review, Court representation, Appeals', 'Police reports, Witness statements, Evidence documentation', 'Legal protection, Reduced charges, Case dismissal', 'criminal-defense')
      `);
      logger.info('✅ Sample services inserted');
    }

    // Insert sample team members
    if (existingTeam.count === 0) {
      await dbManager.query(`
        INSERT INTO team_members (name, title, bio, specialties, experience, order_index, active, email, linkedin) VALUES
        ('John Doe', 'Senior Partner', 'Experienced corporate lawyer with 15+ years in business law', 'Corporate Law, Mergers & Acquisitions, Contract Law', '15+ years', 1, 1, 'john.doe@republicaattorneys.co.tz', 'linkedin.com/in/johndoe'),
        ('Jane Smith', 'Family Law Specialist', 'Compassionate family lawyer dedicated to helping families through difficult times', 'Family Law, Divorce, Child Custody, Adoption', '12+ years', 2, 1, 'jane.smith@republicaattorneys.co.tz', 'linkedin.com/in/janesmith'),
        ('Mike Johnson', 'Criminal Defense Attorney', 'Aggressive criminal defense lawyer protecting client rights', 'Criminal Defense, DUI, Drug Charges, Assault', '10+ years', 3, 1, 'mike.johnson@republicaattorneys.co.tz', 'linkedin.com/in/mikejohnson')
      `);
      logger.info('✅ Sample team members inserted');
    }

    // Insert sample blogs
    if (existingBlogs.count === 0) {
      await dbManager.query(`
        INSERT INTO blogs (title, content, excerpt, date, author, read_time, category, published, featured, slug) VALUES
        ('Understanding Corporate Law in Tanzania', 'Corporate law in Tanzania is governed by various statutes and regulations...', 'A comprehensive guide to corporate legal requirements in Tanzania', '2024-12-01', 'John Doe', '5 min read', 'Corporate Law', 1, 1, 'understanding-corporate-law-tanzania'),
        ('Family Law: Protecting Your Rights', 'Family law matters can be emotionally challenging and legally complex...', 'Essential information about family law and your legal rights', '2024-11-28', 'Jane Smith', '4 min read', 'Family Law', 1, 1, 'family-law-protecting-rights'),
        ('Criminal Defense: Know Your Rights', 'When facing criminal charges, understanding your rights is crucial...', 'Important information about criminal defense and legal rights', '2024-11-25', 'Mike Johnson', '6 min read', 'Criminal Defense', 1, 0, 'criminal-defense-know-rights')
      `);
      logger.info('✅ Sample blogs inserted');
    }

    // Insert sample content
    const existingAbout = await dbManager.queryOne('SELECT COUNT(*) as count FROM about_content');
    if (existingAbout.count === 0) {
      await dbManager.query(`
        INSERT INTO about_content (intro, who_we_are, vision, mission, company_values, impact_stats) VALUES
        ('Republica Attorneys is a leading law firm in Tanzania, providing comprehensive legal services to individuals and businesses.', 'We are a team of experienced legal professionals dedicated to providing exceptional legal services with integrity and professionalism.', 'To be the most trusted and respected law firm in Tanzania, known for excellence, integrity, and client success.', 'To provide innovative legal solutions that protect our clients interests and help them achieve their goals.', 'Integrity, Excellence, Client Focus, Innovation, Professionalism', '500+ Cases Won, 1000+ Happy Clients, 15+ Years Experience, 24/7 Support')
      `);
      logger.info('✅ Sample about content inserted');
    }

    const existingContact = await dbManager.queryOne('SELECT COUNT(*) as count FROM contact_settings');
    if (existingContact.count === 0) {
      await dbManager.query(`
        INSERT INTO contact_settings (email, phone, whatsapp, address, office_hours) VALUES
        ('info@republicaattorneys.co.tz', '+255 123 456 789', '+255 123 456 789', '123 Legal Street, Dar es Salaam, Tanzania', 'Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 1:00 PM')
      `);
      logger.info('✅ Sample contact settings inserted');
    }

    logger.info('✅ Sample data insertion completed');

  } catch (error) {
    logger.error('❌ Sample data insertion failed:', error);
    throw error;
  }
}

// Run initialization
initializeDatabase();