# Filecoin Foundation for the Decentralized Web

## Overview

- This is the repository for the _Filecoin Foundation for the Decentralized Web_ website ([ffdweb.org](https://ffdweb.org))

- This repo represents a static site which requires compilation, but can then be served as a static resource
- This site is hosted on IPFS and is compatible with relative URLs, for IPFS and IPNS gateway paths
- The site's resources are served statically, but internal navigation is virtualized: in other words, the site acts as an SPA when browsed on the client
- While a static site, this app can be extended at any time to a full application by changing the `target` in settings

## Stack
- Requires nodeJS and has been tested on node 16
- Uses a Vue framework, [nuxtJS](https://nuxtjs.org/), deployed in static mode

## Build
To build this site locally
- Clone this repo
- Make sure NodeJS 16 or newer is installed
- To build a static site
    - Run `npm ci && npm run generate`
    - A directory `dist` is created, which contains the static site output
- To run locally, for features like hot reload
    - Run `npm ci && npm run dev`
    - The site will be available in real time via a localhost URL
    - Resources are compiled in this process; for example, all SCSS styles are converted to CSS and tree-shaken
- The root directory of the repo should have a self-signed certificate (which is `.gitignore`d). Below is an example of how to create one in the MacOS shell with `mkcert`.

```zsh
cd ~/.ssh
brew install mkcert
mkcert -install
mkcert -key-file localhost_key.pem -cert-file localhost_cert.pem localhost 127.0.0.1
cat localhost_cert.pem > localhost_fullchain.pem
cat "$(mkcert -CAROOT)/rootCA.pem" >> localhost_fullchain.pem

# go to the current project root directory and run
cp -v ~/.ssh/localhost_cert.pem ~/.ssh/localhost_key.pem .
```

## URLs and branches
- Staging - `develop` builds to `a non public url`
- Production - `main` builds to `ffdweb.org`
- Content - `content` is a branch that the CMS writes to
  - When pull requested against `main`, the `content` branch will be auto approved by a Github action
- Each PR will also generate an IPFS build preview link, so it can be validated before being merged

## Structure
Key areas of this repo include
- `/pages` - All page templates
- `/components` - Each reusable collection of elements is abstracted to a component, and most components accept various properties that determine the way they are rendered
- `/static` - Static resources which will be available post-compile
- `/assets/scss` - The global styles for the app are available here in SASS/SCSS, more specific styles can be found at the bottom of `.vue` pages and components ([single file components on vuejs.org](https://vuejs.org/guide/scaling-up/sfc.html))
- `/assets/svgs` - Contains iconography or other small vectors, in SVG format
- `/content` - The site's content, which is edited using the Forestry CMS

## Managing Content
- Editing content directly
  - Structured content can be found in `json` files
  - Written paragraph-type content can be found in `md` files, in markdown format
  - See the `content/pages/` directory
- Editing content via the CMS
  - Content can be edited via Forestry.io, and requires a login
  - Global site content, like default metadata, is editable in the `general` section
  - Structured content is shown in blocks on a per-page basis (see `pages` section)
  - Blog content is fully editable in a wysiwyg markdown editor
  - Media, such as images or videos*, can be uploaded directly to the repository via the `media` section, after which point it can be used in any rich media field
    - Uploaded vidoes on this site can be rendered in markdown, but it's recommended to use the media service that's integrated for the site's videos instead, [Slate](https://slate.host/), which stores content on IPFS
