import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';

interface ErrorMessageProps {
  error: string | null;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'inline' | 'full' | 'toast';
  className?: string;
}

export default function ErrorMessage({ 
  error, 
  onRetry, 
  onDismiss, 
  variant = 'inline',
  className = ''
}: ErrorMessageProps) {
  if (!error) return null;

  const baseClasses = "flex items-center space-x-3 p-4 rounded-lg border";
  
  const variantClasses = {
    inline: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400",
    full: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 min-h-[200px] justify-center",
    toast: "bg-red-500 text-white border-red-600 shadow-lg"
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={classes}
    >
      <AlertTriangle className="flex-shrink-0" size={20} />
      
      <div className="flex-1">
        <p className="text-sm font-medium">{error}</p>
      </div>

      <div className="flex items-center space-x-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-800 rounded transition-colors"
            title="Retry"
          >
            <RefreshCw size={16} />
          </button>
        )}
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-800 rounded transition-colors"
            title="Dismiss"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
} 