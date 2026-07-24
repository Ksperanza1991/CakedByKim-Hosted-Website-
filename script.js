const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.menu-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });

    document.querySelectorAll('.menu-panel').forEach((panel) => {
      panel.classList.remove('active');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.classList.remove('lightbox-open');
}

document.querySelectorAll('.gallery-card').forEach((card) => {
  card.addEventListener('click', () => {
    lightboxImage.src = card.dataset.full;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  });
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

/* AUTOMATIC APPROVED REVIEWS START */

(function () {
  const reviewFeed = document.getElementById("approved-review-feed");

  if (!reviewFeed) {
    return;
  }

  window.displayCakedByKimReviews = function (response) {
    if (
      !response ||
      response.success !== true ||
      !Array.isArray(response.reviews)
    ) {
      console.error("The approved review feed returned an invalid response.");
      return;
    }

    reviewFeed.innerHTML = "";

    response.reviews.forEach(function (review) {
      const rating = Math.max(
        1,
        Math.min(5, Number(review.rating) || 5)
      );

      const card = document.createElement("article");
      card.className = "customer-review-card dynamic-review-card";

      const stars = document.createElement("div");
      stars.className = "customer-review-stars";
      stars.setAttribute(
        "aria-label",
        rating + " out of 5 stars"
      );
      stars.textContent =
        "★".repeat(rating) + "☆".repeat(5 - rating);

      const orderType = document.createElement("p");
      orderType.className = "customer-review-type";
      orderType.textContent =
        review.orderType || "CakedByKim order";

      const title = document.createElement("h3");
      title.textContent =
        review.title || "A sweet review";

      const quote = document.createElement("blockquote");
      const reviewText = document.createElement("p");
      reviewText.textContent = review.review || "";
      quote.appendChild(reviewText);

      const customerName = document.createElement("p");
      customerName.className = "customer-review-name";
      customerName.textContent =
        "— " + (review.name || "CakedByKim Customer");

      card.appendChild(stars);
      card.appendChild(orderType);
      card.appendChild(title);
      card.appendChild(quote);
      card.appendChild(customerName);

      reviewFeed.appendChild(card);
    });
  };

  const oldFeedScript = document.getElementById(
    "cakedbykim-review-feed-script"
  );

  if (oldFeedScript) {
    oldFeedScript.remove();
  }

  const feedScript = document.createElement("script");

  feedScript.id = "cakedbykim-review-feed-script";
  feedScript.async = true;
  feedScript.src =
    "https://script.google.com/macros/s/AKfycby_zcaCX1fHG-5uvWzQYzXtwD6LfEys-xc9yO-aty6pngAum5gDHccCNM2V3nLhnxv8mQ/exec"
    + "?prefix=displayCakedByKimReviews"
    + "&cache="
    + Date.now();

  feedScript.onerror = function () {
    console.error("The approved review feed could not be loaded.");
  };

  document.body.appendChild(feedScript);
})();

/* AUTOMATIC APPROVED REVIEWS END */
