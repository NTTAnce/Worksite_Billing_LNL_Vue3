<template>
  <!-- <div class="Main"> -->

  <v-container grid-list-md text-xs-center>
    <!-- <v-layout align-center justify-center row wrap> -->
    <v-layout row align-center justify-center wrap>
      <v-flex xs8>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1"
              >Name of step 1</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2"
              >Name of step 2</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3"
              >Name of step 3</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 4" step="4"
              >Name of step 4</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step step="5">Name of step 5</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <!-- <v-card
                class="mb-5"
                color="grey lighten-1"
                height="200px"
              ></v-card>-->
              <reconTab />
              <v-btn color="primary" @click="e1 = 2">Continue</v-btn>

              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <!-- <v-card
                class="mb-5"
                color="grey lighten-1"
                height="200px"
              ></v-card>-->
              <reconTab />
              <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <!-- <v-card
                class="mb-5"
                color="grey lighten-1"
                height="200px"
              ></v-card>-->
              <reconTab />
              <v-btn color="primary" @click="e1 = 4">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            <!--step4-->

            <v-stepper-content step="4">
              <!-- <v-card
                class="mb-5"
                color="grey lighten-1"
                height="200px"
              ></v-card>-->
              <reconTab />
              <v-btn color="primary" @click="e1 = 5">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            <!--step5-->

            <v-stepper-content step="5">
              <!-- <v-card
                class="mb-5"
                color="grey lighten-1"
                height="200px"
              ></v-card>-->
              <reconTab />
              <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- </div> -->
</template>

<script>
import reconTab from "@/components/DTTable.vue";
export default {
  name: "reconcile",
  components: {
    reconTab
  },
  data() {
    return {
      e1: 0
    };
  }
};
</script>
.Main{ width: 1000px }
<style scoped></style>
