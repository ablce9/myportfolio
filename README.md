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

3. **Commit and deploy**:
   ```bash
   git add -A
   git commit -m "Add tokyo-sunset image"
   rsync -avz ./ tangerine@192.168.1.186:.w/myportfolio/
   ```

### Adding a "Behind the Image" Story

1. **Create story file** at `content/stories/your-story.md`:
   ```markdown
   ---
   title: "The Story Behind Tokyo Sunset"
   slug: "behind-tokyo-sunset"
   coverImage: "tokyo-sunset"
   relatedImages:
     - "tokyo-night"
     - "tokyo-tower"
   publishedAt: "2024-01-22"
   ---

   ## The Inspiration

   Write about what inspired this shot...

   ## The Process

   Describe your creative process...

   ## The Result

   Reflect on the final image...
   ```

2. **Commit and deploy**

### Updating Content

1. Edit the markdown file
2. Commit and deploy:
   ```bash
   git add -A
   git commit -m "Update: description"
   rsync -avz ./ tangerine@192.168.1.186:.w/myportfolio/
   ```

### Deleting Content

1. Delete the markdown file
2. Commit and deploy

### Workflow Summary

```
Upload to Flickr → Create .md file → Git commit → Rsync → Refresh browser
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

## Development Workflow

After making changes, commit and sync to the remote server:

```bash
# 1. Stage and commit changes
git add -A
git commit -m "Your commit message"

# 2. Sync to remote server (exclude .next to avoid cache conflicts)
rsync -avz --exclude='.next' ./ tangerine@192.168.1.186:.w/myportfolio/
```

**Note:** `.next` is excluded because build cache from one machine causes errors on another.

### Quick Deploy Script

Use the included deploy script to commit, sync, and restart the server in one command:

```bash
./scripts/deploy.sh "Add new gallery images"
```

This script:
1. Stages all changes
2. Commits with your message
3. Syncs to remote server (excluding `.next`)
4. Restarts the dev server

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
