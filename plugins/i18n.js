export default function({ app }) {
  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    // app.$axios.defaults.headers.common['Accept-Language'] = newLocale
    app.head.htmlAttrs = {
      lang: newLocale,
      dir: newLocale == "ar" ? "rtl" : "ltr"
    }
  }
}
