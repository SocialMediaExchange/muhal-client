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
                  <tr class="bb bw1 b--light-silver v-mid" v-if="case_[attr]" :key="index">
                    <td
                      class="f4 w-100 w-30-ns messiri pv2"
                    >{{ $t(`details.complaint.investigation.${attr}`) }}</td>
                    <td class="f3 w-100 w-70-ns pv2">
                      <span v-if="case_[attr]">{{ case_[attr] }}</span>
                    </td>
                  </tr>
                </template>
                <tr v-if="case_.chargedUsing" class="v-mid">
                  <td
                    class="f4 w-100 w-30-ns messiri pv2"
                  >{{ $t(`details.complaint.investigation.chargedUsing`) }}</td>
                  <td class="f3 w-100 w-70-ns pv2">
                    <!-- {{case_.chargedUsing}} -->
                    <ul class="list pa0 ma0">
                      <li v-for="law in case_.chargedUsing" :key="law.id">
                        <a
                          :href="law.url"
                          class="link underline-hover muhal-purple"
                        >{{ law.law }}: {{ law.number }} {{ law.name }} >></a>
                      </li>
                    </ul>
                    <!-- <span v-for="(law, index) in case_.chargedUsing" :key="law.id">
                      <a :href="law.url">{{ law }}</a>
                      <span v-if="index < case_.chargedUsing.length - 1">{{ $t(',') }}</span>
                    </span>-->
                  </td>
                </tr>
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
export default {
  head() {
    return {
      title: "Case detail"
    }
  },
  components: {},
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
          "chargedUsing": "Charged using",
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
        "charge": "Charge"
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
          "chargedUsing": "متهم باستعمال القوانين",
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
        "charge": "التهمة"
      }
    },
    "moreCases": "عرض شكاوى أخرى"
  }
}
</i18n>
