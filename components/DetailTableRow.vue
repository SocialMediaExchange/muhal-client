<template>
  <tr class="bb bw1 b--light-silver v-mid">
    <td class="f4 w-100 w-30-ns messiri pv2">
      <slot name="title"></slot>
    </td>
    <td class="f3 w-100 w-70-ns pv2">
      <slot name="content"></slot>
    </td>
  </tr>
</template>
<script>
export default {
  name: "TableRow",
  data() {
    return {}
  }
}
</script>