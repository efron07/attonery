// Simple analytics utility for shared hosting
// You can replace this with Google Analytics, Plausible, or other analytics services

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

class Analytics {
  private isEnabled: boolean = true;

  constructor() {
    // Check if analytics should be enabled (respect user privacy)
    this.isEnabled = !navigator.doNotTrack || navigator.doNotTrack !== '1';
  }

  // Track page views
  trackPageView(path: string, title?: string) {
    if (!this.isEnabled) return;

    try {
      // Google Analytics 4 (if you add it)
      if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: path,
          page_title: title
        });
      }

      // Simple logging for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Page View:', { path, title });
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  // Track custom events
  trackEvent({ action, category, label, value }: AnalyticsEvent) {
    if (!this.isEnabled) return;

    try {
      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value
        });
      }

      // Simple logging for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Event:', { action, category, label, value });
      }
    } catch (error) {
      console.error('Analytics event tracking error:', error);
    }
  }

  // Track contact form submissions
  trackContactForm(service: string) {
    this.trackEvent({
      action: 'contact_form_submit',
      category: 'engagement',
      label: service
    });
  }

  // Track service page visits
  trackServiceView(serviceName: string) {
    this.trackEvent({
      action: 'service_view',
      category: 'services',
      label: serviceName
    });
  }

  // Track blog article reads
  trackBlogRead(articleTitle: string) {
    this.trackEvent({
      action: 'blog_read',
      category: 'content',
      label: articleTitle
    });
  }

  // Track WhatsApp clicks
  trackWhatsAppClick() {
    this.trackEvent({
      action: 'whatsapp_click',
      category: 'contact',
      label: 'whatsapp_button'
    });
  }
}

export const analytics = new Analytics();
export default analytics;