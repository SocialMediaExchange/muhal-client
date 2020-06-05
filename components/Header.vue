<template>
  <header class="w-100 ph5 pv4">
    <nav class="f6 fw6 ttu tracked">
      <nuxt-link :to="localePath('/')" class="ph4 dib v-mid f2 link near-black">
        <img
          src="~assets/logo.svg"
          class="h3 dib v-mid"
          :class="$i18n.locale == 'en' ? 'mirror' : ''"
        />
      </nuxt-link>
      <nuxt-link
        :to="localePath('/cases')"
        class="ph4 dib v-mid f2 link near-black"
      >{{ $t('cases') }}</nuxt-link>  
      <!-- FIXME it probably shouldn't be called "cases" -->
      <nuxt-link :to="switchLocalePath(otherLanguage.code)">{{ otherLanguage.label }}</nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      license: "CC-BY"
    }
  },
  computed: {
    otherLanguage: function() {
      return this.$i18n.locale == "ar"
        ? { code: "en", label: "English" }
        : { code: "ar", label: "عربي" }
    }
  }
}
</script>

<style scoped>
header {
  background-color: hsla(42, 91%, 78%, 1);
  color: #3d3356;
}
.mirror {
  transform: scaleX(-1);
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