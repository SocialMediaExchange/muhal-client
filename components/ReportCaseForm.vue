<template>
  <div>
    <form @submit.prevent="submitReport" v-if="!submitSuccessful">
      <label class="db">
        <h2 class="mb1">{{ $t("contact") }}</h2>
        <input type="text" v-model="submitter" class="w-60 db ba b--muhal-grey-dark pa2" />
      </label>

      <label class="db">
        <h2 class="mb1">{{ $t("country") }} *</h2>
        <select v-model="country" class="w-60 db ba b--muhal-grey-dark pa2">
          <option value="lebanon">{{ $t('lebanon')}}</option>
          <option value="jordan">{{ $t('jordan')}}</option>
          <option value="other">{{ $t('other')}}</option>
        </select>
      </label>

      <label class="db">
        <h2 class="mb1">{{ $t("plaintiff") }} *</h2>
        <input type="text" v-model="plaintiff" class="w-60 db ba b--muhal-grey-dark pa2" />
      </label>

      <label class="db">
        <h2 class="mb1">{{ $t("defendant") }} *</h2>
        <input type="text" v-model="defendant" class="w-60 db ba b--muhal-grey-dark pa2" />
      </label>

      <label class="db">
        <h2 class="mb1">{{ $t("whatHappened") }} *</h2>
        <textarea
          class="w-60 db ba b--muhal-grey-dark pa2"
          maxlength="1000"
          rows="6"
          name="description"
          placeholder
          v-model="whatHappened"
        ></textarea>
      </label>
      <input
        type="submit"
        :value="$t('submit')"
        @click="submitReport"
        class="f2 fw6 mv3 pv1 ph5 ba bw2 b--muhal-blue"
        :disabled="submitDisabled"
      />
      <span v-if="incomplete" class="f3 muhal-pink">{{ $t("incomplete") }}</span>
      <span class="f3 muhal-pink">{{ errorMessage }}</span>
    </form>
    <div v-if="submitSuccessful" class="f2">{{ $t("submitSuccessful") }}</div>
  </div>
</template>
<script>
export default {
  name: "CaseTimeline",
  props: {
    dates: Array,
  },
  data() {
    return {
      submitter: null,
      country: "lebanon",
      plaintiff: null,
      defendant: null,
      whatHappened: null,
      incomplete: false,
      errorMessage: null,
      submitSuccessful: false,
      submitDisabled: false,
    }
  },
  methods: {
    submitReport: function () {
      if (
        this.country &&
        this.plaintiff &&
        this.defendant &&
        this.whatHappened
      ) {
        this.submitDisabled = true
        this.$axios
          .$post("/reports/", {
            submitter: this.submitter,
            country: this.country,
            plaintiff: this.plaintiff,
            defendant: this.defendant,
            what_happened: this.whatHappened,
          })
          .then((response) => (this.submitSuccessful = true))
          .catch((error) => (this.errorMessage = this.$t("submitError")))
          .then(() => (this.submitDisabled = false)) // equivalent to finally - always executed
      } else {
        this.errorMessage = this.$t("incomplete")
      }
    },
  },
  computed: {},
}
</script>

<style>
</style>

<i18n>
{
  "en": {
    "contact": "Your e-mail, Signal, or WhatsApp number",
    "country": "Country",
    "lebanon": "Lebanon",
    "jordan": "Jordan",
    "other": "Other",
    "plaintiff": "Plaintiff",
    "defendant": "Defendant",
    "whatHappened": "What happened?",
    "submit": "Submit",
    "submitError": "There was an error during submission! Please try again later.",
    "submitSuccessful": "Thank you for submitting a report! We might get in touch to ask about further details!",
    "incomplete": "Please fill out all the fields"
  },
  "ar": {
    "contact": "عنوان البريد الإلكتروني، أو رقم الواتساب أو سيغنال الخاص بك",
    "country": "الدولة",
    "lebanon": "لبنان",
    "jordan": "الأردن",
    "other": "دولة أخرى",
    "plaintiff": "الجهة المدّعية",
    "defendant": "الجهة المدّعى عليها",
    "whatHappened": "ما الذي حصل؟",
    "submit": "إرسال",
    "submitError": "واجهنا مشكلة عند تسليم الاستمارة! الرجاء إعادة المحاولة لاحقاً!",
    "submitSuccessful": "شكراً للتبليغ عن حالة! يمكن أن نتواصل معك للتحقّق من بعض التفاصيل.",
    "incomplete": "الرجاء إتمام كامل خانات الاستمارة"
  }
}
</i18n>
