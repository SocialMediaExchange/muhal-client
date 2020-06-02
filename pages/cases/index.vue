<template>
  <div v-if="cases">
    <case-card v-for="case_ in cases" v-bind:key="case_.id" :case_="case_"></case-card>
  </div>
</template>

<script>
import CaseCard from "~/components/CaseCard.vue"

export default {
  head() {
    return {
      title: "Case list"
    }
  },
  components: {
    CaseCard
  },
  async asyncData({ $axios, params }) {
    try {
      let cases = await $axios.$get(`/cases/`)
      return { cases: cases }
    } catch (e) {
      return { cases: [] }
    }
  },
  data() {
    return {
      cases: []
    }
  },
  methods: {
    shareCase(case_id) {
      console.log(`share ${case_id}`)
    }
  }
}
</script>

<style>
</style>
