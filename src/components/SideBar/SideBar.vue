<template>
  <v-card elevation="3" class="franchiseDiv" color="rgb(240, 240, 240)" v-if="showSideBarData">
    
      <span class="sideBarHeader">Company Details</span>
      <v-row justify="end" align="end">
        <router-link
          to="/search"
          class="editLink"
          v-if="loginType != 'homeoffice' && $store.state.switchCompanies"
        >switch</router-link>
        <router-link
          to="/hoSearchCompanies"
          class="editLink"
          v-if="loginType == 'homeoffice'"
        >switch</router-link>
      </v-row>
    
    <hr class="sideBarDivider" />
    <!-- <v-divider content-offset="2rem" opacity=".3" thickness="3" variant="dotted" ></v-divider> -->
    <div class="sideBarDetail">
      <v-col cols="12">
        <br v-if="!narrow" />
        <div v-if="narrow==true" style="margin-bottom:10px;"></div>
        <span class="emphasis">{{ franchiseName }}</span>
        <br />
        <span>
          Billing Contact:&nbsp;
          <span class="emphasis">{{ billContact }}</span>
        </span>
        <br />
        <span>{{ franchiseAddr}}</span>
        <br />
        <span>{{ franchiseCSZ }}</span>
        <br />
        <span>{{ franchisePhone }}</span>

        <v-row justify-end align-content-end>
          <router-link to="/company" class="editLink" v-if="false">edit</router-link>
        </v-row>
        <br v-if="!narrow" />
        <span>
          <hr :style="narrow==true?'margin-top:5px;margin-bottom:5px;':''" />
        </span>
        <br v-if="!narrow" />
        <span>
          Account Number:&nbsp;
          <span class="emphasis">{{ franchiseInfo.franchiseNumber }}</span>
        </span>
        <br />
        <span>
          Paid To Date:&nbsp;
          <span class="emphasis">{{ paidToDate }}</span>
        </span>
        <br />
        <span>
          Frequency of Deduction:&nbsp;
          <span class="emphasis">{{ frequency }}</span>
        </span>
        <br />
        <span>
          Billing Cycle:&nbsp;
          <span class="emphasis">{{ billingCycle }}</span>
        </span>
        <br />
        <span>
          Bill Type:&nbsp;
          <span class="emphasis">{{ printBillMode }}</span>
        </span>
        <br />
        <span v-if="loginType=='homeoffice' && brokerNumber != 'UNKNOWN'">
          Broker Number:&nbsp;
          <span class="emphasis" style="background:yellow">{{ brokerNumber }}</span>
          <br />
        </span>
      </v-col>
    </div>
  </v-card>
</template>

<script>
import Log from "@/log.js";

export default {
  props: {
    narrow: Boolean,
  },
  data: () => ({
    showSideBarData: false,
  }),
  created() {
    let isCompanySelected =
      this.$store.state.currentFranchise.franchiseNumber != "";
    if (isCompanySelected) {
      this.showSideBarData = true;
    } else {
      this.showSideBarData = false;
    }
  },
  computed: {
    loginType() {
      return window.sessionStorage.getItem("type");
    },
    franchiseInfo() {
      try {
        return this.$store.state.currentFranchise;
      } catch (e) {
        Log.logError(e, "SideBar.vue franchiseInfo");
        return "";
      }
    },
    franchiseName() {
      try {
        return this.franchiseInfo.franchiseName != "" &&
          this.franchiseInfo.franchiseName != null
          ? this.franchiseInfo.franchiseName
          : "UNKNOWN";
      } catch (e) {
        Log.logError(e, "SideBar.vue franchiseName");
        return "UNKNOWN";
      }
    },
    franchiseAddr() {
      try {
        return this.franchiseInfo.franchiseAddr != "" &&
          this.franchiseInfo.franchiseAddr != null
          ? this.franchiseInfo.franchiseAddr
          : "UNKNOWN";
      } catch (e) {
        Log.logError(e, "SideBar.vue franchiseAddr");
        return "UNKNOWN";
      }
    },
    franchiseCSZ() {
      try {
        return this.franchiseInfo.franchiseCSZ != "" &&
          this.franchiseInfo.franchiseCSZ != null
          ? this.franchiseInfo.franchiseCSZ
          : "UNKNOWN, UN 99999-0000";
      } catch (e) {
        Log.logError(e, "SideBar.vue franchiseCSZ");
        return "UNKNOWN, UN 99999-0000";
      }
    },
    franchisePhone() {
      try {
        return this.franchiseInfo.franchisePhone != null
          ? this.franchiseInfo.franchisePhone
          : "";
      } catch (e) {
        Log.logError(e, "SideBar.vue franchisePhone");
        return "";
      }
    },
    frequency() {
      try {
        return this.franchiseInfo.frequency != null &&
          this.franchiseInfo.frequency != ""
          ? this.franchiseInfo.frequency
          : "UNKNOWN";
      } catch (e) {
        Log.logError(e, "SideBar.vue frequency");
        return "UNKNOWN";
      }
    },
    billingCycle() {
      try {
        return this.franchiseInfo.billingCycle != null &&
          this.franchiseInfo.billingCycle != ""
          ? this.franchiseInfo.billingCycle
          : "UNKNOWN";
      } catch (e) {
        Log.logError(e, "SideBar.vue billingCycle");
        return "UNKNOWN";
      }
    },
    paidToDate() {
      try {

        let val = this.franchiseInfo.paidToDate != null &&
          this.franchiseInfo.paidToDate != ""
          ? this.franchiseInfo.paidToDate
          : "";

        if (val == "12/31/9999")
        {
          val = 'Cancelled';
        }

        return val;
      } catch (e) {
        Log.logError(e, "SideBar.vue paidToDate");
        return "UNKNOWN";
      }
    },
    printBillMode() {
      try {
        return this.franchiseInfo.printBillMode != null &&
          this.franchiseInfo.printBillMode != ""
          ? this.franchiseInfo.printBillMode == "W"
            ? "WEB"
            : this.franchiseInfo.printBillMode == "Y"
            ? "PRINTED"
            : this.franchiseInfo.printBillMode == "N"
            ? "NO PRINT"
            : "UNKNOWN"
          : "UNKOWN";
      } catch (e) {
        Log.logError(e, "SideBar.vue printBillMode");
        return "UNKNOWN";
      }
    },
    brokerNumber() {
      try {
        return this.franchiseInfo.brokerNumber != "" &&
          this.franchiseInfo.brokerNumber != null
          ? this.franchiseInfo.brokerNumber
          : "UNKNOWN";
      } catch (e) {
        Log.logError(e, "SideBar.vue brokerNumber");
        return "UNKNOWN";
      }
    },
    billContact() {
      try {
        return this.franchiseInfo.billContact != "" &&
          this.franchiseInfo.billContact != null
          ? this.franchiseInfo.billContact
          : "UNKNOWN";
      } catch (e) {
        Log.logError(e, "SideBar.vue billContact");
        return "UNKNOWN";
      }
    },
  },
};
</script>

<style scoped>
.emphasis {
  color: #474c55 !important;
  font-weight: bold;
}
.sideBarDetail {
  color: rgb(119, 115, 113);
  font-size: 1rem;
}
.sideBarHeader {
  margin-left: 20px;
  color: rgb(119, 115, 113);
}
.editLink {
  color: #319b42;
  text-decoration: none;
  font-size: 1rem;
  margin-right: 10px;
}
.sideBarDivider {
  margin-top: 10px;
  border-top: 3px dotted gray;
}
.franchiseDiv {
  padding: 20px;
  color: rgb(119, 115, 113);
  margin-right: 20px;
  border: 3px solid rgb(119, 115, 113) !important;
  background-color: rgb(240, 240, 240);
  border-radius: 5px !important;
}
</style>

