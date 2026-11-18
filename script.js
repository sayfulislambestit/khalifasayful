const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

const galleryCarousel = document.querySelector(".gallery-carousel");
if (galleryCarousel) {
  const gallerySlides = Array.from(galleryCarousel.querySelectorAll(".gallery-item"));
  const previousButton = galleryCarousel.querySelector(".gallery-previous");
  const nextButton = galleryCarousel.querySelector(".gallery-next");
  const toggleButton = galleryCarousel.querySelector(".gallery-toggle");
  const galleryStatus = galleryCarousel.querySelector(".gallery-status");

  if (gallerySlides.length && previousButton && nextButton && toggleButton && galleryStatus) {
    galleryCarousel.classList.add("is-ready");
    let activeSlide = 0;
    let isPlaying = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let autoplayTimer;

    function showSlide(index) {
      activeSlide = (index + gallerySlides.length) % gallerySlides.length;
      gallerySlides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeSlide;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
        slide.querySelector("a").tabIndex = isActive ? 0 : -1;
      });
      galleryStatus.textContent = `Photo ${activeSlide + 1} of ${gallerySlides.length}`;
    }

    function updatePlayback() {
      window.clearInterval(autoplayTimer);
      toggleButton.textContent = isPlaying ? "Ⅱ" : "▶";
      toggleButton.setAttribute("aria-label", isPlaying ? "Pause slideshow" : "Play slideshow");
      toggleButton.setAttribute("aria-pressed", String(isPlaying));
      if (isPlaying) {
        autoplayTimer = window.setInterval(() => showSlide(activeSlide + 1), 5000);
      }
    }

    previousButton.addEventListener("click", () => {
      showSlide(activeSlide - 1);
      updatePlayback();
    });
    nextButton.addEventListener("click", () => {
      showSlide(activeSlide + 1);
      updatePlayback();
    });
    toggleButton.addEventListener("click", () => {
      isPlaying = !isPlaying;
      updatePlayback();
    });
    showSlide(activeSlide);
    updatePlayback();
  }
}

const blogCarousel = document.querySelector(".blog-carousel");
if (blogCarousel) {
  const blogSlides = Array.from(blogCarousel.querySelectorAll(".blog-slide"));
  const previousBlogButton = blogCarousel.querySelector(".blog-previous");
  const nextBlogButton = blogCarousel.querySelector(".blog-next");
  const blogToggleButton = blogCarousel.querySelector(".blog-toggle");
  const blogStatus = blogCarousel.querySelector(".blog-status");

  if (blogSlides.length && previousBlogButton && nextBlogButton && blogToggleButton && blogStatus) {
    blogCarousel.classList.add("is-ready");
    let activeBlogSlide = 0;
    let isBlogPlaying = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let blogAutoplayTimer;

    function updateBlogPlayback() {
      window.clearInterval(blogAutoplayTimer);
      blogToggleButton.textContent = isBlogPlaying ? "Ⅱ" : "▶";
      blogToggleButton.setAttribute("aria-label", isBlogPlaying ? "Pause blog slideshow" : "Play blog slideshow");
      blogToggleButton.setAttribute("aria-pressed", String(isBlogPlaying));
      const activeDetails = blogSlides[activeBlogSlide].querySelector("details");
      if (isBlogPlaying && !activeDetails.open) {
        blogAutoplayTimer = window.setInterval(() => showBlogSlide(activeBlogSlide + 1), 4000);
      }
    }

    function showBlogSlide(index) {
      activeBlogSlide = (index + blogSlides.length) % blogSlides.length;
      blogSlides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeBlogSlide;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
        if (!isActive) {
          slide.querySelector("details").open = false;
        }
      });
      blogStatus.textContent = `Article ${activeBlogSlide + 1} of ${blogSlides.length}`;
      updateBlogPlayback();
    }

    previousBlogButton.addEventListener("click", () => showBlogSlide(activeBlogSlide - 1));
    nextBlogButton.addEventListener("click", () => showBlogSlide(activeBlogSlide + 1));
    blogToggleButton.addEventListener("click", () => {
      isBlogPlaying = !isBlogPlaying;
      updateBlogPlayback();
    });
    blogSlides.forEach(slide => slide.querySelector("details").addEventListener("toggle", updateBlogPlayback));
    showBlogSlide(activeBlogSlide);
  }
}

const roleElement = document.getElementById("typed-role");
const roles = [
  "Network & System Engineering",
  "IT Infrastructure",
  "Networking & Troubleshooting",
  "IP Addressing & Subnetting",
  "TCP/IP Fundamentals",
  "VLAN & Switching",
  "Routing & WAN",
  "DNS & DHCP",
  "Network Security",
  "Firewall & VPN",
  "Wireless Networking",
  "Computer Networking",
  "Network Administration",
  "Routing & Switching",
  "MikroTik",
  "Cloud Computing",
  "CCTV Installation",
  "Leadership",
  "Python"
];
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = false;
function typeRole() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    roleElement.textContent = current.slice(0, charIndex);
    if (charIndex >= current.length) {
      deleting = true;
      setTimeout(typeRole, 1500);
      return;
    }
  } else {
    charIndex--;
    roleElement.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 35 : 65);
}
setTimeout(typeRole, 1800);
