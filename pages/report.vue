<template>
  <div class="cf mw8 center pv3 muhal-blue">
    <h1>{{ pageTitle }}</h1>
    <div v-html="pageText"></div>
    <report-case-form />
  </div>
</template>

<script>
import marked from "marked"

import ReportCaseForm from "~/components/ReportCaseForm.vue"

export default {
  head() {
    return {
      title: this.page.title || this.$t("report"),
    }
  },
  components: { ReportCaseForm },
  async asyncData({ $axios, params }) {
    try {
      let page = await $axios.$get(`/pages/report`)
      return { page: page }
    } catch (e) {
      return { page: { title: "", slug: "report", text: "" } }
    }
  },
  data() {
    return {}
  },
  computed: {
    pageTitle: function () {
      return this.page.title || this.$t("report")
    },
    pageText: function () {
      return marked(this.page.text)
    },
  },
}
</script>

<style scoped>
</style>

<i18n>
{
  "en": {
    "report": "Report a case"
  },
  "ar": {
    "report": "التبليغ عن حالة"
  }
}
</i18n>
