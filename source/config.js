/*
 * EidosFlow website — central configuration.
 * Loaded at runtime; edit with any text editor, no rebuild needed.
 *
 * SOCIAL LINKS (footer, "Follow us" / "Suivez-nous")
 *   url: null   -> icon + name shown as plain, non-clickable text.
 *   url: '...'  -> paste the OFFICIAL URL (https://...). Icon + name become a link (new tab).
 *   Built-in icons: linkedin, instagram, youtube. To add a platform later, add an entry
 *   with key, label and url (optional 24x24 SVG path in `icon`).
 */
window.EIDOSFLOW_CONFIG = {
  social: [
    { key: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/eidosflow/' }
  ]
};
