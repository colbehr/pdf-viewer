<template>
  <div class="">
    <PDFView/>
  </div>
</template>

<script>
// @ is an alias to /src
import PDFView from '@/components/PDFView.vue'

export default {
  name: 'ViewerView',
  components: {
    PDFView
  }
}
</script>
