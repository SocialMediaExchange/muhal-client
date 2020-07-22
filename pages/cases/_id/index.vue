<template>
  <div v-if="id" id="case" class="muhal-purple">
    <div id="top" class="w-70 center ph-ns pv4">
      <!-- FIXME lebanon is hardcoded here... -->
      <p class="f4">&#x1F1F1;&#x1F1E7; {{ $t('lebanon') }} | {{ case_.dateOfContact }}</p>

      <!-- the defendant -->
      <h1>
        {{ $t('main.defendants') }}
        <span
          v-for="(defendant, index) in case_.defendants"
          :key="defendant.id"
        >
          {{ defendant.firstName }} {{ defendant.lastName }}<!-- 
            HACK skip the white space before the comma
          --><span v-if="index < case_.defendants.length - 1">{{ $t(',') }}</span>
        </span>
      </h1>

      <!-- the plaintifs  -->
      <h1>
        {{ $t('main.plaintiffs') }}
        <span
          v-for="(plaintiff, index) in case_.plaintiffs"
          :key="plaintiff.id"
        >
          {{ plaintiff.firstName }} {{ plaintiff.lastName }}
          <!--
          -->
          <span v-if="index < case_.plaintiffs.length - 1">{{ $t(',') }}</span>
        </span>
      </h1>
      <p class="f4">{{ case_.charge }}</p>
    </div>

    <div id="bottom" class="bg-muhal-grey pa3">
      <div class="mw8 center ph-ns">
        <h1 class>{{ $t("details.header") }}</h1>

        <DetailSection v-if="complaintDetailsExist">
          <template v-slot:title>{{ $t("details.complaint.title") }}</template>
          <template v-slot:content>
            <table class="w-100" cellspacing="0">
              <tbody class="cf">
                <template v-for="(attr, index) in complaintAttributes">
                  <DetailTableRow v-if="case_[attr]" :key="index">
                    <template v-slot:title>{{ $t(`details.complaint.${attr}`) }}</template>
                    <template v-slot:content>{{ case_[attr] }}</template>
                  </DetailTableRow>
                </template>
              </tbody>
            </table>
          </template>
        </DetailSection>

        <DetailSection v-if="caseDetailsExist">
          <template v-slot:title>{{ $t("details.case.title") }}</template>
          <template v-slot:content>
            <table class="w-100" cellspacing="0">
              <tbody class="cf">
                <DetailTableRow v-if="case_.judge">
                  <template v-slot:title>{{ $t(`details.case.judge`) }}</template>
                  <template v-slot:content>
                    <span>{{ `${case_.judge.firstName} ${case_.judge.lastName}` }}</span>
                    <br />
                    <span
                      class="b f4"
                    >{{ `${case_.judge.legalEntity}${$t(',')} ${case_.judge.kaza}` }}</span>
                  </template>
                </DetailTableRow>
                <DetailTableRow v-if="case_.chargedUsing.length > 0">
                  <template v-slot:title>{{ $t(`details.case.chargedUsing`) }}</template>
                  <template v-slot:content>
                    <ul class="list pa0 ma0">
                      <li v-for="law in case_.chargedUsing" :key="law.id">
                        <a
                          :href="law.url"
                          class="link underline-hover muhal-purple"
                        >{{ law.law }}: {{ law.number }} {{ law.name }} >></a>
                      </li>
                    </ul>
                  </template>
                </DetailTableRow>
                <template v-for="(attr, index) in caseAttributes">
                  <DetailTableRow v-if="case_[attr]" :key="index">
                    <template v-slot:title>{{ $t(`details.case.${attr}`) }}</template>
                    <template v-slot:content>
                      <span v-if="case_[attr]">{{ case_[attr] }}</span>
                    </template>
                  </DetailTableRow>
                </template>
                <DetailTableRow v-if="case_['judges']" :key="index">
                  <template v-slot:title>{{ $t(`details.case.judges`) }}</template>
                  <template v-slot:content>
                    <span v-if="case_[attr]">{{ case_[attr] }}</span>
                  </template>
                </DetailTableRow>
              </tbody>
            </table>
          </template>
        </DetailSection>

        <DetailSection>
          <template v-slot:title>{{ $t("details.timeline.title") }}</template>
          <template v-slot:content>
            <CaseTimeline :dates="timeline"></CaseTimeline>
          </template>
        </DetailSection>
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
  jo: "&#x1F1EF;&#x1F1F4;"
}

export default {
  head() {
    return {
      title: this.$t("caseDetails")
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
      id: null
    }
  },
  computed: {
    complaintDetailsExist: function() {
      return this.complaintAttributes.reduce(
        (attrA, attrB) => this.case_[attrA] || this.case_[attrB]
      )
    },
    complaintAttributes: function() {
      return [
        "dateOfContact",
        "dateOfInvestigation",
        "stationName",
        "detained",
        "detainedFor",
        "contentDeletion",
        "pledgeSigning",
        "reconciliation",
        "contactedVia"
      ]
    },
    caseDetailsExist: function() {
      return this.caseAttributes.reduce(
        (attrA, attrB) => this.case_[attrA] || this.case_[attrB]
      )
    },
    caseAttributes: function() {
      return ["charge", "bail", "sentenced", "sentence", "inAbsentia"]
    },
    timeline: function() {
      return [
        ["dateOfPublication", this.case_.dateOfPublication],
        ["dateOfContact", this.case_.dateOfContact],
        ["dateOfInvestigation", this.case_.dateOfInvestigation],
        ["dateOfDetention", this.case_.dateOfDetention],
        ["dateOfHearing", this.case_.dateOfHearing],
        ["dateOfHearing2", this.case_.dateOfHearing2],
        ["dateOfRelease", this.case_.dateOfRelease],
        ["dateOfRuling", this.case_.dateOfRuling]
      ]
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}

tr:last-child {
  border: 0;
}
</style>

<i18n>
{
  "en": {
    ",": ",",
    "caseDetails": "Case details",
    "lebanon": "Lebanon",
    "main": {
      "plaintiffs": "Plaintiffs",
      "defendants": "Defendants", 
      "accusedOf": "Accused of"
    },
    "details": {
      "header": "Case details",
      "complaint": {
        "title": "Complaint details",
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
        "charge": "Charge",
        "judge": "Judge",
        "chargedUsing": "Charged using",
        "bail": "Bail",
        "sentenced": "Sentenced?",
        "sentence": "Sentence",
        "inAbsentia": "In absentia?"
      },
      "timeline": {
        "title": "Timeline"
      }
    },
    "moreCases": "View more cases"
  },
  "ar": {
    ",": "،",
    "caseDetails": "تفاصيل الحالة",
    "lebanon": "لبنان",
    "main": {
      "plaintiffs": "المدّعوت",
      "defendants": "المدّعى عليهمن"
    },
    "details": {
      "header": "تفاصيل الحالة",
      "complaint": {
        "title": "تفاصيل الشكوى",
        "dateOfContact": "تاريخ الاتصال",
        "dateOfInvestigation": "تاريخ التحقيق",
        "stationName": "إسم المخفر",
        "detained": "اعتقل؟",
        "detainedFor": "أيّام الإعتقال",
        "contentDeletion": "طُلب حذف المحتوى", 
        "pledgeSigning": "طُلب توقيع تعهّد",
        "reconciliation": "مصالحة؟",
        "contactedVia": "وسيلة الاستدعاء"
      },
      "case": {
        "title": "تفاصيل القضيّة",
        "charge": "التهمة",
        "judge": "القاضي/ة",
        "chargedUsing": "متهم باستعمال القوانين",
        "bail": "مبلغ الكفالة",
        "sentenced": "تم الحكم؟",
        "sentence": "الحكم",
        "inAbsentia": "حكم غيابي؟"
      },
      "timeline": {
        "title": "الخط الزمني"
      }     
    },
    "moreCases": "عرض حالات أخرى"
  }
}
</i18n>
