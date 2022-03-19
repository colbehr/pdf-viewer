<template>
    <div id="pageContainer">
        <p>{{ title }}</p>
        <canvas id="pdf-render"></canvas>
        <div class="buttons">
        <a
            @click="
                this.pageNum--;
                this.getPdf(this.pageNum);
            "
        >
            Previous
        </a>
        <p style="display:inline"> Page {{ pageNum }}</p>
        <a
            @click="
                this.pageNum++;
                this.getPdf(this.pageNum);
            "
        >
            Next
        </a>
        </div>
    </div>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

export default {
    name: "PDFView",
    mounted() {
        if (typeof this.$store.state.url == typeof "") {
            console.log("go home");
            this.$router.push("home");
        } else {
            this.file = this.$store.state.url;
            this.getPdf(this.pageNum);
            this.title = this.file.name;
            document.title = this.file.name
        }
    },
    data() {
        return {
            title: "",
            pageNum: 1,
            file: "",
        };
    },
    methods: {
        getPdf(pageNum) {
            if (pageNum == 0) {
                this.pageNum++;
                pageNum++;
                return;
            }
            // Asynchronous download of PDF
            var fileReader = new FileReader();

            fileReader.onload = function () {
                //Step 4:turn array buffer into typed array
                var typedarray = new Uint8Array(this.result);

                //Step 5:pdfjs should be able to read this
                const loadingTask = pdfjsLib.getDocument(typedarray);
                loadingTask.promise.then(
                    (pdf) => {
                        // The document is loaded here..
                        // Fetch the first page
                        var pageNumber = pageNum;
                        //if we are over the max skip the rest
                        if (pageNumber > pdf.numPages) {
                            return;
                        }
                        pdf.getPage(pageNumber).then(function (page) {
                            var scale = 0.5;
                            var viewport = page.getViewport({ scale: scale });

                            // Prepare canvas using PDF page dimensions
                            var canvas = document.getElementById("pdf-render");
                            var context = canvas.getContext("2d");
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;

                            // Render PDF page into canvas context
                            var renderContext = {
                                canvasContext: context,
                                viewport: viewport,
                            };
                            var renderTask = page.render(renderContext);
                            renderTask.promise.then(function () {
                                console.log("Page rendered");
                            });
                        });
                    },
                    function (reason) {
                        // PDF loading error
                        console.error(reason);
                    }
                );
            };
            //Step 3:Read the file as ArrayBuffer
            fileReader.readAsArrayBuffer(this.file);
        },
        async back(){
            this.pageNum--;
        }
    },
};
</script>

<style>
#pageContainer a {
    padding: 8px 10px;
    margin: 0 20px;
    border: 1px #fff solid;
    color: #fff;
}

#pageContainer a:hover {
    border: 1px #5b8e7d solid;
    color: #5b8e7d;

}
#pageContainer a:active {
    position: relative;
    top: 1px;
}
.buttons{
    position: relative;
    top: 20px;
      -webkit-user-select: none;
  user-select: none;
}
#pageContainer {
    margin: auto;
    width: 80%;
}
div.page {
    display: inline-block;
}
canvas {
    height: 600px;
}
</style>