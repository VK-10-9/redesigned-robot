# SAMVIDHAN UI - Aadhaar Intelligence Platform

A modern, responsive Next.js application for displaying Aadhaar intelligence analytics.

## Features

- ✨ Beautiful hero landing page
- 📊 Dashboard with analytics
- 🔍 Data explorer interface
- 🎨 Modern UI with TailwindCSS
- ♿ Accessible components (WCAG 2.1 AA)
- 📱 Fully responsive design
- ⚡ Fast performance with Next.js
- 🔒 Type-safe with TypeScript

## Tech Stack

- **Framework**: Next.js 19.1
- **UI Library**: React 19.1
- **Styling**: TailwindCSS 3.3
- **Components**: Radix UI primitives
- **Icons**: Lucide React
- **Language**: TypeScript
- **API Client**: Fetch API

## Project Structure

```
samvidhan-ui/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── dashboard/         # Dashboard page
│   └── data-explorer/     # Data explorer page
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   ├── sections/         # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── StatsSection.tsx
│   └── shared/           # Shared components
│       ├── Navigation.tsx
│       └── Footer.tsx
├── lib/                  # Utilities
│   ├── api.ts           # API client
│   ├── utils.ts         # Helper functions
│   └── constants.ts     # App constants
├── styles/              # Global styles
│   └── globals.css      # TailwindCSS + custom styles
├── hooks/               # Custom React hooks
└── public/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.17 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd samvidhan-ui
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/overview` | National overview dashboard |
| `/dashboard` | Main analytics dashboard |
| `/data-explorer` | Interactive data explorer |

## Components

### UI Components

- **Button** - Customizable button with variants
- **Card** - Container component with header, content, footer
- **Badge** - Pill-shaped label component

### Section Components

- **HeroSection** - Landing page hero with CTA
- **FeaturesSection** - 6 Intelligence Frameworks showcase
- **StatsSection** - Key statistics display

### Shared Components

- **Navigation** - Top navigation bar with mobile menu
- **Footer** - Footer with links and information

## Styling

The project uses TailwindCSS for styling with custom configuration:

### Colors

```
Primary: #94ABE8 (Lavender Blue)
Secondary: #1F2937 (Dark Gray)
Accent: #3B82F6 (Bright Blue)
Destructive: #EF4444 (Red)
```

### Custom Classes

- `.shadow-3d` - 3D button shadow
- `.shadow-3d-hover` - 3D shadow on hover
- `.text-gradient` - Gradient text effect
- `.glow` - Glow effect

## API Integration

The project includes an API client for communication with the backend:

```typescript
import { apiClient } from '@/lib/api'

// GET request
const data = await apiClient.get('/api/national-overview')

// POST request
const result = await apiClient.post('/api/analysis', {
  state: 'Maharashtra'
})
```

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NODE_ENV=development
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript
npm run format       # Format code with Prettier
```

## Performance

- Optimized images with Next.js `Image` component
- Code splitting by route
- CSS minification with TailwindCSS
- Font optimization
- Zero JavaScript for static pages

### Lighthouse Targets

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Accessibility

- WCAG 2.1 Level AA compliant
- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Follow component naming conventions

### Component Creation

1. Create component in appropriate directory
2. Export from `index.ts` if needed
3. Use TypeScript interfaces for props
4. Add JSDoc comments for complex logic
5. Test on mobile and desktop

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/description

# Make changes and commit
git commit -m "[type] description"

# Push and create pull request
git push origin feature/description
```

Commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

- Netlify
- AWS Amplify
- Docker containers
- Self-hosted with Node.js

## Troubleshooting

### Port already in use

```bash
npm run dev -- -p 3001
```

### Clear Next.js cache

```bash
rm -rf .next
npm run build
```

### TypeScript errors

```bash
npm run type-check
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## License

MIT License - See LICENSE file for details

## Support

For questions or issues:
- GitHub Issues: [Create an issue](https://github.com/samvidhan/ui/issues)
- Email: support@samvidhan.gov.in
- Website: https://samvidhan.gov.in

## Changelog

### v1.0.0 (January 2025)

- Initial release
- Landing page with hero section
- Navigation and footer
- Feature showcase
- Statistics section
- Data explorer stub
- Dashboard stub

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

---

Built with ❤️ for Aadhaar Intelligence
