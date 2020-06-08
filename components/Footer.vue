<template>
  <footer class="bg-muhal-purple muhal-white">
    <div class="mw8 center ph-ns pv4">
      {{ $t("license") }}
      <a href="https://smex.org" target="_blank" class="muhal-white">SMEX - سمكس</a>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style>
.bg-muhal-purple { 
  /* FIXME why is it not picking up the style from global.css?  */
  background-color: hsla(253, 24%, 27%, 1);
}
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