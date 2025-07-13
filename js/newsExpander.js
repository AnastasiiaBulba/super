// News Expander functionality - now opens modal instead of expanding content
import { showNewsModal } from "./newsModal.js";

export function initializeNewsExpander() {
  // Use event delegation for dynamically loaded content
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("read-more-btn")) {
      handleReadMoreClick(event.target);
    }
  });
}

function handleReadMoreClick(button) {
  // Get content from data attributes
  const title = button.getAttribute("data-title");
  const content = button.getAttribute("data-content");
  const date = button.getAttribute("data-date");
  const category = button.getAttribute("data-category");

  if (content) {
    // Show modal with news content
    showNewsModal(title, content, date, category, button);
  }
}

// Alternative implementation for static content
export function initializeStaticNewsExpander() {
  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get content from data attributes
      const title = this.getAttribute("data-title");
      const content = this.getAttribute("data-content");
      const date = this.getAttribute("data-date");
      const category = this.getAttribute("data-category");

      if (content) {
        // Show modal with news content
        showNewsModal(title, content, date, category, this);
      }
    });
  });
}
