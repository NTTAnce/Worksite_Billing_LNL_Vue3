import { HTTP, HTTP_SA, HTTP_HATS, HTTP_Notify, HTTP_Account, MFA_Settings } from "@/HTTP-common.js";

export default {
    name: "dataService",
    requestor : "WSB-UI",
    getUserPrincipal() {
        let url = "Authentication/GetUserPrincipal";
        return HTTP_SA.get(url, { withCredentials : true });
    },

    hoGetProfile(userName) {
        let url = "Authentication/HOGetProfile";
        return HTTP_SA.get(url, { params: { user: userName } });
    },

    getHomeOfficeADRoles() {
        let url = "UserRolePermissions/GetHomeOfficeADRoles";
        return HTTP_SA.get(url);
    },   
    
    getSecureAuthTokensForHomeOfficeUser(authCode) {
        let url = "Authentication/HOGetSecureAuthTokens";
        return HTTP_SA.post(url, { 
            authCode: encodeURIComponent(authCode),
            redirectUri: window.location.origin + MFA_Settings.HomeOfficeUserRedirectUri
          });
    },

    getSecureAuthTokensForAgencyUser(authCode) {
        let url = "Authentication/AgencyGetSecureAuthTokens";
        return HTTP_SA.post(url, { 
            authCode: encodeURIComponent(authCode),
            redirectUri: window.location.origin + MFA_Settings.AgencyUserRedirectUri
          });
    },


    getRolePermissionsByHORole(WOBSRole) {
        let url = "UserRolePermissions/GetRolePermissionsByHORole";
        return HTTP_SA.get(url, { params: { LDAPRoleID: WOBSRole } });
    },

    validateLinkUrl(linkType, linkGuid) {
        let url = "Registration/ValidateLinkUrl" + "?linkType=" + linkType + "&linkGuid=" + linkGuid;
        return HTTP_SA.get(url);
    },

    validatePasswordLinkUrl(linkGuid) {
        let url = "Registration/ValidatePasswordLinkUrl" + "?linkGuid=" + linkGuid;
        return HTTP_SA.get(url);
    },

    getRegistrationLinks(searchFor, searchBy, linkType) {
        let url = "Registration/GetRegistrationLinks" + "?searchFor=" + searchFor + "&searchBy=" + searchBy + "&linkType=" + linkType;
        return HTTP_SA.get(url);
    },

    getPasswordLinks(searchFor, searchBy) {
        let url = "Registration/GetPasswordLinks" + "?searchFor=" + searchFor + "&searchBy=" + searchBy;
        return HTTP_SA.get(url);
    },

    getCompanyInfo(franchiseId) {
        let url = "Registration/GetCompanyInfoById" + "?requestor=" + this.requestor  + "&franchiseId=" + franchiseId;
        return HTTP_SA.get(url);
    },

    getFranchiseUserRoleInfo(franchiseId, includeActiveFlag) {
        let url = "Registration/GetFranchiseUserRoleInfo" + "?requestor=" + this.requestor  + "&franchiseId=" + franchiseId + "&includeActiveFlag=" + includeActiveFlag;
        return HTTP_SA.get(url);
    },

    addUpdateFranchiseUserRole(req) {
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/addUpdateFranchiseUserRole", req);
    },

    deleteFranchiseUserRole(req) {
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/deleteFranchiseUserRole", req);
    },
    
    setlockFranchiseUser(userName, isLockedOut, isMFALockedOut) {
        let url = "Authentication/FranchiseLockOutUserAccount?userName=" + encodeURI(userName) + "&lockout=" + isLockedOut + "&mfalockout=" + isMFALockedOut;
        return HTTP_SA.get(url);
    },

    getRegisteredCompanyInfo(emailId) {
        let url = "Registration/GetRegisteredCompanyInfo" + "?requestor=" + this.requestor  + "&emailId=" + encodeURI(emailId);
        return HTTP_SA.get(url);
    },

    createRegistrationLink(req) {
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/CreateRegistrationLink", req);
    },

    changeLinkStatus(req) {
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/ChangeLinkStatus", req);
    },

    changeEmailSentStatus(req) {
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/ChangeEmailSentStatus", req);
    },

    changePasswordLinkStatus(req) {
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/ChangePasswordLinkStatus", req);
    },

    changePasswordEmailSentStatus(req) {
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/ChangePasswordEmailSentStatus", req);
    },

    getAllConfigurations() {
        let url = "Configuration/GetAllConfigurations";
        return HTTP_SA.get(url);
    },

    validateEmailId(emailId){
        let url = "Registration/ValidateEmailId?emailId=" + encodeURI(emailId);
        return HTTP_SA.get(url);
    },

    tryResetPassword(req){
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/TryResetUserPassword", req);
    },

    verifyFranchiseUserExists(userName){
        let url = "Authentication/VerifyFranchiseUserExists" + "?userName=" + encodeURI(userName);
        return HTTP_SA.get(url);
    },

    getManagedUsersForAdmin(userName){
        let url = "Registration/GetManagedUsersForAdminUser" + "?userName=" + encodeURI(userName);
        return HTTP_SA.get(url);
    },        

    franchiseUserRegister(req){
        req.requestor = this.requestor;
        return HTTP_SA.post("Authentication/FranchiseUserRegister", req);
    },    

    validateFranchiseUser(req){
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/ValidateFranchiseUser", req);
    },    

    franchiseEnableDisableUserAccount(userName, disable) {
        let url = "Authentication/FranchiseEnableDisableUserAccount" + "?&userName=" + encodeURI(userName) + "&disable=" + disable;
        return HTTP_SA.get(url);
    },
    
    setBillingInfo(companyId, printBillYNW, userName, linkGuid){
        let url = "BillingInfo/SetBillingInfo" + "?companyId=" + companyId + "&printBillYNW=" + printBillYNW + "&userName=" + encodeURI(userName) + "&regLink=" + linkGuid;
        return HTTP_HATS.get(url);
    }, 

    setPaperBillingInfo(companyId, printBillYNW, userName){
        let url = "BillingInfo/SetBillingInfo" + "?companyId=" + companyId + "&printBillYNW=" + printBillYNW + "&userName=" + encodeURI(userName);
        return HTTP_HATS.get(url);
    }, 

    getBillingInfo(companyId){
        let url = "BillingInfo/GetBillingInfo" + "?companyId=" + companyId;
        return HTTP_HATS.get(url);
    }, 
   
    getScheduledInvoicePaymentInfo(invoiceId){
        let url = "ReconcilePay/GetScheduleInvoicePaymentInfo?invoiceId=" + invoiceId;
        return HTTP.get(url);
    },

    createUserRole(req){
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/TryRegisterUser", req);
    },
    createUserRoleAssociation(req){
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/CreateUserRoleAssociation", req);
    },    
 
    getAdditionalRecipients(identifier, franchiseId, userName) {
        let url = "Notification/GetNotificationAdditionalRecipients" + "?identifier=" + identifier + "&franchiseId=" + franchiseId;
        if (userName) {
            url += "&userName=" + encodeURI(userName);
        }
        return HTTP_Notify.get(url);
    },
 
    sendCCMNotification(req) {
        let url = 'Notification/';
        if (!req.firstName) {
            req.firstName = '';
        }
        if (!req.lastName) {
            req.lastName = '';
        }
        if (req.franchiseName){
            // SR 898944 - registration CORS fix
            req.franchiseName = escape(req.franchiseName.replace(/&/g, ""));
        }
        if (req.userName) {
            req.userName = encodeURIComponent(req.userName);
        }
        if (req.identifier == 'LNLWOBREGCOMP') {
            url += "NewUserCompleteRegistration";
            url += "?identifier=" + req.identifier;
            url += "&userName=" + req.userName;
            url += "&FirstName=" + req.firstName;
            url += "&LastName=" + req.lastName;
            url += "&franchiseId=" + req.franchiseId;
            url += "&franchiseName=" + req.franchiseName;
            url += "&registrationLink=" + req.registrationLink;
        }
        if (req.identifier == 'LNLWOBREGFAIL') {
            url += "NewAdminRegistrationFailed";
            url += "?identifier=" + req.identifier;
            url += "&userName=" + req.userName;
            url += "&FirstName=" + req.firstName;
            url += "&LastName=" + req.lastName;
            url += "&franchiseId=" + req.franchiseId;
            url += "&franchiseName=" + req.franchiseName;
        }
        if (req.identifier == 'LNLWOBREGCONF') {
            url += "NewUserRegistrationSuccessfulConfirmation";
            url += "?identifier=" + req.identifier;
            url += "&userName=" + req.userName;
            url += "&FirstName=" + req.firstName;
            url += "&LastName=" + req.lastName;
            url += "&franchiseId=" + req.franchiseId;
            url += "&franchiseName=" + req.franchiseName;
            url += "&loginlink=";
        }
        if (req.identifier == 'LNLWOBREGAFTRHR') {
            url += "NewAdministratorRegistrationSubmit";
            url += "?identifier=" + req.identifier;
            url += "&userName=" + req.userName;
            url += "&FirstName=" + req.firstName;
            url += "&LastName=" + req.lastName;
            url += "&franchiseId=" + req.franchiseId;
            url += "&franchiseName=" + req.franchiseName;
        }
        if (req.identifier == 'LNLWOBINFOCHG') {
            url += "FranchiseContactInformationChangeConfirmation";
            url += "?identifier=" + req.identifier;
            url += "&userName=" + req.userName;
            url += "&FirstName=" + req.firstName;
            url += "&LastName=" + req.lastName;
            url += "&franchiseId=" + req.franchiseId;
            url += "&franchiseName=" + req.franchiseName;
        }    
        if (req.identifier == 'LNLWOBPASRES') {
            url += "ForgotYourPasswordResetLink";
            url += "?identifier=" + req.identifier;
            url += "&userName=" + req.userName;
            url += "&FirstName=" + req.firstName;
            url += "&LastName=" + req.lastName;
            url += "&franchiseId=" + req.franchiseId;
            url += "&franchiseName=" + req.franchiseName;
            url += "&pwdResetLink=" + req.pwdResetLink;
        }    
        if (req.identifier == 'LNLWOBNUCOMPNOTIF') {
            url += "NewUserRegistrationCompletedNotification";
            url += "?identifier=" + req.identifier;
            url += "&userName=" + req.userName;
            url += "&FirstName=" + req.firstName;
            url += "&LastName=" + req.lastName;
            url += "&franchiseId=" + req.franchiseId;
            url += "&franchiseName=" + req.franchiseName;
            url += "&newUserName=" + req.newUserName;
        }
        if (req.identifier == 'LNLWOBPYMTINFOCHG') {
            url += "PaymentInformationChangeConfirmation";
            url += "?identifier=" + req.identifier;
            url += "&userName=" + req.userName;
            url += "&FirstName=" + req.firstName;
            url += "&LastName=" + req.lastName;
            url += "&franchiseId=" + req.franchiseId;
            url += "&franchiseName=" + req.franchiseName;
        }       
        if (req.identifier == 'LNLWOBPASCONF') {
            url += "ForgotYourPasswordConfirmation";
            url += "?identifier=" + req.identifier;
            url += "&userName=" + req.userName;
            url += "&FirstName=" + req.firstName;
            url += "&LastName=" + req.lastName;
            url += "&franchiseId=" + req.franchiseId;
            url += "&franchiseName=" + req.franchiseName;
        }          
        return HTTP_Notify.get(url);
    },
    tryChangeUserPassword(req){
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/TryChangeUserPassword", req);
    },
    tryFranchiseUserChangePassword(req){
        req.requestor = this.requestor;
        return HTTP_SA.post("Authentication/FranchiseUserChangePassword", req);
    },
    companyUserAuthenticate(req){
        req.requestor = this.requestor;
        return HTTP_SA.post("Authentication/CompanyUserAuthenticate", req);
    },
    validateUserSelfRegister(req){
        req.requestor = this.requestor;
        return HTTP_SA.post("Authentication/ValidateUserSelfRegister", req);
    },

    searchCompanies(searchFor, searchBy) {
        let searchForStr = searchFor.trim();
        let url = "Company/SearchCompanies" + "?searchFor=" + searchForStr + "&searchBy=" + searchBy;
        return HTTP.get(url);
    },    

    getInvoicesByFranchiseId(req) {
        req.requestor = this.requestor;
        return HTTP.post("InvoiceTool/GetInvoicesByFranchiseID", req);
    }, 
    
    updateFranchiseInvoice(req) {
        req.requestor = this.requestor;
        return HTTP.post("InvoiceTool/UpdateFranchiseInvoice", req);
    },

    deleteFranchiseInvoice(req) {
        req.requestor = this.requestor;
        return HTTP.post("InvoiceTool/DeleteFranchiseInvoice", req);
    },

    getRoutingInfo(routingNumber){
        let url = "Payment/GetRoutingPaymentInfo" + "?routingNumber=" + routingNumber;
        return HTTP_Account.get(url);
    },

    getContactUsSubjects() {
        let url = "BackOffice/GetContactUsSubjects";
        return HTTP_SA.get(url);
    },
    postFranchiseUserAuthenticate(userName, password, pinCode) {
        return HTTP_SA.post("Authentication/FranchiseUserAuthenticate", {
            UserName: userName.trim(),
            Password: password,
            PinCode: (pinCode == null) ? "" : pinCode,
            TrustMe: false,
          });
    },
    franchiseUserCheckPassword(userName, password, pinCode) {
        return HTTP_SA.post("Authentication/FranchiseUserCheckPassword", {
            UserName: userName.trim(),
            Password: password,
            PinCode: (pinCode == null) ? "" : pinCode,
            TrustMe: false,
          });
    },
    setUserMFATrack(userId, otpMethod) {
        return HTTP_SA.post("Authentication/SetUserMFATrack", {
            UserId: userId,
            OtpMethod: otpMethod,
        });
    },
    setUserOTP(req) {
        if (req.phoneNumber) {
            return this.setUserOTPWithMobile(req);
        }
        return HTTP_SA.get("Authentication/SetUserOTPMode", {
            params: {
                userName: req.userName.trim(),
                otpMethod: req.otpMethod,
            },
        })
    },
    setUserOTPWithMobile(req) {
        req.phoneNumber = req.phoneNumber.replace(/[()]/g, '');
        req.phoneNumber = req.phoneNumber.replace(/\s/g, '');
        req.phoneNumber = req.phoneNumber.replace(/-/g, '');
        if (!req.phoneNumber.startsWith('1') && !req.phoneNumber.startsWith('+')) {
            req.phoneNumber = "1" + req.phoneNumber;
        }
        if (!req.phoneNumber.startsWith('+')) {
            req.phoneNumber = "+" + req.phoneNumber;
        }
        return HTTP_SA.get("Authentication/SetUserOTPWIthMobile", {
            params: {
                userName: req.userName.trim(),
                otpMethod: req.otpMethod,
                phoneNumber: req.phoneNumber,
            },
        });
    },
    confirmRegisteredUserSMS(req) {
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/ConfirmRegisteredUserSMS", req);
    },
    confirmRegisteredUserEmail(req) {
        req.requestor = this.requestor;
        return HTTP_SA.post("Registration/ConfirmRegisteredUserEmail", req);
    },
    getExtFranchisesAndRoles(userName) {
        return HTTP_SA.get("UserRolePermissions/GetExtFranchisesAndRoles", {
            params: {
              userName: userName.trim(),
            },
          });
    },
    postUserDevice(userName, userDeviceId) {
        return HTTP_SA.post("Authentication/UpdateUserDevice", {
            Id: userDeviceId, 
            UserId: encodeURIComponent(userName.trim()),
          });
    },
    postUserMFAError(userName, userMFAErrorId, errorCount, otpMethod) {
        return HTTP_SA.post("Authentication/UpdateUserMFAError", {
            Id: userMFAErrorId, 
            UserId: encodeURIComponent(userName.trim()),
            ErrorCount: errorCount,
            OtpMethod: otpMethod,
          });
    },
    updateSelfRegisterMFAError(franchiseId, errorCount) {
        return HTTP_SA.post("Authentication/UpdateSelfRegisterMFAError", {
            franchiseId: franchiseId,
            ErrorCount: errorCount,
          });
    },
    getSelfRegisterMFAError(franchiseId) {
        return HTTP_SA.get("Authentication/GetSelfRegisterMFAError", { 
            params: {
                franchiseId: franchiseId
            },
        });
    },
    getUserMFAError(userId) {
        return HTTP_SA.get("Authentication/GetUserMFAError", {
            params: {
                userId: userId
            },
        });
    },
}