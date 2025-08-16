import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  read_time: string;
  views: number;
  category: string;
  published: boolean;
  meta_description?: string;
  keywords?: string;
}

interface UseBlogsReturn {
  blogs: BlogPost[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createBlog: (data: Partial<BlogPost>) => Promise<void>;
  updateBlog: (id: number, data: Partial<BlogPost>) => Promise<void>;
  deleteBlog: (id: number) => Promise<void>;
}

export const useBlogs = (isAdmin: boolean = false): UseBlogsReturn => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = isAdmin ? await api.getAdminBlogs() : await api.getBlogs();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  const createBlog = async (data: Partial<BlogPost>) => {
    try {
      setError(null);
      await api.createBlog(data);
      await fetchBlogs(); // Refresh the list
    } catch (err: any) {
      setError(err.message || 'Failed to create blog');
      throw err;
    }
  };

  const updateBlog = async (id: number, data: Partial<BlogPost>) => {
    try {
      setError(null);
      await api.updateBlog(id, data);
      await fetchBlogs(); // Refresh the list
    } catch (err: any) {
      setError(err.message || 'Failed to update blog');
      throw err;
    }
  };

  const deleteBlog = async (id: number) => {
    try {
      setError(null);
      await api.deleteBlog(id);
      await fetchBlogs(); // Refresh the list
    } catch (err: any) {
      setError(err.message || 'Failed to delete blog');
      throw err;
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs,
    loading,
    error,
    refetch: fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog
  };
}; 