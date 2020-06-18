import Vue from "vue"

Vue.filter("truncate", function(text, length, clamp) {
  var clamp = clamp || "..."
  var sliced = text.slice(0, length)
  return text.length > length ? `${sliced}${clamp}` : sliced
})
