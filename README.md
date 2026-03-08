# Shun's World

A portfolio website for posting images, creating showcases, and sharing "Behind the Image" stories.

## Prerequisites

| Tool | Minimum Version | Check Command |
|------|-----------------|---------------|
| Node.js | 20.x LTS | `node --version` |
| npm | 10.x | `npm --version` |
| Git | 2.x | `git --version` |

---

## Development Environment Setup

### Step 1: Install Node.js using nvm

**nvm** (Node Version Manager) ensures all developers use the same Node.js version.

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart your terminal, then verify
command -v nvm
```

### Step 2: Clone and Enter Project

```bash
git clone git@github.com:ablce9/myportfolio.git
cd myportfolio
```

### Step 3: Install Correct Node.js Version

The project includes an `.nvmrc` file specifying the required Node.js version.

```bash
# Install and use the project's Node version
nvm install
nvm use

# Verify
node --version   # Should show v20.x.x
```

**Optional:** Auto-switch Node version when entering the directory. Add to `~/.zshrc` or `~/.bashrc`:

```bash
autoload -U add-zsh-hook
load-nvmrc() {
  local nvmrc_path="$(nvm_find_nvmrc)"
  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")
    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$(nvm version)" ]; then
      nvm use
    fi
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

### Step 4: Install Dependencies

```bash
npm install
```

This creates `node_modules/` with all packages from `package.json`.

### Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (localhost:3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run type-check` | TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit/component tests |

---

## Testing

### Stack

| Type | Tool | Purpose |
|------|------|---------|
| Unit/Component | Vitest + React Testing Library | Fast tests, component behavior |

### Test Structure

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx      # Co-located unit tests
├── lib/
│   ├── utils.ts
│   └── utils.test.ts
```

### Guidelines

1. **Co-locate tests** - Place `*.test.tsx` next to the source file
2. **Test behavior, not implementation** - Focus on what users see/do
3. **Run before commit** - `npm run test` should pass locally

---

## IDE Setup (VS Code)

Install recommended extensions:

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

---

## Troubleshooting

### Port 3000 in use

```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### Module not found errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### Node version mismatch

```bash
nvm use   # Uses version from .nvmrc
```

---

## Content Management

Content is file-based (Markdown) with images hosted on Flickr. No external CMS or credentials required.

### Content Structure

```
content/
├── images/           # Image metadata (markdown files)
│   └── tokyo-sunset.md
└── stories/          # Behind the Image stories
    └── behind-tokyo-sunset.md
```

### Flickr Setup (One-Time)

1. **Create Flickr Account** at [flickr.com](https://www.flickr.com/)
2. **Upload your images** to Flickr
3. **Get image URL**:
   - Open image → Click share icon → **Download/Link**
   - Copy the URL (e.g., `https://live.staticflickr.com/65535/12345_abc_b.jpg`)

### Flickr Image Sizes

Change the letter before `.jpg` to get different sizes:

| Suffix | Size | Use Case |
|--------|------|----------|
| `_q` | 150x150 | Square thumbnail |
| `_n` | 320px | Mobile/small |
| `_z` | 640px | Medium |
| `_b` | 1024px | Gallery display |
| `_k` | 2048px | Full resolution |

Example:
```
Original: https://live.staticflickr.com/65535/12345_abc123_b.jpg
Thumbnail: https://live.staticflickr.com/65535/12345_abc123_q.jpg
                                                           ^ change this
```

### Adding an Image

1. **Upload to Flickr** and copy the URL

2. **Create metadata file** at `content/images/your-image.md`:
   ```markdown
   ---
   title: "Tokyo Sunset"
   slug: "tokyo-sunset"
   image: "https://live.staticflickr.com/65535/12345_abc_b.jpg"
   thumbnail: "https://live.staticflickr.com/65535/12345_abc_q.jpg"
   description: "Sunset over Tokyo skyline"
   tags:
     - urban
     - sunset
   location: "Tokyo, Japan"
   capturedAt: "2024-01-15"
   featured: true
   publishedAt: "2024-01-20"
   ---
   ```

3. **Deploy**:
   ```bash
   ./scripts/deploy.sh "Add tokyo-sunset image"
   ```

### Adding a "Behind the Image" Story

Stories are displayed at `/behind-the-image` and provide long-form content about the images. They support full markdown formatting.

1. **Make sure the image exists first** - Stories reference image slugs, so create the image metadata file in `content/images/` first

2. **Create story file** at `content/stories/your-story.md`:
   ```markdown
   ---
   title: "The Story Behind Tokyo Sunset"
   slug: "your-story-slug"
   coverImage: "tokyo-sunset"          # Must match an existing image slug
   relatedImages:                       # Optional - other related images
     - "tokyo-night"
     - "tokyo-tower"
   publishedAt: "2024-01-22"
   ---

   ## Section Title

   Write your story in markdown. You can use:
   - **Bold** and *italic* text
   - Links, lists, blockquotes
   - Multiple sections with ## headings
   - Paragraphs separated by blank lines

   ## Another Section

   Tell the full story behind the image...
   ```

3. **Deploy using the quick deploy script**:
   ```bash
   ./scripts/deploy.sh "Add new story: Tokyo Sunset"
   ```

**Story Features:**
- Full markdown rendering (headings, lists, links, emphasis, blockquotes)
- Cover image with lightbox support
- Related images section at the bottom
- Automatic static page generation
- Mobile-responsive layout

### Updating Content

1. Edit the markdown file
2. Deploy:
   ```bash
   ./scripts/deploy.sh "Update: description"
   ```

### Deleting Content

1. Delete the markdown file
2. Commit and deploy

### Workflow Summary

```
Upload to Flickr → Create .md file → ./scripts/deploy.sh "message" → Refresh browser
```

### Refreshing the Site After Content Updates

When running the development server, the site uses **server-side rendering**. After syncing new content:

1. **Hard refresh the browser**: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)

If images still don't appear, restart the dev server:

```bash
# On the remote server
ssh tangerine@192.168.1.186

# Stop and restart the dev server
pkill -f "next dev"
cd .w/myportfolio
npm run dev -- -H 0.0.0.0
```

**Note:** In development mode, Next.js caches file reads. A browser hard refresh usually picks up new content, but restarting the server guarantees a fresh state.

### Image Guidelines

| Aspect | Recommendation |
|--------|----------------|
| Format | JPG for photos (Flickr handles optimization) |
| Upload Size | Original quality (Flickr generates sizes) |
| Naming | Descriptive titles in Flickr for easy finding |
| Organization | Use Flickr albums to organize by project/theme |

---

## Helper Scripts

The `scripts/` directory contains helpful utilities:

### Flickr URL Converter (`scripts/flickr-url.sh`)

Converts Flickr embed codes or URLs into the format needed for content markdown files.

**Usage:**
```bash
# From Flickr embed code (use single quotes!)
./scripts/flickr-url.sh '<a data-flickr-embed="true" href="..."><img src="..."></a>'

# From direct Flickr URL
./scripts/flickr-url.sh 'https://live.staticflickr.com/65535/12345_abc_b.jpg'
```

**Output:**
```
image: "https://live.staticflickr.com/65535/12345_abc_b.jpg"
thumbnail: "https://live.staticflickr.com/65535/12345_abc_q.jpg"
```

**Important:** Always use **single quotes** when pasting Flickr embed code (not double quotes), otherwise the shell will misinterpret the HTML quotes.

### Deploy Script (`scripts/deploy.sh`)

One-command deployment: commits changes, syncs to server, and restarts dev server.

```bash
./scripts/deploy.sh "Your commit message"
```

This is the **recommended way** to deploy changes. See "Development Workflow" below for details.

### AWS Deploy Script (`scripts/aws-deploy.sh`)

Deploy to AWS S3 static hosting:
```bash
./scripts/aws-deploy.sh up    # Build and deploy
./scripts/aws-deploy.sh sync  # Sync files without rebuild
./scripts/aws-deploy.sh down  # Delete S3 resources
```

---

## Development Workflow

### Option 1: Quick Deploy Script (Recommended)

Use the deploy script for a one-step deployment:

```bash
./scripts/deploy.sh "Your commit message"
```

This automatically:
1. Stages all changes (`git add -A`)
2. Commits with your message
3. Pushes to git repository
4. SSH to server and pulls changes
5. Installs dependencies if needed
6. Restarts the dev server

### Option 2: Manual Deployment

After making changes, commit and push to git, then pull on the server:

```bash
# 1. Stage and commit changes
git add -A
git commit -m "Your commit message"

# 2. Push to git repository
git push

# 3. SSH to server and pull changes
ssh tangerine@192.168.1.186
cd .w/myportfolio
git pull
npm install  # If dependencies changed
exit

# 4. Restart dev server (if needed)
ssh tangerine@192.168.1.186 "pkill -f 'next dev'"
ssh tangerine@192.168.1.186 "cd .w/myportfolio && nvm use && npm run dev -- -H 0.0.0.0 &"
```

**When to use manual deployment:**
- When you need fine-grained control over git commits
- When you're making multiple commits before deploying
- For debugging deployment issues

---

## Documentation

- [Design Document](doc/design-doc.md) - Architecture and technical decisions

---

## Tech Stack

- **Framework:** Next.js 14+ (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** File-based (Markdown)
- **Images:** Flickr (CDN)
- **Deployment:** AWS (S3 + CloudFront) or local server
- **Markdown Rendering:** react-markdown

## Technical Implementation

### Content System

All content is file-based using markdown with frontmatter:

- **Images**: `content/images/*.md` - Image metadata (URLs, title, location, tags)
- **Stories**: `content/stories/*.md` - Long-form stories with full markdown support

Content is loaded server-side using `gray-matter` to parse frontmatter and markdown content.

### Stories Feature

**Routes:**
- `/behind-the-image` - Stories listing page
- `/behind-the-image/[slug]` - Individual story page

**Implementation:**
- Stories are stored as markdown files in `content/stories/`
- Front matter includes: `title`, `slug`, `coverImage` (references image slug), `relatedImages`, `publishedAt`
- Story content is full markdown rendered with `react-markdown`
- Related images are displayed at the bottom of each story
- Static pages are generated at build time using `generateStaticParams()`

**Content Functions** (`src/lib/content.ts`):
- `getStories()` - Returns all stories sorted by date
- `getStoryBySlug(slug)` - Fetches individual story
- `getImages()` - Returns all images
- `getImageBySlug(slug)` - Fetches individual image

### Deployment Flow

1. **Local development**: Make changes, test locally
2. **Commit and push**: `./scripts/deploy.sh "message"` commits, pushes to git
3. **Server pull**: Script SSH to server, runs `git pull` and `npm install`
4. **Restart**: Dev server is restarted to pick up changes
5. **View**: Changes visible at http://192.168.1.186:3000
