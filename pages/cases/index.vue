<template>
  <div>
    <case-card type="case" />
    <case-card type="complaint" />
    <case-card type="complaint" />
    <case-card type="complaint" />
    <case-card type="case" />

    <case-card v-for="_case in cases" v-bind:key="_case.id" :type="_case.type">
      {{ item.text }}
    </case-card>
    
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
  async asyncData(context) {
    try {
      let cases = await $axios.$get(`/cases/`)
      return { cases }
    } catch (e) {
      return { cases: [] }
    }

  },
  data() {
    return {
      //cases: []
    }
  },
  methods: {
    shareCase(case_id) {
      console.log(deleted`${case_id.id}`)
    },
  }
}
</script>

<style>
</style>
