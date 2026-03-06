//import { createApp } from 'vue'
import { createStore } from 'vuex'
 
import Log from "@/log.js";
 
export const store = createStore({
  state () {
    return {
      worksiteUser: [],
    switchCompanies: false,
    currentFranchise: {
      franchiseNumber: "",
      frequency: "",
      billingCycle: "",
      franchiseName: "",
      franchiseAddr: "",
      franchiseAddr1: "",
      franchiseAddr2: "",
      franchiseCSZ: "",
      franchisePhone: "",
      paidToDate: "",
      printBillMode: "",
      agencyNumber: "",
      branchNumber: "",
      brokerNumber: "",
    },
    invoiceList: [],
    invoicePolicies: [],
    invoiceHistory: [],
    invoiceHistoryDetail: [],
    userPermissions: [],
    Errors: [],
    mainColor: String,
    currentInvoice: {},
    testFeatures: true,
    loginType: "",
    currentUser: {
      user: "",
      type: "",
      name: "",
    },
    displayName: "",
    notificationTypes: [],
    tok: null
    }
  },
  mutations: {
    setJWT(state, jwt){
      window.sessionStorage.setItem("tok", jwt);
      state.tok = jwt;
    },
    setSession(state, session) {
      window.sessionStorage.setItem("session", session);
      state.session = session;
    },
    addNotificationType(state, notif) {
      state.notificationTypes.push(notif);
    },
    setDisplayName(state, name) {
      try {
        state.displayName = name;
      } catch (e) {
        Log.logError(e, "store.js setDisplayName");
      }
    },
    setCurrentFranchise(state, details) {
      try {
        state.currentFranchise.franchiseNumber = details.franchiseNumber;
        state.currentFranchise.frequency = details.frequency;
        state.currentFranchise.billingCycle = details.billingCycle;
        state.currentFranchise.paidToDate = details.paidToDate;
        state.currentFranchise.franchiseName = details.franchiseName;
        state.currentFranchise.billContact = details.billContact;
        state.currentFranchise.franchiseAddr = details.franchiseAddr;
        state.currentFranchise.franchiseAddr1 = details.franchiseAddr1;
        state.currentFranchise.franchiseAddr2 = details.franchiseAddr2;
        state.currentFranchise.franchiseCSZ = details.franchiseCSZ;
        state.currentFranchise.franchisePhone = details.franchisePhone;
        state.currentFranchise.printBillMode = details.printBillMode;
        state.currentFranchise.agencyNumber = details.agencyNumber;
        state.currentFranchise.branchNumber = details.branchNumber;
        state.currentFranchise.brokerNumber = details.brokerNumber;
      } catch (e) {
        Log.logError(e, "store.js setCurrentFranchise");
      }
    },
    setCurrentFranchiseBillingFrequency(state, frequency) {
      try {
        state.currentFranchise.frequency = frequency;
      } catch (e) {
        Log.logError(e, "store.js setCurrentFranchiseBillingFrequency");
      }
    },
    setCurrentFranchiseBillingCycle(state, billingCycle) {
      try {
        state.currentFranchise.billingCycle = billingCycle;
      } catch (e) {
        Log.logError(e, "store.js setCurrentFranchiseBillingCycle");
      }
    },
    setCurrentFranchiseBillingPaidToDate(state, paidTo) {
      try {
        state.currentFranchise.paidToDate = paidTo;
      } catch (e) {
        Log.logError(e, "store.js setCurrentFranchiseBillingPaidToDate");
      }
    },
    setCurrentFranchiseBrokerNumber(state, brokerNumber) {
      try {
        state.currentFranchise.brokerNumber = brokerNumber;
      } catch (e) {
        Log.logError(e, "store.js setCurrentFranchiseBrokerNumber");
      }
    },
    resetCurrentFranchise(state) {
      try {
        state.currentFranchise.franchiseNumber = "";
        state.currentFranchise.frequency = "";
        state.currentFranchise.billingCycle = "";
        state.currentFranchise.franchiseName = "";
        state.currentFranchise.billContact = "";
        state.currentFranchise.franchiseAddr = "";
        state.currentFranchise.franchiseCSZ = "";
        state.currentFranchise.franchisePhone = "";
        state.currentFranchise.paidToDate = "";
        state.currentFranchise.printBillMode = "";
        state.currentFranchise.agencyNumber = "";
        state.currentFranchise.branchNumber = "";
        state.currentFranchise.brokerNumber = "";
      } catch (e) {
        Log.logError(e, "store.js resetCurrentFranchise");
      }
    },
    setCurrentUser(state, curUser) {
      try {
        state.currentUser.user = curUser.user;
        state.currentUser.type = curUser.type;
        state.currentUser.name = curUser.name;
        state.currentUser.phone = curUser.phone;
      } catch (e) {
        Log.logError(e, "store.js setCurrentUser");
      }
    },
    clearCurrentUser(state) {
      try {
        state.currentUser.user = "";
        state.currentUser.type = "";
        state.currentUser.name = "";
        state.currentUser.phone = "";
      } catch (e) {
        Log.logError(e, "store.js clearCurrentUser");
      }
    },
    setLoginType(state, login) {
      try {
        state.loginType = login;
      } catch (e) {
        Log.logError(e, "store.js setLoginType");
      }
    },
    setCurrentInvoice(state, invoice) {
      try {
        state.currentInvoice = invoice;
      } catch (e) {
        Log.logError(e, "store.js setCurrentInvoice");
      }
    },
    setMainColor(state, color) {
      try {
        state.mainColor = color;
      } catch (e) {
        Log.logError(e, "store.js setMainColor");
      }
    },
    updateInvoice(state, invoiceDetails) {
      try {
        state.invoicePolicies = invoiceDetails;
      } catch (e) {
        Log.logError(e, "store.js updateInvoice");
      }
    },
    updateInvoiceList(state, invoiceListDetails) {
      try {
        state.invoiceList = invoiceListDetails;
      } catch (e) {
        Log.logError(e, "store.js updateInvoiceList");
      }
    },
    updateInvoiceHistory(state, invoiceHist) {
      try {
        state.invoiceHistory = invoiceHist;
      } catch (e) {
        Log.logError(e, "store.js updateInvoiceHistory");
      }
    },
    setSwitchCompanies(state, switchStatus) {
      try {
        state.switchCompanies = switchStatus;
      } catch (e) {
        Log.logError(e, "store.js setSwitchCompanies");
      }
    },
    clearSwitchCompanies(state) {
      try {
        state.switchCompanies = false;
      } catch (e) {
        Log.logError(e, "store.js clearSwitchCompanies");
      }
    },
  },
  actions: {},
})
 