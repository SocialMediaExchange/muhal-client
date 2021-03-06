import Vue from "vue"

Vue.filter("truncate", function(text, length, clamp) {
  var clamp = clamp || "..."
  var sliced = text.slice(0, length)
  return text.length > length ? `${sliced}${clamp}` : sliced
})

Vue.filter("formatDate", function(date) {
  return date ? date.toISOString().split("T")[0] : null
})
