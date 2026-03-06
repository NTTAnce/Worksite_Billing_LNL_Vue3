

import { MFA_Settings } from "@/HTTP-common.js";

export default {
    name: "secureAuthService",
    requestor : "WSB-UI",

    requestAuthCode(state) {
        var returnURI = window.location.origin + MFA_Settings.HomeOfficeUserRedirectUri;
        const authCodeUrl = MFA_Settings.HomeOfficeUserAuthCodeUrl;
        const queryParams = {
            client_id: MFA_Settings.HomeOfficeUserAuthCodeClientId,
            redirect_uri: returnURI,
            scope: 'openid profile offline_access email', 
            response_type: 'code',
            state
        }
        const queryString = new URLSearchParams(queryParams).toString()
        window.location.replace(`${authCodeUrl}?${queryString}`)
    },

    requestAgencyAuthCode(state) {

      var returnURI = window.location.origin + MFA_Settings.AgencyUserRedirectUri;
      const authCodeUrl = MFA_Settings.AgencyUserAuthCodeUrl;
      const queryParams = {
          client_id: MFA_Settings.AgencyUserAuthCodeClientId,
          redirect_uri: returnURI,
          scope: 'openid profile offline_access email', 
          response_type: 'code',
          state
      }
      const queryString = new URLSearchParams(queryParams).toString()
      window.location.replace(`${authCodeUrl}?${queryString}`)
  },

  generateUUID() {  
      var uuidValue = "", k, randomValue;  
      for (k = 0; k < 32;k++) {  
        randomValue = Math.random() * 16 | 0;  
      
        if (k == 8 || k == 12 || k == 16 || k == 20) {  
          uuidValue += "-"  
        }  
        uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);  
      }  
      return uuidValue;  
  },

}
