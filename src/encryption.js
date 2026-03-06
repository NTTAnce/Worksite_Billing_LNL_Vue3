import dateformat from "dateformat";
import Log from "@/log.js";

export default {
  encrypt(data) {
    try {
      let CryptoJS = require("crypto-js");

      let sk =
        dateformat(Date.Now, "mmddyyyy") +
        (window.sessionStorage.getItem("user") +
          dateformat(Date.Now, "mdyyyy"));

      let cipherText = CryptoJS.AES.encrypt(data, sk);

      return cipherText;
    } catch (e) {
      Log.logError(e, "encryption.js encrypt");
      return data;
    }
  },
  decrypt(cipherText) {
    try {
      if (cipherText == null) return null;

      let CryptoJS = require("crypto-js");

      let sk =
        dateformat(Date.Now, "mmddyyyy") +
        (window.sessionStorage.getItem("user") +
          dateformat(Date.Now, "mdyyyy"));

      var bytes = CryptoJS.AES.decrypt(cipherText.toString(), sk);
      var plaintext = bytes.toString(CryptoJS.enc.Utf8);

      return plaintext;
    } catch (e) {
      Log.logError(e, "encryption.js decrypt");
      return cipherText;
    }
  }
};
