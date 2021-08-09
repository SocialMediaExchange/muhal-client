require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

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
    '~/assets/css/global.scss',
  ],
  /*
  ** Plugins to load before mounting the App 
  */
  plugins: [
    { src: '~plugins/i18n.js' },
    { src: '~plugins/filters.js' }
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
    // Doc: https://github.com/nuxt-community/redirect-module
    '@nuxtjs/redirect-module',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: process.env.BASE_API_URL,
    // baseURL: process.client ? 'http://' + process.env.PROJECT_URL + '/api' : 'http://backend:8000/api',
    retry: { retries: 3 }, 
    debug: false
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: `http://${process.env.PROJECT_URL}/api`
    }
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.PRIVATE_BASE_API_URL
    }
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
        // 'postcss-bidirection': {}
        'postcss-logical': {}
      }
    }
  },
  router: {
    middleware: ['ApiLocale',]
  },
  redirect: [
    { from: '^\/[a-z]{2}\/$', to: '/cases' }
  ],
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
    messages: {
      en: {
        ',': ',',
        'muhal': 'Muhal'
      },
      ar: {
        ',': '،',
        'muhal': 'محال'
      }
    }
  }
}
