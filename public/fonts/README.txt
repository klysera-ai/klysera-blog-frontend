Place your font files for 'General Sans' and 'Acid Grotesk' in this folder.

Recommended structure:
- /public/fonts/GeneralSans-Regular.woff2
- /public/fonts/GeneralSans-Bold.woff2
- /public/fonts/AcidGrotesk-Regular.woff2
- /public/fonts/AcidGrotesk-Bold.woff2

Download the font files from the official sources or your licensed provider.

After placing the files, update app/globals.css with @font-face rules like:

@font-face {
  font-family: 'General Sans';
  src: url('/fonts/GeneralSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Acid Grotesk';
  src: url('/fonts/AcidGrotesk-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

Repeat for other weights/styles as needed.