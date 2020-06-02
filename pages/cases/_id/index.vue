<template>
  <div v-if="id">
    <p>{{ id }}</p>
    <p>{{ summary }}</p>
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: "Case detail"
    }
  },
  components: {},
  async asyncData({ $axios, params }) {
    try {
      let case_ = await $axios.$get(`/cases/${params.id}`)
      return { ...case_ }
    } catch (e) {
      return {}
    }
  },
  data() {
    return {
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
