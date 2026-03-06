<template>
  <span>
    <v-form ref="form" v-model="valid">
      <v-row>
        <v-layout align-content="center"  align="center" justify="center">
          <v-col lg="3" xl="3" md="4" sm="4">
            <v-text-field
              solo
              v-model="search"
              label="Search for..."
              class="roundedTextBox"
              :rules="searchRules"
              append-icon="search"
              v-on:keyup.enter="gotoSearchBy('searchBy')"
            ></v-text-field>
          </v-col>
          <v-col lg="1" xl="1" md="1" sm="1" align="center">
            <span class="searchHeader">by</span>
          </v-col>
          <v-col lg="3" xl="3" md="3" sm="4">
            <v-select
              :items="searchByItems"
              v-model="searchBy"
              :rules="searchByRules"
              class="roundedTextBox"
              ref="searchBy"
              @update:modelValue="$refs['searchRef'].$el.focus()"
              v-on:keyup.enter="$refs['searchRef'].$el.focus()"
              variant="solo"
            ></v-select>
          </v-col>
          <v-col lg="2" xl="1" md="2" sm="2" align="center">
            <v-btn
              class="menuBtn"
              large
              color="#319B42"
              ref="searchRef"
              @click.stop="searchFranchises"
              dark
              >Search</v-btn
            >
          </v-col>
          <v-col lg="1" xl="1" md="2" sm="2">
            <v-btn
              class="menuBtn"
              large
              color="#d1d1d1"
              dark
              v-show="search == ''"
              >Reset</v-btn
            >
            <v-btn
              v-show="search != ''"
              class="menuBtn"
              large
              color="#319B42"
              @click.stop="resetFranchises"
              dark
              >Reset</v-btn
            >
          </v-col>
        </v-layout>
        <!-- <v-layout
          align-content="center"
          align="center"
          justify="center"
          v-if="$vuetify.display.smAndDown"
        > -->
          <v-container align-content="center"
          align="center"
          justify="center"
          v-if="$vuetify.display.smAndDown">
            <v-row>
              <v-col :cols="12" align="center">
                <v-text-field
                  solo
                  label="Search for..."
                  class="roundedTextBox"
                  :rules="searchRules"
                  append-icon="search"
                  v-model="search"
                  v-on:keyup.enter="gotoSearchBy('searchBy')"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="12" align="center">
                <span class="searchHeader">by</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="12" align="center">
                <v-select
                  :items="searchByItems"
                  v-model="searchBy"
                  :rules="searchByRules"
                  solo
                  class="roundedTextBox"
                  ref="searchBy"
                  @change.passive="$refs['searchRef'].$el.focus()"
                  v-on:keyup.enter="$refs['searchRef'].$el.focus()"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center" :cols="6">
                <v-btn
                  class="menuBtn"
                  large
                  color="#319B42"
                  @click.stop="searchFranchises"
                  ref="searchRef"
                  dark
                  >Search</v-btn
                >
              </v-col>
              <v-col align="center" :cols="6">
                <v-btn
                  class="menuBtn"
                  large
                  color="#d1d1d1"
                  dark
                  v-show="search == ''"
                  >Reset</v-btn
                >
                <v-btn
                  v-show="search != ''"
                  class="menuBtn"
                  large
                  color="#319B42"
                  @click.stop="resetFranchises"
                  dark
                  >Reset</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        <!-- </v-layout> -->
      </v-row>
      <v-row class="active-company-section">
        <v-layout align-content="center" align="center" justify="center">
          <v-col lg="1" xl="1" md="1" sm="1"> Companies </v-col>
          <v-col lg="3" xl="3" md="4" sm="4">
            <v-radio-group v-model="activeCompanyFlag" row>
              <v-radio value="Yes"></v-radio>
              <span v-if="activeCompanyFlag == 'Yes'" class="active-radio-item"
                >Active</span
              >
              <span v-if="activeCompanyFlag == 'No'" class="inactive-radio-item"
                >Active</span
              >
              <v-spacer />
              <v-radio value="No"></v-radio>
              <span v-if="activeCompanyFlag == 'No'" class="active-radio-item"
                >Inactive</span
              >
              <span
                v-if="activeCompanyFlag == 'Yes'"
                class="inactive-radio-item"
                >Inactive</span
              >
            </v-radio-group>
          </v-col>
        </v-layout>
      </v-row>
    </v-form>
    <CompanySearchTable
      :headers="headers"
      :filteredItems="filteredItems"
      :itemsPerPage="itemsPerPage"
      :sortBy="sortBy"
      :pages="pages"
      :page="page"
      :maxPages="maxPages"
      :noDataText="noDataText"
      :showExportOptions="showExportOptions"
    ></CompanySearchTable>
    <v-progress-circular
      v-if="waiting"
      :class="$vuetify.display.smAndDown ? 'waitCircleSm' : 'waitCircle'"
      indeterminate
      color="#319B42"
      :size="70"
      width="10"
    ></v-progress-circular>

    <v-dialog v-model="errDialog" persistent width="325">
      <v-card>
        <v-card-text>
          <br />
          <v-row>
            <v-col>Something went wrong. Please try again.</v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#319B42" dark class="menuBtn" @click="errDialog = false"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="waitDialog" persistent width="350">
      <v-card color="#44aba8" dark>
        <v-card-text>
          <v-row>
            <v-col>
              Saving to xlsx format...
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </span>
</template>
<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import dateFormat from "dateformat";
import exportInvoice from "@/export-invoice.js";

import Log from "@/log.js";
import { HTTP_HATS } from "@/HTTP-common.js";
import { HTTP_Excel } from "@/HTTP-common.js";
import eventBus from "@/event-bus.js";
import CompanySearchTable from "@/components/Company/CompanySearchTable.vue";

export default {
  components: {
    CompanySearchTable,
  },
  data() {
    return {
      errDialog: false,
      sortBy: ["branch", "number"],
      noItemsFlag: false,
      waiting: false,
      waitDialog: false,
      search: "",
      searchBy: "",
      searchFilter: "",
      searchByFilter: "",
      searchClicked: false,
      activeCompanyFlag: "Yes",
      valid: true,
      page: 1,
      itemsPerPage: 10,
      franchiseDetails: {},
      searchByItems: ["Company Name", "Account Number", "Agency", "Enrollment Month"],
      searching: false,
      searchRules: [
        (v) => !this.searchClicked || !!v || "Please enter a search term.",
      ],
      searchByRules: [
        (v) => !!v || !this.searchClicked || "Please select a search field.",
      ],
      items: [],
      headers: [
        {
          text: "Company Name",
          value: "name",
          filterable: false,
        },
        {
          text: "Account Number",
          value: "number",
          filterable: false,
        },
        {
          text: "Agency",
          value: "branch",
          filterable: false,
        },
        {
          text: "Enrollment Month",
          value: "month",
          filterable: false,
          sortable: false,
        },
        {
          text: "Uses Online Billing",
          value: "printBillMode",
          filterable: false,
        },
        {
          text: "Active",
          value: "activeCompany",
          filterable: false,
        },
        {
          text: "Invoice Home",
          value: "link",
          filterable: false,
          sortable: false,
        },
      ],
    };
  },
  beforeDestroy() {
    eventBus.off("itemsPerPage");
    eventBus.off("exportCompany");
  },
  created() {
    let type = window.sessionStorage.getItem("type");

    if (type.toLowerCase() === "agency") {
      try {
        let franchises = window.sessionStorage.getItem("franchises");

        if (franchises != null && franchises != "" && franchises != []) {
          let companies = JSON.parse(franchises);

          for (let company of companies) {
            this.items.push({
              name: company.franchiseName,
              number: company.franchiseId,
              branch: company.agencyName,
              branchNumber: company.branchNumber,
              agencyNumber: company.agencyNumber,
              month: company.enrollmentString,
              printBillMode: company.printBillMode == "W" ? "Yes" : "No",
              printBillModeOriginal: company.printBillMode,
              activeCompany: company.activeCompany ? "Yes" : "No",
            });
          }
        }

        if (this.items.length === 0) {
          this.noItemsFlag = true;
          eventBus.emit("noFranchises");
        }
      } catch (e) {
        this.errDialog = true;
        Log.logError(e, "CompanySearch.vue created");
      }
    }

    this.$store.commit(
      "setSwitchCompanies",
      this.items.length > 1 ? true : false
    );

    window.sessionStorage.setItem(
      "switchCompanies",
      this.items.length > 1 ? true : false
    );

    eventBus.on("exportCompany", (exportFormat) => {
      this.downloadCompanyList(exportFormat);
    });

    eventBus.on("itemsPerPage", (itemsPerPage) => {
      this.itemsPerPage = itemsPerPage;
    });
  },
  methods: {
    selectCompany(item) {
      try {
        this.waiting = true;

        HTTP_HATS.get("CompanyInfo/GetCompanyInfo", {
          params: {
            companyId: item.number,
          },
        })
          .then((response) => {
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
                            this.franchiseDetails.paidToDate = billing.paidToDate
                              ? this.$options.filters.mmddyyyy(
                                  billing.paidToDate
                                )
                              : "";
                            this.$store.commit(
                              "setCurrentFranchiseBillingPaidToDate",
                              this.franchiseDetails.paidToDate
                            );
                          } else {
                            this.$store.commit(
                              "setCurrentFranchiseBillingPaidToDate",
                              ""
                            );
                          }

                          window.sessionStorage.setItem(
                            "currentFranchise",
                            JSON.stringify(this.franchiseDetails)
                          );

                          this.waiting = false;

                          if (this.$store.state.loginType == "agency")
                            this.$router.push("/invoicehistory");
                          else this.$router.push("/invoicehome");
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
    gotoSearchBy(refName) {
      this.$refs[refName].activateMenu();
      this.$refs[refName].focus();
    },
    searchFranchises() {
      this.searchClicked = true;

      if (this.$refs.form.validate()) {
        this.page = 1;
        this.searchFilter = this.search;
        this.searchByFilter = this.searchBy;
      }

      this.$refs.searchRef.$el.blur();
    },
    resetFranchises() {
      this.searchFilter = "";
      this.searchByFilter = "";
      this.searchClicked = false;
      this.search = "";
      this.seachyBy = "";
      this.$refs.form.resetValidation();
    },
    downloadCompanyList(exportFormat) {
      if (exportFormat.toLowerCase() == "pdf") {
        this.generatePDF();
      }
      if (exportFormat.toLowerCase() == "excel") {
        this.generateExcel();
      }
    },
    generatePDF() {
      try {
        this.waiting = true;

        var doc = new jsPDF("l", "pt", "a4");
        //add logo and title
        let logo = new Image();
        logo.src = require("@/assets/glLnlSmBlue.png");
        doc.addImage(logo, "PNG", 50, 50, 200, 40);
        doc.setFont("helvetica", "normal");
        doc.setFontSize("16");
        if (this.activeCompanyFlag == "Yes") {
          doc.text("Worksite Active Company List", 320, 110);
        } else {
          doc.text("Worksite Inactive Company List", 320, 110);
        }
        //body
        this.generatePDFBody(doc);
        //save
        doc.save(
          "Worksite " +
            (this.activeCompanyFlag == "Yes" ? "Active" : "Inactive") +
            " Company List_" +
            dateFormat(Date.now(), "mmddyyyy") +
            "_" +
            dateFormat(Date.now(), "hhMMss") +
            ".pdf"
        );
        this.waiting = false;
      } catch (e) {
        this.waiting = false;
        Log.logError(e, "CompanySearch.vue generatePDF");
      }
    },
    generatePDFBody(doc) {
      let formattedData = this.formatPDFData(this.headers, this.filteredItems);
      let pdfData = this.generateData(this.headers, formattedData);
      let pdfHeaders = this.createHeaders(this.headers);
      let pageNumber = 1;
      let chunkSize = 18;
      let numPages =
        Math.floor(pdfData.length / chunkSize) +
        (pdfData.length % chunkSize > 0 ? 1 : 0);
      for (pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        let chunkedPdfData = exportInvoice.getChunkedData(
          pdfData,
          pageNumber,
          chunkSize
        );
        if (chunkedPdfData.length == 0) {
          break;
        }
        if (pageNumber > 1) doc.addPage("a4", "landscape");
        //Paging
        doc.setFontSize("10");
        doc.text(
          "As of Date: " + this.$options.filters.mdyyyy(Date.now()),
          380,
          pageNumber == 1 ? 130 : 90,
          { align: "left" }
        );
        doc.text(
          "Page " + pageNumber.toString() + " of " + numPages.toString(),
          735,
          pageNumber == 1 ? 130 : 90
        );

        //Table
        doc.setFont("helvetica", "normal");
        doc.setFontSize("12");
        doc.autoTable({
          theme: "striped",
          head: pdfHeaders,
          body: chunkedPdfData,
          startY: pageNumber == 1 ? 140 : 100,
          headStyles: { fillColor: "#64CCC9" },
        });
      } //for pageNumber
    },
    formatPDFData(headers, items) {
      let dataArray = [];
      try {
        for (let i = 0; i < items.length; i++) {
          let newItem = {};

          for (let j = 0; j < headers.length; j++) {
            let value = items[i][headers[j].value];
            newItem[headers[j].value] = value;
          }
          dataArray.push(newItem);
        }
      } catch (e) {
        Log.logError(e, "CompanySearch.vue formatPDFData");
      }
      return dataArray;
    },
    generateData(headers, pdfdata) {
      var result = [];

      try {
        for (let i = 0; i < pdfdata.length; i++) {
          let dataArray = [];

          for (let j = 0; j < headers.length; j++) {
            dataArray.push(pdfdata[i][headers[j].value]);
          }

          result.push(dataArray);
        }
      } catch (e) {
        Log.logError(e, "CompanySearch.vue generateData");
      }

      return result;
    },
    createHeaders(headers) {
      var result = [];
      try {
        for (var i = 0; i < headers.length - 1; i += 1) {
          result.push(headers[i].text);
        }
      } catch (e) {
        Log.logError(e, "CompanySearch.vue createHeaders");
      }

      return [result];
    },

    generateExcel() {
      try {
        this.waitDialog = true;
        let excel_body = {
          fileName:
            "Worksite " +
            (this.activeCompanyFlag == "Yes" ? "Active" : "Inactive") +
            " Company List_" +
            dateFormat(Date.now(), "mmddyyyy") +
            "_" +
            dateFormat(Date.now(), "hhMMss"),
          titleLines: [
            "Globe Life Liberty National Division",
            "Worksite " +
              (this.activeCompanyFlag == "Yes" ? "Active" : "Inactive") +
              " Company List",
            "As of Date: " + dateFormat(Date.now(), "mm/dd/yyyy"),
            "",
          ],
          headers: this.getHeadersExcel(this.headers),
          items: this.formatDataExcel(this.headers, this.filteredItems),
        };

        this.downloadExcelFile(excel_body);
      } catch (e) {
        this.waitDialog = false;
        alert(e);
      }
    },
    getHeadersExcel(headers) {
      let result = [];

      try {
        for (let j = 0; j < headers.length - 1; j++) {
          result.push(headers[j]);
        }
      } catch (e) {
        Log.logError(e, "CompanySearch.vue getHeadersExcel");
      }
      return result;
    },
    formatDataExcel(headers, items) {
      let dataArray = [];
      try {
        for (let i = 0; i < items.length; i++) {
          let newItem = {};

          for (let j = 0; j < headers.length - 1; j++) {
            let value = items[i][headers[j].value];
            value = value ? value : "";
            newItem[headers[j].value] = value.replace(/&/g, "ampersand");
          }
          dataArray.push(newItem);
        }
      } catch (e) {
        Log.logError(e, "CompanySearch.vue formatDataExcel");
      }
      return dataArray;
    },
    s2ab(s) {
      try {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      } catch (e) {
        Log.logError(e, "InvoiceHistoryPage.vue s2ab");
        try {
          if (s != null) return new ArrayBuffer(s.length);
        } catch (e) {
          Log.logError(e, "InvoiceHistoryPage.vue s2ab catch");
          throw e;
        }
      }
    },
    downloadExcelFile(body) {

      HTTP_Excel.post("Export/exportCompany", body).then((response) => {
        try {
          var blob = new Blob([this.s2ab(atob(response.data))], {
            type: "",
          });

          var fileURL = window.URL.createObjectURL(blob);
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", body.fileName + ".xlsx");
          document.body.appendChild(fileLink);

          this.waitDialog = false;

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, body.fileName + ".xlsx");
          } else {
            fileLink.click();
          }
        } catch (e) {
          Log.logError(e, "CompanySearch.vue export/exportCompany response");
          this.waitDialog = false;
          this.errDialog = true;
        }
      });
    },
  },
  computed: {
    maxPages() {
      if (this.itemsPerPage === -1) return 1;

      var itemsLength = this.filteredItems.length;

      return (
        Math.floor(itemsLength / this.itemsPerPage) +
        (itemsLength % this.itemsPerPage > 0 ? 1 : 0)
      );
    },
    pages() {
      // get max pages:

      let ret = [];

      let maxPages = this.maxPages;

      for (let i = 1; i <= maxPages; i++) {
        ret.push(i);
      }

      return ret;
    },
    filteredItems() {
      try {
        return this.items.filter((i) => {
          return (
            (!this.searchFilter ||
              !this.searchByFilter ||
              (this.searchByFilter === "Company Name" &&
                (i.name ? i.name : "")
                  .toLowerCase()
                  .indexOf(this.searchFilter.toLowerCase()) >= 0) ||
              (this.searchByFilter === "Account Number" &&
                (i.number ? i.number : "")
                  .toLowerCase()
                  .indexOf(this.searchFilter.toLowerCase()) >= 0) ||
              (this.searchByFilter === "Enrollment Month" && 
                (i.month ? i.month : "")
                  .toLowerCase()
                  .indexOf(this.searchFilter.toLowerCase()) >= 0) ||
              (this.searchByFilter === "Agency" &&
                (i.branch ? i.branch : "")
                  .toLowerCase()
                  .indexOf(this.searchFilter.toLowerCase()) >= 0)) &&
            i.activeCompany === this.activeCompanyFlag
          );
        });
      } catch (e) {
        Log.logError(e, "CompanySearch.vue filteredItems");
        return this.items;
      }
    },
    noDataText() {
      if (this.activeCompanyFlag === "Yes") {
        return "Not Found. Try searching inactive companies";
      }
      return "Not Found. Try searching active companies";
    },
    showExportOptions() {
      return true;
    },
  },
};
</script>
<style scoped>
.menuBtn {
  text-transform: none !important;
  letter-spacing: normal;
  border-radius: 20px;
  margin-bottom: 30px;
}
.roundedTextBox {
  border-radius: 15px !important;
  -moz-border-radius: 15px !important;
  -webkit-border-radius: 15px !important;
}
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
.active-company-section {
  margin-top: -50px;
  margin-left: -100px;
}
.active-radio-item {
  color: green;
  font-weight: bold;
}
.inactive-radio-item {
  color: gray;
}
</style>
