<template>
  <header class="w-100 ph5 pv4">
    <nav class="f6 fw6 ttu tracked cover">
      <!-- <img src="~assets/nav.svg" class="static" alt="cover"> -->
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
      <nuxt-link
        :to="localePath('/about')"
        class="ph4 dib v-mid f2 link near-black"
      >{{ $t('about') }}</nuxt-link>
      <!-- FIXME it probably shouldn't be called "cases" -->
      <nuxt-link :to="switchLocalePath(otherLanguage.code)">{{ otherLanguage.label }}</nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {}
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
  background-image: url("~assets/nav.svg");
  background-size: auto 100%;
  background-position-x: right;
  background-repeat: no-repeat;
  color: #3d3356;
}

.mirror {
  transform: scaleX(-1);
}
</style>

<i18n>
{
  "en": {
    "cases": "cases",
    "about": "about"
  },
  "ar": {
    "cases": "الملفّات",
    "about": "عن مُحال"
  }
}
</i18n>