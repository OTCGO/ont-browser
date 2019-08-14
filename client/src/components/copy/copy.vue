<template>
  <b-link href="#" class="copy" @click="copyToClipboard">copy</b-link>
</template>
<script>
export default {
  name: "Copy",
  props: {
    val: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    copyToClipboard() {
      const el = document.createElement("textarea"); // Create a <textarea> element
      el.value = this.val; // Set its value to the string that you want copied
      el.setAttribute("readonly", ""); // Make it readonly to be tamper-proof
      el.style.position = "absolute";
      el.style.left = "-9999px"; // Move outside the screen to make it invisible
      document.body.appendChild(el); // Append the <textarea> element to the HTML document
      const selected =
        document.getSelection().rangeCount > 0 // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0) // Store selection if found
          : false; // Mark as false to know no selection existed before
      el.select(); // Select the <textarea> content
      document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el); // Remove the <textarea> element
      if (selected) {
        // If a selection existed before copying
        document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
        document.getSelection().addRange(selected); // Restore the original selection
      }

      this.$bvToast.toast("复制成功", {
        // title: this.$t("tips"),
        toaster:'b-toaster-top-center',
        variant: "success",
        // autoHideDelay: 5000,
        solid: true,
      });
    }
  }
};
</script>
<style scoped>
@import "copy.less";
</style>