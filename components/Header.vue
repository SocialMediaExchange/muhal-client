<template>
  <header class="w-100 ph5 pv4 bb b--muhal-blue messiri muhal-blue">
    <nav class="f6 fw6 ttc cover cf">
      <!-- <img src="~assets/nav.svg" class="static" alt="cover"> -->
      <div class="dib w-100 w-20-ns v-mid-ns">
        <nuxt-link :to="localePath('/')" class="pa1">
          <img src="~assets/logo.svg" class="h3" :class="$i18n.locale == 'en' ? 'mirror' : ''" />
        </nuxt-link>
      </div>
      <div class="dib w-100 w-30-ns">&nbsp;</div>
      <div class="dib w-100 w-10-ns v-mid-ns">
        <nuxt-link :to="localePath('/cases')" class="f3 link v-mid">{{ $t('cases') }}</nuxt-link>
      </div>
      <div class="dib w-100 w-10-ns v-mid-ns">
        <nuxt-link :to="localePath('/about')" class="f3 link">{{ $t('about') }}</nuxt-link>
      </div>
      <div class="dib w-100 w-auto-ns v-mid-ns">
        <nuxt-link
          :to="localePath('/report')"
          class="f3 pa2-ns link muhal-blue br2 ba-ns bw1 b--muhal-blue"
        >{{ $t('report') }}</nuxt-link>
      </div>
      <div class="dib w-100 w-10-ns  v-mid-ns">
        <!-- FIXME it probably shouldn't be called "cases" -->
        <nuxt-link
          class="f4 ph4-ns link muhal-blue"
          :to="switchLocalePath(otherLanguage.code)"
        >{{ otherLanguage.label }}</nuxt-link>
      </div>
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

<style scoped lang="scss">
header {
  background-color: white;
}

a:visited {
  // color: $muhal-blue;
  color: hsla(257, 26%, 27%, 1);
}
</style>

<i18n>
{
  "en": {
    "cases": "cases",
    "about": "about",
    "report": "Report a case"
  },
  "ar": {
    "cases": "الحالات",
    "about": "عن مُحال",
    "report": "التبليغ عن حالة"
  }
}
</i18n>