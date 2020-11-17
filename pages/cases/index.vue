<template>
  <div class="cf w-100">
    <div id="filter" class="fs w-50-m w-30-ns f4">
      <div class="pa4 bg-white muhal-purple">
        <h2>{{ $t("filterCases.title") }}</h2>
        <form @submit.prevent="updateFilter">
          <fieldset class="bw0 mv3">
            <label>
              <input
                type="search"
                class="w-100 br2 pa2 ba b--muhal-blue"
                :placeholder="$t('filterCases.searchContent')"
                v-model="filter.searchText"
              />
            </label>
          </fieldset>
          <!-- country options  -->
          <fieldset class="bw0 mv3">
            <label>
              <legend class="fw7">{{ $t("filterCases.countries") }}</legend>
              <select
                name="platforms"
                id="platform-options"
                class="w-100"
                v-model="filter.countries"
              >
                <option selected value="all">--> {{ $t("filterCases.allCountries") }} </option> 
                <option value="lebanon">{{ $t("filterCases.lebanon") }}</option>
                <option value="jordan">{{ $t("filterCases.jordan") }}</option>
              </select>
            </label>
          </fieldset>

          <!-- case types  -->
          <fieldset class="bw0 mv3">
            <legend class="fw7">{{ $t("filterCases.caseType") }}</legend>
            <label
              for="complaints"
              class="checkbox-label"
              v-bind:class="{ 'checkbox-label-selected': filter.typeComplaints }"
            >
              <input type="checkbox" id="complaints" v-model="filter.typeComplaints" :indeterminate.prop="false"/>
              {{ $t("filterCases.complaints") }}
            </label>
            <label
              for="lawsuits"
              class="checkbox-label"
              v-bind:class="{ 'checkbox-label-selected': filter.typeCases }"
            >
              <input type="checkbox" id="lawsuits" v-model="filter.typeCases" />
              {{ $t("filterCases.lawsuits") }}
            </label>
          </fieldset>

          <!-- case status  -->
          <fieldset class="bw0 mv3">
            <legend class="fw7">{{ $t("filterCases.caseStatus") }}</legend>
            <label
              for="case-open"
              class="checkbox-label"
              v-bind:class="{ 'checkbox-label-selected': filter.statusOpen }"
            >
              <input type="checkbox" id="case-open" v-model="filter.statusOpen">
              {{ $t("filterCases.caseOpen") }}
            </label>
            <label
              for="case-closed"
              class="checkbox-label"
              v-bind:class="{ 'checkbox-label-selected': filter.statusClosed }"
            >
              <input type="checkbox" id="case-closed" v-model="filter.statusClosed">
              {{ $t("filterCases.caseClosed") }}
            </label>
            <label
              for="case-pending"
              class="checkbox-label"
              v-bind:class="{ 'checkbox-label-selected': filter.statusPending }"
            >
              <input type="checkbox" id="case-pending" v-model="filter.statusPending">
              {{ $t("filterCases.casePending") }}
            </label>
            <label
              for="case-unknown"
              class="checkbox-label"
              v-bind:class="{ 'checkbox-label-selected': filter.statusUnknown }"
            >
              <input type="checkbox" id="case-unknown" v-model="filter.statusUnknown">
              {{ $t("filterCases.caseUnknown") }}
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
                <option
                  selected
                  value="all"
                >--> {{ $t("filterCases.allPlaintiffs") }}</option> <!--  &#x1F53D; -->
                <option
                  v-for="plaintiff in plaintiffs"
                  :key="plaintiff.id"
                  :value="plaintiff.id"
                >
                  <template v-if="plaintiff.firstName">
                    {{ plaintiff.firstName }} {{ plaintiff.lastName }}
                    <span v-if="plaintiff.description">({{ plaintiff.description }})</span>
                  </template>
                  <template v-else>{{ plaintiff.description }}</template>
                </option>
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
                <option
                  selected
                  value="all"
                >--> {{ $t("filterCases.allPlatforms") }} </option> <!--     &#x1F53D;-->
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
            <!-- <label for="publication-date" class="db">
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
            </label>-->
            <input
              type="date"
              name="start-date"
              :min="earliestCaseDate"
              :max="new Date() | formatDate"
              v-model="filter.fromDateOfPublication"
              class="bw0 ma1"
            />
            <input
              type="date"
              name="end-date"
              :min="earliestCaseDate"
              :max="new Date() | formatDate"
              v-model="filter.endDateOfPublication"
              class="bw0 ma1"
            />
          </fieldset>
        </form>
      </div>
    </div>
    <div v-if="cases" id="cases" class="fs w-50-m w-70-ns flex flex-wrap pa4 muhal-blue ">
       <!-- case count and color key --> 
       <div class="w-100 ph3">
          <div class="fs w-20-ns w-100 ph2">
            <h2 class="mv1">{{ $t("filterCases.cases") }}: {{ caseCount }} </h2>
          </div>

          <div class="fs w-20-l w-100 v-mid pv1">
            <div class="dt w2 fs mh2">
              <span class="br-100 bg-muhal-orange dtc h2"></span>
            </div>
            <span class="f3">{{ $t('filterCases.caseOpen') }}</span>
          </div>

          <div class="fs w-20-l w-100 v-mid pv1">
            <div class="dt w2 fs mh2">
              <span class="br-100 bg-muhal-blue dtc h2"></span>
            </div>
            <span class="f3">{{ $t('filterCases.caseClosed') }}</span>
          </div>

          <div class="fs w-20-l w-100 v-mid pv1">
            <div class="dt w2 fs mh2">
              <span class="br-100 bg-muhal-pink dtc h2"></span>
            </div>
            <span class="f3">{{ $t('filterCases.casePending') }}</span>
          </div>

          <div class="fs w-20-l w-100 v-mid pv1">
            <div class="dt w2 fs mh2">
              <span class="br-100 bg-muhal-grey dtc h2"></span>
            </div>
            <span class="f3">{{ $t('filterCases.caseUnknown') }}</span>
          </div>
      </div>
      <!-- actual case cards -->
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
      searchText: "",
      typeComplaints: false,
      typeCases: false,
      statusOpen: false,
      statusClosed: false,
      statusPending: false,
      statusUnknown: false,
      plaintiffs: "all",
      platforms: "all",
      countries: "all",
      fromDateOfPublication: "2010-01-01",
      endDateOfPublication: new Date().toISOString().split("T")[0]
    }
    try {
      const cases = await $axios.$get(`/cases/`)
      const plaintiffs = await $axios.$get(`/plaintiffs/`)
      const platforms = await $axios.$get(`/platforms/`)
      let earliestDate = cases.sort(function(case1, case2) {
        return new Date(case2.dateOfPublication) - new Date(case1.dateOfPublication)
      }).filter((case_) => case_.dateOfPublication != null)
        .slice(-1)[0].dateOfPublication
      filter.fromDateOfPublication = earliestDate
      return {
        cases: cases,
        plaintiffs: plaintiffs,
        platforms: platforms,
        filter: filter
      }
    } catch (e) {
      return {
        cases: [],
        plaintiffs: [],
        platforms: [],
        filter: filter,
        error: e
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    shareCase(case_id) {
    }
  },
  computed: {
    caseCount: function() {
      return this.filteredCases.length
    },
    earliestCaseDate: function() {
      // assumes that the cases are ordered in decending order by date of contact
      // by the server
      let lastCase = this.cases.sort(function(case1, case2) {
        return new Date(case2.dateOfPublication) - new Date(case1.dateOfPublication)
      }).filter((case_) => case_.dateOfPublication != null)
        .slice(-1)[0]
      return lastCase ? lastCase["dateOfPublication"] : new Date(2010, 1, 1)
    },
    filteredCases: function() {
      return this.cases.filter(case_ => {
        return (
          case_.summary.includes(this.filter.searchText) &&
          (this.filter.countries === "all" ||
            case_.country === this.filter.countries) &&
          ((!this.filter.typeCases && !this.filter.typeComplaints) || // all checkboxes are false 
           (case_.judge === null) === this.filter.typeComplaints || 
           (case_.judge !== null) === this.filter.typeCases) &&
          ((!this.filter.statusOpen && !this.filter.statusClosed && !this.filter.statusPending && !this.filter.statusUnknown) || // all checkboxes are false 
           ((case_.currentStatus === "open") && this.filter.statusOpen) ||
           ((case_.currentStatus === "closed") && this.filter.statusClosed) ||
           ((case_.currentStatus === "pending") && this.filter.statusPending) ||
           ((case_.currentStatus === "unknown") && this.filter.statusUnknown)) &&
          (this.filter.plaintiffs === "all" ||
            case_.plaintiffs
              .map(case_ => case_.id)
              .includes(this.filter.plaintiffs)) &&
          (this.filter.platforms === "all" ||
            case_.platform === this.filter.platforms) &&
          (this.filter.fromDateOfPublication <= case_.dateOfPublication || case_.dateOfPublication === null) &&
          (this.filter.endDateOfPublication >= case_.dateOfPublication || case_.dateOfPublication === null)
        )
      })
    }
  }
}
</script>

<style >
#cases {
  padding-end: 4rem;
}

[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border: solid 1px hsla(257, 26%, 27%, 1);
  margin-right: 8px;
  position: relative;
  vertical-align: text-top;
  border-radius: 15%;
}

[type="checkbox"]:checked {
  border-color: hsla(24, 92%, 68%, 1);
}

[type="checkbox"]:checked::before {
  content: "";
  width: 14px;
  height: 14px;
  background-color: hsla(24, 92%, 68%, 1);
  position: absolute;
  border-radius: 15%;
  top: 2px;
  left: 2px;
}

.checkbox-label {
  display: block;
  margin: 0.7rem 0;
  padding: 0.5rem;
  border: solid 1px white;
  background-color: hsla(240, 5%, 96%, 1);
  border-radius: 0.2rem;
}

.checkbox-label-selected {
  background-color: white;
  border: solid 1px hsla(24, 92%, 68%, 1);
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: solid 1px hsla(24, 92%, 68%, 1);
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.2rem;
  /* background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/43/Octicons-chevron-down.svg'); 
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 5%;*/
}

[type="date"] {
  /* -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
  border: solid 1px hsla(24, 92%, 68%, 1);
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.2rem;
}
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
      "caseUnknown": "Unknown",
      "plaintiffs": "Plaintiffs",
      "allPlaintiffs": "All plaintiffs", 
      "platforms": "Platforms",
      "allPlatforms": "All platforms",
      "publicationDate": "Publication date",
      "start": "Starting",
      "until": "Until",
      "cases": "Case count",
      "countries": "Countries",
      "allCountries": "All countries",
      "lebanon": "Lebanon",
      "jordan": "Jordan"
    }
  },
  "ar": {
    ",": "،",
    "caseList": "لائحة الحالات",
    "filterCases": {
      "title": "اختيار الحالات",
      "searchContent": "البحث...",
      "caseType": "نوع الحالة",
      "complaints": "شكاوى",
      "lawsuits": "قضايا",
      "caseStatus": "وضع الحالة",
      "caseOpen": "مفتوحة",
      "caseClosed": "مغلقة",
      "casePending": "بانتظار استئناف أو اعتراض",
      "caseUnknown": "غير معروف",
      "plaintiffs": "الجهة المدّعية",
      "allPlaintiffs": "كل الجهات",
      "platforms": "المنصّات",
      "allPlatforms": "كل المنصّات",
      "publicationDate": "تاريخ النشر",
      "start": "منذ",
      "until": "إلى",
      "cases": "عدد الحالات",
      "countries": "الدول",
      "allCountries": "كل الدول",
      "lebanon": "لبنان",
      "jordan": "الأردن"
    }
  }
}
</i18n>
