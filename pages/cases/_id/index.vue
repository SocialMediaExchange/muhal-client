<template>
  <div v-if="id" id="case" class="muhal-purple">
    <div id="top" class="mw8 center ph-ns pv4">
      <!-- FIXME lebanon is hardcoded here... -->
      <p class="f4">{{ $t('lebanon') }} | {{ case_.dateOfContact }}</p>

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
          {{ plaintiff.firstName }} {{ plaintiff.lastName }}<!--
          --><span v-if="index < case_.plaintiffs.length - 1">{{ $t(',') }}</span>
        </span>
      </h1>
      <!-- <p class="f4">
        {{ $t('main.accusedOf') }}
        <span v-for="(law, index) in chargedUsing" :key="law.id">
          {{ law.name }}<span v-if="index < chargedUsing.length - 1">{{ $t(',') }}</span>
        </span>
      </p>-->
      <p class="f4">{{ case_.charge }}</p>
    </div>

    <div id="bottom" class="bg-muhal-grey pa3">
      <div class="mw8 center ph-ns">
        <h1 class>{{ $t("details.header") }}</h1>

        <div class="cf ph2-ns bt bw1 b--light-silver pb5">
          <div class="fs w-100 w-30-ns">
            <h2 class>{{ $t("details.complaint.investigation.title") }}</h2>
          </div>
          <div class="fs w-100 w-60-ns f3 pv0 pv2-ns">
            <table class="w-100" cellspacing="0">
              <tbody class="cf">
                <template v-for="(attr, index) in investigationAttributes">
                  <DetailTableRow v-if="case_[attr]" :key="index">
                    <template v-slot:title>{{ $t(`details.complaint.investigation.${attr}`) }}</template>
                    <template v-slot:content>{{ case_[attr] }}</template>
                  </DetailTableRow>
                </template>
              </tbody>
            </table>
          </div>
          <div class="fs w-100 w-10-ns">
            <!-- HACK to avoid putting pr6 on the parent element -->
          </div>
        </div>

        <div class="cf ph2-ns bt bw1 b--light-silver pb5">
          <div class="fs w-100 w-30-ns">
            <h2 class>{{ $t("details.case.title") }}</h2>
          </div>
          <div class="fs w-100 w-60-ns f3 pv0 pv2-ns">
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
                <DetailTableRow v-if="case_.chargedUsing">
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
              </tbody>
            </table>
          </div>
          <div class="fs w-100 w-10-ns">
            <!-- HACK to avoid putting pr6 on the parent element -->
          </div>
        </div>
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

export default {
  head() {
    return {
      title: "Case detail"
    }
  },
  components: { DetailTableRow },
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
    investigationAttributes: function() {
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
    caseAttributes: function() {
      return ["charge"]
    }
  }
}
</script>

<style>
table {
  border-collapse: collapse;
}

/* float start */
.fs {
  float: inline-start;
}

tr:last-child {
  border: 0;
}
</style>

<i18n>
{
  "en": {
    ",": ",",
    "lebanon": "Lebanon",
    "main": {
      "plaintiffs": "Plaintiffs",
      "defendants": "Defendants", 
      "accusedOf": "Accused of"
    },
    "details": {
      "header": "Case details",
      "complaint": {
        "investigation": {
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
          }
      },
      "case": {
        "title": "Case details",
        "charge": "Charge",
        "judge": "Judge",
        "chargedUsing": "Charged using"
      }
    },
    "moreCases": "View more cases"
  },
  "ar": {
    ",": "،",
    "lebanon": "لبنان",
    "main": {
      "plaintiffs": "المدّعوت",
      "defendants": "المدّعى عليهمن"
    },
    "details": {
      "header": "تفاصيل الدعوى",
      "complaint": {
        "investigation": {
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
          }
      },
      "case": {
        "title": "تفاصيل القضيّة",
        "charge": "التهمة",
        "judge": "القاضي/ة",
        "chargedUsing": "متهم باستعمال القوانين"
      }
    },
    "moreCases": "عرض شكاوى أخرى"
  }
}
</i18n>
