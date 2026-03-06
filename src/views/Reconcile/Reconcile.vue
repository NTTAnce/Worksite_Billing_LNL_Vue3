<template>
  <v-layout align-center justify="center" align-content="center">
    <v-col :class="$vuetify.display.smAndDown?'xs11':'xs12'">
      <recWiz :FranchiseId="this.FranchiseId" class="padBottom" />
    </v-col>

    <div v-if="unsavedChangesDialog">
      <v-dialog
        v-model="unsavedChangesDialog"
        persistent
        width="400"
        id="unsavedChangesDialog"
        ref="unsavedChangesDialog"
      >
        <v-card>
          <v-card-title class="headline" color="$store.state.mainColor">
            <v-icon :color="$store.state.mainColor" large>mdi-delete</v-icon>&nbsp;Discard Changes?
          </v-card-title class="alerttext">            
          <v-layout align="center" justify="center">
            <hr width="90%" />
          </v-layout>
          <v-card-subtitle class="alerttext" style="white-space:pre-wrap !important;">
            <span v-if="unsavedChanges">You have unsaved changes.&nbsp;</span>Are you sure you want to exit the page without saving your changes?
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#319B42" dark class="menuBtn alertbtn" @click="handleNavigation(false)">No</v-btn>
            <v-btn color="#319B42" dark class="menuBtn alertbtn" @click="handleNavigation(true)">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-layout>
</template>


<script>
import recWiz from "@/components/Reconcile/ReconcileWizard.vue";
import eventBus from "@/event-bus.js";

export default {
  name: "reconcile",
  props: { mainColor: String, FranchiseId: String },
  components: {
    recWiz,
    // reconWzd
  },
  created() {},
  methods: {
    handleNavigation(leave) {
      this.navigate = leave;
      this.unsavedChangesDialog = false;
      eventBus.emit("unsavedChangesDialogClosed");
    },
  },

   beforeRouteLeave(to, from, next) {
    if (to.fullPath == "/logout?timedOut=true") return next();

    // console.log("before Route leave");
    if (this.unsavedChanges == true) {
      
      this.unsavedChangesDialog = true;

       this.$nextTick(() => {
        // console.log(this.$refs.unsavedChangesDialog);

        eventBus.on("unsavedChangesDialogClosed", () => {
          // console.log("!!!!");
          eventBus.off("unsavedChangesDialogClosed");
          if (this.navigate == true) {
            
            return next();
          }
        });
      });
    } else {
      
      return next();
    }
  },
  mounted() {
    eventBus.on(
      "unsavedChanges",
      function (value) {
      
        this.unsavedChanges = value;
      }.bind(this)
    );
  },
  data() {
    return {
      unsavedChanges: false,
      unsavedChangesDialog: false,
      navigate: undefined,
      leave: true,
    };
  },
};
</script>

<style scoped>
</style>
