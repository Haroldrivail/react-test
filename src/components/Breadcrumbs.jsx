import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const params = useParams();
  
  // Don't show breadcrumbs on the homepage
  if (location.pathname === '/') {
    return null;
  }

  // Custom mapping for routes that need special handling
  const getCustomBreadcrumbs = () => {
    // For category pages
    if (location.pathname.includes('/category/')) {
      const category = decodeURIComponent(location.pathname.split('/category/')[1]);
      return [
        { path: '/', text: 'Home', isLast: false },
        { path: '/categories', text: 'Categories', isLast: false },
        { path: location.pathname, text: category, isLast: true }
      ];
    }
    
    // For ingredient pages
    if (location.pathname.includes('/ingredient/')) {
      const ingredient = decodeURIComponent(location.pathname.split('/ingredient/')[1]);
      return [
        { path: '/', text: 'Home', isLast: false },
        { path: '/ingredients', text: 'Ingredients', isLast: false },
        { path: location.pathname, text: ingredient, isLast: true }
      ];
    }
    
    // For area/cuisine pages
    if (location.pathname.includes('/area/')) {
      const area = decodeURIComponent(location.pathname.split('/area/')[1]);
      return [
        { path: '/', text: 'Home', isLast: false },
        { path: '/cuisines', text: 'Cuisines', isLast: false },
        { path: location.pathname, text: area, isLast: true }
      ];
    }
    
    // For meal details pages
    if (location.pathname.includes('/meal/')) {
      return [
        { path: '/', text: 'Home', isLast: false },
        { path: location.pathname, text: 'Meal Details', isLast: true }
      ];
    }
    
    // Default breadcrumb generation
    return generateDefaultBreadcrumbs();
  };
  
  // Generate default breadcrumbs based on path segments
  const generateDefaultBreadcrumbs = () => {
    let currentPath = '';
    const crumbs = location.pathname.split('/')
      .filter(crumb => crumb !== '')
      .map((crumb, index, array) => {
        currentPath += `/${crumb}`;
        
        // Format the crumb text to make it more readable
        let formattedCrumb = decodeURIComponent(crumb);
        
        // Capitalize first letter of each word
        formattedCrumb = formattedCrumb
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Is this the last segment (current page)?
        const isLast = index === array.length - 1;
        
        return {
          path: currentPath,
          text: formattedCrumb,
          isLast
        };
      });
    
    return [{ path: '/', text: 'Home', isLast: crumbs.length === 0 }, ...crumbs];
  };
  
  // Get appropriate breadcrumbs
  const breadcrumbs = getCustomBreadcrumbs();

  return (
    <nav className="container mx-auto px-4 py-2 text-sm" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-1 justify-center">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-500">/</span>
            )}
            
            {crumb.isLast ? (
              <span className="text-indigo-400 font-medium" aria-current="page">
                {crumb.text}
              </span>
            ) : (
              <Link 
                to={crumb.path} 
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                {crumb.text}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
