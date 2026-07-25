document.addEventListener("DOMContentLoaded", function () {
  /* ======================================================
     MOBILE NAVIGATION
     ====================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");

  function closeMobileMenu() {
    if (!menuToggle || !navigation) {
      return;
    }

    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function openMobileMenu() {
    if (!menuToggle || !navigation) {
      return;
    }

    navigation.classList.add("open");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (document.body.classList.contains("menu-open")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", function (event) {
      if (!document.body.classList.contains("menu-open")) {
        return;
      }

      if (
        navigation.contains(event.target) ||
        menuToggle.contains(event.target)
      ) {
        return;
      }

      closeMobileMenu();
    });

    window.addEventListener(
      "scroll",
      function () {
        if (document.body.classList.contains("menu-open")) {
          closeMobileMenu();
        }
      },
      { passive: true }
    );

    window.addEventListener("resize", function () {
      if (window.innerWidth > 950) {
        closeMobileMenu();
      }
    });
  }

  /* ======================================================
     MENU TABS
     ====================================================== */

  document.querySelectorAll(".menu-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".menu-tab").forEach(function (item) {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });

      document.querySelectorAll(".menu-panel").forEach(function (panel) {
        panel.classList.remove("active");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const selectedPanel = document.getElementById(tab.dataset.target);

      if (selectedPanel) {
        selectedPanel.classList.add("active");
      }
    });
  });

  /* ======================================================
     GALLERY LIGHTBOX
     ====================================================== */

  const lightbox = document.querySelector(".lightbox");

  if (lightbox) {
    const lightboxImage = lightbox.querySelector("img");
    const lightboxClose = lightbox.querySelector(".lightbox-close");

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");

      if (lightboxImage) {
        lightboxImage.src = "";
      }

      document.body.classList.remove("lightbox-open");
    }

    document.querySelectorAll(".gallery-card").forEach(function (card) {
      card.addEventListener("click", function () {
        if (!lightboxImage) {
          return;
        }

        lightboxImage.src = card.dataset.full;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        lightbox.classList.contains("open")
      ) {
        closeLightbox();
      }
    });
  }

  /* ======================================================
     COPYRIGHT YEAR
     ====================================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ======================================================
     AUTOMATIC APPROVED REVIEWS
     ====================================================== */

  const reviewFeed = document.getElementById(
    "approved-review-feed"
  );

  if (reviewFeed) {
    window.displayCakedByKimReviews = function (response) {
      if (
        !response ||
        response.success !== true ||
        !Array.isArray(response.reviews)
      ) {
        console.error(
          "The approved review feed returned an invalid response."
        );
        return;
      }

      reviewFeed.innerHTML = "";

      response.reviews.forEach(function (review) {
        const rating = Math.max(
          1,
          Math.min(5, Number(review.rating) || 5)
        );

        const card = document.createElement("article");
        card.className =
          "customer-review-card dynamic-review-card";

        const stars = document.createElement("div");
        stars.className = "customer-review-stars";
        stars.setAttribute(
          "aria-label",
          rating + " out of 5 stars"
        );
        stars.textContent =
          "★".repeat(rating) +
          "☆".repeat(5 - rating);

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
          "— " +
          (review.name || "CakedByKim Customer");

        card.appendChild(stars);
        card.appendChild(orderType);
        card.appendChild(title);
        card.appendChild(quote);
        card.appendChild(customerName);

        reviewFeed.appendChild(card);
      });
    };

    const feedScript = document.createElement("script");

    feedScript.id = "cakedbykim-review-feed-script";
    feedScript.async = true;
    feedScript.src =
      "https://script.google.com/macros/s/" +
      "AKfycby_zcaCX1fHG-5uvWzQYzXtwD6LfEys-xc9yO-" +
      "aty6pngAum5gDHccCNM2V3nLhnxv8mQ/exec" +
      "?prefix=displayCakedByKimReviews" +
      "&cache=" +
      Date.now();

    feedScript.onerror = function () {
      console.error(
        "The approved review feed could not be loaded."
      );
    };

    document.body.appendChild(feedScript);
  }
});