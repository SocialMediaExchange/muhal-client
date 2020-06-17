<template>
  <div>
    <ul class="list">
      <template v-for="date in datesOrdered">
        <li v-if="date[1]" :key="date[0]">
          {{ date[1] | formatDate }} {{ $t(date[0]) }}
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: "CaseTimeline",
  props: {
    dates: Array
  },
  data() {
    return {}
  },
  computed: {
    datesOrdered: function() {
      return this.dates
        .map(e => [e[0], e[1] ? new Date(e[1]) : null])
        .sort((date1, date2) => {
          if (date1[1] > date2[1]) {
            return 1
          } else if (date1[1] < date2[1]) {
            return -1
          } else {
            return 0
          }
        })
    },
    dateRange: function() {
      return 
    }
  },
  filters: {
    formatDate: function(d) {
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    }
  }
}
</script>

<style>
</style>

<i18n>
{
  "en": {
    "dateOfPublication": "publication",
    "dateOfContact": "contact",
    "dateOfInvestigation": "investigation",
    "dateOfDetention": "detention",
    "dateOfHearing": "hearing",
    "dateOfHearing2": "second hearing",
    "dateOfRelease": "release",
    "dateOfRuling": "ruling"
  },
  "ar": {
    "dateOfPublication": "النشر",
    "dateOfContact": "الاستدعاء",
    "dateOfInvestigation": "التحقيق",
    "dateOfDetention": "الاحتجاز",
    "dateOfHearing": "الجلسة الأولى",
    "dateOfHearing2": "الجلسة الثانية",
    "dateOfRelease": "إطلاق السراح",
    "dateOfRuling": "إطلاق الحكم"
  }
}
</i18n>
