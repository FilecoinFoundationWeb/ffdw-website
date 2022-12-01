export default {
  // //////////////////////////////////////////// Static Site Generation Options
  // ---------------------------------------------------------------------------
  target: 'static',
  // ///////////////////////////////////////////////////// Runtime Configuration
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------- [Runtime] Public
  publicRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV,
    serverEnv: process.env.SERVER_ENV,
    slateKey: process.env.SLATE_KEY,
    seo: {
      siteName: 'Filecoin Foundation for the Decentralized Web',
      siteUrl: 'https://ffdweb.org'
    },
    redirects: []
  },
  // --------------------------------------------------------- [Runtime] Private
  privateRuntimeConfig: {},
  // /////////////////////////////////////////////////////////// Server & Render
  // ---------------------------------------------------------------------------
  server: {
    port: 25000,
    host: process.env.NODE_ENV !== 'development' ? '0.0.0.0' : 'localhost'
  },
  render: {
    bundleRenderer: {
      runInNewContext: false
    }
  },
  // /////////////////////////////////////////////////////// Headers of the Page
  // ---------------------------------------------------------------------------
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon-96x96.png', sizes: '96x96' }
    ]
  },
  // ////////////////////////////////////////// Customize the progress-bar color
  // ---------------------------------------------------------------------------
  loading: {
    color: '#000000',
    height: '4px'
  },
  // /////////////////////////////////////////////////////////// Global CSS/SCSS
  // ---------------------------------------------------------------------------
  css: [
    '~/assets/scss/main.scss'
  ],
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss'
    ]
  },
  // /////////////////////////////////////////////////////// Nuxt.js Dev Modules
  // ---------------------------------------------------------------------------
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/moment-module#readme
    '@nuxtjs/moment'
  ],
  // /////////////////////////////////////////////////////////// Nuxt.js Modules
  // ---------------------------------------------------------------------------
  modules: [
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/agency-undone/au-nuxt-module-zero
    '@agency-undone/au-nuxt-module-zero',
    // Doc: https://sitemap.nuxtjs.org
    // '@nuxtjs/sitemap',
    // Doc: https://content.nuxtjs.org
    '@nuxt/content',
    // https://github.com/agency-undone/nuxt-module-matomo
    '@agency-undone/nuxt-module-matomo'
  ],
  // ///////////////////////////////////////////////////// [Module] Nuxt-content
  // ---------------------------------------------------------------------------
  content: {
    markdown: {
      prism: {
        theme: false
      }
    }
  },
  // ///////////////////////////////////////////////////////////// [Module] Zero
  // ---------------------------------------------------------------------------
  zero: {
    core: {
      include: true,
      toaster: {
        display: 10,
        timeout: 5000
      }
    },
    filters: {
      include: true
    },
    pagination: {
      include: true
    }
  },
  // /////////////////////////////////////////////////////////// [Module] Matomo
  // ---------------------------------------------------------------------------
  matomo: {
    include: true,
    src: 'https://cdn.matomo.cloud/fil.matomo.cloud/container_bLbvNCPm.js',
    routing: true,
    target: 'tag-manager'
  },
  // ///////////////////////////////////////////////////////// [Module] MomentJS
  // ---------------------- Doc: https://github.com/nuxt-community/moment-module
  moment: {
    timezone: true,
    defaultTimezone: 'UTC'
  },
  // ///////////////////////////////////////////////////////////// [Module] Zero
  // ------------------------------------------- Dox: https://sitemap.nuxtjs.org
  sitemap: {
    hostname: '/'
  },
  // //////////////////////////////////////////////////////////// [Module] Axios
  // -------------------------------------- See https://axios.nuxtjs.org/options
  axios: {
  },
  // /////////////////////////////////// Plugins to load before mounting the App
  // ---------------------------------------------------------------------------
  plugins: [],
  // /////////////////////////////////////////////////////// Router + Middleware
  // ---------------------------------------------------------------------------
  router: {},
  // /////////////////////////////////////////////////////// Build configuration
  // ------------------------------------------------ Extend webpack config here
  build: {
    // ---------------------------------------------------------- Hot Middleware
    hotMiddleware: {
      client: {
        overlay: false
      }
    },
    // -------------------------------------------------------------- Extensions
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader'
      })
    }
  }
}
