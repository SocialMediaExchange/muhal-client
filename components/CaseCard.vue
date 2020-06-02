<template>
  <nuxt-link :to="`/cases/${case_.id}`">
    <article class="center mw5 mw6-ns br3 hidden mv4">
      <div
        class="br3 br--top mv0 pv2 ph3"
        v-bind:style="{ 'background-color': currentStatusColor }"
      ></div>
      <div class="pa3 bt b--black-10">
        <p class="f6 f5-ns lh-copy measure">
          <span
            v-for="(defendant, index) in case_.defendants"
            v-bind:key="index"
          >{{ defendant.firstName }} {{ defendant.lastName }}</span>
        </p>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
const currentStatusColor = {
  open: "hsla(238, 41%, 50%, 1)",
  closed: "hsla(80, 41%, 50%, 1)",
  abstenia: "hsla(120, 41%, 50%, 1)",
  na: "hsla(210, 41%, 50%, 1)"
}

export default {
  props: ["case_"],
  async asyncData({ $axios, params }) {},
  data() {
    return {}
  },
  computed: {
    currentStatusColor: function() {
      return currentStatusColor[this.case_.currentStatus]
    }
  }
}
</script>

<style>
.card {
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.type {
  background-color: red;
  height: 1rem;
}
</style>