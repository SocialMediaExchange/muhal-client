
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'muhal.org',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        // import Google Fonts: ElMessiri (bold), and Markaz (regular)
        href: "https://fonts.googleapis.com/css2?family=El+Messiri:wght@700&family=Markazi+Text&display=swap"
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'tachyons/css/tachyons.css',
    '~/assets/css/transitions.css',
    '~/assets/css/global.css',
  ],
  /*
  ** Plugins to load before mounting the App 
  */
  plugins: [
    { src: '~plugins/i18n.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/
    'nuxt-i18n',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:8000/api',
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    postcss: {
      plugins: {
        'postcss-bidirection': {}
      }
    }
  },
  router: {
    middleware: ['ApiLocale',]
  },
  i18n: {
    // Doc: https://nuxt-community.github.io/nuxt-i18n/options-reference.html
    locales: ['ar', 'en', ],
    strategy: 'prefix',
    defaultLocale: 'ar',
    vueI18nLoader: true,
    vuex: {
      // Module namespace
      moduleName: 'i18n',
      // If enabled, current app's locale is synced with nuxt-i18n store module
      syncLocale: true,
      // If enabled, current translation messages are synced with nuxt-i18n store module
      syncMessages: false,
      // Mutation to commit to set route parameters translations
      syncRouteParams: true
    },
    vueI18n: {
      fallbackLocale: 'ar',
      detectBrowserLanguage: false,
    },
  }
}
