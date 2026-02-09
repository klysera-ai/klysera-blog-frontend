# Klyseria Quick Start

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure WordPress API
Create a `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and replace with your WordPress site URL:
```env
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📝 Notes

- The app works without WordPress configured (shows placeholder content)
- For production deployment, see the full [README.md](README.md)
- Configure environment variables in DigitalOcean App Platform for deployment

## 🔑 Key Features Working

✅ Dark mode with localStorage persistence
✅ Grid/List view switcher  
✅ 4 pages: Home, Blog, About, Contact
✅ Dynamic blog post routing
✅ SEO optimization (sitemap, robots.txt, metadata)
✅ Responsive design
✅ Production-ready build
