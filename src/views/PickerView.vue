<template>
  <div class="picker">
    <PDFPicker/>
  </div>
</template>

<script>
// @ is an alias to /src
import PDFPicker from '@/components/PDFPicker.vue'

export default {
  name: 'PickerView',
  components: {
    PDFPicker
  }
}
</script>
