import React, { useState, useEffect } from 'react';
import apiClient from '../utils/api';

export default function Test() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing API connection...');
        const response = await apiClient.getPublicServices();
        console.log('API Response:', response);
        setServices(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
        
        {loading && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            Loading...
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}
        
        {!loading && !error && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            API connection successful!
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Services Data:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(services, null, 2)}
          </pre>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">API Endpoints Test:</h2>
          <div className="space-y-4">
            <button
              onClick={async () => {
                try {
                  const response = await apiClient.getPublicServices();
                  console.log('Services:', response);
                  alert('Services API working!');
                } catch (err) {
                  console.error('Services API Error:', err);
                  alert('Services API failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Test Services API
            </button>
            
            <button
              onClick={async () => {
                try {
                  const response = await apiClient.getPublicAbout();
                  console.log('About:', response);
                  alert('About API working!');
                } catch (err) {
                  console.error('About API Error:', err);
                  alert('About API failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
                }
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4"
            >
              Test About API
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 