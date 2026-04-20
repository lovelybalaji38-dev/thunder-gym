document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      offset: 100
    });
  }

  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active Link Highlighting
  const currentLocation = location.href;
  const navLinks = document.querySelectorAll('.nav-link');
  const navLength = navLinks.length;
  
  // Set Home as active by default if at root, else find exact match
  let matched = false;
  for (let i = 0; i < navLength; i++) {
    if (navLinks[i].href === currentLocation) {
      navLinks[i].classList.add('active');
      matched = true;
    } else {
      navLinks[i].classList.remove('active');
    }
  }
  
  if (!matched && (currentLocation.endsWith('/') || currentLocation.endsWith('index.html'))) {
    document.querySelector('.nav-link[href="index.html"]')?.classList.add('active');
  }

  // Counter Animation
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // The lower the slower

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };

      // Only run once when in view
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCount();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(counter);
    });
  };

  if (counters.length > 0) {
    animateCounters();
  }

  // Back to top button
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
