<template>
  <footer class="bg-muhal-purple muhal-white">
    <div class="mw8 center ph-ns pv4">
      <div class="cf ph2-ns">
        <div class="fl w-100 w-50-ns">
          <h3 class="mv1">{{ $t("connect") }}</h3>
          <a class="link dim muhal-grey" href="https://twitter.com/MuhalFoE">
            {{ $t("twitter") }}
          </a>
          -
          <a class="link dim muhal-grey" href="mailto:muhal@smex.org">
            {{ $t("email") }}
          </a>
          <p class="" v-html="$t('licenseStatement')"></p>
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            <img
              alt="Creative Commons License"
              style="border-width: 0"
              src="https://i.creativecommons.org/l/by/4.0/88x31.png"
            />
          </a>
        </div>
        <div class="fl w-100 w-50-ns">
          <a class="mt0" href="https://smex.org"
            ><img class="h3 pa3 bg-muhal-grey-light br3" src="~assets/smex_logo.svg" alt="SMEX Logo"
          /></a>
          <p class="mt0">{{ $t("smex") }}</p>
          <!-- <svg
              data-icon="twitter"
              viewBox="0 0 32 32"
              style="fill: currentcolor"
            >
              <title>Muhal on Twitter</title>
              <path
                d="M2 4 C6 8 10 12 15 11 A6 6 0 0 1 22 4 A6 6 0 0 1 26 6 A8 8 0 0 0 31 4 A8 8 0 0 1 28 8 A8 8 0 0 0 32 7 A8 8 0 0 1 28 11 A18 18 0 0 1 10 30 A18 18 0 0 1 0 27 A12 12 0 0 0 8 24 A8 8 0 0 1 3 20 A8 8 0 0 0 6 19.5 A8 8 0 0 1 0 12 A8 8 0 0 0 3 13 A8 8 0 0 1 2 4"
              ></path>
            </svg> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {}
  },
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
    "license": "CC-BY",
    "licenseStatement": "Unless otherwise specified, the content of the Muhal.org platform is under a <a class=\"link dim underline muhal-white\" rel=\"license\" href=\"http://creativecommons.org/licenses/by/4.0/\">Creative Commons Attribution 4.0 International License</a>.",
    "connect": "Connect with us",
    "twitter": "Twitter",
    "email": "E-mail",
    "smex": "Muhal is a project by SMEX.org"
  },
  "ar": {
    "license": "المشاع الإبداعي - النسبة",
    "licenseStatement": "باستثناء إشعار آخر، محتوى موقع مٌحال مرخّص بموجب <a class=\"link dim underline muhal-white\" rel=\"license\" href=\"http://creativecommons.org/licenses/by/4.0/\">برخصة المشاع الإبداعي نَسب المُصنّف 4.0 دولي</a>.",
    "connect": "تواصلوا معنا",
    "twitter": "تويتر",
    "email": "البريد الإلكتروني",
    "smex": "مشروع مُحال من منظّمة سمكس للحقوق الرقميّة"
  }
}
</i18n>