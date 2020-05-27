<template>
  <article class="center mw5 mw6-ns br3 hidden mv4">
    <div
      class="br3 br--top mv0 pv2 ph3"
      v-bind:style="{ 'background-color': typeColor }"
    ></div>
    <div class="pa3 bt b--black-10">
      <p class="f6 f5-ns lh-copy measure">
        something upon this earth!
      </p>
    </div>
  </article>
  <!-- <article class="br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
    <div class="type br4"></div>
    <div class="dt w-100 mt1">
      <div class="dtc">
        <h1 class="f5 f4-ns mv0">Cat</h1>
      </div>
      <div class="dtc tr">
        <h2 class="f5 mv0">$1,000</h2>
      </div>
    </div>
    <p class="f6 lh-copy measure mt2 mid-gray">
      If it fits, i sits burrow under covers. Destroy couch leave hair everywhere,
      and touch water with paw then recoil in horror.
    </p>
  </article>-->
</template>

<script>
const typeColor = {
  'case': 'hsla(238, 41%, 50%, 1)',
  'complaint': 'hsla(8, 41%, 50%, 1)'
}

export default {
  props: ['id', 'title', 'type', 'description'],
  data() {
    return {
      // typeColor: 'blue'
    };
  }, 
  computed: {
    // a computed getter
    typeColor: function () {
      // `this` points to the vm instance
      return typeColor[this.type]
    }
  }
};
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