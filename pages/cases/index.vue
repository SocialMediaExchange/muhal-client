<template>
  <div class="cf w-80 center">
    <div class="fs f4 w-20">
      <div class="mh3 mv4 pa3 bg-muhal-grey br2">
        <h2>{{ $t("filterCases.title") }}</h2>
        <form @submit.prevent="updateFilter">
          <label for="text-content">
            <input
              type="search"
              id="text-content"
              class="w-100 br4 pa2 bw0"
              :placeholder="$t('filterCases.searchContent')"
              v-model="filter.searchText"
            />
          </label>

          <!-- case types  -->
          <fieldset class="bw0 mv3">
            <legend class="fw7">{{ $t("filterCases.caseType") }}</legend>
            <label for="complaints">
              <input type="checkbox" id="complaints" v-model="filter.typeComplaints" />
              {{ $t("filterCases.complaints") }}
            </label>
            <label for="lawsuits" class>
              <input type="checkbox" id="lawsuits" v-model="filter.typeCases" />
              {{ $t("filterCases.lawsuits") }}
            </label>
          </fieldset>

          <!-- case status  -->
          <fieldset class="bw0 mv3">
            <legend class="fw7">{{ $t("filterCases.caseStatus") }}</legend>
            <label for="case-open" class="db">
              <input type="checkbox" id="case-open" v-model="filter.statusOpen" />
              {{ $t("filterCases.caseOpen") }}
            </label>
            <label for="case-closed" class="db">
              <input type="checkbox" id="case-closed" v-model="filter.statusClosed" />
              {{ $t("filterCases.caseClosed") }}
            </label>
            <label for="case-closed" class="db">
              <input type="checkbox" id="case-pending" v-model="filter.statusPending" />
              {{ $t("filterCases.casePending") }}
              <!-- FIXME ensure that we're using the correct statuses -->
            </label>
          </fieldset>

          <!-- plaintiff options -->
          <fieldset class="bw0 mv3">
            <label for="plaintiffs">
              <legend class="fw7">{{ $t("filterCases.plaintiffs") }}</legend>
              <select
                name="plaintiffs"
                id="plaintiff-options"
                class="w-100"
                v-model="filter.plaintiffs"
              >
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
            <label for="platforms">
              <legend class="fw7">{{ $t("filterCases.platforms") }}</legend>
              <select
                name="platforms"
                id="platform-options"
                class="w-100"
                v-model="filter.platforms"
              >
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
              <input
                type="date"
                name="start-date"
                :min="earliestCaseDate"
                :max="new Date() | formatDate"
                v-model="filter.fromDateOfPublication"
                class="bw0 ma1"
              />
            </label>
            <label for="publication-date" class="db">
              {{ $t("filterCases.until") }}
              <input
                type="date"
                name="end-date"
                :min="earliestCaseDate"
                :max="new Date() | formatDate"
                v-model="filter.endDateOfPublication"
                class="bw0 ma1"
              />
            </label>
          </fieldset>
        </form>
        <h2 class>{{ caseCount }} {{ $t("filterCases.cases") }}</h2>
      </div>
    </div>
    <div v-if="cases" class="fs w-80 flex flex-wrap mv4">
      <case-card v-for="case_ in filteredCases" v-bind:key="case_.id" :case_="case_" />
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
    let filter = {
      searchText: '',
      typeComplaints: true,
      typeCases: true,
      statusOpen: true,
      statusClosed: true,
      statusPending: true,
      plaintiffs: "all",
      platforms: "all",
      fromDateOfPublication: "2010-01-01",
      endDateOfPublication: new Date().toISOString().split("T")[0]
    }
    try {
      const cases = await $axios.$get(`/cases/`)
      const plaintiffs = await $axios.$get(`/plaintiffs/`)
      const platforms = await $axios.$get(`/platforms/`)
      filter.fromDateOfPublication = cases.slice(-1)[0].dateOfPublication
      return {
        cases: cases,
        plaintiffs: plaintiffs,
        platforms: platforms,
        filter: filter
      }
    } catch (e) {
      console.log(e)
      return {
        cases: [],
        plaintiffs: [],
        platforms: [],
        filter: filter
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    shareCase(case_id) {
      console.log(`share ${case_id}`)
    }
  },
  computed: {
    caseCount: function() {
      return this.filteredCases.length
    },
    earliestCaseDate: function() {
      // assumes that the cases are ordered in decending order by date of contact
      // by the server
      let lastCase = this.cases.slice(-1)[0]
      return lastCase ? lastCase["dateOfPublication"] : new Date(2010, 1, 1)
    },
    filteredCases: function() {
      return this.cases.filter(case_ => { 
      // console.log(case_.summary)
       console.log(case_.summary.includes(this.filter.searchText))
       return case_.summary.includes(this.filter.searchText) || case_.status
        // this.filter.searchText ? case_.summary.includes(this.filter.searchText) : true
        //       ||
        //       case_.judge ?  typeComplaints: true,
        // typeCases: true,
        // statusOpen: true,
        // statusClosed: true,
        // statusPending: true,
        // plaintiffs: "all",
        // platforms: "all",
        // fromDateOfPublication: "2010-01-01",
        // endDateOfPublication: new Date().toISOString().split("T")[0]
      })
    }
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
      "until": "Until",
      "cases": "cases"
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
      "until": "إلى",
      "cases": "حالات"
    }
  }
}
</i18n>
