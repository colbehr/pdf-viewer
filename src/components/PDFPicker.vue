<template>
    <div id="pageContainer">
        <input type="file" id="myFile" name="filename" @change="submitPDF($event)">
    </div>
</template>

<script>
export default {
    name: "PDFPicker",
    mounted() {
    },
    data() {
        return {

        };
    },
    methods: {
        submitPDF(e){  
            const file = e.target.files[0];
            this.$store.dispatch("setUrl", file)
            this.$router.push("view");
        }
    },
};
</script>

<style>
    #pageContainer {
        margin: auto;
        width: 80%;
    }
    div.page {
        display: inline-block;
    }
    canvas{
        height: 600px;
    }

    body{
        overflow: hidden;
    }
</style>