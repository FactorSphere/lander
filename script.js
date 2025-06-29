// Main application logic
document.addEventListener('DOMContentLoaded', function() {
  console.log('FactorSphere landing page loaded');
  
  // Splash screen staged animation
  const splash = document.getElementById('splash-screen');
  const splashMain = document.getElementById('splash-mainline');
  const splashWelcome = document.getElementById('splash-welcome');
  if (splash && splashMain && splashWelcome) {
    // Fade in main line
    setTimeout(() => {
      splashMain.style.opacity = '1';
    }, 100);
    // Fade in welcome after a moment
    setTimeout(() => {
      splashWelcome.style.opacity = '1';
    }, 1200);
    // Fade out all after a bit more
    setTimeout(() => {
      splash.style.opacity = '0';
      setTimeout(() => splash.style.display = 'none', 500);
    }, 2600);
  }

  // Initialize all functionality
  initializeTheme();
  initializeAnimations();
  initializeHeroCanvas();
  setupEventListeners();
});

// Theme management
function initializeTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Set initial theme
  updateThemeIcon();
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = document.documentElement.classList.contains('dark');
      
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('factorsphere-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('factorsphere-theme', 'dark');
      }
      
      updateThemeIcon();
    });
  }
  
  function updateThemeIcon() {
    if (themeIcon) {
      const isDark = document.documentElement.classList.contains('dark');
      const sunIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>';
      const moonIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      themeIcon.innerHTML = isDark ? sunIcon : moonIcon;
    }
  }
}

// Animation system using Intersection Observer
function initializeAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('visible');
            }, index * 150);
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// Hero canvas particle animation
function initializeHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particle system
  const particles = [];

  const createParticle = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.1,
  });

  // Initialize particles
  for (let i = 0; i < 100; i++) {
    particles.push(createParticle());
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around screen
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(138, 173, 244, ${particle.opacity})`;
      ctx.fill();

      // Draw connections
      particles.slice(index + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = `rgba(138, 173, 244, ${
            (120 - distance) / 120 * 0.2
          })`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  };
  animate();
}

// Event listeners setup
function setupEventListeners() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add hover effects for cards
  addHoverEffects();
}

// Card hover effects
function addHoverEffects() {
  const cards = document.querySelectorAll('.problem-card, .solution-card, .feature-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
  });

  // CTA button hover effects
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.05)';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  }

  const ctaOutlineButton = document.querySelector('.cta-outline-button');
  if (ctaOutlineButton) {
    ctaOutlineButton.addEventListener('mouseenter', function() {
      this.style.borderColor = 'var(--primary)';
      this.style.background = 'rgba(30, 102, 245, 0.1)';
    });
    
    ctaOutlineButton.addEventListener('mouseleave', function() {
      this.style.borderColor = 'rgba(30, 102, 245, 0.3)';
      this.style.background = 'transparent';
    });
  }

  // Footer link hover effects
  const footerLinks = document.querySelectorAll('.footer-link');
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.color = 'var(--primary)';
      if (this.href.includes('github.com/REXFEDEC')) {
        this.style.textDecoration = 'underline';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.color = 'var(--latte-subtext0)';
      if (this.href.includes('github.com/REXFEDEC')) {
        this.style.textDecoration = 'none';
      }
    });
  });
}

// Screenshot image update based on theme
function updateScreenshotImages() {
  const isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.screenshot-img').forEach(img => {
    // Get the base filename (e.g., 01.png)
    const src = img.getAttribute('data-base');
    if (!src) return;
    if (isDark) {
      img.src = src.replace('_l.png', '.png');
    } else {
      img.src = src.replace('.png', '_l.png');
    }
  });
}

// Call once on load
document.addEventListener('DOMContentLoaded', updateScreenshotImages);

// Call whenever theme changes (add this to your theme toggle logic)
if (window.initializeTheme) {
  const originalInitTheme = window.initializeTheme;
  window.initializeTheme = function() {
    originalInitTheme();
    updateScreenshotImages();
  };
}

// If you have a theme toggle button, also call updateScreenshotImages() after toggling

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
