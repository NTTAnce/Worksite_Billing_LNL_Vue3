//import Vue from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import InvoiceHome from "@/views/Home/InvoiceHome.vue";
import Administration from "@/views/Admin/Administration.vue";
import LogIn from "@/views/AccountAdmin/LogIn.vue";
import ForgotPassword from "@/views/AccountAdmin/ForgotPassword.vue";
//import Register from "@/views/AccountAdmin/Registration.vue";
import UserRegistration from "@/views/AccountAdmin/UserRegistration.vue";
import UserProfile from "@/views/AccountAdmin/UserProfile.vue";
import CompanyRegistration from "@/views/AccountAdmin/CompanyRegistration.vue";
import PasswordReset from "@/views/AccountAdmin/PasswordReset.vue";
import LogOut from "@/views/AccountAdmin/LogOut.vue";
import AccountSettings from "@/views/AccountAdmin/AccountSettings.vue";
import FAQ from "@/views/Info/FAQ.vue";
import Users from "@/views/Admin/Users.vue";
import AccountInfo from "@/views/Admin/AccountInfo.vue";
import Company from "@/views/Company/Company.vue";
import ContactUs from "@/views/Info/ContactUs.vue";
import SearchCompanies from "@/views/Company/SearchCompanies.vue";
import Home from "@/views/Home/Home.vue";
import NotAuthorized from "@/views/AccountAdmin/NotAuthorized.vue";
import NotFound from "@/views/AccountAdmin/NotFound.vue";
import Training from "@/views/Info/Training.vue";
import Promo from "@/views/Info/Promo.vue";

import { Role } from "@/role.js";
import encryption from "@/encryption.js";

import Log from "@/log.js";

//Vue.use(Router);

  export const router = createRouter({

  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "",
      component: LogIn,
    },
    {
      path: "/forgotpassword",
      name: "Forgot Password",
      component: ForgotPassword,
      // no permissions required
    },
    {
      path: "/contactus",
      name: "Contact Us",
      component: ContactUs,
    },
    {
      path: "/accountinfo",
      name: "Account Info",
      component: AccountInfo,
      meta: {
        authorize: [
          "AcctContactInfoRead",
          "AcctBankInfoRead",
          "AcctContactInfoUpdate",
          "AcctBankInfoUpdate",
          "AcctContactInfoUpdDel",
          "AcctBankInfoUpdDel",
        ],
      },
    },
    {
      path: "/company",
      name: "Company Setup",
      component: Company,
      meta: {
        authorize: [
          "CompanyAssocRead",
          "CompanyAssocUpdate",
          "CompanyAssocUpdDel",
        ],
      },
    },
    {
      path: "/users",
      name: "Users & Roles",
      component: Users,
      meta: {
        authorize: [
          "UserCreateRead",
          "UserMaintenanceRead",
          "UserCreateUpdate",
          "UserMaintenanceUpdate",
          "UserCreateUpdDel",
          "UserMaintenanceUpdDel",
        ],
      },
    },
    {
      path: "/accountsettings",
      name: "Account Settings",
      component: AccountSettings,
      meta: {
        authorize: [
          "AcctSetPasswrdRead",
          "AcctSetPasswrdUpdate",
          "AcctSetPasswrdUpdDel",
        ],
      },
    },
    {
      path: "/reconcile",
      name: "Reconcile & Pay",
      component: () =>
        import(
          /* webpackChunkName: "reconcile" */
          "@/views/Reconcile/Reconcile.vue"
        ),

      meta: {
        authorize: [
          "ReconcileAdjRead",
          "ReconcileReviewRead",
          "ReconcilePayRead",
          "ReconcileAdjUpdate",
          "ReconcileReviewUpdate",
          "ReconcilePayUpdate",
          "ReconcileAdjUpdDel",
          "ReconcileReviewUpdDel",
          "ReconcilePayUpdDel",
        ],
      },
    },
    {
      path: "/recpay",
      name: "Reconcile & Pay Lock Settings",
      component: () =>
        import(
          /* webpackChunkName: "reconcile" */
          "@/components/Home/HORecAndPayOverview.vue"
        ),

      meta: {
        authorize: [
          "ReconcileAdjRead",
          "ReconcileReviewRead",
          "ReconcilePayRead",
          "ReconcileAdjUpdate",
          "ReconcileReviewUpdate",
          "ReconcilePayUpdate",
          "ReconcileAdjUpdDel",
          "ReconcileReviewUpdDel",
          "ReconcilePayUpdDel",
        ],
      },
    },
    {
      path: "/selfregister",
      name: "",
      component: CompanyRegistration,
    },
    {
       path: "/register",
       name: "Welcome",
       component: UserRegistration,
    },
    {
      path: "/profile",
      name: "User Profile",
      component: UserProfile,
    },    
    {
      path: "/passwordreset",
      name: "Password Reset",
      component: PasswordReset,

      // permissions based on password reset link & valid GUID
    },
    {
      path: "/invoicehome",
      name: "Invoice Home",
      component: InvoiceHome,
      meta: {
        // all permissions for sub-sections should be allowed
        authorize: [
          Role.FranchiseUser,
          "ReconcileAdjRead",
          "ReconcileReviewRead",
          "ReconcilePayRead",
          "ReconcileAdjUpdate",
          "ReconcileReviewUpdate",
          "ReconcilePayUpdate",
          "ReconcileAdjUpdDel",
          "ReconcileReviewUpdDel",
          "ReconcilePayUpdDel",
          "InvoiceRead",
          "InvoiceUpdate",
          "InvoiceUpdDel",
          "AcctContactInfoRead",
          "AcctBankInfoRead",
          "AcctContactInfoUpdate",
          "AcctBankInfoUpdate",
          "AcctContactInfoUpdDel",
          "AcctBankInfoUpdDel",
          "UserCreateRead",
          "UserMaintenanceRead",
          "UserCreateUpdate",
          "UserMaintenanceUpdte",
          "UserCreateUpdDel",
          "UserMaintenanceUpdDel",
        ],
      },
    },
    {
      path: "/administration",
      name: "Administration",
      component: Administration,
      meta: {
        authorize: [
          "HORegistrationReqUpdate",
          "HORegistrationAssocUpdate",
          "HORegistrationAssocUpdDel",
          "HOSettingsRead",
        ],
      },
    },
    {
      path: "/invoicehistory",
      name: "Invoice History",
      component: () =>
        import(
          /* webpackChunkName: "invoicehistory" */
          "@/views/Invoice/InvoiceHistory.vue"
        ),

      meta: {
        authorize: [
          Role.AgencyUser,
          Role.FranchiseUser,
          "InvoiceRead",
          "InvoiceUpdate",
          "InvoiceUpdDel",
        ],
      },
    },
    {
      path: "/HOLanding",
      name: "Home Office",
      component: () => import("@/components/Home/HOLanding.vue"),
      meta: {
        authorize: [
          "HORegistrationReqUpdate",
          "HORegistrationAssocUpdate",
          "HORegistrationAssocUpdDel",
          "HOSettingsRead",
          "InvoiceRead",
          "InvoiceUpdate",
          "InvoiceUpdDel",
          "SysInvoiceMaintRead",
          "SysInvoiceMaintUpdDel",
        ],
      },
    },
    {
       path: "/hoAuth",
       name: "HomeOffice Authentication",
       component: () => import("@/components/AccountAdmin/hoAuth.vue"),
    }, 
    {
      path: "/auAuth",
      name: "Agency Authentication",
      component: () => import("@/components/AccountAdmin/auAuth.vue"),
    }, 
    {
      path: "/homeOffice",
      name: "Account Access",
      component: () => import("@/components/Home/HomeOffice.vue"),
      meta: {
        authorize: [
          "HORegistrationReqUpdate",
          "HORegistrationAssocUpdate",
          "HORegistrationAssocUpdDel",
        ],
      },
    },
    {
      path: "/hoSearchCompanies",
      name: "Search Companies ",
      component: () => import("@/components/Home/HOSearchCompanies.vue"),
       meta: {
        authorize: [
          "InvoiceRead",
          "InvoiceUpdate",
          "InvoiceUpdDel",
          "SearchCompaniesRead",
        ],
      }, 
    },
    {
      path: "/Companypaymentinfo",
      name: "Payment Settings",
      component: () =>
        import(
          /* webpackChunkName: "companyfranchiseaccountinformation" */
          "@/views/Company/CompanyPaymentInfo.vue"
        ),
      meta: {
        /** */
        authorize: [
          "CompanyAssocRead",
          "CompanyAssocUpdDel",
          "AcctBankInfoUpdDel",
          "AcctBankInfoRead",
          "AcctContactInfoUpdate",
        ],
      },
      // meta: {
      //   authorize: [
      //     Role.HomeOfficeUser,
      //     Role.HomeOfficeAdmin,
      //     Role.AgencyUser,
      //     Role.FranchiseAdmin,
      //     Role.FranchiseUser
      //   ]
      // }
    },
    {
      path: "/companyinfo",
      name: "Change Address & Contact Information",
      component: () =>
        import(
          /* webpackChunkName: "companyfranchiseaccountinformation" */
          "@/views/Company/CompanyInfo.vue"
        ),
        meta: {
          authorize: [
            "AcctContactInfoUpdate",
            "AcctContactInfoRead",
            "AcctBankInfoUpdDel"
  
            
          ]
        }
      // meta: {
      //   authorize: [
      //     Role.HomeOfficeUser,
      //     Role.HomeOfficeAdmin,
      //     Role.AgencyUser,
      //     Role.FranchiseAdmin,
      //     Role.FranchiseUser
      //   ]
      // }
    },
    {
      path: "/paymentinfo",
      name: "Change Payment Information",
      component: () =>
        import(
          /* webpackChunkName: "companyfranchiseaccountinformation" */
          "@/views/Company/PaymentInfo.vue"
        ),
        meta: {
          authorize: [
            "AcctBankInfoRead",
            "AcctBankInfoUpdate",
            "AcctBankInfoUpdDel",
          ]
        }
      // meta: {
      //   authorize: [
      //     Role.HomeOfficeUser,
      //     Role.HomeOfficeAdmin,
      //     Role.AgencyUser,
      //     Role.FranchiseAdmin,
      //     Role.FranchiseUser
      //   ]
      // }
    },
    {
      path: "/homeOfficeRegistration",
      name: "Registration Link",
      component: () => import("@/components/Home/HORegistration.vue"),
      meta: {
        authorize: ["HORegistrationReqUpdate"],
      },
    },
    {
      path: "/homeOfficePasswordLink",
      name: "Password Reset Links",
      component: () => import("@/components/Home/HOPasswordLink.vue"),
      meta: {
        authorize: ["HORegistrationReqUpdate"],
      },
    },
    {
      path: "/hoSystemTools",
      name: "Account Maintenance",
      component: () => import("@/components/Home/HOSystemTools.vue"),
      meta: {
        authorize: [
          "SysInvoiceMaintRead",
          "SysInvoiceMaintUpdDel",
          "HOSettingsRead",
        ],
      },
    },
    {
      path: "/homeOfficeConfiguration",
      name: "Settings",
      component: () => import("@/components/Home/HOConfiguration.vue"),
      meta: {
        authorize: ["HOSettingsRead"],
      },
    },
    {
      path: "/HomeOfficeInvoiceTool",
      name: "Invoice Maintenance",
      component: () => import("@/components/Home/HomeOfficeInvoiceTool.vue"),
      meta: {
        authorize: [
          "SysInvoiceMaintRead",
          "SysInvoiceMaintUpdDel",
        ],
      },
    },
    {
      path: "/invoicehistorydetail",
      name: "Invoice View",
      component: () =>
        import(
          /* webpackChunkName: "invoicehistorydetail" */
          "@/views/Invoice/InvoiceHistoryDetail.vue"
        ),

      meta: {
        authorize: [
          Role.FranchiseUser,
          Role.AgencyUser,
          "InvoiceRead",
          "InvoiceUpdate",
          "InvoiceUpdDel",
        ],
      },
    },
    {
      path: "/logout",
      name: "Log Out",
      component: LogOut,
    },
    {
      path: "/faq",
      name: "Frequently Asked Questions",
      component: FAQ,
    },
    {
      path: "/Training",
      name: "Training",
      component: Training,
    },
    {
      path: "/Promo",
      name: "Promo",
      component: Promo,
    },
    {
      path: "/search",
      name: "Search Companies",
      component: SearchCompanies,
      meta: {
        authorize: [
          Role.FranchiseUser,
          Role.AgencyUser,
          "InvoiceRead",
          "InvoiceUpdate",
          "InvoiceUpdDel",
        ],
      },
    },
    {
      path: "/notauthorized",
      name: "Access Denied",
      component: NotAuthorized,
    },
    {
       path: '/:pathMatch(.*)*',
      name: "Not Found",
      component: NotFound,
    },
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

//export default router;

// router.beforeEach((to, from, next) => {
//   // console.log(window.location.href);

//   let local = window.location.href.toLowerCase().indexOf("localhost") >= 0;

//   try {
//     let user = window.sessionStorage.getItem("user");
//     let encryptedRole = window.sessionStorage.getItem("role");
//     let role = encryption.decrypt(encryptedRole);

//     let type = window.sessionStorage.getItem("type");

//     let roles = [];
//     if (type == "homeoffice" || type == "ext") {
//       roles = role.split(",");
//     } else {
//       roles.push(role);
//     }

//     //check last here timeStamp
//     //in App.vue, we handle beforeunload event, set last here timestamp
//     var lastHereTick = window.sessionStorage.getItem("last_here_tick");
//     if (lastHereTick) {
//       if (from.path.length <= 1) {
//         var nowTick = new Date().getTime(); //epoch
//         const sessionTimeOut = 10000;
//         //if user refreshs the page, it takes less than 10 seconds, we will keep the session
//         //if user navigates to other web page and come back, "current time - last time here" greater than 10 seconds, we need clear session
//         if (nowTick - lastHereTick > sessionTimeOut) {
//           user = '';
//           window.sessionStorage.setItem("user", '');
//           window.sessionStorage.setItem("name", '');          
//         }
//       }
//       //clear last here timestamp
//       window.sessionStorage.setItem("last_here_tick", '');
//     }

//     // redirect to login page if not logged in and trying to access a restricted page
//     const { authorize } = to.meta;

//     if (authorize && to.path != "/") {
//       if (!user) {
//         // not logged in so redirect to login page with the return url
//         // and the login query if it exists:
//         let type = window.sessionStorage.getItem("type");
//         return next({
//           path: "/login",
//           query: {
//             returnUrl: to.path,
//             login: to.query.login && local ? to.query.login : (type) ? type : "",
//             timedOut: to.query.timedOut ? to.query.timedOut : "",
//           },
//         });
//       }

//       let authorized = false;

//       if (authorize.length) {
//         for (let role of roles) {
//           if (authorize.includes(role)) {
//             authorized = true;
//           }
//         }
//       }

//       // check if route is restricted by role
//       if (!authorized) {
//         // role not authorised so redirect to home page
//         return next({
//           path: "/notauthorized",
//           // query: {
//           //   login: to.query.login ? to.query.login : ""
//           // }
//         });
//       }
//     }
//   } catch (e) {
//     Log.logError(e, "router.js router.beforeEach");
//   }

//   next();
// });
