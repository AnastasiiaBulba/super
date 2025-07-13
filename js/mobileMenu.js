// Mobile Menu functionality
export function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const hamburgerLines = document.querySelectorAll(".hamburger-line");

  if (!mobileMenuToggle || !mobileMenu) return;

  let isMenuOpen = false;

  mobileMenuToggle.addEventListener("click", function () {
    isMenuOpen = !isMenuOpen;

    // Toggle menu visibility
    if (isMenuOpen) {
      mobileMenu.classList.add("show");

      // Animate hamburger to X
      hamburgerLines[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      hamburgerLines[1].style.opacity = "0";
      hamburgerLines[2].style.transform = "rotate(-45deg) translate(7px, -6px)";

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      mobileMenu.classList.remove("show");

      // Reset hamburger
      hamburgerLines[0].style.transform = "";
      hamburgerLines[1].style.opacity = "";
      hamburgerLines[2].style.transform = "";

      // Restore body scroll
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      isMenuOpen &&
      !mobileMenuToggle.contains(e.target) &&
      !mobileMenu.contains(e.target)
    ) {
      mobileMenuToggle.click();
    }
  });

  // Close menu when pressing Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isMenuOpen) {
      mobileMenuToggle.click();
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && isMenuOpen) {
      mobileMenuToggle.click();
    }
  });
}
