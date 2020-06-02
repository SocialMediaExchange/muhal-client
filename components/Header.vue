<template>
  <header class="w-100 ph5 pv4">
    <nav class="f6 fw6 ttu tracked">
      <nuxt-link to="/" class="ph4 dib v-mid f2 link near-black">
        <img src="~assets/logo.svg" class="h3 dib v-mid" />
      </nuxt-link>

      <nuxt-link to="cases" class="ph4 dib v-mid f2 link near-black">{{ $t('cases') }}</nuxt-link>
      <nuxt-link to="cases" class="ph4 dib v-mid f2 link near-black">{{ $t('cases') }}</nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      license: "CC-BY"
    }
  }
}
</script>

<style scoped>
header {
  background-color: hsla(42, 91%, 78%, 1);
  color: #3d3356;
}
</style>

<i18n>
{
  "en": {
    "cases": "cases"
  },
  "ar": {
    "cases": "الملفّات"
  }
}
</i18n>