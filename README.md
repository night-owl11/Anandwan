# Anandwan - Stories That Must Be Told

A visually stunning, emotionally immersive storytelling platform with a vintage "old letters / archival" aesthetic combined with modern interactive animations.

## Mission

"We are building a system that ensures no story of Anandwan ever goes unseen again."

This platform transforms real on-ground experiences into powerful, scalable digital narratives.

## ✨ Key Features

### Cinematic Authentication (`/auth`)
- Immersive entry experience with floating particles
- 3D card animations with perspective effects
- Typewriter text animation
- Sepia light rays and atmospheric effects
- Two roles: Visitor & Authorizer

### Visitor Dashboard (`/dashboard`)
- **Hero Section**: Animated light rays, particle effects
- **Our Special Abilities**: 5 premium story cards with 3D hover effects
- **Full Story Experience**: Immersive modal with scroll-based storytelling
- **Timeline Format**: Before → Struggle → Transformation → Present
- **Special Arts Button**: Fixed position with ink spread hover effect

### Special Arts Gallery (`/special-arts`)
- Premium product showcase with creator stories
- 3D card animations on hover
- Product detail modal with full creator narrative
- Shopping cart UI (ready for backend)

### Admin Panel (`/admin`)
- Simple upload interface for photos/videos/notes
- AI story generation (simulated) for:
  - Instagram (hooks, captions, hashtags)
  - LinkedIn (professional impact stories)
  - Website (full emotional narratives)
- One-click publishing workflow

## 🎨 Design System

### Colors
- Warm beige (#F4ECD8) - vintage paper
- Sepia brown (#704214) - ink
- Muted gold - accents
- Ink black (#2C1810) - text

### Typography
- **Playfair Display**: Serif headings
- **Caveat**: Handwritten quotes
- **Courier Prime**: Typewriter body text

### UI Elements
- Letter cards with torn edges
- Ink stamp badges
- Floating particles
- 3D hover effects with perspective
- Scroll-based parallax
- Typewriter animations

## 🚀 Getting Started

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
app/
├── auth/page.tsx          # Authentication entry
├── dashboard/page.tsx     # Visitor dashboard
├── special-arts/page.tsx  # Product gallery
├── admin/page.tsx         # Content controller
├── stories/[slug]/        # Individual stories
├── marketplace/           # Products
└── visit/                 # Visit info

components/
├── ParticleBackground.tsx # Floating particles
├── SpecialAbilities.tsx   # Story cards section
├── SpecialArtsButton.tsx  # Fixed CTA button
├── Hero.tsx               # Hero section
└── StoryFeed.tsx          # Story feed

public/images/             # Add your images here
```

## 📸 Adding Real Images

Place your Anandwan images in `public/images/`:
- `workshop1.jpg` - Sewing workshop
- `sewing.jpg` - Tailoring work
- `music.jpg` - Musical performance
- `crafts.jpg` - Handicrafts
- `community.jpg` - Community gathering
- `weaving.jpg`, `embroidery.jpg`, `stole.jpg`, etc.

See `SETUP.md` for detailed image requirements.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom vintage theme
- **Animations**: Framer Motion (3D effects, parallax, scroll-based)
- **Icons**: Lucide React
- **Effects**: Canvas-based particle system

## 🎯 User Flows

### Visitor Journey
1. `/auth` → Choose "Enter as Visitor"
2. `/dashboard` → Explore "Our Special Abilities"
3. Click story card → Full immersive story experience
4. Click "View Our Creations" → `/special-arts`
5. Browse products → Click for creator story

### Admin Journey
1. `/auth` → Choose "Enter as Authorizer"
2. `/admin` → Upload content
3. AI generates stories
4. One-click publish

## 🔮 Next Steps

1. Backend API (Node.js/FastAPI)
2. PostgreSQL database
3. Cloud storage for media
4. AI text generation integration
5. Social media APIs
6. Payment gateway
7. Analytics dashboard

## 💡 Design Philosophy

Every element reinforces the mission. The experience is:
- **Emotionally powerful**, not corporate
- **Authentic and raw**, not polished
- **Story-driven**, not product-focused
- **Immersive**, not transactional

This is a living archive of human resilience.

---

**This is about REAL PEOPLE, REAL WORK, REAL LIVES.**
