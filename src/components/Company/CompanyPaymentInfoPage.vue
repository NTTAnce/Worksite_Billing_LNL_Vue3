<template>
  <div>
    <v-row>
      <v-col v-if="$vuetify.display.mdAndUp"></v-col>

      <v-col :cols="11">
        <!-- Change Account Information -->
        <v-row
          class="mb-6"
          v-if="checkPermissions('/companyinfo')"
        >
          <v-col :cols="$vuetify.display.smAndDown ? 2 : 1">
            <v-img src="@/assets/account-info.png" width="48" height="48" cover />
          </v-col>

          <v-col>
            <h2 class="menuHeaders">Change Account Information</h2>
            <div>Update the address and main contact information for this account.</div>

            <RouterLink to="/companyinfo" class="menuLinks">
              <v-btn color="#319B42" class="menuBtn" variant="flat">Change Company Info</v-btn>
            </RouterLink>
          </v-col>
        </v-row>

        <!-- Change Payment Information -->
        <v-row
          class="mb-6"
          v-if="checkPermissions('/paymentinfo')"
        >
          <v-col :cols="$vuetify.display.smAndDown ? 2 : 1">
            <v-img src="@/assets/account-info.png" width="48" height="48" cover />
          </v-col>

          <v-col>
            <h2 class="menuHeaders">Change Payment Information</h2>
            <div>Update stored payment method information for online invoice payments.</div>

            <RouterLink to="/paymentinfo" class="menuLinks">
              <v-btn color="#319B42" class="menuBtn" variant="flat">Change Payment Info</v-btn>
            </RouterLink>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import Log from "@/log.js";
import permissions from "@/permissions.js";

export default {
  name: "CompanyInfo",
  mixins: [permissions],
  props: { mainColor: String, FranchiseId: String },
  created() {
    try {
      let userType = window.sessionStorage.getItem("type");

      if (userType == "homeoffice") {
        if (this.$store.state.currentFranchise.franchiseNumber == "") {
          return this.$router.push("hoSearchCompanies?dialog=true");
        }
      } else {
        if (this.$store.state.currentFranchise.franchiseNumber == "")
          return this.$router.push("/search?dialog=true");
      }
    } catch (e) {
      Log.logError(e, "InvoiceHome.vue created");
    }
  },

  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.menuHeaders {
  color: #00558c;
}
.menu {
  margin-left: 100px;
}
.menuBtn {
  margin-top: 10px;
  text-transform: none !important;
  letter-spacing: normal;
  border-radius: 20px;
}
.disabledPointer {
  cursor: default;
}
.menuLinks {
  text-decoration: none !important;
  color: inherit;
}
.wrap {
  word-wrap: break-word !important;
}
</style>
