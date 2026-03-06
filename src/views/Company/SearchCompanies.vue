<template>
  <v-row align="center" justify="center" row  wrap>
    <v-col cols="11">
      <hoSearchCompanies v-if="userType=='homeoffice'" />      
      <companySearch v-if="userType=='agency'" />
      <extCompanySearch v-if="userType=='ext'" />
    </v-col>

    <v-dialog v-model="selectDialog" persistent width="350">
      <v-card>
        <br />
        <br />
        <v-card-text>Please select a company.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#319B42" dark class="menuBtn" @click="selectDialog=false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="noFranchisesDialog" persistent width="425">
      <v-card>
        <v-card-text>
          <br />
          <v-row>
            <v-col>
              <span
                v-if="noFranchisesRerouteDialog"
              >A company must be chosen to load the selected page, but no companies are associated with your account. Please contact your administrator for further assistance.</span>
              <span
                v-else
              >There are no companies associated with your account. Please contact your administrator for further assistance.</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#319B42" dark class="menuBtn" @click="noFranchisesDialog = false">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import companySearch from "@/components/Company/CompanySearch.vue";
import extCompanySearch from "@/components/Company/ExtCompanySearch.vue";
import hoSearchCompanies from "@/components/Home/HOSearchCompanies.vue";
import Log from "@/log.js";
import eventBus from "@/event-bus.js";

export default {
  props: {},
  components: {
    companySearch,
    extCompanySearch,
    hoSearchCompanies
  },
  mounted() {},
  beforeDestroy() {
    eventBus.off("noFranchises");
  },
  computed: {
    noFranchisesRerouteDialog() {
      return (
        this.noFranchisesDialog &&
        (this.$route.query.dialog ? this.$route.query.dialog : false)
      );
    },
    userType() {
      return window.sessionStorage.getItem("type");
    }
  },
  created() {
    try {
      this.selectDialog = this.$route.query.dialog
        ? this.$route.query.dialog
        : false;
    } catch (e) {
      Log.logError(e, "SearchCompanies created");
      this.selectDialog = false;
    }

    eventBus.on(
      "noFranchises",
      function() {
        this.selectDialog = false;
        this.noFranchisesDialog = true;
      }.bind(this)
    );
  },
  data() {
    return {
      selectDialog: false,
      noFranchisesDialog: false
    };
  }
};
</script>
<style scoped>
</style>