<template>
  <div class="cf mw8 center pv3">
    <h1>{{ about.title }}</h1>
    <div v-html="aboutText"></div>
    <report-case-form/>
  </div>
</template>

<script>
import marked from "marked"

import ReportCaseForm from "~/components/ReportCaseForm.vue"

export default {
  head() {
    return {
      title: this.about.title || this.$t("about")
    }
  },
  components: { ReportCaseForm },
  async asyncData({ $axios, params }) {
    try {
      let about = await $axios.$get(`/pages/report`)
      return { about: about }
    } catch (e) {
      return { about: {} }
    }
  },
  data() {
    return {}
  },
  computed: {
    aboutText: function() {
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
    "about": "Report a case"
  },
  "ar": {
    "about": "التصريح عن حالة"
  }
}
</i18n>
