<template>
  <div id="main" :dir="dir">
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/Header.vue"
import Footer from "~/components/Footer.vue"

export default {
  head() {
    return {
      title: "Case list",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=El+Messiri:wght@700&display=swap"
        }
      ]
    }
  },
  components: {
    Header,
    Footer
  },
  async asyncData({ $axios, params }) {
    try {
      return {}
    } catch (e) {
      return {}
    }
  },
  data() {
    return {}
  },
  computed: {
    dir() {
      return this.$i18n.locale == "ar" ? "rtl" : "ltr"
    }
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "El Messiri", sans-serif;
}
</style>
