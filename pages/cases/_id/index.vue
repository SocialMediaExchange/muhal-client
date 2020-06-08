<template>
  <div v-if="id" id="case" class="muhal-purple">
    <div id="top" class="mw8 center ph-ns pv4 izpurple">
      <!-- FIXME lebanon is hardcoded here... -->
      <p class="f4">{{ $t('lebanon') }} | {{ dateOfContact }}</p>

      <!-- the defendant -->
      <h1>
        {{ $t('main.defendants') }}
       
        <span
          v-for="(defendant, index) in defendants"
          :key="defendant.id"
        >
          {{ defendant.firstName }} {{ defendant.lastName }}<!-- 
            HACK skip the white space before the comma
          --><span
            v-if="index < defendants.length - 1"
          >{{ $t(',') }}</span>
        </span>
      </h1>

      <!-- the plaintifs  -->
      <h1>
        {{ $t('main.plaintiffs') }}
        <span
          v-for="(plaintiff, index) in plaintiffs"
          :key="plaintiff.id"
        >
          {{ plaintiff.firstName }} {{ plaintiff.lastName }}<!--
          --><span
            v-if="index < plaintiffs.length - 1"
          >{{ $t(',') }}</span>
        </span>
      </h1>
      <!-- <p class="f4">
        {{ $t('main.accusedOf') }}
        <span v-for="(law, index) in chargedUsing" :key="law.id">
          {{ law.name }}<span v-if="index < chargedUsing.length - 1">{{ $t(',') }}</span>
        </span>
      </p> -->
      <p class="f4">{{ charge }}</p>
    </div>

    <div id="bottom" class="bg-muhal-grey">
      <div class="mw8 center ph-ns pv4 pr6">
        <h1>{{ $t("details.header") }}</h1>

        <div class="cf ph2-ns bt bw1 b--light-silver">
          <div class="fl w-100 w-30-ns pv2">
            <h3>{{ $t("details.complaint.title") }}</h3>
          </div>
          <div class="fl w-100 w-70-ns pa2">
            <div class="outline bg-white pv4"></div>
          </div>
        </div>
        <!-- <div class="bt bw1 b--light-silver">
          <h3>description</h3>
        </div>-->
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
      return { ...case_ }
    } catch (e) {
      return {}
    }
  },
  data() {
    return {
      id: null
    }
  },
  methods: {
    shareCase(case_id) {
      console.log(`share ${case_id}`)
    }
  }
}
</script>

<style scoped>
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
        "title": "Complaint details"
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
      "header": "تفاصيل الدعوى"
    },
    "moreCases": "عرض شكاوى أخرى"
  }
}
</i18n>
