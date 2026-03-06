<template>
  <v-container grid-list-md text-xs-center class="recon">
    <!-- <v-layout align-center justify-center row wrap>
      <v-flex xs11>
         <v-tabs v-model="active" color="cyan" dark slider-color="blue" centered fixed-tabs>
          <v-tab ripple>Home Office</v-tab>
          <v-tab-item>
            <v-card>
          
              <HomeOffice />
          
            </v-card>
          </v-tab-item>
          <v-tab ripple>Reconciliation</v-tab>
          <v-tab-item>
            <v-card flat height="500px">
              <v-flex xs12 sm6 md3>
                <v-text-field label="Service fee"></v-text-field>
               </v-flex>
            </v-card>
          </v-tab-item>
          <v-tab ripple>Registration</v-tab>
          <v-tab-item>
            <v-card flat height="500px">
              <v-flex xs12 sm6 md3>
                <v-text-field label="Service fee"></v-text-field>
                <v-text-field label="Service fee"></v-text-field>
              </v-flex>
            </v-card>
          </v-tab-item>
        </v-tabs>

      
      </v-flex>
    </v-layout>-->
  </v-container>
</template>

<script>
// import HomeOffice from "@/components/Home/HomeOffice.vue";
export default {
  name: "Administration",
  components: {
    // HomeOffice
  },
  methods: {
    // next() {
    //   const active = parseInt(this.active);
    //   this.active = active < 2 ? active + 1 : 0;
    // }
  }
};
</script>

<style scoped>
* {
  text-transform: none !important;
}
</style>
