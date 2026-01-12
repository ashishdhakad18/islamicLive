/**
 * Usage Guide for Islamic Relief Design System
 * 
 * 1. Colors
 *    We use a semantic color system powered by CSS variables and Tailwind 4.
 *    
 *    Primary Colors:
 *    - bg-primary, text-primary (Main Blue)
 *    - bg-primary-dark, bg-primary-light, bg-primary-surface
 * 
 *    Brand Colors:
 *    - bg-teal, text-teal
 *    - bg-royal, text-royal
 *    - bg-green, text-green
 *    - bg-yellow, text-yellow
 *    - bg-red, text-red
 *    - bg-purple, text-purple
 *    - bg-sunGlow, text-sunGlow
 * 
 *    Neutrals (Grey):
 *    - bg-grey-bg-light (Main Page Background)
 *    - bg-grey-bg-dark (Subtle Background)
 *    - border-grey-divider (Borders)
 *    - text-grey-black (Main Text)
 *    - text-grey-grey (Muted Text)
 *    - text-grey-inactive (Disabled Text)
 * 
 * 2. Dark Mode
 *    Dark mode is implemented via the `.dark` class on the HTML element.
 *    Colors automatically adjust when dark mode is active.
 *    
 *    Example Button:
 *    <button className="bg-primary text-grey-white hover:bg-primary-dark px-4 py-2 rounded">
 *      Donate Now
 *    </button>
 *    
 *    Example Card:
 *    <div className="bg-grey-white dark:bg-grey-bg-dark border border-grey-divider p-4 rounded-lg">
 *      <h3 className="text-grey-black dark:text-white">Card Title</h3>
 *      <p className="text-grey-grey">Card content goes here...</p>
 *    </div>
 * 
 * 3. Overlays
 *    Use overlays for modal backdrops or image overlays.
 *    - bg-overlayBlack-40 (40% opacity black)
 *    - bg-overlayWhite-20 (20% opacity white)
 */
