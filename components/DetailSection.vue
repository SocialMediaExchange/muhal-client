<template>
  <div class="cf ph2-ns bt bw1 b--light-silver pb5">
    <div class="fs w-100 w-30-ns">
      <h2 class>
        <slot name="title"></slot>
      </h2>
    </div>
    <div class="fs w-100 w-60-ns f3 pv0 pv2-ns">
      <slot name="content"></slot>
    </div>
    <div class="fs w-100 w-10-ns">
      <!-- HACK to avoid putting pr6 on the parent element -->
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailSection",
  data() {
    return {}
  }
}
</script>