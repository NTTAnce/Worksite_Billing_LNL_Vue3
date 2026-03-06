<template>
  <div class="stepBackground">
    <v-container class="stepBackgroundContainer">
      <v-row no-gutters class="stepBackgroundRow">
        <v-layout align="center" align-content="center" justify="center" style="overflow: unset;">
          <v-col align="center" lg="1" xl="1" md="2" sm="2">
            <v-layout justify="center" align="center" column style="overflow: unset;">
              
              <v-btn
                :color="stepColor(stepperDefs.invoiceAdjustments)"
                theme="dark"
                color="primary"
                icon="mdi-plus"
       
               size="small"
                @click.stop="btnClicked(stepperDefs.invoiceAdjustments)"
              >{{ stepperDefs.invoiceAdjustments }}</v-btn>
              <br/><br/>
              <span class="labelClass" v-if="$vuetify.display.mdAndUp">
                Invoice
                <br />Adjustments
              </span>
            </v-layout>
          </v-col>
          <v-col align="center">
          <div style="margin-top:20px"
            class="sideBarDivider" 
            v-if="$vuetify.display.smAndUp"
            :class="
              $vuetify.display.mdAndUp
                ? step > stepperDefs.invoiceAdjustments
                  ? 'sideBarDividerActive'
                  : 'sideBarDividerInactive'
                : step > stepperDefs.invoiceAdjustments
                ? 'sideBarDividerActiveSm'
                : 'sideBarDividerInactiveSm'
            "
          ></div>
</v-col>
          <!-- <v-col align="center" lg="1" xl="1" md="2" sm="2">
            <v-layout column justify-center align-center>
              <v-btn id="btn2" :color="stepColor(2)" dark fab small>2</v-btn>
              <label for="btn2" class="labelClass" v-if="$vuetify.breakpoint.mdAndUp">
                Add
                <br />Policies
              </label>
            </v-layout>
          </v-col>
          <div
            class="sideBarDivider"
            :class="
            $vuetify.breakpoint.mdAndUp?(step>stepperDefs.addPolicies?'sideBarDividerActive':'sideBarDividerInactive'):(step>stepperDefs.AddPolicies?'sideBarDividerActiveSm':'sideBarDividerInactiveSm')"
          ></div>-->

          <v-col align="center" lg="1" xl="1" md="2" sm="2">
            <v-layout column justify="center" align="center" style="overflow: unset;">
              <v-btn
                :color="stepColor(stepperDefs.reviewChanges)"
                dark
                icon="mdi-plus"
                size="small"
                @click.stop="btnClicked(stepperDefs.reviewChanges)"
              >{{ stepperDefs.reviewChanges }}</v-btn>
              <label class="labelClass" v-if="$vuetify.display.mdAndUp">
                Review
                <br />Changes
              </label>
            </v-layout>
          </v-col>
           <v-col align="center">
          <div style="margin-top:20px"
            v-if="$vuetify.display.smAndUp"
            class="sideBarDivider"
            :class="
              $vuetify.display.mdAndUp
                ? step > stepperDefs.reviewChanges
                  ? 'sideBarDividerActive'
                  : 'sideBarDividerInactive'
                : step > stepperDefs.reviewChanges
                ? 'sideBarDividerActiveSm'
                : 'sideBarDividerInactiveSm'
            "
          ></div>
</v-col>
          <v-col align="center" lg="1" xl="1" md="2" sm="2">
            <v-layout column justify="center" align="center" style="overflow: unset;">
              <v-btn
                :color="stepColor(stepperDefs.processPayment)"
                dark
               icon="mdi-plus"
               size="small"
                @click.stop="btnClicked(stepperDefs.processPayment)"
              >{{ stepperDefs.processPayment }}</v-btn>
              <label class="labelClass" v-if="$vuetify.display.mdAndUp">
                Process
                <br />Payment
              </label>
            </v-layout>
          </v-col>
           <v-col align="center">
          <div style="margin-top:20px"
            v-if="$vuetify.display.smAndUp"
            class="sideBarDivider"
            :class="
              $vuetify.display.mdAndUp
                ? step > stepperDefs.processPayment
                  ? 'sideBarDividerActive'
                  : 'sideBarDividerInactive'
                : step > stepperDefs.processPayment
                ? 'sideBarDividerActiveSm'
                : 'sideBarDividerInactiveSm'
            "
          ></div>
</v-col>
          <v-col align="center" lg="1" xl="1" md="2" sm="2">
            <v-layout column justify="center" align="center" style="overflow: unset;">
              <v-btn
                :color="stepColor(stepperDefs.complete)"
                dark
               icon="mdi-plus"   
               size="small" 
              >{{ stepperDefs.complete }}</v-btn>
              <label class="labelClass" v-if="$vuetify.display.mdAndUp">Complete!</label>
            </v-layout>
            <br v-if="$vuetify.display.mdAndUp" />
          </v-col>
        </v-layout>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import eventBus from "@/event-bus.js";

export default {
  props: {
    step: { type: Number },
    stepperDefs: { type: Object }
  },
  created() {},
  methods: {
    btnClicked(btnNum) {
      //if (btnNum <= this.step) {
      eventBus.emit("updateStep", btnNum);
      //}
    },
    stepColor(btnNum) {
      if (this.step >= btnNum) {
        return this.$store.state.mainColor;
      } else {
        return "rgb(169, 169, 169)";
      }
    }
  }
};
</script>

<style>
.stepBackground {
  border-radius: 10px;
  width: 100%;
  background-color: #f0f0f0;
  margin-bottom: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
  padding-top: 0px;
}
.stepBackgroundContainer {
  width: 100%;
  background-color: #f0f0f0;
  margin-bottom: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
  padding-top: 0px;
}
.stepBackgroundRow {
  background-color: #f0f0f0;
  margin-bottom: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
  padding-top: 0px;
}
.sideBarDividerActive {
  border-top: 3px dotted #f5b82a;
  width: 100%;
  margin-bottom: 40px;
}
.sideBarDividerInactive {
  border-top: 3px dotted darkgray;
  width: 100%;
  margin-bottom: 40px;
}
.sideBarDividerActiveSm {
  border-top: 3px dotted #f5b82a;
  width: 100%;
}
.sideBarDividerInactiveSm {
  border-top: 3px dotted darkgray;
  width: 100%;
}

.labelClass {
  font-size: small;
  color: #00558c;
  background: transparent;
  margin-top: 40px;
  margin-left: -50px;
}
.flexMods {
  flex: 1 1 auto !important;
}
</style>
