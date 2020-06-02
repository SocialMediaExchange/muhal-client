<template>
  <footer>
    {{ license }} <a href="https://smex.org" target="_blank">SMEX - سمكس</a>
  </footer>
</template>

<script>

export default {
  data() {
    return {
      license: this.$t('license')
    }
  },
}
</script>

<style>
</style>

<i18n>
{
  "en": {
    "license": "CC-BY"
  },
  "ar": {
    "license": "المشاع الإبداعي - النسبة"
  }
}
</i18n>