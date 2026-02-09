# Klyseria - WordPress Headless Blog Frontend

A production-ready Next.js application powered by WordPress REST API, designed for deployment on DigitalOcean App Platform.

## 🚀 Features

- **Modern Stack**: Next.js 15+ with App Router, TypeScript, and Tailwind CSS
- **Headless WordPress**: Seamless integration with WordPress REST API
- **SEO Optimized**: Dynamic metadata, sitemap, robots.txt, and Open Graph tags
- **Dark Mode**: Theme switcher with localStorage persistence
- **View Modes**: Grid/List view switcher with localStorage persistence
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Performance**: Server-side rendering (SSR) and static generation (SSG)
- **CI/CD**: Auto-deploy on push to main via GitHub Actions
- **Production Ready**: Optimized for DigitalOcean App Platform

## 📁 Project Structure

```
klyseria/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog listing and post pages
│   │   └── [slug]/        # Dynamic blog post routes
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── sitemap.ts         # Dynamic sitemap generation
│   ├── robots.ts          # Robots.txt configuration
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading state
│   └── not-found.tsx      # 404 page
├── components/            # Reusable React components
│   ├── Header.tsx         # Site header with navigation
│   ├── Footer.tsx         # Site footer
│   ├── PostCard.tsx       # Blog post card component
│   ├── PostGrid.tsx       # Blog post grid/list layout
│   └── ViewSwitcher.tsx   # Grid/List view toggle
├── hooks/                 # Custom React hooks
│   ├── useTheme.ts        # Dark mode hook
│   └── useViewMode.ts     # View mode hook
├── lib/                   # Utility functions
│   ├── wordpress.ts       # WordPress API integration
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript type definitions
│   ├── wordpress.ts       # WordPress API types
│   └── index.ts           # General types
├── public/                # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD pipeline
├── .do/
│   └── app.yaml          # DigitalOcean App Platform config
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🛠️ Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn
- WordPress site with REST API enabled
- DigitalOcean account (for deployment)
- GitHub account (for CI/CD)

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/klyseria.git
cd klyseria
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your WordPress site details:

```env
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Pages

The application includes 4 main pages:

1. **Home (`/`)** - Landing page with featured posts and site overview
2. **Blog (`/blog`)** - Blog listing page with grid/list views
3. **Blog Post (`/blog/[slug]`)** - Individual blog post with dynamic routing
4. **About (`/about`)** - About page with site information
5. **Contact (`/contact`)** - Contact form page

## 🔧 Configuration

### WordPress Setup

Ensure your WordPress site has:

1. REST API enabled (enabled by default)
2. Posts published with featured images
3. Categories and tags configured
4. Author information filled out

### Next.js Configuration

Key configurations in `next.config.ts`:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any domain
      },
    ],
  },
};
```

### Tailwind CSS

Tailwind is configured with dark mode support. Toggle dark mode using the theme switcher in the header.

## 🚀 Deployment

### Deploy to DigitalOcean App Platform

#### Option 1: Using DigitalOcean Console

1. Log in to [DigitalOcean](https://cloud.digitalocean.com)
2. Go to App Platform
3. Click "Create App"
4. Connect your GitHub repository
5. Select branch: `main`
6. Configure environment variables:
   - `WORDPRESS_API_URL`
   - `NEXT_PUBLIC_SITE_URL`
7. Review and create

#### Option 2: Using App Spec (`.do/app.yaml`)

1. Update `.do/app.yaml` with your GitHub repo details
2. Deploy using doctl CLI:

```bash
doctl apps create --spec .do/app.yaml
```

### Environment Variables for Production

Set these in DigitalOcean App Platform:

- `WORDPRESS_API_URL` - Your WordPress REST API URL
- `NEXT_PUBLIC_SITE_URL` - Your production domain URL

### GitHub Actions CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. Runs on push to `main` branch
2. Installs dependencies
3. Runs linter
4. Builds the application
5. Triggers DigitalOcean deployment

**Required GitHub Secrets:**

- `WORDPRESS_API_URL`
- `NEXT_PUBLIC_SITE_URL`
- `DIGITALOCEAN_ACCESS_TOKEN` (optional, for custom deployments)

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🎯 Key Features Explained

### Dark Mode

- Implemented with Tailwind CSS dark mode
- Persists preference in localStorage
- Toggleable via header button
- Supports system preference detection

### View Mode Switcher

- Switch between grid and list layouts
- Persists preference in localStorage
- Available on blog listing page

### SEO Optimization

- Dynamic metadata per page
- Open Graph tags for social sharing
- Twitter Card support
- Automatic sitemap generation
- Robots.txt configuration
- Optimized images using Next.js Image component

### Server-Side Rendering

- Homepage and blog pages use SSR
- Blog posts use Static Site Generation (SSG)
- Incremental Static Regeneration (ISR) for content updates
- Revalidation every 60 seconds

## 🔍 WordPress API Integration

The application fetches data from WordPress REST API:

- **Posts**: `/wp-json/wp/v2/posts`
- **Categories**: Embedded in post responses
- **Tags**: Embedded in post responses
- **Authors**: Embedded in post responses
- **Featured Media**: Embedded in post responses

### API Functions

Located in `lib/wordpress.ts`:

- `getPosts()` - Fetch multiple posts with pagination
- `getPostBySlug()` - Fetch single post by slug
- `getAllPostSlugs()` - Get all post slugs for static generation

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Typography**: Inter font family
- **Color Scheme**: Customizable via Tailwind config
- **Dark Mode**: Class-based dark mode
- **Responsive**: Mobile-first approach

## 🐛 Troubleshooting

### Issue: No posts appearing

**Solution**: Check your `.env.local` file and ensure `WORDPRESS_API_URL` is correct.

### Issue: Images not loading

**Solution**: Verify `next.config.ts` includes your WordPress domain in `remotePatterns`.

### Issue: Build fails on DigitalOcean

**Solution**: Ensure all environment variables are set in the App Platform settings.

### Issue: Dark mode not persisting

**Solution**: Check browser localStorage is enabled and not blocked.

## 📚 Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [WordPress REST API](https://developer.wordpress.org/rest-api/)
- **Deployment**: [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For issues and questions:

- Open an issue on GitHub
- Visit the [contact page](/contact)
- Email: contact@klyseria.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- WordPress for the robust REST API
- DigitalOcean for reliable hosting
- The open-source community

---

**Built with ❤️ using Next.js and WordPress**
