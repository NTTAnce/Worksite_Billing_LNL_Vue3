import { HTTP_Log } from "@/HTTP-common.js";

export default {
  errors: [],

  logError(message, functionName) {
    // console.log(message);
    try {
      let msg = message.toString();

      let logBody = {
        logMessage: msg,
        eventType: "ERROR",
        functionName: "Worksite Billing UI: " + functionName
      };
      HTTP_Log.post("Log/Log", logBody).catch(e => {
        this.errors.push(e);
      });
    } catch (e) {
      // no action
    }
  },

  logInfo(message, functionName) {
    try {
      let msg = message.toString();

      let logBody = {
        logMessage: msg,
        eventType: "INFO",
        functionName: "Worksite Billing UI: " + functionName
      };
      HTTP_Log.post("Log/Log", logBody).catch(e => {
        this.errors.push(e);
      });
    } catch (e) {
      // no action
    }
  },

  logDebug(message, functionName) {
    try {
      let msg = message.toString();

      let logBody = {
        logMessage: msg,
        eventType: "DEBUG",
        functionName: "Worksite Billing UI: " + functionName
      };
      HTTP_Log.post("Log/Log", logBody).catch(e => {
        this.errors.push(e);
      });
    } catch (e) {
      // no action
    }
  },

  logFatal(message, functionName) {
    try {
      let msg = message.toString();

      let logBody = {
        logMessage: msg,
        eventType: "FATAL",
        functionName: "Worksite Billing UI: " + functionName
      };
      HTTP_Log.post("Log/Log", logBody).catch(e => {
        this.errors.push(e);
      });
    } catch (e) {
      // no action
    }
  }
};
