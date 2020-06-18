<template>
  <article class="w-100 w-30-ns br3 ma3 bg-muhal-grey">
    <div class="br3 br--top mv0 pv2 ph3" v-bind:style="{ 'background-color': currentStatusColor }"></div>
    <nuxt-link :to="localePath(`/cases/${case_.id}`)">
      <div class="flex flex-wrap pa3 bt b--black-10 f4 fs-normal">
        <div
          class="w-third mb2"
        >{{ case_.defendants.length > 1 ? $t('defendants') : $t('defendant') }}</div>
        <div class="w-two-thirds mb1">
          <ul class="list pa0 ma0">
            <li
              v-for="(defendant, index) in case_.defendants"
              v-bind:key="index"
            >{{ defendant.firstName }} {{ defendant.lastName }}</li>
          </ul>
        </div>
        <div
          class="w-third mb1"
        >{{ case_.plaintiffs.length > 1 ? $t('plaintiffs') : $t('plaintiff') }}</div>
        <div class="w-two-thirds">
          <ul class="list pa0 ma0">
            <li
              v-for="(plaintiff, index) in case_.plaintiffs"
              v-bind:key="index"
            >{{ plaintiff.firstName }} {{ plaintiff.lastName }}</li>
          </ul>
        </div>
        <div class="w-100 f5 measure-narrow">
          <p>{{ case_.summary | truncate(90, 'read more...') }}</p>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
const currentStatusColor = {
  open: "#f89d61",
  closed: "#3d3356",
  abstenia: "#f89d61",
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

<i18n>
{      
  "en": {
    ",": ",", 
    "defendant": "defendant",
    "defendants": "defendants",
    "plaintiff": "plaintiff",
    "plaintiffs": "plaintiffs"
  },
  "ar": {
    ",": "،",
    "defendant": "المدعى عليه/ا",
    "defendants": "المدعى عليهمن",
    "plaintiff": "المدعي",
    "plaintiffs": "المدعون"
  }
}
</i18n>
