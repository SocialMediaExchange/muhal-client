<template>
  <div class="cf mw8 center pv3">
    <h1>{{ about.title }}</h1>
    <div v-html="aboutText"></div>
  </div>
</template>

<script>

import marked from "marked"


export default {
  head() {
    return {
      title: this.about.title || this.$t("about")
    }
  },
  components: {},
  async asyncData({ $axios, params }) {
    try {
      let about = await $axios.$get(`/pages/about`)
      return { about: about }
    } catch (e) {
      return {}
    }
  },
  data() {
    return {}
  },
  computed: {
    aboutText: function(){
      return marked(this.about.text)
    }
  }
}
</script>

<style scoped>
</style>

<i18n>
{
  "en": {
    "about": "About Muhal"
  },
  "ar": {
    "about": "عن مُحال"
  }
}
</i18n>
