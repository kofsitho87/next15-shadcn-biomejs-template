# Next.js Admin Boilerplate

Modern admin dashboard boilerplate built with Next.js 15 and Typescript.

## Tech Stack

### Core
- Next.js 15
- React 19 RC
- TypeScript
- Tailwind CSS

### UI Components
- Shadcn UI (Radix UI + Tailwind)
- Custom components
  - Data tables
  - Multi-select
  - Sidebar navigation
  - Form components
  - And more...

### State Management & Data Fetching
- TanStack Query v5 (React Query)
- TanStack Table
- React Hook Form
- Zod (Schema validation)
- Zustand (Optional)

### Development Tools
- Biome.js (Linting & Formatting)
- Prettier
- TypeScript ESLint

## Features

### Pre-built Components
- Responsive dashboard layout
- Data tables with filtering, sorting, and pagination
- Form components with validation
- Navigation sidebar
- Toast notifications (Sonner)
- Loading states & skeletons
- Modal & dialog components
- And more...

### Authentication & Authorization
- Role-based access control
- Protected routes
- Auth middleware

### Development Features
- Type-safe API routes
- Form validation with Zod
- Optimized data fetching with React Query
- Consistent code style with Biome.js

## Getting Started

1. Requirements
   - Node.js 20.9.0+
   - pnpm

2. Installation
   ```bash
   # Clone the repository
   git clone https://github.com/your-username/nextjs-admin-boilerplate.git

   # Install dependencies
   pnpm install
   ```

3. Environment Setup
   ```bash
   # Create .env.local
   cp .env.example .env.local
   ```

4. Development
   ```bash
   # Start development server
   pnpm dev
   ```
   Visit http://localhost:3000

## Project Structure

```
├── app/                   # App router pages
├── components/           
│   ├── ui/               # Shadcn UI components
│   └── ...               # Custom components
├── lib/                   # Utility functions
├── hooks/                # Custom hooks
├── types/                # TypeScript types
└── public/               # Static assets
```

## Customization

### Styling
- Tailwind CSS configuration in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Shadcn UI theme in `components.json`

### Adding New Components
1. Use Shadcn UI CLI to add new components:
   ```bash
   pnpm dlx shadcn-ui add [component-name]
   ```
2. Customize components in `components/ui/`

## Development Guide

### Code Style
This project uses Biome.js for consistent code formatting:

```bash
# Format code
pnpm biome format .

# Lint code
pnpm biome lint .
```

### Commit Convention
```
<type>: <description>

- Detailed change 1
- Detailed change 2
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code formatting
- refactor: Code refactoring
- test: Test changes
- chore: Build/package changes

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
MIT License

## Contributing
Contributions are welcome! Please read our contributing guidelines before submitting a pull request.