'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface ErrorHandlerProps {
  children: ReactNode;
}

/**
 * Error handler component that helps recover from asset loading errors
 */
const ErrorHandler = ({ children }: ErrorHandlerProps) => {
  const pathname = usePathname();
  
  useEffect(() => {
    // Function to recover from error states
    const recoverFromError = () => {
      const lastRoute = sessionStorage.getItem('lastSuccessfulRoute') || '/';
      
      if (pathname === '/') {
        window.location.reload();
      } else {
        // Save the attempted route for debugging
        sessionStorage.setItem('errorRoute', pathname || '');
        window.location.href = '/';
      }
    };
    
    // Handle resource loading errors
    const handleError = (event: Event | ErrorEvent) => {
      // Only handle network errors
      if (
        'message' in event && 
        (event.message.includes('Loading chunk') || 
         event.message.includes('Loading CSS chunk') ||
         event.message.includes('Failed to fetch') ||
         event.message.includes('NetworkError') ||
         ('filename' in event && event.filename?.includes('/_next/')))
      ) {
        console.error('Resource loading error detected, navigating to safe route');
        recoverFromError();
      }
    };
    
    // Store current path as last successful route
    if (pathname) {
      sessionStorage.setItem('lastSuccessfulRoute', pathname);
    }
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason && 
          (event.reason.message?.includes('Loading') || 
           event.reason.message?.includes('Network'))) {
        recoverFromError();
      }
    });
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError as any);
    };
  }, [pathname]);
  
  return <>{children}</>;
};

export default ErrorHandler;