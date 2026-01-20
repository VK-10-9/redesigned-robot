# VishwaDev Landing Page

A modern, responsive landing page for VishwaDev - the premier platform for student developers to showcase groundbreaking projects and build meaningful connections.

## 🚀 Recent Refactoring (2025)

This codebase has been completely refactored for better maintainability, scalability, and developer experience.

### 📁 New Project Structure

```
├── src/
│   ├── components/
│   │   └── sections/         # Reusable section components
│   ├── constants/           # Data constants and configuration
│   │   ├── navigation.ts   # Navigation menu items
│   │   ├── projects.ts     # Project data
│   │   └── stats.ts        # Statistics data
│   └── types/              # TypeScript type definitions
│       └── navigation.ts   # Interface definitions
├── app/                    # Next.js 14 App Router
├── components/
│   └── ui/                 # shadcn/ui components
└── lib/                    # Utility functions
```

### ✨ Key Improvements

1. **🏗️ Better Code Organization**
   - Extracted data constants from components
   - Created reusable section components
   - Proper TypeScript interfaces
   - Modular component architecture

2. **📦 Enhanced Type Safety**
   - Comprehensive TypeScript interfaces
   - Strict type checking enabled
   - Better error handling

3. **🔧 Development Experience**
   - ESLint configuration
   - Improved build process
   - Better linting rules
   - Path aliases for cleaner imports

4. **⚡ Performance Optimizations**
   - Component separation for better tree-shaking
   - Optimized imports
   - Reduced bundle size

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **3D Graphics**: Spline
- **Icons**: Lucide React
- **Font**: Space Grotesk

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/VK-10-9/VishwaDev.tech--landingpage.git

# Navigate to project directory
cd VishwaDev.tech--landingpage

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Check TypeScript types
```

## 📋 Features

- ✅ **Interactive 3D Hero Section** with Spline animations
- ✅ **Project Showcase Gallery** with filtering capabilities
- ✅ **Responsive Design** optimized for all devices
- ✅ **Modern UI Components** using shadcn/ui
- ✅ **Type-Safe Development** with comprehensive TypeScript
- ✅ **SEO Optimized** with proper meta tags
- ✅ **Performance Optimized** with Next.js optimizations

## 🏗️ Architecture

### Component Structure

- **Sections**: Reusable page sections (`src/components/sections/`)
- **UI Components**: shadcn/ui based components (`components/ui/`)
- **Constants**: Centralized data management (`src/constants/`)
- **Types**: TypeScript interfaces (`src/types/`)

### Data Flow

1. **Constants** → Define project data, navigation items, statistics
2. **Types** → Ensure type safety across components  
3. **Sections** → Reusable components that consume constants
4. **Pages** → Compose sections into full pages

## 🔧 Configuration

### Path Aliases

```typescript
// tsconfig.json
{
  "paths": {
    "@/*": ["./*"],
    "@/src/*": ["./src/*"]
  }
}
```

### ESLint Rules

- TypeScript strict mode
- React hooks exhaustive deps
- Unused variables warnings
- Modern JavaScript practices

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Medium screen adaptations
- **Desktop**: Full feature experience
- **4K+**: High resolution support

## 🌟 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email hello@vishwadev.tech or create an issue in this repository.

---

**Built with ❤️ by the VishwaDev Team**
