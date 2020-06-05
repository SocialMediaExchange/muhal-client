<template>
  <div id="main" :dir="dir" :key="dir">
    <Header />
    <div class="mw8 center ph-ns pv4">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/Header.vue"
import Footer from "~/components/Footer.vue"

export default {
  head() {
    return {
      title: "Case list"
    }
  },
  components: {
    Header,
    Footer
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
  font-family: "Markazi Text", serif;
  font-size: 1em;
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
