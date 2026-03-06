<template>
  <div>
    <div>
      <v-dialog
        v-model="failedDialog"
        persistent
        width="350"
        :content-class="$vuetify.breakpoint.mdAndUp ? 'centerInGrid' : ''"
      >
        <v-card>
          <v-card-title class="headline dialogHeadline">
            <v-icon :color="$store.state.mainColor" large>mdi-account</v-icon
            >&nbsp;Authentication Failed
          </v-card-title>
          <v-layout align-center justify-center>
            <hr width="90%" />
          </v-layout>
          <br />
          <v-card-text>Redirect to Login failed.</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#319B42"
              dark
              class="menuBtn topMargin"
              @click="failedDialog = false"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
    <div>
      <span
        :class="
          $vuetify.breakpoint.smAndDown
            ? 'waitCircleLoginSm'
            : 'waitCircleLogin'
        "
        :style="
          $vuetify.breakpoint.smAndDown
            ? 'width:100%; color: #319B42;'
            : 'width: 25%; color: #319B42;'
        "
      >
        <v-layout justify-center align-content-center align-center column>
          <v-progress-circular
            v-if="waiting"
            indeterminate
            color="#319B42"
            :size="70"
            width="10"
          ></v-progress-circular>
          <br />
          <span class="status" v-if="waiting">{{ statusText }}</span>
        </v-layout>
      </span>
    </div>
  </div>
</template>

<script>
import Log from "@/log.js";
import secureAuthService from "@/services/secureAuthService.js";

export default {
  name: "LogIn",
  created() {
    Log.logInfo("Redirecting.....", "AgencyLogin Create");

    try
    {
      this.waiting = true;
      this.statusText = "Redirecting to authentication page ...."
      Log.logInfo("Redirecting.....", "AgencyLogin Create");

      //localstorage
      const state = secureAuthService.generateUUID();
      window.sessionStorage.setItem('state', state) // save for later, to verify no CSRF

      //redirect to secure Auth 
      secureAuthService.requestAgencyAuthCode(state) // after requesting, and user logs in, AuthRedirect.vue finishes the flow
    }
     catch (e)
    {
      Log.logInfo("Redirecting failed", "AgencyLogin Create");
      this.waiting = false;
      this.statusText = "";
      this.failedDialog = true;
    }
  },

  data() {
    return {
      waiting: false,
      failedDialog: false,
      statusText: "",
    };
  },
  methods: {
  },
  
};
</script>
<style scoped>
.topMargin {
  margin-top: 10px;
}
.tbBackground {
  background-color: #44aba8;
  /* background-color: #00558c; */
}
.title {
  color: #fafafa;
  line-height: 1.2;
  margin-bottom: 2px;
}
.subtitle {
  color: #fafafa;
  font-size: 0.875rem;
  line-height: 1.2;
}
.dialogHeadline {
  color: #00558c;
}
.waitCircleLogin {
  position: fixed;
  top: 40%;
  left: 25%;
}
.waitCircleLoginSm {
  position: fixed;
  top: 25%;
  left: 0%;
}
.status {
  font-size: 1rem;
  text-align: center;
}
.waitingOverlay {
  opacity: 0.5;
  background-color: whitesmoke;
  border-color: whitesmoke;
}
</style>
<style>
.centerInGrid {
  position: absolute;
  top: 33%;
  left: 25%;
}
input:-webkit-autofill {
  content: "\feff";
}
.labelClass {
  background-color: #fff;
  z-index: 23;
}
input:-internal-autofill-selected {
  background-color: #fff !important;
}
.caps-lock-on {
  color: red;
  font-size: 14px;
}
</style>
