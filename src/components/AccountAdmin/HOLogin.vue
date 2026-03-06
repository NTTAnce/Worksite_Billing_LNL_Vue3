<template>
  <div>
    <v-layout v-show="failedDialog" justify-center align-content-center>
      <v-flex xs10>
        <v-card class="mx-auto">
          <header
            class="px-2 py-3 v-sheet v-sheet--tile theme--dark v-toolbar v-toolbar--flat tbBackground"
          >
            <v-flex style="padding-top: 15px; padding-left: 20px">
              <span class="title">Home Office Users</span>
              <br />
              <!-- <span class="subtitle">
                Enter your Windows username and password below to access your
                account. View invoice history and user information, and pay
                invoices online.
              </span> -->
            </v-flex>
          </header>
          <br />
          <br />
          <v-layout justify-center align-content-center row>
            <v-flex xs9>
              <v-card-text align="center" class="failedDialogHeadline" >
                Redirect to Login failed.
              </v-card-text>
            </v-flex>
            

            <v-flex xs9>
              <v-card-text align="center">
                This system is only for authorized Globe Life and its affiliates
                (hereinafter referred to as "The Company") employees,
                contractors and business partners. Users should be aware that
                The Company reserves the right to monitor usage of this system.
                By using this system, you are consenting to The Company
                monitoring your activity on the system and conducting reasonable
                investigations into any possible misuse of the system. Misuse of
                this system may lead to disciplinary or legal action.
              </v-card-text>
            </v-flex>
          </v-layout>
          <br />
          <br />
        </v-card>
      </v-flex>
    </v-layout>

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
    try
    {
      this.waiting = true;
      this.statusText = "Redirecting to authentication page ...."
      Log.logInfo("Redirecting.....", "HOLogin Create");
      
      //redirect to secure Auth 
      const state = secureAuthService.generateUUID();
      //localstorage
      window.sessionStorage.setItem('state', state) // save for later, to verify no CSRF
      secureAuthService.requestAuthCode(state) // after requesting, and user logs in, AuthRedirect.vue finishes the flow
    }
    catch (e)
    {
      Log.logInfo("Redirecting failed", "HOLogin Create");
      this.waiting = false;
      this.statusText = "";
      this.failedDialog = true;
    }
  },
  data() {
    return {
      failedDialog: false,
      waiting: false,
      statusText: ""
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
.title {
  color: #fafafa;
  line-height: 1.2;
  margin-bottom: 2px;
}
.subtitle {
  color: #fafafa;
  /* color: hsla(0, 0%, 100%, 0.7); */
  font-size: 0.875rem;
  line-height: 1.2;
}
.tbBackground {
  background-color: #44aba8;
  /* background-color: #00558c; */
}
.failedDialogHeadline {
  color: #00558c;
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
.caps-lock-on {
  color: red;
  font-size: 14px;
}
</style>