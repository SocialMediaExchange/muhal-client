<template>
  <article class="center mw5 mw6-ns br3 hidden mv4">
    <div class="br3 br--top mv0 pv2 ph3" v-bind:style="{ 'background-color': typeColor }"></div>
    <div class="pa3 bt b--black-10">
      <p class="f6 f5-ns lh-copy measure">something upon this earth!</p>
    </div>
  </article>
</template>

<script>
const typeColor = {
  case: 'hsla(238, 41%, 50%, 1)',
  complaint: 'hsla(80, 41%, 50%, 1)'
}

export default {
  props: ["id", "title", "type", "description"],
  async asyncData({ $axios, params }) {

  },
  data() {
    return {}
  },
  computed: {
    typeColor: function() {
      return typeColor[this.type]
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