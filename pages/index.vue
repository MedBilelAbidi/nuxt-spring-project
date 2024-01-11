<template>
    <div class="container  ">
        <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg mb-120 ">
          <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 class="display-4 fw-bold lh-1">Border hero with cropped image and shadows</h1>
            <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                <Button label="Join us now" rounded  />

            </div>
          </div>
          <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
              <img class="rounded-lg-3" src="bootstrap-docs.png" alt="" width="720">
          </div>
        </div>
        <div class=" px-4 py-5 mt-5 ">
            <h2 class="pb-2 border-bottom">Features with title</h2>
        
            <div class="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
              <div class="col d-flex flex-column align-items-start gap-2">
                <h2 class="fw-bold text-white">Left-aligned title explaining these awesome features</h2>
                <p class="text-white">Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                <Button label="Join us now" rounded  />

              </div>
        
              <div class="col">
                <div class="row row-cols-1 row-cols-sm-2 g-4">
                  <div class="col d-flex flex-column gap-2">
                    <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-4 rounded-3">
                        <i class="pi pi-times" style="font-size: 1.5rem"></i>
                    </div>
                    <h4 class="fw-semibold mb-0 text-white">Featured title</h4>
                    <p class="text-white">Paragraph of text beneath the heading to explain the heading.</p>
                  </div>
        
                  <div class="col d-flex flex-column gap-2">
                    <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-4 rounded-3">
                        <i class="pi pi-apple" style="font-size: 1.5rem"></i>

                    </div>
                    <h4 class="fw-semibold mb-0 text-white">Featured title</h4>
                    <p class="text-white">Paragraph of text beneath the heading to explain the heading.</p>
                  </div>
        
                  <div class="col d-flex flex-column gap-2">
                    <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-4 rounded-3">
                        <i class="pi pi-android" style="font-size: 1.5rem"></i>
                        
                    </div>
                    <h4 class="fw-semibold mb-0 text-white">Featured title</h4>
                    <p class="text-white">Paragraph of text beneath the heading to explain the heading.</p>
                  </div>
        
                  <div class="col d-flex flex-column gap-2">
                    <div class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-4 rounded-3">
                        <i class="pi pi-amazon" style="font-size: 1.5rem"></i>


                    </div>
                    <h4 class="fw-semibold mb-0 text-white">Featured title</h4>
                    <p class="text-white">Paragraph of text beneath the heading to explain the heading.</p>
                  </div>
                </div>
              </div>
            </div>


          </div>

      </div>
</template>
<script setup>


</script>



<style scoped>
.feature-icon-small {
    width: 3rem;
    height: 3rem;
}

</style>
