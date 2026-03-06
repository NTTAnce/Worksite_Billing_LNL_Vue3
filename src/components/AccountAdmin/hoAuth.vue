<template>
<div id="wrapper">
  <!-- <h1>Authentication Redirect</h1> -->
    <v-dialog v-model="failedDialog" persistent width="350">
      <v-card>
        <v-card-title class="headline failedDialogHeadline">
          <v-icon :color="$store.state.mainColor" large>mdi-account</v-icon
          >&nbsp;Authentication Failed
        </v-card-title>
        <v-row align="center" justify="center">
          <hr width="90%" />
        </v-row>
        <br />
        <v-card-text>{{ failedText }}</v-card-text>

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

    <div>
      <span
        :class="
          $vuetify.display.smAndDown
            ? 'waitCircleLoginSm'
            : 'waitCircleLogin'
        "
        :style="
          $vuetify.display.smAndDown
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
import { AuthState } from "@/HTTP-common.js";
import Log from "@/log.js";
import { HTTP_SA } from "@/HTTP-common.js";
import eventBus from "@/event-bus.js";
import dataService from '@/services/dataService';
import encryption from "@/encryption.js";

export default {
  name: "HOAuth",
  created(){
    // Save token and redirect to home page
    this.$store.commit('setAuthState', AuthState.ATTEMPTED_LOGIN)

    eventBus.on("homeOfficeUserRoleUpdated", (data) => {
      this.getHomeOfficeUserUIRoles(data);
    });

    //get roles
    HTTP_SA.get("UserRolePermissions/GetHomeOfficeADRoles", {
      params: {},
    }).then((response) => {
      if (response.status == 200) {
        this.validADRoles = response.data.roles;
      } else {
        Log.logError(
          response.errorMessage,
          "HOLogin.vue created() GET UserRolePermissions/GetHomeOfficeADRoles"
        );
      }
    }) 
    .catch((e) => {
      Log.logError(e,"hoAuth.vue created");
    });
  },
  mounted() {
    // Get/verify auth code
    const authCode = this.$route.query.code
    if (!authCode || authCode.length <= 1) {
      Log.logError(
        "Invalid auth code",
        "HOAuth.vue mouted()"
      );
      return;
    }
  
    //call web api with obtained secure auth code
    this.validateTokenAndRedirect(authCode);
  },
  data() {
    return {
      validADRoles: [],
      errors: [],
      valid: true,
      show: false,
      waiting: false,
      statusText: "",
      failedDialog: false,
      failedText: ""
    };
  },
  methods: {
    validateTokenAndRedirect(authCode) {
      this.statusText = "Validating ...";
      this.waiting = true;

      dataService.getSecureAuthTokensForHomeOfficeUser(authCode)
      .then((response) => { 
        this.apiUserData = {};
        this.apiUserData = response.data;
        if (this.apiUserData.status.toLowerCase() == 'valid') {
          
          this.$store.commit("setJWT", this.apiUserData.wsbApiAuthToken);
          eventBus.emit("setTokenTimer", this.apiUserData.wsbApiAuthToken);
          this.userName = this.apiUserData.userId;

          let WOBSRoles = [];

          for (let adRole of response.data.adRoles) {
            for (let validRole of this.validADRoles) {
              if (
                adRole.role.trim().toUpperCase() ==
                validRole.adRoleName.trim().toUpperCase()
              ) {
                WOBSRoles.push(adRole.role);
              }
            }
          }

          // TEST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // WOBSRoles = [];
          // WOBSRoles.push("TG_WOBSTest_HO_Sales_View");
          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

          if (WOBSRoles.length) WOBSRoles.push("HomeOfficeUser");
          let data = { userRoles : WOBSRoles,  userProps: response.data};
          eventBus.emit("homeOfficeUserRoleUpdated", data);
        } else {
          this.waiting = false;
          this.statusText = "";
          this.failedText = "Unable to validate authorization code.";
          this.failedDialog = true;
        }
      })
      .catch((e) => {
        Log.logError(e,"hoAuth.vue validateTokenAndRedirect");
        this.waiting = false;
        this.statusText = "";
        this.failedText = "Unable to validate authorization code.";
        this.failedDialog = true;
      });
    },

    getHomeOfficeUserUIRoles(data) {
      let WOBSRoles = data.userRoles;
      let userProps = data.userProps;
      this.statusText = "Retrieving permissions...";
      let curUser = {};
      let userRoles = [];
      let roleList = WOBSRoles.join('|');

      this.statusText = "Retrieving permissions ......";

      dataService.getRolePermissionsByHORole(roleList)
      .then((response) => {
        if (response.status == 200) {
          for (let det of response.data.rolePermissionDetails) {
            if (userRoles.indexOf(det.uiRoleName) <= 0)
              userRoles.push(det.uiRoleName);
          }
        }

        if (userProps != null && userProps.firstName != null) {
          curUser = {
            user: this.userName,
            name: ( (userProps.firstName ? userProps.firstName : "") + " " + (userProps.lastName ? userProps.lastName : "")).trim(),
            role: userRoles.join(),
            type: "homeoffice",
          };
        } else {
          curUser = {
            user: this.userName,
            role: userRoles.join(),
            type: "homeoffice",
          };
        }

        this.waiting = false;
        this.setCurrentUser(curUser);
      })
      .catch((e) => {
        Log.logError(e,"hoAuth.vue getHomeOfficeUserUIRoles");
        this.waiting = false;
        this.statusText = "";
        this.failedText = "Unable to retrieve permissions...";
        this.failedDialog = true;
      });
    },

    setCurrentUser(curUser) {
      this.statusText = "Redirecting ......";

      let role = curUser.role;
      curUser.role = "";

      this.$store.commit("setCurrentUser", curUser);
      this.$store.state.currentFranchise.franchiseNumber = "";

      window.sessionStorage.setItem("user", curUser.user ? curUser.user.trim() : curUser.user);
      window.sessionStorage.setItem("type", curUser.type);
      window.sessionStorage.setItem("name", curUser.name);

      let encryptedRole = encryption.encrypt(role);
      window.sessionStorage.setItem("role", encryptedRole);

      if (curUser.name != null && curUser.name != "" && curUser.name != undefined)
        this.$store.commit("setDisplayName", curUser.name);
      else 
        this.$store.commit("setDisplayName", curUser.user);

      this.$store.state.loginType = "homeoffice"
      this.$router.push("/holanding");
    }
  },
};
</script>

<style scoped>
#wrapper {
  margin: auto;
  width: 1200px;
}
</style>
