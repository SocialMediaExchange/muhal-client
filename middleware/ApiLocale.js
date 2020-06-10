export default function (context) {
    let pathLocale = context.route.fullPath.split("/")[1]
    //HACK this is duplicating the work if the i18.js plugin witht he beforeLanguageSwitch function

    context.app.$axios.defaults.headers.common['Accept-Language'] = pathLocale
    // context.app.i18n.setLocale(pathLocale)
    context.app.head.htmlAttrs = {
      lang: pathLocale,
      dir: pathLocale == "ar" ? "rtl" : "ltr"
    }
  }
  