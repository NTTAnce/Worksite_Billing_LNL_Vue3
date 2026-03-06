<template>
  <div>
    <v-layout justify-center align-content-center>
      <v-flex xs10>
        <v-card class="mx-auto">
          <header class="px-2 py-3 v-sheet v-sheet--tile theme--dark v-toolbar v-toolbar--flat tbBackground">
            <v-flex style="padding-top: 10px; padding-left: 10px;">
              <span class="title">Worksite Online Billing Overview</span>
              <br />
              <span class="subtitle">
              </span>
            </v-flex>
          </header>
          <br />
          <br />
          <v-layout justify-center align-content-center row>
            <v-flex xs10>
              <div class='embed-container'>
                <iframe src='https://player.vimeo.com/video/465923599' frameborder='0' 
                webkitAllowFullScreen mozallowfullscreen allowFullScreen>
                </iframe>
              </div>
            </v-flex>
          </v-layout>
          <br />
        </v-card>
      </v-flex>
    </v-layout>
</div>
</template>
<style scoped>
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}

.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
