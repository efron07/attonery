// Contact form utilities for shared hosting environment
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export class ContactFormHandler {
  // For shared hosting, we'll use multiple fallback methods
  static async submitForm(data: ContactFormData): Promise<boolean> {
    try {
      // Method 1: Try to send via a simple PHP script (if available)
      const response = await fetch('/contact-form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.log('PHP form handler not available, using fallback methods');
    }

    // Method 2: Create WhatsApp message
    this.sendViaWhatsApp(data);
    
    // Method 3: Create mailto link as backup
    this.sendViaEmail(data);
    
    return true;
  }

  static sendViaWhatsApp(data: ContactFormData) {
    const message = `Hello Republica Attorneys,

My name is *${data.name}*.

I need help with *${data.service}*.

Here is my message:
${data.message}

Contact Details:
Phone: ${data.phone}
Email: ${data.email}

Thank you for your time.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/255768450666?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }

  static sendViaEmail(data: ContactFormData) {
    const subject = `Legal Consultation Request - ${data.service}`;
    const body = `Dear Republica Attorneys,

I hope this email finds you well.

My name is ${data.name}, and I am reaching out to request legal consultation regarding ${data.service}.

Message:
${data.message}

My contact details:
Phone: ${data.phone}
Email: ${data.email}

I look forward to hearing from you soon.

Best regards,
${data.name}`;

    const mailtoUrl = `mailto:info@republicaattorneys.co.tz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  }

  // Validate form data
  static validateForm(data: ContactFormData): string[] {
    const errors: string[] = [];

    if (!data.name.trim()) {
      errors.push('Name is required');
    }

    if (!data.phone.trim()) {
      errors.push('Phone number is required');
    }

    if (!data.service.trim()) {
      errors.push('Please select a service');
    }

    if (!data.message.trim()) {
      errors.push('Message is required');
    }

    if (data.email && !this.isValidEmail(data.email)) {
      errors.push('Please enter a valid email address');
    }

    return errors;
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}