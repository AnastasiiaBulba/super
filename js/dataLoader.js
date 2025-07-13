// Data Loader - fetches content from JSON file
export function initializeDataLoader() {
  loadPageContent();
}

async function loadPageContent() {
  try {
    const response = await fetch("./data/football-content.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Load content based on current page
    const currentPage = getCurrentPage();

    switch (currentPage) {
      case "home":
        loadHomeContent(data);
        break;
      case "news":
        loadNewsContent(data);
        break;
      case "contact":
        loadContactContent(data);
        break;
    }
  } catch (error) {
    console.error("Error loading content:", error);
    // Fallback to default content
    loadFallbackContent();
  }
}

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes("football-news.html")) return "news";
  if (path.includes("football-contacts.html")) return "contact";
  return "home";
}

function loadHomeContent(data) {
  // Load hero content
  const heroTitle = document.getElementById("hero-title");
  const heroDescription = document.getElementById("hero-description");
  const playNowBtn = document.getElementById("play-now-btn");

  if (heroTitle && data.hero) {
    heroTitle.textContent = data.hero.title;
  }
  if (heroDescription && data.hero) {
    heroDescription.textContent = data.hero.description;
  }
  if (playNowBtn && data.hero) {
    playNowBtn.textContent = data.hero.buttonText;
  }

  // Load features
  const featuresGrid = document.getElementById("features-grid");
  if (featuresGrid && data.features) {
    featuresGrid.innerHTML = data.features
      .map(
        (feature) => `
            <div class="feature-card">
                <div class="feature-icon">${feature.icon}</div>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
            </div>
        `
      )
      .join("");
  }

  // Load how to play content
  const howToPlayContent = document.getElementById("how-to-play-content");
  if (howToPlayContent && data.howToPlay) {
    howToPlayContent.innerHTML = `
            <div class="how-to-play-grid">
                ${data.howToPlay
                  .map(
                    (item, index) => `
                    <div class="how-to-item">
                        <div class="how-to-number">${index + 1}</div>
                        <div class="how-to-content">
                            <h3 class="how-to-title">${item.title}</h3>
                            <p class="how-to-description">${
                              item.description
                            }</p>
                            <ul class="how-to-list">
                                ${item.steps
                                  .map((step) => `<li>${step}</li>`)
                                  .join("")}
                            </ul>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  // Load stadium features
  const stadiumFeatures = document.getElementById("stadium-features");
  if (stadiumFeatures && data.stadium) {
    stadiumFeatures.innerHTML = data.stadium.features
      .map(
        (feature) => `
            <div class="stadium-feature">
                <div class="stadium-feature-icon">${feature.icon}</div>
                <div class="stadium-feature-text">${feature.text}</div>
            </div>
        `
      )
      .join("");
  }

  // Load reviews
  const reviewsGrid = document.getElementById("reviews-grid");
  if (reviewsGrid && data.reviews) {
    reviewsGrid.innerHTML = data.reviews
      .map(
        (review) => `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-avatar">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="10" r="6" fill="currentColor"/>
                            <path d="M4 28c0-6.6 5.4-12 12-12s12 5.4 12 12" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="review-info">
                        <div class="review-name">${review.name}</div>
                        <div class="review-rating">★★★★★</div>
                    </div>
                </div>
                <div class="review-text">"${review.text}"</div>
            </div>
        `
      )
      .join("");
  }
}

function loadNewsContent(data) {
  const updatesGrid = document.getElementById("updates-grid");
  if (updatesGrid && data.gameUpdates) {
    updatesGrid.innerHTML = data.gameUpdates
      .map(
        (update) => `
        <div class="news-card">
          <div class="news-image">
            ${
              update.image
                ? `<img src="${update.image}" alt="Soccer Game Update" class="news-image-photo" style="width:100%;height:auto;object-fit:cover;border-radius:12px;" />`
                : ""
            }
          </div>
          <div class="news-content">
            <span class="news-category">Game Update</span>
            <h3 class="news-title">${update.title}</h3>
            <p class="news-description">${update.description}</p>
            <div class="news-date">${update.date}</div>
            <button class="read-more-btn" data-content="${update.fullContent}">
              Read More
              <span class="read-more-icon">▼</span>
            </button>
            <div class="news-expanded"></div>
          </div>
        </div>
      `
      )
      .join("");
  }

  const soccerNewsGrid = document.getElementById("soccer-news-grid");
  if (soccerNewsGrid && data.soccerNews) {
    soccerNewsGrid.innerHTML = data.soccerNews
      .map(
        (news) => `
        <div class="news-card">
          <div class="news-image">
            ${
              news.image
                ? `<img src="${news.image}" alt="Soccer News" class="news-image-photo" style="width:100%;height:auto;object-fit:cover;border-radius:12px;" />`
                : ""
            }
          </div>
          <div class="news-content">
            <span class="news-category diaries">Soccer News</span>
            <h3 class="news-title">${news.title}</h3>
            <p class="news-description">${news.description}</p>
            <div class="news-date">${news.date}</div>
            <button class="read-more-btn" data-content="${news.fullContent}">
              Read More
              <span class="read-more-icon">▼</span>
            </button>
            <div class="news-expanded"></div>
          </div>
        </div>
      `
      )
      .join("");
  }
}

function loadContactContent(data) {
  // Load contact information
  const contactEmail = document.getElementById("contact-email");
  const contactPhone = document.getElementById("contact-phone");
  const contactAddress = document.getElementById("contact-address");

  if (contactEmail && data.contact) {
    contactEmail.textContent = data.contact.email;
  }
  if (contactPhone && data.contact) {
    contactPhone.textContent = data.contact.phone;
  }
  if (contactAddress && data.contact) {
    contactAddress.textContent = data.contact.address;
  }
}

function loadFallbackContent() {
  // Fallback content if JSON fails to load
  console.log("Loading fallback content...");

  // Set default content for key elements
  const elements = {
    "hero-title": "Super Kick 3D: World Cup",
    "hero-description":
      "Experience the thrill of soccer in this exciting 3D football game! Test your skills on your own playing field, master the art of kicking the ball into the goal while avoiding the goalkeeper. Are you ready to become a soccer champion?",
    "play-now-btn": "Play Now",
    "features-title": "Game Features",
    "how-to-play-title": "How to Play",
    "stadium-title": "Experience World Cup Stadiums",
    "stadium-description":
      "Play in beautifully designed 3D stadiums with realistic atmosphere and World Cup excitement.",
    "reviews-title": "Player Reviews",
  };

  Object.entries(elements).forEach(([id, text]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  });
}
