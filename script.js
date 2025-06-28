// Navigation scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add/remove scrolled class to navbar
  if (navbar) {
    if (scrollTop > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Hide/show scroll indicator
  if (scrollIndicator) {
    if (scrollTop > 100) {
      scrollIndicator.classList.add("hidden");
    } else {
      scrollIndicator.classList.remove("hidden");
    }
  }

  // Update active nav link
  updateActiveNavLink();

  // Parallax effect for hero section
  const heroContent = document.querySelector(".hero-content");
  const heroOverlay = document.querySelector(".hero-overlay");

  if (heroContent && scrollTop < window.innerHeight) {
    heroContent.style.transform = "translateY(" + scrollTop * 0.5 + "px)";
    if (heroOverlay) {
      heroOverlay.style.opacity = 0.8 + (scrollTop / window.innerHeight) * 0.2;
    }
  }
});

// Mobile menu toggle
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });
  }
}

// Close mobile menu when clicking on a link
function initNavLinks() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (hamburger) hamburger.classList.remove("active");
      if (navMenu) navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
}

// Hero slider
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

function nextSlide() {
  const heroSlides = document.querySelectorAll(".slide");
  if (heroSlides.length > 0) {
    heroSlides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add("active");
  }
}

function initHeroSlider() {
  const heroSlides = document.querySelectorAll(".slide");
  // Auto-advance slides only if there are multiple slides
  if (heroSlides.length > 1) {
    setInterval(nextSlide, slideInterval);
  }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  let current = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.pageYOffset >= sectionTop &&
      window.pageYOffset < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Get subject text in Turkish
function getSubjectText(value) {
  const subjects = {
    ceza: "Ceza Hukuku",
    tazminat: "Tazminat Hukuku",
    gayrimenkul: "Gayrimenkul Hukuku",
    aile: "Aile Hukuku",
    ticaret: "Ticaret Hukuku",
    danismanlik: "Hukuki Danışmanlık",
    diger: "Diğer",
  };
  return subjects[value] || "Genel Danışma";
}

// Notification system
function showNotification(message, type) {
  type = type || "info";

  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach(function (notification) {
    notification.remove();
  });

  // Create notification element
  const notification = document.createElement("div");
  notification.className = "notification notification-" + type;

  let iconClass = "fa-info-circle";
  let bgColor = "#2196F3";

  if (type === "success") {
    iconClass = "fa-check-circle";
    bgColor = "#4CAF50";
  } else if (type === "error") {
    iconClass = "fa-exclamation-circle";
    bgColor = "#f44336";
  }

  notification.innerHTML =
    '<div class="notification-content"><i class="fas ' +
    iconClass +
    '"></i><span>' +
    message +
    "</span></div>";

  // Add styles
  notification.style.cssText =
    "position: fixed; top: 100px; right: 20px; background: " +
    bgColor +
    "; color: white; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; transform: translateX(100%); transition: transform 0.3s ease; max-width: 300px; font-family: Inter, sans-serif;";

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(function () {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove
  setTimeout(function () {
    notification.style.transform = "translateX(100%)";
    setTimeout(function () {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Form validation
function validateForm() {
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  if (!nameInput || !phoneInput || !subjectInput || !messageInput) {
    return false;
  }

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const subject = subjectInput.value;
  const message = messageInput.value.trim();

  if (!name) {
    showNotification("Lütfen adınızı ve soyadınızı girin.", "error");
    return false;
  }

  if (!phone) {
    showNotification("Lütfen telefon numaranızı girin.", "error");
    return false;
  }

  if (!subject) {
    showNotification("Lütfen bir konu seçin.", "error");
    return false;
  }

  if (!message) {
    showNotification("Lütfen mesajınızı yazın.", "error");
    return false;
  }

  return true;
}

// Contact form handling
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const phone = formData.get("phone");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Create WhatsApp message
      const subjectText = getSubjectText(subject);
      const whatsappMessage =
        "Merhaba,\n\nİsim: " +
        name +
        "\nTelefon: " +
        phone +
        "\nKonu: " +
        subjectText +
        "\n\nMesaj: " +
        message +
        "\n\nWeb sitesi üzerinden iletişime geçildi.";

      // Open WhatsApp
      const whatsappURL =
        "https://wa.me/905075965084?text=" +
        encodeURIComponent(whatsappMessage);
      window.open(whatsappURL, "_blank");

      // Show success message
      showNotification("Mesajınız WhatsApp üzerinden gönderildi!", "success");

      // Reset form
      this.reset();
    });
  }
}

// Phone number formatting
function initPhoneFormatting() {
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

      // Format as Turkish phone number
      if (value.length > 0) {
        if (value.startsWith("90")) {
          value = value.substring(2);
        }
        if (value.startsWith("0")) {
          value = value.substring(1);
        }

        if (value.length <= 10) {
          if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 $3");
          } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{3})/, "($1) $2");
          } else if (value.length > 0) {
            value = value.replace(/(\d{3})/, "($1)");
          }
        }
      }

      e.target.value = value;
    });
  }
}

// Statistics counter animation
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current + (element.dataset.suffix || "");
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

// Animate counters when they come into view
function initCounterAnimations() {
  const counterElements = document.querySelectorAll(
    ".stat-number, .experience-number"
  );

  if (counterElements.length === 0) return;

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animated")
      ) {
        const element = entry.target;
        const endValue = parseInt(element.textContent.replace(/\D/g, ""));
        const suffix = element.textContent.replace(/\d/g, "");
        element.dataset.suffix = suffix;

        animateCounter(element, 0, endValue, 2000);
        element.classList.add("animated");
      }
    });
  });

  counterElements.forEach(function (el) {
    counterObserver.observe(el);
  });
}

// Blog card interactions - GÜNCELLENMIŞ FONKSİYON
function initBlogCards() {
  // Ana sayfa blog kartları
  const blogCards = document.querySelectorAll(".blog-card");
  blogCards.forEach(function (card) {
    // Tıklama işlevi - blog detay sayfasına yönlendir
    card.addEventListener("click", function (e) {
      // Eğer "Devamını Oku" butonuna tıklanmışsa normal linkine git
      if (e.target.closest(".read-more-btn")) {
        return; // Butonun kendi işlevini çalıştır
      }

      // Kart ID'sini al (href'ten)
      const readMoreBtn = this.querySelector(".read-more-btn");
      if (readMoreBtn && readMoreBtn.href) {
        window.location.href = readMoreBtn.href;
      }
    });
  });

  // Blog sayfası için blog post kartları
  const blogPosts = document.querySelectorAll(".blog-post");
  blogPosts.forEach(function (post) {
    // Tıklama işlevi - blog detay sayfasına yönlendir
    post.addEventListener("click", function (e) {
      // Eğer "Devamını Oku" butonuna tıklanmışsa normal linkine git
      if (e.target.closest(".read-more-btn")) {
        return; // Butonun kendi işlevini çalıştır
      }

      // Kart ID'sini al (href'ten)
      const readMoreBtn = this.querySelector(".read-more-btn");
      if (readMoreBtn && readMoreBtn.href) {
        window.location.href = readMoreBtn.href;
      }
    });
  });
}

// Service card hover effects
function initServiceCards() {
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".service-icon");
      if (icon) {
        icon.style.transform = "scale(1.1) rotate(5deg)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".service-icon");
      if (icon) {
        icon.style.transform = "scale(1) rotate(0deg)";
      }
    });
  });
}

// Add click handlers for call buttons
function initCallButtons() {
  const callButtons = document.querySelectorAll('a[href^="tel:"]');
  callButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      console.log("Call attempted:", this.href);
      showNotification("Aranıyor...", "info");
    });
  });
}

// Add keyboard navigation support
function initKeyboardNavigation() {
  document.addEventListener("keydown", function (e) {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    // Escape key closes mobile menu
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("active")) {
      if (hamburger) hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}

// WhatsApp button animation
function initWhatsAppButton() {
  const whatsappBtn = document.querySelector(".whatsapp-btn");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", function (e) {
      // Add a subtle animation
      this.style.transform = "scale(0.9)";
      const self = this;
      setTimeout(function () {
        self.style.transform = "scale(1.1)";
        setTimeout(function () {
          self.style.transform = "scale(1)";
        }, 100);
      }, 100);
    });
  }
}

// Initialize accessibility features
function initAccessibility() {
  const focusableElements = document.querySelectorAll(
    "a, button, input, select, textarea"
  );
  focusableElements.forEach(function (element) {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid var(--accent-color)";
      this.style.outlineOffset = "2px";
    });

    element.addEventListener("blur", function () {
      this.style.outline = "none";
    });
  });
}

// Prevent right-click for image protection
function initImageProtection() {
  document.addEventListener("contextmenu", function (e) {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });
}

// Ana sayfa blog yükleme fonksiyonu - GÜNCELLENMIŞ
async function loadHomepageBlogs() {
  try {
    const response = await fetch("blog.json");
    const data = await response.json();

    const blogContainer = document.getElementById("blog-container");
    const blogLoading = document.getElementById("blog-loading");

    // Hide loading
    blogLoading.style.display = "none";
    blogContainer.style.display = "block";

    // Get first 6 blogs (all same size)
    const recentBlogs = data.blogs.slice(0, 6);

    let html = `<div class="blog-grid">`;

    // Add all blogs with same design
    recentBlogs.forEach((blog) => {
      html += `
        <article class="blog-card" data-blog-id="${blog.id}">
          <div class="blog-image">
            <img src="${blog.image}" alt="${blog.title}" />
            <div class="blog-category">${blog.categoryName}</div>
          </div>
          <div class="blog-content">
            <h3>${blog.title}</h3>
            <p>${blog.excerpt}</p>
            <div class="blog-meta">
              <span class="blog-date">${formatDate(blog.date)}</span>
              <span class="blog-read-time">${blog.readTime}</span>
            </div>
            <a href="blog-detail.html?id=${
              blog.id
            }" class="read-more-btn">Devamını Oku</a>
          </div>
        </article>
      `;
    });

    html += `
      </div>
      <div class="blog-footer">
        <a href="blog.html" class="view-all-btn">
          <span>Tüm Blog Yazılarını Görüntüle</span>
          <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    `;

    blogContainer.innerHTML = html;

    // Blog kartları tıklama işlevini başlat
    initBlogCards();
  } catch (error) {
    console.error("Blog yükleme hatası:", error);
    document.getElementById("blog-loading").innerHTML =
      "<p>Blog yazıları yüklenemedi.</p>";
  }
}

// Blog sayfası yükleme fonksiyonu - blog.html dosyasında kullanılacak
async function loadBlogPosts() {
  try {
    const response = await fetch("blog.json");
    const data = await response.json();

    const blogPostsGrid = document.getElementById("blog-posts-grid");
    const loading = document.getElementById("loading");

    // Hide loading
    loading.style.display = "none";
    blogPostsGrid.style.display = "grid";

    // Generate HTML for all blog posts (all same size)
    let html = "";

    data.blogs.forEach((blog, index) => {
      html += `
        <article class="blog-post" data-category="${
          blog.category
        }" data-blog-id="${blog.id}">
          <div class="post-image">
            <img src="${blog.image}" alt="${blog.title}" />
            <div class="post-category">${blog.categoryName}</div>
            <div class="post-date">${formatDate(blog.date)}</div>
          </div>
          <div class="post-content">
            <h3>${blog.title}</h3>
            <p>${blog.excerpt}</p>
            <div class="post-meta">
              <div class="author-info">
                <div class="author-avatar">
                  <i class="fas fa-user-tie"></i>
                </div>
                <span class="author-name">${blog.author}</span>
              </div>
              <span class="read-time">${blog.readTime}</span>
            </div>
            <a href="blog-detail.html?id=${
              blog.id
            }" class="read-more-btn">Devamını Oku</a>
          </div>
        </article>
      `;
    });

    blogPostsGrid.innerHTML = html;

    // Blog kartları tıklama işlevini başlat
    initBlogCards();

    // Show pagination
    document.querySelector(".pagination").style.display = "flex";
  } catch (error) {
    console.error("Blog yükleme hatası:", error);
    document.getElementById("loading").innerHTML =
      "<p>Blog yazıları yüklenemedi.</p>";
  }
}

// Format date helper function
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("tr-TR", options);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Initializing Çadırcı Hukuk website...");

  // Initialize all components
  initMobileMenu();
  initNavLinks();
  initHeroSlider();
  initSmoothScroll();
  initContactForm();
  initPhoneFormatting();
  initCounterAnimations();
  initBlogCards();
  initServiceCards();
  initCallButtons();
  initKeyboardNavigation();
  initWhatsAppButton();
  initAccessibility();
  initImageProtection();

  // Set initial active nav link
  updateActiveNavLink();

  console.log("Çadırcı Hukuk website initialized successfully!");
});
