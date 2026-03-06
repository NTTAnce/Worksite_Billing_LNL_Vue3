import axios from "axios";
import tls from "tls";
tls.DEFAULT_MIN_VERSION = "TLSv1.2";
tls.DEFAULT_MAX_VERSION = "TLSv1.3";

export const AuthState = {
  NONE: "None",
  ATTEMPTING_LOGIN: "Attempting_Login",
  ATTEMPTED_LOGIN: "Attempted_Login",
  LOGGED_IN: "Logged_In"
};

/*
// -------- Local Experience API -------
export const PasswordResetRealm = `https://devsso.globelifeinc.com/Secureauth40`;
export const ContactUsURL = `https://worksitebilling.dev.globelifeinc.com/contactus`;
export const HTTP = axios.create({
  baseURL: `http://localhost:5000/InvoicePrc/api`
});
export const HTTP_Excel = axios.create({
  baseURL: `http://localhost:5000/InvoicePrc/api`  
});
export const HTTP_SA = axios.create({
  baseURL: `http://localhost:5000/UserPrc/api`
});
export const HTTP_Log = axios.create({
  baseURL: `http://localhost:5000/LogPrc/api`  
});
export const HTTP_HATS = axios.create({
  baseURL: `http://localhost:5000/PolicyPrc/api`  
});
export const HTTP_Notify = axios.create({
  baseURL: `http://localhost:5000/NotifyPrc/api`  
});
export const HTTP_Account = axios.create({
  baseURL: `http://localhost:5000/AccountPrc/api`  
});
export const MFA_Settings = {
  "Region": "us-west-2",
  "UserPoolClientId": "1ortinajte754mvkrtscebmmmv",
  "UserPoolId": "us-west-2_aQZ96wvQM",
  "MaxMFAVerificationAttempts": "5",
  //HomeOffice User
  "HomeOfficeUserAuthCodeUrl" : "https://devsso.globelifeinc.com/SecureAuth39",
  "HomeOfficeUserAuthCodeClientId" : "177a9d9f9338442c888abb4b0f84fb0b",  
  "HomeOfficeUserRedirectUri" : "/hoAuth",
  //Agency User
  "AgencyUserAuthCodeUrl" : "https://devsso.globelifeinc.com/SecureAuth38",
  "AgencyUserAuthCodeClientId" : "d14381922330491283624b4fabc6b686",  
  "AgencyUserRedirectUri" : "/auAuth"  
};
*/


// -------- DEV Experience API -------
export const PasswordResetRealm = `https://devsso.globelifeinc.com/Secureauth40`;
export const ContactUsURL = `https://worksitebilling.dev.globelifeinc.com/contactus`;
export const HTTP = axios.create({
  baseURL: `https://wsb-exp.dev.globelifeinc.com/InvoicePrc/api`  
});
export const HTTP_Excel = axios.create({
  baseURL: `https://wsb-exp.dev.globelifeinc.com/InvoicePrc/api`  
});
export const HTTP_SA = axios.create({
  baseURL: `https://wsb-exp.dev.globelifeinc.com/UserPrc/api`  
});
export const HTTP_Log = axios.create({
  baseURL: `https://wsb-exp.dev.globelifeinc.com/LogPrc/api`  
});
export const HTTP_HATS = axios.create({
  baseURL: `https://wsb-exp.dev.globelifeinc.com/PolicyPrc/api`  
});
export const HTTP_Notify = axios.create({
  baseURL: `https://wsb-exp.dev.globelifeinc.com/NotifyPrc/api`  
});
export const HTTP_Account = axios.create({
  baseURL: `https://wsb-exp.dev.globelifeinc.com/AccountPrc/api`  
});
export const MFA_Settings = {
  "Region": "us-west-2",
  "UserPoolClientId": "1ortinajte754mvkrtscebmmmv",
  "UserPoolId": "us-west-2_aQZ96wvQM",
  "MaxMFAVerificationAttempts": "5",
  //HomeOffice User
  "HomeOfficeUserAuthCodeUrl" : "https://devsso.globelifeinc.com/SecureAuth39",
  "HomeOfficeUserAuthCodeClientId" : "177a9d9f9338442c888abb4b0f84fb0b",  
  "HomeOfficeUserRedirectUri" : "/hoAuth",
  //Agency User
  "AgencyUserAuthCodeUrl" : "https://devsso.globelifeinc.com/SecureAuth38",
  "AgencyUserAuthCodeClientId" : "d14381922330491283624b4fabc6b686",  
  "AgencyUserRedirectUri" : "/auAuth"  
};


/*
// -------- TEST Experience API -------
export const PasswordResetRealm = `https://testsso.globelifeinc.com/secureauth33/`;
export const ContactUsURL = `https://worksitebilling.tst.globelifeinc.com/contactus`;
export const HTTP = axios.create({
  baseURL: `https://wsb-exp.tst.globelifeinc.com/InvoicePrc/api`  
  //baseURL: `http://localhost:5000/InvoicePrc/api`  
});
export const HTTP_Excel = axios.create({
  baseURL: `https://wsb-exp.tst.globelifeinc.com/InvoicePrc/api`  
});
export const HTTP_SA = axios.create({
  baseURL: `https://wsb-exp.tst.globelifeinc.com/UserPrc/api`  
  //baseURL: `http://localhost:5000/UserPrc/api`  
});
export const HTTP_Log = axios.create({
  baseURL: `https://wsb-exp.tst.globelifeinc.com/LogPrc/api`  
});
export const HTTP_HATS = axios.create({
  baseURL: `https://wsb-exp.tst.globelifeinc.com/PolicyPrc/api`  
});
export const HTTP_Notify = axios.create({
  baseURL: `https://wsb-exp.tst.globelifeinc.com/NotifyPrc/api`  
  //baseURL: `http://localhost:5000/NotifyPrc/api`  
});
export const HTTP_Account = axios.create({
  baseURL: `https://wsb-exp.tst.globelifeinc.com/AccountPrc/api`  
});
export const MFA_Settings = {
 "Region": "us-west-2",
 "UserPoolClientId": "1ortinajte754mvkrtscebmmmv",
 "UserPoolId": "us-west-2_eJh3HmvWa",
"MaxMFAVerificationAttempts": "5"
 //HomeOffice User
  "HomeOfficeUserAuthCodeUrl" : "https://devsso.globelifeinc.com/SecureAuth39",
  "HomeOfficeUserAuthCodeClientId" : "177a9d9f9338442c888abb4b0f84fb0b",  
  "HomeOfficeUserRedirectUri" : "/hoAuth",
  //Agency User
  "AgencyUserAuthCodeUrl" : "https://devsso.globelifeinc.com/SecureAuth38",
  "AgencyUserAuthCodeClientId" : "d14381922330491283624b4fabc6b686",  
  "AgencyUserRedirectUri" : "/auAuth"  
};
*/

/*
// -------- PROD Experience API -------
 export const PasswordResetRealm = `https://sso.globelifeinc.com/secureauth27/`;
 export const ContactUsURL = `https://worksitebilling.globelifeinc.com/contactus`;
 export const HTTP = axios.create({
   baseURL: `https://wsb-exp.globelifeinc.com/InvoicePrc/api`  
 });
 export const HTTP_Excel = axios.create({
   baseURL: `https://wsb-exp.globelifeinc.com/InvoicePrc/api`  
 });
 export const HTTP_SA = axios.create({
   baseURL: `https://wsb-exp.globelifeinc.com/UserPrc/api`  
 });
 export const HTTP_Log = axios.create({
   baseURL: `https://wsb-exp.globelifeinc.com/LogPrc/api`  
 });
 export const HTTP_HATS = axios.create({
   baseURL: `https://wsb-exp.globelifeinc.com/PolicyPrc/api`  
 });
 export const HTTP_Notify = axios.create({
   baseURL: `https://wsb-exp.globelifeinc.com/NotifyPrc/api`  
 });
 export const HTTP_Account = axios.create({
   baseURL: `https://wsb-exp.globelifeinc.com/AccountPrc/api`  
 });
 export const MFA_Settings = {
  "Region": "us-west-2",
  "UserPoolClientId": "1it34bl14adb9ondjeta65i9qg",
  "UserPoolId": "us-west-2_a28iMc5MB",
  "MaxMFAVerificationAttempts": "5",
  //HomeOffice User
  "HomeOfficeUserAuthCodeUrl" : "https://sso.globelifeinc.com/SecureAuth95",
  "HomeOfficeUserAuthCodeClientId" : "3e537b4c8d664fe98f2272b82a77d97c",  
  "HomeOfficeUserRedirectUri" : "/hoAuth",
  //Agency User
  "AgencyUserAuthCodeUrl" : "https://sso.globelifeinc.com/SecureAuth94",
  "AgencyUserAuthCodeClientId" : "564ce0142729406880a2227c0be920fc",  
  "AgencyUserRedirectUri" : "/auAuth"  
 };
*/