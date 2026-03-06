<template>
  <VRow justify="center" align="center">
    <VCol cols="11">

      <!-- Export Buttons -->
      <VRow
        v-if="showExportOptions"
        justify="end"
        align="center"
        class="mb-2"
      >
        <span class="exportText">
          <i>
            Download Company List
            <VIcon size="14">mdi-arrow-right</VIcon>&nbsp;
          </i>
        </span>

        <!-- Excel -->
        <VTooltip text="Download as Excel" location="top">
          <template #activator="{ props }">
            <VIcon
              v-bind="props"
              @click="exportCompany('Excel')"
              color="#319B42"
            >
              mdi-file-excel
            </VIcon>
          </template>
        </VTooltip>

        <!-- PDF -->
        <VTooltip text="Download as PDF" location="top">
          <template #activator="{ props }">
            <VIcon
              v-bind="props"
              @click="exportCompany('PDF')"
              color="#ED722F"
            >
              mdi-file-pdf-outline
            </VIcon>
          </template>
        </VTooltip>
      </VRow>

      <!-- Data Table -->
      <VDataTable
        :headers="headers"
        :items="filteredItems"
        class="elevation-3"
        :items-per-page="itemsPerPage"
        @update:options="updatePagination"
        :sort-by="sortBy"
        must-sort
        :page="page"
        :no-data-text="noDataDisplayText"
        :items-per-page-options="[
          { value: 10, title: '10' },
          { value: 25, title: '25' },
          { value: 50, title: '50' },
          { value: 100, title: '100' },
          { value: -1, title: 'All' }
        ]"
        show-first-last-page
      >

        <!-- Link Column -->
        <template #item.link="{ item }">
          <span class="viewLink" @click="selectCompany(item)">select</span>
          <VIcon
            color="#319B42"
            size="16"
            class="viewLink"
            style="margin-left:3px;margin-bottom:3px;"
            @click="selectCompany(item)"
          >
            mdi-chevron-double-right
          </VIcon>
        </template>

        <!-- Footer -->
        <template #bottom>
          <div class="d-flex align-center justify-end pa-2">
            <span>Viewing items: {{ pageStart }}–{{ pageStop }} of {{ itemsLength }}</span>

            <span class="ml-4">Page:</span>

            <VSelect
              :items="pages"
              item-title="page"
              item-value="page"
              hide-details
              style="width:75px;font-size:0.75rem;margin-right:20px;"
            />

            <span>of {{ maxPages }}</span>
          </div>
        </template>

      </VDataTable>
    </VCol>

    <!-- Loader -->
    <VProgressCircular
      v-if="waiting"
      :size="70"
      width="10"
      color="#319B42"
      indeterminate
      class="waitCircle"
    />
  </VRow>
</template>


<script>
import Log from "@/log.js";
import { HTTP_HATS } from "@/HTTP-common.js";
import { HTTP_SA, HTTP } from "@/HTTP-common.js";
import { Role } from "@/role.js";
import encryption from "@/encryption.js";
import eventBus from "@/event-bus.js";


export default {
  props: [
    "headers",
    "filteredItems",
    "itemsPerPage",
    "sortBy",
    "pages",
    "page",
    "maxPages",
    "selectedItem",
    "noDataText",
    "showExportOptions"
  ],
  mounted() {
    if (this.selectedItem && this.selectedItem.number.length > 0) {
      this.selectCompany(this.selectedItem);
    }
  },
  data() {
    return {
      waiting: false,
      items: [],
      noItemsFlag: false,
      userType: window.sessionStorage.getItem("type"),
    };
  },
  computed: {
    noDataDisplayText() {
      if (this.noDataText) {
        return this.noDataText;
      }
      return "No companies found.";
    }
  },
  methods: {
    updatePagination(){
      eventBus.emit('itemsPerPage', this.itemsPerPage);
    },
    exportCompany(exportFormat){
      eventBus.emit("exportCompany", exportFormat);
    },
    setRoles(franchiseId) {
      try {
        let franchisesAndRoles = JSON.parse(
          window.sessionStorage.getItem("franchises")
        );

        let userRoles = [];

        for (let franchiseAndRole of franchisesAndRoles) {
          if (franchiseAndRole.franchiseID == franchiseId.toString()) {
            HTTP_SA.get("UserRolePermissions/GetRolePermissionsByRole", {
              params: {
                role: franchiseAndRole.roleName,
              },
            }).then((response) => {
              if (response.status == 200 && response.data.statusCode == "200") {
                for (let det of response.data.rolePermissionDetails) {
                  if (userRoles.indexOf(det.uiRoleName) <= 0)
                    userRoles.push(det.uiRoleName);
                }

                userRoles.push(Role.FranchiseUser);

                let role = userRoles.join();
                let encryptedRole = encryption.encrypt(role);
                window.sessionStorage.setItem("role", encryptedRole);
              }
            });
          }
        }
      } catch (e) {
        Log.logError(e, "CompanySearchTable setRoles");
      }
    },

    selectCompany(item) {
      try {
        this.waiting = true;

        if (this.userType == "ext") {
          this.setRoles(item.number);
        }       
        HTTP_HATS.get("CompanyInfo/GetCompanyInfo", {
          params: {
            companyId: item.number,
            
          },
        })
          .then((response) => {
             console.log(JSON.stringify(response.data));
            if (response.status != 200) {
              Log.logError(
                response.statusText,
                "CompanySearch.vue CompanyInfo/GetCompanyInfo response"
              );
              
              this.waiting = false;
              this.errDialog = true;
            } else {
              if (
                response.data.companyDetails &&
                response.data.companyDetails.length > 0
              ) {
                let franchise = response.data.companyDetails[0];
 
                this.franchiseDetails = {
                  franchiseNumber: franchise.companyID,
                  frequency: "UNKNOWN",
                  billingCycle: "UNKNOWN",
                  paidToDate: "",
                  franchiseName: franchise.companyName,
                  billContact: franchise.billContact,
                  franchiseAddr: (
                    franchise.billAddressLine1 +
                    " " +
                    franchise.billAddressLine2
                  ).trim(),
                  franchiseAddr1: franchise.billAddressLine1,
                  franchiseAddr2: franchise.billAddressLine2,
                  franchiseCSZ:
                    franchise.city || franchise.state || franchise.zip
                      ? (franchise.city != null && franchise.city != ""
                          ? franchise.city
                          : "UNKNOWN") +
                        ", " +
                        (franchise.state != null && franchise.state != ""
                          ? franchise.state
                          : "UN") +
                        "  " +
                        (franchise.zip != null && franchise.zip != ""
                          ? franchise.zip
                          : "99999-0000")
                      : "",
                  franchisePhone: franchise.phone,
                  printBillMode: item.printBillModeOriginal,
                  branchNumber: item.branchNumber,
                  agencyNumber: item.agencyNumber,
                };

                this.$store.commit(
                  "setCurrentFranchise",
                  this.franchiseDetails
                );
              }

              HTTP_HATS.get("BillingInfo/GetBillingInfo", {
                params: {
                  companyId: item.number,
                },
              })
                .then((response) => {
                  if (response.status != 200) {
                    Log.logError(
                      response.statusText,
                      "CompanySearch.vue BillingInfo/GetBillingInfo response"
                    );
                    this.waiting = false;
                    this.errDialog = true;
                  } else {
                    if (
                      response.data.billingDetails &&
                      response.data.billingDetails.length > 0
                    ) {
                      let billing = response.data.billingDetails[0];

                      this.franchiseDetails.frequency = billing.employesDed;
                      this.franchiseDetails.billingCycle = billing.paymentToLNL;

                      this.$store.commit(
                        "setCurrentFranchiseBillingFrequency",
                        this.franchiseDetails.frequency
                      );

                      this.$store.commit(
                        "setCurrentFranchiseBillingCycle",
                        this.franchiseDetails.billingCycle
                      );
                    }

                    HTTP_HATS.get("BillingInfo/GetBillingPaidTo", {
                      params: {
                        franchiseId: item.number,
                      },
                    })
                      .then((response) => {
                        if (response.status != 200) {
                          Log.logError(
                            response.statusText,
                            "CompanySearch.vue BillingInfo/GetBillingPaidTo response"
                          );

                          this.waiting = false;
                          this.errDialog = true;
                        } else {
                          if (
                            response.data.billingPaidToDetails &&
                            response.data.billingPaidToDetails.length > 0
                          ) {
                            let billing = response.data.billingPaidToDetails[0];
                            this.franchiseDetails.paidToDate = billing.paidToDate ? this.$options.filters.mmddyyyy(billing.paidToDate) : '';
                            this.$store.commit(
                              "setCurrentFranchiseBillingPaidToDate",
                              this.franchiseDetails.paidToDate
                            );
                          }

                          window.sessionStorage.setItem(
                            "currentFranchise",
                            JSON.stringify(this.franchiseDetails)
                          );

                          if (this.userType == "agency") {
                            this.waiting = false;
                            this.$router.push("/invoicehistory");
                          } else if (this.userType == "ext") {
                            HTTP.get("Company/SearchCompanies", {
                              params: {
                                searchFor: item.number,
                                searchBy: "@companyId",
                                searchType: "EXT",                                
                              },
                            })
                              .then((response) => {
                                if (response.status == "200") {
                                  if (
                                    response.data.franchiseDetails &&
                                    response.data.franchiseDetails.length
                                  ) {
                                    let current =
                                      response.data.franchiseDetails[0];

                                    if (current) {
                                      this.franchiseDetails.printBillMode =
                                        current.printBillMode;

                                      this.franchiseDetails.printBillModeOriginal =
                                        current.printBillMode;

                                      window.sessionStorage.setItem(
                                        "currentFranchise",
                                        JSON.stringify(this.franchiseDetails)
                                      );
                                      this.$store.commit(
                                        "setCurrentFranchise",
                                        this.franchiseDetails
                                      );
                                      this.waiting = false;
                                      this.$nextTick(() => {
                                        this.$router.push("/invoicehome");
                                      });
                                    }
                                  }
                                } else {
                                  this.waiting = false;
                                  this.$router.push("/invoicehome");
                                }
                              })
                              .catch((e) =>
                                Log.logError(
                                  e,
                                  "CompanySearch.vue selectCompany (ext) Company/SearchCompanies"
                                )
                              );
                          } else {
                            this.waiting = false;
                            this.$router.push("/invoicehome");
                          }
                        }
                      })
                      .catch((e) => {
                        Log.logError(
                          e,
                          "CompanySearch.vue selectCompany BillingInfo/GetBillingPaidTo"
                        );
                        this.waiting = false;
                        this.errDialog = true;
                      });
                  }
                })
                .catch((e) => {
                  Log.logError(
                    e,
                    "CompanySearch.vue selectCompany BillingInfo/GetBillingInfo"
                  );
                  this.waiting = false;
                  this.errDialog = true;
                });
            }
          })
          .catch((e) => {
            Log.logError(
              e,
              "CompanySearch.vue selectCompany CompanyInfo/GetCompanyInfo"
            );
            this.waiting = false;
            this.errDialog = true;
          });
      } catch (e) {
        this.errDialog = true;
        Log.logError(e, "CompanySearch.vue selectCompany");
      }
    },
  },
};
</script>
<style scoped>
.viewLink {
  color: #319b42;
  text-decoration: none;
  font-weight: normal;
  cursor: pointer;
  font-size: 1rem;
}
.waitCircle {
  z-index: 20;
  position: absolute;
  top: 30%;
  left: 40%;
}
.waitCircleSm {
  z-index: 20;
  position: absolute;
  top: 30%;
  left: 50%;
}
.exportText {
  font-size: 0.75rem;
}
</style>