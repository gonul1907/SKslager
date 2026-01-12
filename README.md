# SK SK Slager - prototype

Kleine statische prototype-website voor SK Slager. Deze versie is gemaakt als voorbeeld zonder online bestellingen. Gebruik de bestanden in de root om te bekijken of verder uit te breiden.

Belangrijke bestanden:
- `index.html` — homepage
- `ons-winkel.html` — over de winkel
- `producten.html` — productoverzicht (Producten)
- `contact.html` — contact + formulier (demo)
- `styles/styles.css` — stylesheet
- `scripts/script.js` — kleine interactiviteit

Try it:
Open `index.html` in je browser of serveer de map met een lokale webserver (bijv. `python -m http.server 8000`) en bezoek http://localhost:8000

Notities:
- Plaatsvervangende afbeeldingen komen vanaf nu uit de lokale map `images/`.
  Plaats jouw foto's met de volgende bestandsnamen (of pas de HTML aan):
  - `images/hero.jpg` — hero / header achtergrond
  - `images/gallery1.jpg`, `images/gallery2.jpg`, `images/gallery3.jpg` — previews op de homepage
  - `images/shop1.jpg`, `images/shop2.jpg`, `images/shop3.jpg` — afbeeldingen op de pagina `ons-winkel.html`
  - `images/photo1.jpg` ... `images/photo6.jpg` — extra afbeeldingen (optioneel); `producten.html` is nu het productoverzicht
- Zorg voor optimale bestandsformaten (JPG/WEBP) en gebruik korte, kleine letters namen zonder spaties.
- Contactformulier is niet verbonden met een backend in deze prototype.
