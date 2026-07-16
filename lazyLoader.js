/**
 * Lazy loading module using Intersection Observer
 * Loads images only when they're about to enter the viewport
 */
(function() {
  'use strict';

  function revealImage(img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
    if (img.dataset.srcset) {
      img.srcset = img.dataset.srcset;
    }

    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('lazy-loaded', 'lazy-loaded-no-animation');
      return;
    }

    const handleLoad = () => {
      img.classList.add('lazy-loaded');
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleLoad);
    };

    img.addEventListener('load', handleLoad, { once: true });
    img.addEventListener('error', handleLoad, { once: true });
  }

  function initLazyLoading() {
    // Create Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        const img = entry.target;
        revealImage(img);

        // Stop observing this image
        observer.unobserve(img);
      });
    }, {
      // Start loading when image is 150px away from viewport
      rootMargin: '250px'
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
