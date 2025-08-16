// API utility functions for backend integration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://backend.republicaattorneys.co.tz/api' 
  : 'http://localhost:8000/api';

interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: string;
}

interface ApiError extends Error {
  code?: string;
  status?: number;
}

class ApiClient {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = new Error(data.error || `HTTP error! status: ${response.status}`);
        error.code = data.code;
        error.status = response.status;
        throw error;
      }

      // Standardize response format
      if (data.success !== undefined) {
        return data;
      } else {
        return {
          success: true,
          data: data
        };
      }
    } catch (error) {
      console.error('API request failed:', error);
      
      // Handle network errors
      if (error instanceof TypeError) {
        throw new Error('Network error. Please check your connection.');
      }
      
      throw error;
    }
  }

  // Enhanced error handling wrapper
  private async safeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await this.request<T>(endpoint, options);
      return response.data as T;
    } catch (error) {
      console.error(`API request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Authentication
  async login(username: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Blogs
  async getBlogs(params?: { page?: number; search?: string; category?: string; published?: boolean }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.published !== undefined) searchParams.append('published', params.published.toString());
    
    const query = searchParams.toString();
    return this.request(`/blogs${query ? `?${query}` : ''}`);
  }

  async getBlog(id: string) {
    return this.request(`/blogs/${id}`);
  }

  async createBlog(blogData: any) {
    return this.request('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  }

  async updateBlog(id: string, blogData: any) {
    return this.request(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  }

  async deleteBlog(id: string) {
    return this.request(`/blogs/${id}`, {
      method: 'DELETE',
    });
  }

  async getFeaturedBlogs() {
    return this.request('/blogs/featured');
  }

  async getBlogsByCategory(category: string) {
    return this.request(`/blogs/category/${category}`);
  }

  // Services
  async getServices(params?: { page?: number; search?: string; active?: boolean }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.active !== undefined) searchParams.append('active', params.active.toString());
    
    const query = searchParams.toString();
    return this.request(`/services${query ? `?${query}` : ''}`);
  }

  async getService(id: string) {
    return this.request(`/services/${id}`);
  }

  async createService(serviceData: any) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  }

  async updateService(id: string, serviceData: any) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });
  }

  async deleteService(id: string) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  async getActiveServices() {
    return this.request('/services/active');
  }

  // Team Members
  async getTeamMembers(params?: { page?: number; search?: string; active?: boolean }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.active !== undefined) searchParams.append('active', params.active.toString());
    
    const query = searchParams.toString();
    return this.request(`/team${query ? `?${query}` : ''}`);
  }

  async getTeamMember(id: string) {
    return this.request(`/team/${id}`);
  }

  async createTeamMember(teamData: any) {
    return this.request('/team', {
      method: 'POST',
      body: JSON.stringify(teamData),
    });
  }

  async updateTeamMember(id: string, teamData: any) {
    return this.request(`/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(teamData),
    });
  }

  async deleteTeamMember(id: string) {
    return this.request(`/team/${id}`, {
      method: 'DELETE',
    });
  }

  async getActiveTeamMembers() {
    return this.request('/team/active');
  }

  // Content Management
  async getAboutContent() {
    return this.request('/content/about');
  }

  async updateAboutContent(contentData: any) {
    return this.request('/content/about', {
      method: 'PUT',
      body: JSON.stringify(contentData),
    });
  }

  async getContactSettings() {
    return this.request('/content/contact');
  }

  async updateContactSettings(settingsData: any) {
    return this.request('/content/contact', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
  }

  // File Upload
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('adminToken');
    const headers: HeadersInit = {
      ...(token && { Authorization: `Bearer ${token}` }),
      // Don't set Content-Type for FormData - let browser set it automatically
    };

    try {
      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        const error: any = new Error(data.error || 'Upload failed');
        error.status = response.status;
        error.response = data;
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  async deleteImage(filename: string) {
    return this.request(`/upload/image/${filename}`, {
      method: 'DELETE',
    });
  }

  // Public API endpoints (no authentication required)
  async getPublicBlogs(params?: { page?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    
    const query = searchParams.toString();
    return this.safeRequest(`/public/blogs${query ? `?${query}` : ''}`);
  }

  async getPublicBlog(slug: string) {
    return this.safeRequest(`/public/blogs/${slug}`);
  }

  async getPublicFeaturedBlogs() {
    return this.safeRequest('/public/blogs/featured');
  }

  async getPublicBlogsByCategory(category: string) {
    return this.safeRequest(`/public/blogs/category/${category}`);
  }

  async getPublicServices() {
    return this.safeRequest('/public/services');
  }

  async getPublicService(slug: string) {
    return this.safeRequest(`/public/services/${slug}`);
  }

  async getPublicTeam() {
    return this.safeRequest('/public/team');
  }

  async getPublicAbout() {
    return this.safeRequest('/public/about');
  }

  async getPublicContact() {
    return this.safeRequest('/public/contact');
  }

  async submitContactForm(formData: any) {
    return this.request('/public/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async subscribeNewsletter(email: string) {
    return this.request('/public/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async unsubscribeNewsletter(email: string) {
    return this.request('/public/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;