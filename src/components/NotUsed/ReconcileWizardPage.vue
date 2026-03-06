<template>
  <div>
 
  

    <!-- <v-container fluid justify-start>

      <v-layout row align-center justify-center wrap>
        <v-flex xs11>
          <v-stepper v-model="e1">
            <v-stepper-header class="step-styles">
              <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 3" step="3">Name of step 3</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 4" step="4">Name of step 4</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 5" step="5">Name of step 5</v-stepper-step>
            </v-stepper-header>
            <template>
              <v-form>
                <v-container fluid>
                  <v-layout row align-center justify-center wrap>
                    <v-flex xs2>
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Employee Full Name"
                        v-capitalize="name"
                        v-on:keyup.enter="gotoField('empAddr', $event)"
                        ref="employeeName"
                      >></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </template>
            <v-stepper-items>
              <v-stepper-content step="1">
          
                <reconTab :FranchiseId="this.FranchiseId" />
                <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
          
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
             
                <reconTab :FranchiseId="this.FranchiseId" />
                <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
               
                <reconTab />
                <v-btn color="primary" @click="e1 = 4">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
              
              <v-stepper-content step="4">
            
                <reconTab />
                <v-btn color="primary" @click="e1 = 5">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
             

              <v-stepper-content step="5">
             

                <reconTab />
                <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </div> -->
</template>

<script>
// import store from "@/store";

// import reconList from "@/components/InvoiceList.vue";
export default {
  name: "reconcile",
  props: { mainColor: String, FranchiseId: String },
  components: {
 
    // ,
    // reconList
  },
  created() {
    
   
  },
  data() {
    return {
      e1: 0,
      stepperColor: "#cdcdcd"
    };
  }
};
</script>
.Main{ width: 1000px }
<style scoped>
.reconcile {
  /* background-color: yellow; */
  background-color: #cdcdcd;
  /* background-color: #aaaaaa; */
}
.step-styles {
  background-color: #337ab7;
  color: red;
}
</style>
