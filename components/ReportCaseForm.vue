<template>
  <form @submit.prevent="sendReport">
    <label class="db">
      {{ $t("plaintiff") }}
      <input type="text" v-model="plaintiff" class="db" />
    </label>

    <label class="db">
      {{ $t("defendant") }}
      <input type="text" v-model="defendant" class="db" />
    </label>

    <label class="db">
      {{ $t("whatHappened") }}
      <textarea
        class="w-80 ma2 db"
        maxlength="1000"
        rows="6"
        name="description"
        placeholder
        v-model="defendant"
      ></textarea>
    </label>
  </form>
</template>
<script>
export default {
  name: "CaseTimeline",
  props: {
    dates: Array
  },
  data() {
    return {
      plaintiff: null
    }
  },
  computed: {}
}
</script>

<style>
</style>

<i18n>
{
  "en": {
    "plaintiff": "Plaintiff",
    "defendant": "Defendant",
    "whatHappened": "What happened?"
  },
  "ar": {
    "plaintiff": "الجهة المدّعية",
    "defendant": "المدّعى عليه",
    "whatHappened": "ما الذي حصل؟"
  }
}
</i18n>
