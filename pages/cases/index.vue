<template>
  <div>
    <case-card type="case"/>
    <case-card type="complaint"/>
    <case-card type="complaint"/>
    <case-card type="complaint"/>
    <case-card type="case"/>
  </div>
</template>

<script>
import CaseCard from "~/components/CaseCard.vue";

export default {
  head() {
    return {
      title: "Case list"
    }
  },
  components: {
    CaseCard
  },
  asyncData(context) {
    let data = {}
    return {
      cases: data
    }
  },
  data() {
    return {
      cases: []
    }
  },
  methods: {
    shareCase(case_id) {
      console.log(deleted`${case_id.id}`)
    }
  }
};
</script>

<style>
</style>
