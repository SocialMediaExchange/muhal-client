<template>
  <div class="cf w-90 center">
    <div class="fs f4 w-25 ma4 pa3 bg-muhal-grey">
      <h2>{{ $t("filterCases.title") }}</h2>
      <form @submit.prevent="handleSubmit">
        <label for="text-content">
          <input
            type="search"
            id="text-content"
            class="w-100 br4 pa2 bw0"
            :placeholder="$t('filterCases.searchContent')"
          />
        </label>

        <!-- case types  -->
        <fieldset class="bw0 mv3">
          <legend class="fw7">{{ $t("filterCases.caseType") }}</legend>
          <label for="complaints">
            <input type="checkbox" id="complaints" checked />
            {{ $t("filterCases.complaints") }}
          </label>
          <label for="lawsuits" class>
            <input type="checkbox" id="lawsuits" checked />
            {{ $t("filterCases.lawsuits") }}
          </label>
        </fieldset>

        <!-- case status  -->
        <fieldset class="bw0 mv3">
          <legend class="fw7">{{ $t("filterCases.caseStatus") }}</legend>
          <label for="case-open" class="db">
            <input type="checkbox" id="case-open" checked />
            {{ $t("filterCases.caseOpen") }}
          </label>
          <label for="case-closed" class="db">
            <input type="checkbox" id="case-closed" checked />
            {{ $t("filterCases.caseClosed") }}
          </label>
          <label for="case-closed" class="db">
            <input type="checkbox" id="case-pending" checked />
            {{ $t("filterCases.casePending") }}
            <!-- FIXME ensure that we're using the correct statuses -->
          </label>
        </fieldset>

        <!-- plaintiff options -->
        <fieldset class="bw0 mv3">
          <label for="plaintiffs">
            <legend class="fw7">{{ $t("filterCases.plaintiffs") }}</legend>
            <select name="plaintiffs" id="plaintiff-options" class="w-100">
              <option selected value="all">--> {{ $t("filterCases.allPlaintiffs") }}</option>
              <option
                v-for="plaintiff in plaintiffs"
                :key="plaintiff.id"
                :value="plaintiff.id"
              >{{ plaintiff.firstName }} {{ plaintiff.lastName }}</option>
            </select>
          </label>
        </fieldset>

        <!-- platform options -->
        <fieldset class="bw0 mv3">
          <label for="plaintiffs">
            <legend class="fw7">{{ $t("filterCases.platforms") }}</legend>
            <select name="plaintiffs" id="plaintiff-options" class="w-100">
              <option selected value="all">--> {{ $t("filterCases.allPlatforms") }}</option>
              <option
                v-for="platform in platforms"
                :key="platform[0]"
                :value="platform[0]"
              >{{ platform[1] }}</option>
            </select>
          </label>
        </fieldset>

        <!-- publication date options -->
        <fieldset class="bw0 mv3">
          <legend class="fw7">{{ $t("filterCases.publicationDate") }}</legend>
          <label for="publication-date" class="db">
            {{ $t("filterCases.start") }}
            <input type="date" name="start-date" class="bw0" />
          </label>
          <label for="publication-date" class="db">
            {{ $t("filterCases.until") }}
            <input type="date" name="end-date" class="bw0" :value="new Date() | formatDate"/>
          </label>
        </fieldset>
      </form>
    </div>
    <div v-if="cases" class="fs w-70 flex flex-wrap pv4">
      <case-card v-for="case_ in cases" v-bind:key="case_.id" :case_="case_" />
    </div>
  </div>
</template>

<script>
import CaseCard from "~/components/CaseCard.vue"

export default {
  head() {
    return {
      title: this.$t("caseList")
    }
  },
  components: {
    CaseCard
  },
  async asyncData({ $axios, params }) {
    try {
      let cases = await $axios.$get(`/cases/`)
      let plaintiffs = await $axios.$get(`/plaintiffs/`)
      let platforms = await $axios.$get(`/platforms/`)
      return { cases: cases, plaintiffs: plaintiffs, platforms: platforms }
    } catch (e) {
      return { cases: [], plaintiffs: [], platforms: [] }
    }
  },
  data() {
    return {
      cases: [],
      plaintiffs: [],
      platforms: []
    }
  },
  methods: {
    shareCase(case_id) {
      console.log(`share ${case_id}`)
    }
  },
  computed: {
  }
}
</script>

<style>
</style>

<i18n>
{      
  "en": {
    ",": ",", 
    "caseList": "Case List",
    "filterCases": {
      "title": "Filter cases",
      "searchContent": "Search...",
      "caseType": "Case type",
      "complaints": "Complaints",
      "lawsuits": "Law suits",
      "caseStatus": "Case status",
      "caseOpen": "Open",
      "caseClosed": "Closed",
      "casePending": "Pending appeal or objection",
      "plaintiffs": "Plaintiffs",
      "allPlaintiffs": "All plaintiffs", 
      "platforms": "Platforms",
      "allPlatforms": "All platforms",
      "publicationDate": "Publication date",
      "start": "Starting",
      "until": "Until"
    }
  },
  "ar": {
    ",": "،",
    "caseList": "لائحة الحالات",
    "filterCases": {
      "title": "انتقاء الحالات",
      "searchContent": "البحث...",
      "caseType": "نوع الحالة",
      "complaints": "شكاوى",
      "lawsuits": "قضايا",
      "caseStatus": "وضع الحالة",
      "caseOpen": "مفتوحة",
      "caseClosed": "مغلقة",
      "casePending": "بانتظار استئناف أو اعتراض",
      "plaintiffs": "المدّعون",
      "allPlaintiffs": "كل المدّعون",
      "platforms": "المنصّات",
      "allPlatforms": "كل المنصّات",
      "publicationDate": "تاريخ النشر",
      "start": "منذ",
      "until": "إلى"
    }
  }
}
</i18n>
