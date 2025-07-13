// Cookie Bar functionality
export function initializeCookieBar() {
  const cookieBar = document.getElementById("cookie-bar");
  const acceptButton = document.getElementById("accept-cookies");

  if (!cookieBar || !acceptButton) return;

  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("superKickCookiesAccepted");

  if (!cookiesAccepted) {
    // Show cookie bar after a short delay
    setTimeout(() => {
      cookieBar.classList.add("show");
    }, 1500);
  }

  // Handle accept button click
  acceptButton.addEventListener("click", function () {
    localStorage.setItem("superKickCookiesAccepted", "true");

    // Add success animation
    this.textContent = "Accepted!";
    this.style.background = "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
    this.style.color = "white";
    this.style.transform = "scale(1.05)";

    // Hide cookie bar with animation
    setTimeout(() => {
      cookieBar.classList.remove("show");
    }, 500);

    // Reset button after animation
    setTimeout(() => {
      this.textContent = "Accept";
      this.style.background = "";
      this.style.color = "";
      this.style.transform = "";
    }, 2000);
  });

  // Handle escape key to hide cookie bar
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && cookieBar.classList.contains("show")) {
      cookieBar.classList.remove("show");
    }
  });

  // Handle clicking outside to hide cookie bar
  document.addEventListener("click", function (e) {
    if (
      cookieBar.classList.contains("show") &&
      !cookieBar.contains(e.target) &&
      !e.target.closest(".cookie-bar")
    ) {
      cookieBar.classList.remove("show");
    }
  });
}
