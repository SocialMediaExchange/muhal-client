<template>
  <div v-if="id" id="case" class="f3 muhal-purple">
    <!-- main section  -->
    <div class="w-80 center mt5 mb3 bg-white br3 br--top overflow-hidden">
      <div class="w-100" v-bind:style="{ 'background-color': currentStatusColor }">&nbsp;</div>
      <div class="pa4">
        <div class="w-100 cf overflow-visible">
          <h1 class="mv0">
            <ul class="list ph0 pb4 db">
              <!-- <span v-for="defendant in case_.defendants" :key="defendant.id">{{defendant.firstName}} {{defendant.lastName}}</span> -->
              <li v-for="(defendant, index) in case_.defendants" :key="defendant.id" class="fs">
                {{ defendant.firstName }} {{ defendant.lastName }}<!--HACK skip the white space before the comma
                --><span v-if="index < case_.defendants.length - 1">{{ $t(',') }}&nbsp;</span>
              </li>
            </ul>
          </h1>
        </div>
        <div class="cf w-100 db bb b--muhal-blue pv3">
          <div class="fs w-100 w-20-ns pa2">
            <div class="muhal-grey-dark">{{ $t('main.plaintiffs') }}</div>
            <div class>
              <span v-for="(plaintiff, index) in case_.plaintiffs" :key="plaintiff.id">
                {{ plaintiff.firstName }} {{ plaintiff.lastName }}<span v-if="plaintiff.description"> ({{ plaintiff.description }})</span><!--HACK skip the white space before the comma
                --><span v-if="index < case_.plaintiffs.length - 1">{{ $t(',') }}&nbsp;</span>
              </span>
            </div>
          </div>
          <div class="fs w-100 w-20-ns pa2">
            <div class="muhal-grey-dark">{{ $t('country.label') }}</div>
            <div class>{{ case_.countryDisplay }}</div>
          </div>
          <div class="fs w-100 w-20-ns pa2">
            <div class="muhal-grey-dark">{{ $t('main.platform') }}</div>
            <div class>{{ case_.platformDisplay }}</div>
          </div>
          <div class="fs w-100 w-20-ns pa2">
            <div class="muhal-grey-dark">{{ $t('main.dateOfPublication') }}</div>
            <div class>{{ case_.dateOfPublication }}</div>
          </div>
          <div class="fs w-100 w-20-ns pa2">
            <div class="muhal-grey-dark">{{ $t('main.currentStatus') }}</div>
            <div class>{{ case_.currentStatusDisplay }}</div>
          </div>
        </div>
        <div>
          <h2>{{ $t('main.summary') }}</h2>
          <div v-html="case_.summary"></div>
        </div>
      </div>
    </div>

    <!-- about the complaint  -->
    <div class="flex flex-wrap w-80 center mv3 bg-white pa4">
      <h2 class="mv0">{{ $t('details.complaint.title') }}</h2>
      <div class="cf w-100">
        <template v-for="(attr, index) in complaintAttributes">
          <div class="fs w-100 w-20-ns pa2" v-if="case_[attr]" :key="index">
            <div class="muhal-grey-dark">{{ $t(`details.complaint.${attr}`) }}</div>
              <div class>{{ case_[attr] }}</div>
          </div>
        </template>
      </div>
    </div>

    <!-- about the case  -->
    <div class="flex flex-wrap w-80 center mv3 bg-white pa4">
      <h2 class="mv0">{{ $t('details.case.title') }}</h2>
      <div class="cf w-100">
        <div class="fs w-100 pa2" v-if="case_['judges'].length">
          <div class="muhal-grey-dark">{{ $t(`details.case.judges`) }}</div>
            <ul class="list pa0 ma0">
              <li v-for="judge in case_['judges']" :key="judge.id"> {{ judge.firstName }} {{ judge.lastName }}<span v-if="judge.legalEntity"> - {{ judge.legalEntity }}</span><span v-if="judge.kaza"> - {{ judge.kaza }}</span></li>
            </ul>
        </div>
        <div class="fs w-50 pa2" v-if="case_['charge']">
          <div class="muhal-grey-dark">{{ $t(`details.case.charge`) }}</div>
            {{ case_.charge }}
        </div>
        <div class="fs w-50 pa2" v-if="case_['chargedUsing'].length"> 
          <div class="muhal-grey-dark">{{ $t(`details.case.chargedUsing`) }}</div>
            <ul class="list pa0 ma0">
              <li v-for="law in case_['chargedUsing']" :key="law.id"> <a :href="law.url" class="link muhal-purple">{{ law.law }} {{ law.number }} <span v-if="law.name">({{ law.name }})</span> >> </a></li>
            </ul>
        </div>
        <template v-for="(attr, index) in caseAttributes">
          <div class="fs w-100 w-20-ns pa2" v-if="case_[attr]" :key="index">
            <div class="muhal-grey-dark">{{ $t(`details.case.${attr}`) }}</div>
            <div class>{{ case_[attr] }}</div>
          </div>
        </template>
      </div>
    </div>

    <!-- about the complaint  -->
    <!-- <div v-if="complaintDetailsExist" class="w-80 center mv3 bg-white pa4">
      <h2>{{ $t('details.case.title') }}</h2>

      <div class="flex flex-wrap w-100">
        <div class="fs w-100 pa2" v-if="case_.charge">
          <div class="muhal-grey-dark">{{ $t(`details.case.charge`) }}</div>
          <div class v-html="case_.charge"></div>
        </div>
        <div class="fs w-100 w-50-ns pa2" v-if="case_.chargedUsing">
          <div class="muhal-grey-dark">{{ $t(`details.case.chargedUsing`) }}</div>
          <div class>
            <ul class="list pa0 ma0">
              <li v-for="law in case_.chargedUsing" :key="law.id">
                <a
                  :href="law.url"
                  class="link underline-hover muhal-purple"
                >{{ law.law }}: {{ law.number }} {{ law.name }} >></a>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="case_.judges" class="fs w-100 w-50-ns pa2">
          <div class="muhal-grey-dark">{{ $t(`details.case.judge`) }}</div>
          <ul class="list pa0 ma0">
            <li
              v-for="judge in case_.judges"
              :key="judge.id"
            >{{ `${judge.firstName} ${judge.lastName} (${judge.legalEntity}${$t(',')} ${judge.kaza})` }}</li>
          </ul>
        </div>
        <template v-for="(attr, index) in caseAttributes">
          <div class="fs w-100 w-20-ns pa2" v-if="case_[attr]" :key="index">
            <div class="muhal-grey-dark">{{ $t(`details.case.${attr}`) }}</div>
            <div class>{{ case_[attr] }}</div>
          </div>
        </template>
        <div class="fs w-100 pa2" v-if="case_.sentence">
          <div class="muhal-grey-dark">{{ $t(`details.case.sentence`) }}</div>
          <div class v-html="case_.sentence"></div>
        </div>
      </div>
      <div></div>
    </div> -->

    <!-- case timeline  -->
    <div class="w-80 center mv3 bg-white pa4">
      <h2>{{ $t('details.timeline.title') }}</h2>
      <div class="w-100">
        <ol id="timeline" class="list pa0">
          <li v-for="(date, index) in datesOrdered" :key="index" class="event">
            <div class="pb3" v-if="date[1]">
              <span class="muhal-grey-dark ttc">{{ $t(`details.timeline.${date[0]}`) }}</span>
              <br />
              {{ date[1] | formatDate }}
            </div>
          </li>
        </ol>
      </div>
    </div>

    <!-- case references  -->
    <div v-if="case_.references.length > 0" class="w-80 center mv3 bg-white pa4">
      <h2>{{ $t('details.references.title') }}</h2>
      <div class="w-100">
        <ol class="">
          <li v-for="reference in case_.references" :key="reference.id">
            <a :href="reference.url" class="link underline muhal-purple" target="_blank">{{ reference.title }}</a>
          </li>
        </ol>
      </div>
    </div>

    <!-- case attachments  -->
    <div v-if="case_.attachments.length > 0" class="w-80 center mv3 bg-white pa4">
      <h2>{{ $t('details.attachments.title') }}</h2>
      <div class="w-100">
        <ul class="list">
          <li v-for="attachment in case_.attachments" :key="attachment.id" 
              class="br2 ba b--muhal-blue w-80">
              <div class="dib bg-muhal-grey-light pa2"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="h1">
                <path style="fill:currentColor;fill-opacity:1;stroke:black;stroke-width:0.7px" 
                      d="m6 4v24h20v-17l-7-7h-1zm1 1h11v7h7v15h-18z"
                    class="ColorScheme-Text"
                    />
                </svg>
              </div>
              <a :href="attachment.url" class="dib link underline muhal-purple mh2 pv2 h2" target="_blank">
                {{ attachment.label }}
              </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- more cases button  -->
    <div class="mw8 center ph-ns pv4 tc">
      <nuxt-link
        :to="localePath('/cases')"
        class="f3 link dim br-pill ph4 pv2 mb2 dib white bg-muhal-pink"
      >{{ $t("moreCases") }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import DetailTableRow from "~/components/DetailTableRow.vue"
import DetailSection from "~/components/DetailSection.vue"
import CaseTimeline from "~/components/CaseTimeline.vue"

const countryFlag = {
  lb: "&#x1F1F1;&#x1F1E7;",
  jo: "&#x1F1EF;&#x1F1F4;",
}

const currentStatusColor = {
  open: "#f89d61",
  closed: "#3d3356",
  pending: "hsla(210, 41%, 50%, 1)",
}

export default {
  head() {
    return {
      title: this.$t("caseDetails"),
    }
  },
  components: { DetailTableRow, DetailSection, CaseTimeline },
  async asyncData({ $axios, params }) {
    try {
      let case_ = await $axios.$get(`/cases/${params.id}`)
      return { id: case_.id, case_ }
    } catch (e) {
      return {}
    }
  },
  data() {
    return {
      id: null,
    }
  },
  computed: {
    currentStatusColor: function () {
      return currentStatusColor[this.case_.currentStatus]
    },
    complaintDetailsExist: function () {
      return this.complaintAttributes.reduce(
        (attrA, attrB) => this.case_[attrA] || this.case_[attrB]
      )
    },
    complaintAttributes: function () {
      return [
        "dateOfContact",
        "dateOfInvestigation",
        "stationName",
        "detained",
        "detainedFor",
        "contentDeletion",
        "pledgeSigning",
        "reconciliation",
        "contactedVia",
      ]
    },
    caseDetailsExist: function () {
      return this.caseAttributes.reduce(
        (attrA, attrB) => this.case_[attrA] || this.case_[attrB]
      )
    },
    caseAttributes: function () {
      return [
        //"judges",
        // "charge",
        //"charged_using",
        "bail",
        "sentenced",
        "sentence",
        "inAbsentia",
      ]
    },
    timeline: function () {
      return [
        ["dateOfPublication", this.case_.dateOfPublication],
        ["dateOfContact", this.case_.dateOfContact],
        ["dateOfInvestigation", this.case_.dateOfInvestigation],
        ["dateOfDetention", this.case_.dateOfDetention],
        ["dateOfHearing", this.case_.dateOfHearing],
        ["dateOfHearing2", this.case_.dateOfHearing2],
        ["dateOfRelease", this.case_.dateOfRelease],
        ["dateOfRuling", this.case_.dateOfRuling],
      ]
    },
    datesOrdered: function () {
      return this.timeline
        .map((e) => [e[0], e[1] ? new Date(e[1]) : null])
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
  },
}
</script>

<style scoped lang="scss">
$muhal-blue: hsla(257, 26%, 27%, 1);
$muhal-grey-dark: hsla(253, 8%, 60%, 1);
$muhal-grey-light: hsla(240, 5%, 96%, 1);

#timeline {
  position: relative;
  &::before {
    content: "";
    width: 1px;
    background-color: $muhal-grey-dark;
    position: absolute;
    inset: 0;
  }
}

.event {
  position: relative;
  inset: 0 1rem;
  &::before {
    content: "";
    background: $muhal-grey-light;
    border: 1px solid $muhal-grey-dark;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 20px;
    position: absolute;
    inset: 0.6rem -1.27rem;
  }
}
</style>

<i18n>
{
  "en": {
    ",": ",",
    "caseDetails": "Case details",
    "country": {
      "label": "Country",
      "lebanon": "Lebanon",
      "jordan": "jordan"
    },
    "main": {
      "plaintiffs": "Plaintiffs",
      "defendants": "Defendants", 
      "accusedOf": "Accused of",
      "platform": "Platform",
      "dateOfPublication": "Date of publication",
      "currentStatus": "Case status",
      "summary": "Case summary"
    },
    "details": {
      "header": "Case details",
      "complaint": {
        "title": "About the complaint",
        "dateOfContact": "Date of contact",
        "dateOfInvestigation": "Date of investigation",
        "stationName": "Station name",
        "detained": "Detained?",
        "detainedFor": "Detention length (days)",
        "contentDeletion": "Request to delete content?",
        "pledgeSigning": "Requested to sign a pleadge",
        "reconciliation": "Reconciliation?",
        "contactedVia": "Contacted via"
      },
      "case": {
        "title": "Case details",
        "dateOfContact": "contact",
        "dateOfInvestigation": "investigation",
        "stationName": "Station name",
        "charge": "Charge",
        "judge": "Judge",
        "chargedUsing": "Charged using",
        "bail": "Bail",
        "sentenced": "Sentenced?",
        "sentence": "Sentence",
        "inAbsentia": "In absentia?"
      },
      "timeline": {
        "title": "Timeline",
        "dateOfPublication": "publication",
        "dateOfContact": "contact",
        "dateOfInvestigation": "investigation",
        "dateOfDetention": "detention",
        "dateOfHearing": "hearing",
        "dateOfHearing2": "second hearing",
        "dateOfRelease": "release",
        "dateOfRuling": "ruling"
      },
      "references": {
        "title": "References"
      },
      "attachments": {
        "title": "Attachments"
      }
    },
    "moreCases": "View more cases"
  },
  "ar": {
    ",": "،",
    "caseDetails": "تفاصيل الحالة",
    "country": {
      "label": "الدولة",
      "lebanon": "لبنان",
      "jordan": "الأردن"
    },
    "main": {
      "plaintiffs": "الجهة المدّعية",
      "defendants": "الجهة المدّعى عليها",
      "platform": "المنصّة",
      "dateOfPublication": "تاريخ النشر",
      "currentStatus": "وضع الحالة",
      "summary": "ملخّص الحالة"
    },
    "details": {
      "header": "تفاصيل الحالة",
      "complaint": {
        "title": "عن الشكوى",
        "dateOfContact": "تاريخ التبليغ",
        "dateOfInvestigation": "تاريخ التحقيق",
        "stationName": "إسم مكان التحقيق",
        "detained": "هل تم الاحتجاز؟",
        "detainedFor": "مدّة الاحتجاز",
        "contentDeletion": "طُلب حذف المحتوى", 
        "pledgeSigning": "طُلب توقيع تعهّد",
        "reconciliation": "مصالحة؟",
        "contactedVia": "وسيلة الاستدعاء"
      },
      "case": {
        "title": "عن الدعوى",
        "charge": "التهمة",
        "judges": "القضاة",
        "chargedUsing": "القوانين المستعملة",
        "bail": "مبلغ الكفالة",
        "sentenced": "تم الحكم؟",
        "sentence": "الحكم",
        "inAbsentia": "حكم غيابي؟"
      },
      "timeline": {
        "title": "الخط الزمني",
        "dateOfPublication": "النشر",
        "dateOfContact": "الاستدعاء",
        "dateOfInvestigation": "التحقيق",
        "dateOfDetention": "الاحتجاز",
        "dateOfHearing": "الجلسة الأولى",
        "dateOfHearing2": "الجلسة الثانية",
        "dateOfRelease": "إطلاق السراح",
        "dateOfRuling": "إطلاق الحكم"
      },
      "references": {
        "title": "المراجع"
      },
      "attachments": {
        "title": "الملحقات"
      }
    },
    "moreCases": "عرض حالات أخرى"
  }
}
</i18n>
