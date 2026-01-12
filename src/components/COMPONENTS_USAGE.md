# Component Usage Documentation

This document defines how to use the core UI components in the application.

## 1. Button

**Usage:**  
Used for user actions and navigation. Supports icons and various visual styles.

**Component Path:** `src/components/ui/Button.tsx`

**Props & Data Structure:**
- `variant` (optional): `'solid' | 'outline' | 'ghost'` (Default: `solid`)
- `color` (optional): `'primary' | 'teal' | 'royal' | 'green' | 'yellow' | 'red' | 'purple' | 'grey'` (Default: `primary`)
- `size` (optional): `'sm' | 'md' | 'lg'` (Default: `md`)
- `startIcon` / `endIcon` (optional): `React.ReactNode` for icons.
- `onClick` (optional): Function to handle clicks.
- `disabled` (optional): Boolean to disable interaction.

**Example:**
```tsx
<Button variant="solid" color="royal" size="md" endIcon={<ArrowIcon />}>
  Donate Now
</Button>
```

---

## 2. Chip

**Usage:**  
Used to display tags, categories, or status indicators. Can be interactive or deletable.

**Component Path:** `src/components/ui/Chip.tsx`

**Props & Data Structure:**
- `label` (required): `string` - The text to display.
- `variant` (optional): `'solid' | 'outline' | 'soft'` (Default: `solid`)
- `color` (optional): Same color palette as Button. (Default: `grey`)
- `size` (optional): `'sm' | 'md'` (Default: `md`)
- `onDelete` (optional): Function. If provided, shows a delete (X) icon.
- `onClick` (optional): Function. If provided, makes the chip clickable.

**Example:**
```tsx
<Chip label="Urgent" variant="solid" color="red" size="sm" />
```

---

## 3. Slider Card

**Usage:**  
A complex card component designed for sliders, displaying an image, badges, text content, and actions.

**Component Path:** `src/components/ui/SliderCard.tsx`

**Props & Data Structure:**
- `card` (required): `CardData` object containing:
  - `id`: Unique identifier.
  - `variant`: `'campaign' | 'event' | 'news'`.
  - `headerImage`: URL string.
  - `imageChip` (optional): `{ label: string, color: string }`.
  - `heading` & `subHeading`: Strings for content.
  - `contentChips` (optional): Array of chip data objects.
  - `buttons` (optional): Array of button data objects.
  - `metadata` (optional): Object for extra info like `raised`, `goal`, `date`, `time`.

**Example:**
```tsx
const cardData = {
  id: 1,
  variant: 'campaign',
  heading: 'Help Gaza',
  headerImage: '/path/to/img.jpg',
  // ...other props
};
<SliderCard card={cardData} />
```

---

## 4. Card Slider

**Usage:**  
A responsive carousel for displaying a list of `SliderCard` components.

**Component Path:** `src/components/ui/CardSlider.tsx`

**Props & Data Structure:**
- `cards` (required): Array of `CardData` objects (see Slider Card).
- `slidesToShow` (optional): Object for responsive count `{ mobile: number, tablet: number, desktop: number }`.
- `autoPlay` (optional): `boolean` (Default: `false`).
- `autoPlayInterval` (optional): `number` in ms (Default: `5000`).
- `gap` (optional): `number` options for spacing (Default: `24`).

**Example:**
```tsx
<CardSlider 
  cards={cardsArray} 
  slidesToShow={{ mobile: 1, tablet: 2, desktop: 3 }} 
  autoPlay={true} 
/>
```

---

## 5. Image Carousel

**Usage:**  
A full-screen hero carousel with text overlays and thumbnail navigation.

**Component Path:** `src/components/ui/ImageCarousel.tsx`

**Props & Data Structure:**
- `data` (required): `CarouselData` object containing `carouselItems`.
- `autoPlay` (optional): `boolean` (Default: `false`).
- `autoPlayInterval` (optional): `number` in ms (Default: `3000`).

**Example:**
```tsx
<ImageCarousel data={heroData} autoPlay={true} />
```
