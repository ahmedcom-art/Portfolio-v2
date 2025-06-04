document.addEventListener("DOMContentLoaded", function () {
  // Ensure the page starts at the top
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"; // Disable browser scroll restoration
  }
  window.addEventListener("load", () => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }); // Force scroll to the top

  // Header shrink effect
  const header = document.querySelector(".header");
  const headSection = document.querySelector(".head-section");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
      header.classList.add("shrink");
      headSection.style.backgroundColor = "rgba(234, 229, 221, 0.9)";
    } else {
      header.classList.remove("shrink");
      headSection.style.backgroundColor = "transparent";
    }
  });

  // Scroll indicator
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector(".scroll-indicator").style.width =
      scrollPercent + "%";
  });

  // Burger menu toggle
  const menuToggle = document.querySelector(".burger-menu");
  const headMenu = document.querySelector(".head");
  const linksMenu = document.querySelector(".links-sec");

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    headMenu.classList.toggle("open");
    linksMenu.classList.toggle("open");
  });

  // Active link logic
  const navLinks = document.querySelectorAll(".links a");
  const sections = document.querySelectorAll("section, .home, .serv, .ab");
  const headerHeight = 78; // Fixed header height in pixels

  function updateActiveLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });
  }

  // Set "Home" as the initial active link
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#home") {
      link.classList.add("active");
    }
  });

  // Update active link on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Typed.js initialization
  var typed = new Typed(".stylish", {
    strings: ["Elfedat", "Twima"],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
  });

  // Lottie animation
  lottie.loadAnimation({
    container: document.getElementById("lottie-bg"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://assets4.lottiefiles.com/packages/lf20_myejiggj.json", // can be replaced with a calmer one
  });

  // Parallax effect
  const img = document.querySelector(".parallax-img");
  let floatTimeout;

  const activateParallax = (e) => {
    img.classList.remove("floating");

    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;

    img.style.transform = `translate(${x}px, ${y}px) scale(1.0)`;

    clearTimeout(floatTimeout);

    floatTimeout = setTimeout(() => {
      // Smooth return to center
      img.style.transition = "transform 0.4s ease";
      img.style.transform = "translate(0, 0)";

      // Then resume float
      setTimeout(() => {
        img.classList.add("floating");
        img.style.transition = "";
      }, 400);
    }, 1000);
  };

  document.addEventListener("mousemove", activateParallax);

  // GSAP animations
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // 1. Animate the home section ON LOAD
  const homeSection = document.querySelector("#home");
  if (homeSection) {
    gsap.fromTo(
      homeSection,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );
  }

  // 2. Animate all other sections ON SCROLL
  gsap.utils.toArray(".section").forEach((section) => {
    // Skip home section (already animated above)
    if (section.id === "home") return;

    gsap.fromTo(
      section,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
          scrub: false,
          markers: false,
        },
      }
    );
  });

  // Typing animation with scroll fade-in effect
  // Typing animation with scroll fade-in effect
  const typingTargets = document.querySelectorAll(".typing-effect"); // Use class for multiple elements

  // Define the text content for each section
  const typingTexts = {
    about: "'Not a morning person, or an evening one. Honestly, just tired.'",
    projects: "'Where just messing around turns into something cool'", // Placeholder for projects
    skills:
      "I specialize in HTML, CSS, JavaScript, and creating intuitive user interfaces.", // Placeholder for skills
    contact: "'Feel free to reach out for collaborations or just a chat!'", // Placeholder for contact};
  };
  typingTargets.forEach((typingTarget) => {
    const sectionId = typingTarget.closest(".section").id; // Get the section ID
    const text = typingTexts[sectionId]; // Get the corresponding text for the section

    if (text) {
      let index = 0;

      function typeText() {
        if (index < text.length) {
          typingTarget.textContent += text.charAt(index);
          index++;
          setTimeout(typeText, 50); // Typing speed (ms)
        }
      }

      // Reset the text each time the section comes into view
      ScrollTrigger.create({
        trigger: typingTarget,
        start: "top 80%", // Start typing animation when the element is 80% down the viewport
        onEnter: () => {
          typingTarget.textContent = ""; // Clear the text before starting the animation
          index = 0; // Reset the index to restart typing animation
          typeText(); // Start typing animation
        },
        onLeaveBack: () => {
          typingTarget.textContent = ""; // Clear the text when the section leaves the viewport upwards
          index = 0; // Reset the index for next time
        },
      });
    } else {
      console.error(`No text defined for section with id "${sectionId}".`);
    }
  });
  // Register the ScrollToPlugin
  gsap.registerPlugin(ScrollToPlugin);

  // Add smooth scrolling to navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior

      const targetId = this.getAttribute("href").substring(1); // Get the target section ID
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const HeaderHeight = document.querySelector(".header").offsetHeight; // Get the header height
        gsap.to(window, {
          duration: 1, // Duration of the scroll (in seconds)
          scrollTo: {
            y: targetElement, // Scroll to the target element
            offsetY: HeaderHeight + 30, // Optional: Add an offset (e.g., for fixed headers)
          },
          ease: "power2.out", // Easing function
        });
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".head a");

  function updateActiveLink() {
    let closestSection = null;
    let minDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top); // Distance from top of screen

      if (
        rect.top <= window.innerHeight &&
        rect.bottom >= 0 &&
        distance < minDistance
      ) {
        minDistance = distance;
        closestSection = section;
      }
    });

    // Remove active class from all
    navLinks.forEach((link) => link.classList.remove("active"));

    if (closestSection) {
      const id = closestSection.getAttribute("id");
      const activeLink = document.querySelector(`.head a[href="#${id}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // run on load
});
