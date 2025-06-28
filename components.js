// Component Loader for Navbar and Footer
class ComponentLoader {
  static async loadComponent(selector, url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      const element = document.querySelector(selector);
      if (element) {
        element.innerHTML = html;
      }
    } catch (error) {
      console.error(`Error loading component from ${url}:`, error);
      // Fallback content
      this.loadFallbackComponent(selector);
    }
  }

  static loadFallbackComponent(selector) {
    const element = document.querySelector(selector);
    if (!element) return;

    if (selector === "#navbar-placeholder") {
      element.innerHTML = `
        <nav class="navbar" id="navbar">
          <div class="nav-container">
            <div class="nav-logo">
              <div class="logo-icon">
                <i class="fas fa-star-and-crescent"></i>
              </div>
              <span class="logo-text">ÇADIRCI HUKUK</span>
            </div>
            <ul class="nav-menu" id="nav-menu">
              <li class="nav-item">
                <a href="index.html" class="nav-link">Anasayfa</a>
              </li>
              <li class="nav-item">
                <a href="index.html#hakkimizda" class="nav-link">Hakkımızda</a>
              </li>
              <li class="nav-item">
                <a href="index.html#hizmetler" class="nav-link">Hizmetlerimiz</a>
              </li>
              <li class="nav-item">
                <a href="blog.html" class="nav-link">Blog</a>
              </li>
              <li class="nav-item">
                <a href="index.html#iletisim" class="nav-link">İletişim</a>
              </li>
            </ul>
            <div class="nav-actions">
              <a href="tel:+905075965084" class="btn-call">
                <i class="fas fa-phone"></i>
                Hizmet Al
              </a>
              <button class="hamburger" id="hamburger" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </nav>
      `;
    } else if (selector === "#footer-placeholder") {
      element.innerHTML = `
        <footer class="footer">
          <div class="container">
            <div class="footer-content">
              <div class="footer-section">
                <a href="index.html" class="footer-logo">
                  <div class="logo-icon">
                    <i class="fas fa-star-and-crescent"></i>
                  </div>
                  <span>ÇADIRCI HUKUK</span>
                </a>
                <p>Şanlıurfa'da güvenilir hukuki danışmanlık ve avukatlık hizmetleri sunuyoruz.</p>
                <div class="social-links">
                  <a href="https://www.linkedin.com/in/abdurrahman-eray-%C3%A7ad%C4%B1rc%C4%B1-7046001b6/" class="social-link" target="_blank"><i class="fab fa-linkedin"></i></a>
                  <a href="https://x.com/adrceray63" class="social-link" target="_blank"><i class="fab fa-twitter"></i></a>
                  <a href="https://www.instagram.com/av.aeraycadirci/" class="social-link" target="_blank"><i class="fab fa-instagram"></i></a>
                </div>
              </div>
              <div class="footer-section">
                <h4>Hizmetlerimiz</h4>
                <ul>
                  <li><a href="index.html#hizmetler">Ceza Hukuku</a></li>
                  <li><a href="index.html#hizmetler">Tazminat Hukuku</a></li>
                  <li><a href="index.html#hizmetler">Gayrimenkul Hukuku</a></li>
                  <li><a href="index.html#hizmetler">Aile Hukuku</a></li>
                </ul>
              </div>
              <div class="footer-section">
                <h4>İletişim</h4>
                <div class="footer-contact">
                  <p><i class="fas fa-map-marker-alt"></i> Haliliye/Şanlıurfa</p>
                  <p><i class="fas fa-phone"></i> 0507 596 50 84</p>
                  <p><i class="fas fa-clock"></i> 24 Saat Açık</p>
                </div>
              </div>
            </div>
            <div class="footer-bottom">
              <p>&copy; 2024 Çadırcı Hukuk ve Danışmanlık. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
        <a href="https://wa.me/905075965084" class="whatsapp-btn" target="_blank">
          <i class="fab fa-whatsapp"></i>
        </a>
      `;
    }
  }

  static async loadAllComponents() {
    // Load components in parallel
    await Promise.all([
      this.loadComponent("#navbar-placeholder", "navbar.html"),
      this.loadComponent("#footer-placeholder", "footer.html"),
    ]);

    // Initialize navigation functionality after components are loaded
    this.initializeNavigation();

    // Initialize logo click handlers
    this.initializeLogoHandlers();
  }

  static initializeLogoHandlers() {
    // Handle logo clicks for navigation
    document.addEventListener("click", function (e) {
      // Check if clicked element is a logo or its child
      const logoElement = e.target.closest(".nav-logo, .footer-logo");

      if (logoElement) {
        // Prevent default behavior
        e.preventDefault();

        // Get current page
        const currentPage = window.location.pathname;

        // If already on index.html or root, scroll to top
        if (
          currentPage.endsWith("index.html") ||
          currentPage === "/" ||
          currentPage === ""
        ) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          // Navigate to index.html
          window.location.href = "index.html";
        }
      }
    });
  }

  static initializeNavigation() {
    // Re-initialize navbar functionality
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("menu-open");
      });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (hamburger) hamburger.classList.remove("active");
        if (navMenu) navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });

    // Navigation scroll effect
    window.addEventListener("scroll", function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (navbar) {
        // Always add 'scrolled' class if on blog-detail.html
        if (window.location.pathname.includes("blog-detail.html")) {
          navbar.classList.add("scrolled");
        } else if (scrollTop > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    });

    // Call it once on load to ensure correct initial state for blog-detail.html
    const navbarOnLoad = document.getElementById("navbar");
    if (navbarOnLoad && window.location.pathname.includes("blog-detail.html")) {
      navbarOnLoad.classList.add("scrolled");
    }

    // Set active navigation link
    this.setActiveNavLink();
  }

  static setActiveNavLink() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      const linkHref = link.getAttribute("href");

      // Check if current page matches the link
      if (
        linkHref === currentPage ||
        (currentPage === "index.html" && linkHref === "index.html") ||
        (currentPage === "" && linkHref === "index.html") ||
        (currentPage === "blog.html" && linkHref === "blog.html")
      ) {
        link.classList.add("active");
      }
    });
  }
}

// Load components when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  ComponentLoader.loadAllComponents();
});

// Export for use in other scripts
if (typeof window !== "undefined") {
  window.ComponentLoader = ComponentLoader;
}
