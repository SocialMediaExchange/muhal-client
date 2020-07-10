<template>
  <div id="main" :key="$i18n.locale" class="markazi bg-muhal-grey-light"> 
    <!-- HACK :key change forces re-rendering of the page based on the locale  -->
    <Header />
    <div>
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
}
</script>

<style>
html {
  font-size: 1em;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
