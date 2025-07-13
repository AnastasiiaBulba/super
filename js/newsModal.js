// News Modal functionality
export function initializeNewsModal() {
  // Initialize event listeners for dynamically created modals
  setupNewsModalEvents();
}

function createNewsModal() {
  // Modal will be created dynamically for each news card
  return `
    <div class="news-modal">
      <div class="news-modal-content">
        <div class="news-modal-header">
          <h2 class="news-modal-title"></h2>
          <button class="news-modal-close">×</button>
        </div>
        <div class="news-modal-body">
          <div class="news-modal-date"></div>
          <span class="news-modal-category"></span>
          <div class="news-modal-text"></div>
        </div>
      </div>
    </div>
  `;
}

function setupNewsModalEvents() {
  // Event delegation for dynamically created modals
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("news-modal-close")) {
      const modal = event.target.closest(".news-modal");
      if (modal) {
        closeNewsModal(modal);
      }
    }
  });

  // Close modal when clicking outside
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("news-modal")) {
      closeNewsModal(event.target);
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const openModal = document.querySelector(".news-modal.show");
      if (openModal) {
        closeNewsModal(openModal);
      }
    }
  });
}

function setupModalEvents(modal) {
  const closeBtn = modal.querySelector(".news-modal-close");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeNewsModal(modal));
  }
}

export function showNewsModal(title, content, date, category, button) {
  // Find the news card that contains the button
  const newsCard = button.closest(".news-card");
  if (!newsCard) return;

  // Check if modal already exists in this card
  let modal = newsCard.querySelector(".news-modal");

  if (!modal) {
    // Create new modal for this card
    const modalHTML = createNewsModal();
    newsCard.insertAdjacentHTML("beforeend", modalHTML);
    modal = newsCard.querySelector(".news-modal");

    // Set up event listeners for this modal
    setupModalEvents(modal);
  }

  // Set modal content
  const modalTitle = modal.querySelector(".news-modal-title");
  const modalText = modal.querySelector(".news-modal-text");
  const modalDate = modal.querySelector(".news-modal-date");
  const modalCategory = modal.querySelector(".news-modal-category");

  modalTitle.textContent = title;
  modalText.innerHTML = content;
  modalDate.textContent = date;
  modalCategory.textContent = category;
  modalCategory.className = `news-modal-category ${
    category.toLowerCase().includes("soccer") ? "diaries" : ""
  }`;

  // Show modal
  modal.classList.add("show");
}

export function closeNewsModal(modal) {
  if (!modal) return;

  modal.classList.remove("show");
}

// Make functions globally accessible
window.showNewsModal = showNewsModal;
window.closeNewsModal = closeNewsModal;
