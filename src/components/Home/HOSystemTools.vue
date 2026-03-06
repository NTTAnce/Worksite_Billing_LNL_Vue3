<template>
  <div>
    <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>

    <v-row>
      <v-col v-if="$vuetify.breakpoint.mdAndUp"></v-col>
      <v-col :cols="11">
        <v-row no-gutters class="mb-6" v-if="showInvoiceTool">
        <v-col :cols="$vuetify.breakpoint.smAndDown?2:1">
            <v-icon color="#00558c" size="50">mdi-file-document-edit</v-icon>
        </v-col>
        <v-col>
            <h2 class="menuHeaders">Invoice Maintenance</h2>
            <v-flex>Update Invoice Payments Data, Delete Invoices</v-flex>
            <router-link to="/HomeOfficeInvoiceTool" class="menuLinks">
            <v-btn color="#319B42" dark class="menuBtn">Invoice Maintenance</v-btn>
            </router-link>
        </v-col>
        </v-row>

        <v-row no-gutters class="mb-6" v-if="showRecPayLock">
        <v-col :cols="$vuetify.breakpoint.smAndDown?2:1">
            <v-icon color="#00558c" size="50">mdi-lock</v-icon>
        </v-col>
        <v-col>
            <h2 class="menuHeaders">Reconcile &amp; Pay Lock Settings</h2>
            <v-flex>Unlock and Reset Reconcile &amp; Pay Invoices</v-flex>
            <router-link to="/recpay" class="menuLinks">
            <v-btn color="#319B42" dark class="menuBtn">Reconcile &amp; Pay Lock Settings</v-btn>
            </router-link>
        </v-col>
        </v-row>

        <v-row no-gutters class="mb-6" v-if="showConfiguration">
        <v-col :cols="$vuetify.breakpoint.smAndDown?2:1">
            <v-icon color="#00558c" size="50">mdi-settings</v-icon>
        </v-col>
        <v-col>
            <h2 class="menuHeaders">Settings</h2>
            <v-flex>System Settings</v-flex>
            <router-link to="/homeOfficeConfiguration" class="menuLinks">
            <v-btn color="#319B42" dark class="menuBtn">Settings</v-btn>
            </router-link>
        </v-col>
        </v-row>

      </v-col>
    </v-row>
  </div>
</template>
<script>
import permissions from "@/permissions.js";
export default {
  name: "HOSystemTools",
  mixins: [permissions],
  data: () => ({
      breadcrumbItems: [
        {
          text: "Home Office",
          disabled: false,
          href: "hoLanding"
        },
        {
          text: "Account Maintenance",
          disabled: true
        }
      ],    
      showConfiguration : true,
      showInvoiceTool : true,
      showRecPayLock : true,
  }),

};
</script>
<style scoped>
.v-breadcrumbs {
  margin-left: -10px;
  margin-top: -20px;
}

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
