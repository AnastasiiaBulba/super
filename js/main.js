// Main JavaScript file - imports all other scripts
import { initializeCookieBar } from "./cookieBar.js";
import { initializeMobileMenu } from "./mobileMenu.js";
import { initializeDataLoader } from "./dataLoader.js";
import { initializeFormValidation } from "./formValidation.js";
import { initializeNewsExpander } from "./newsExpander.js";
import { initializeModal } from "./modal.js";

async function loadPartial(id, url) {
  const container = document.getElementById(id);
  if (!container) return;
  const res = await fetch(url);
  const html = await res.text();
  container.innerHTML = html;
}

// Initialize all modules when DOM is loaded
document.addEventListener("DOMContentLoaded", async function () {
  // Set current year in footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  await loadPartial("header", "./football_partials/header.html");
  await loadPartial("footer", "./football_partials/footer.html");
  if (window.location.pathname.includes("football-contacts.html")) {
    await loadPartial("contact-info", "./football_partials/contact-info.html");
  }

  // Initialize all modules
  initializeCookieBar();
  initializeMobileMenu();
  initializeDataLoader();
  initializeFormValidation();
  initializeNewsExpander();
  initializeModal();

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loading animation for buttons
  document
    .querySelectorAll(".btn-primary, .btn-secondary")
    .forEach((button) => {
      button.addEventListener("click", function () {
        if (!this.classList.contains("loading")) {
          this.classList.add("loading");
          setTimeout(() => {
            this.classList.remove("loading");
          }, 1000);
        }
      });
    });

  // Add hover effects for cards
  document
    .querySelectorAll(".feature-card, .review-card, .contact-card, .news-card")
    .forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-4px)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });

  console.log("Super Kick 3D: World Cup website initialized successfully!");
});
