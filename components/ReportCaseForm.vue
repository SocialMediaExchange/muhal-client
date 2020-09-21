  <template>
  <form @submit.prevent="submitReport">
    <label class="db">
      <h2 class="mb1">{{ $t("plaintiff") }}</h2>
      <input type="text" v-model="plaintiff" class="db ba b--muhal-grey-dark pa2" />
    </label>

    <label class="db">
      <h2 class="mb1">{{ $t("defendant") }}</h2>
      <input type="text" v-model="defendant" class="db ba b--muhal-grey-dark pa2" />
    </label>

    <label class="db">
      <h2 class="mb1">{{ $t("whatHappened") }}</h2>
      <textarea
        class="w-80 db ba b--muhal-grey-dark pa2"
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
      class="f3 mv3 pa2 ba b--muhal-blue"
    />
  </form>
</template>
<script>
export default {
  name: "CaseTimeline",
  props: {
    dates: Array,
  },
  data() {
    return {
      plaintiff: null,
      defendant: null,
      whatHappened: null,
    }
  },
  methods: {
    submitReport: function () {
      console.log(this.plaintiff, this.defendant, this.whatHappened)
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
    "plaintiff": "Plaintiff",
    "defendant": "Defendant",
    "whatHappened": "What happened?",
    "submit": "Submit report"
  },
  "ar": {
    "plaintiff": "الجهة المدّعية",
    "defendant": "المدّعى عليه",
    "whatHappened": "ما الذي حصل؟",
    "submit": "إرسال مساهمة"
  }
}
</i18n>
