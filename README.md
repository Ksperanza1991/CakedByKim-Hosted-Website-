# CakedByKim Website

This is a complete, responsive one-page website built with plain HTML, CSS, and JavaScript.

## Preview the website

Open `index.html` in any modern web browser.

For the most accurate local preview, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Before publishing

1. Replace `hello@cakedbykim.com` in `index.html` with the real business email.
2. Update the FormSubmit address in the contact form:
   `https://formsubmit.co/hello@cakedbykim.com`
3. Review all menu descriptions and pricing language.
4. Replace the sample gallery panels with your real product photos.
5. Confirm pickup area, payment policy, and lead-time details.

## Add your own gallery photos

Create an `images` folder beside `index.html`, then add photos such as:

- `triple-chocolate.jpg`
- `vanilla-cupcakes.jpg`
- `strawberry-cupcakes.jpg`
- `dessert-box.jpg`
- `chocolate-chip-cookie.jpg`

In `styles.css`, replace each sample background with:

```css
.photo-chocolate {
  background-image: url("images/triple-chocolate.jpg");
}
```

Repeat for `.photo-vanilla`, `.photo-strawberry`, `.photo-box`, and `.photo-cookie`.

## Publishing options

You can publish this folder using:

- GitHub Pages
- Netlify
- Vercel
- Squarespace custom code
- Shopify custom theme development
- Any standard website host

## Included

- Mobile navigation
- Hero section
- Weekly-special announcement
- Cookie, cupcake, and extras menu tabs
- Gallery
- About section
- Ordering process
- Contact/order request form
- Instagram links
- Responsive mobile design
- Basic accessibility support
