/**
 * Lazy loading module using Intersection Observer
 * Loads images only when they're about to enter the viewport
 */
(function() {
  'use strict';

  function initLazyLoading() {
    // Create Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load the image
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          // Add loaded class for styling
          img.classList.add('lazy-loaded');
          
          // Stop observing this image
          observer.unobserve(img);
        }
      });
    }, {
      // Start loading when image is 50px away from viewport
      rootMargin: '50px'
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
  } else {
    initLazyLoading();
  }
})();
