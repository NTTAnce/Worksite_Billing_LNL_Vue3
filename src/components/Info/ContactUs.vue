<template>
  <span id="contactUs">
    <div>
      <v-container justify="center" align-content="center">
      <v-row>
        <v-col cols="10">
          <v-card class="mx-auto">
            <header
              class="px-2 py-3 v-sheet v-sheet--tile theme--dark v-toolbar v-toolbar--flat tbBackground"
            >
              <v-row style="padding-top: 15px; padding-left: 20px">
                <b><span style="font-size: 25px">Contact Us</span></b>
              </v-row>
            </header>
            <br />
            <v-alert text color="success" v-if="showSuccessMessages">
              <v-row class="success-message">
                <ul id="successMessage">
                  <li v-for="message in successMessages" v-bind:key="message">
                    {{ message }}
                  </li>
                </ul>
              </v-row>
            </v-alert>

            <v-alert text color="warning" v-if="showErrorMessages">
              <v-row class="error-message">
                <ul id="errorMessage">
                  <li v-for="message in errorMessages" v-bind:key="message">
                    {{ message }}
                  </li>
                </ul>
              </v-row>
            </v-alert>
            <v-container justify="center" align-content="center" row>
              <v-row cols="9">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row cols="25" sm="15" md="8">
                    <v-text-field
                      v-model="companyName"
                      :rules="companyNameRules"
                      label="*Company Name"
                      dense
                      outlined
                      autocomplete="companyName"
                      ref=""
                    ></v-text-field>
                  </v-row>

                  <v-row cols="25" sm="15" md="8">
                    <v-text-field
                      v-model="companyNumber"
                      :rules="companyNumberRules"
                      label="*Account Number"
                      dense
                      outlined
                      autocomplete="companyNumber"
                      ref=""
                    ></v-text-field>
                  </v-row>

                  <v-row cols="50" sm="15" md="8">
                    <v-text-field
                      v-model="phone"
                      :rules="phoneRules"
                      v-mask="'(###) ###-####'"
                      label="*Telephone"
                      dense
                      outlined
                      autocomplete="phone"
                      ref=""
                    ></v-text-field>
                  </v-row>

                  <v-row cols="50" sm="15" md="8">
                    <v-text-field
                      v-model="emailAddress"
                      :rules="emailAddressRules"
                      label="*Email Address"
                      dense
                      outlined
                      autocomplete="emailAddress"
                      ref=""
                    ></v-text-field>
                  </v-row>

                  <v-row cols="50" sm="15" md="8">
                    <v-select
                      v-model="subject"
                      :items="comments"
                      label="*Subject"
                      :rules="subjectRules"
                      dense
                      outlined
                      required
                    ></v-select>
                  </v-row>
                  <v-row cols="50" sm="15" md="8">
                    <v-textarea
                      multi-line
                      v-model="question"
                      :rules="questionRules"
                      label="*Question/Comments"
                      dense
                      outlined
                      rows="5"
                      autocomplete="question"
                      ref=""
                    ></v-textarea>
                  </v-row>

                  <v-row cols="9">
                    <v-container justify="center">
                      <v-btn
                        color="#319B42"
                        dark
                        class="menuBtn"
                        ref=""
                        @click.stop="validate"
                        >Submit</v-btn
                      >
                    </v-container>
                  </v-row>
                </v-form>
              </v-row>
            </v-container>
            <br />
            <br />
          </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
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
        <v-container justify="center" align-content="center" align="center" column>
          <v-progress-circular
            v-if="waiting"
            indeterminate
            color="#319B42"
            :size="70"
            width="10"
          ></v-progress-circular>
          <br />
          <span class="status" v-if="waiting">{{ statusText }}</span>
        </v-container>
      </span>
    </div>
  </span>
</template>


<script>
import commentsList from "@/comments.js";
import { HTTP_Notify } from "@/HTTP-common.js";
import Log from "@/log.js";
import dataService from "@/services/dataService";
//import permissions from "@/permissions.js";

export default {
  name: "contactUs",
  data: () => ({
    waiting: false,
    showSuccessMessages: false,
    successMessages: [],
    showErrorMessages: false,
    errorMessages: [],
    modal: false,
    menu2: false,
    menu2small: false,
    valid: true,
    NA: false,
    rules: {},
    companyName: "",
    companyNameRules: [(v) => !!v || "Company Name is required."],
    companyNumber: "",
    companyNumberRules: [(v) => !!v || "Account Number is required."],
    phone: "",
    phoneRules: [
      (v) => !!v || "Primary phone number is required",

      (v) =>
        /^[\d{1}]?[ ]?[.\-( ]?[ ]?\d{3}[ ]?[.\-) ]?[ ]?\d{3}[.\- ]?\d{4}[ ]*$/.test(
          v
        ) || "Please enter a valid phone number with area code.",
    ],
    emailAddress: "",
    emailAddressRules: [
      (v) => !!v || "Email Address is required",
      (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email address must be valid",
    ],
    subject: "",
    comments: commentsList,
    subjectRules: [(v) => !!v || "Please select a subject."],
    question: "",
    questionRules: [(v) => !!v || "Please enter Question/Comments."],

    uniqueId: -1,
  }),
  computed: {
    franchiseInfo() {
      try {
        return this.$store.state.currentFranchise;
      } catch (e) {
        Log.logError(e, "ContactUs.vue franchiseInfo");
        return "";
      }
    },
    franchisePhone() {
      try {
        return this.franchiseInfo.franchisePhone != null
          ? this.franchiseInfo.franchisePhone
          : "";
      } catch (e) {
        Log.logError(e, "ContactUs.vue franchisePhone");
        return "";
      }
    },
    franchiseName() {
      try {
        return this.franchiseInfo.franchiseName != "" &&
          this.franchiseInfo.franchiseName != null
          ? this.franchiseInfo.franchiseName
          : "UNKNOWN";
      } catch (e) {
        Log.logError(e, "ContactUs.vue franchiseName");
        return "UNKNOWN";
      }
    },
    userInfo() {
      try {
        return this.$store.state.currentUser.user;
      } catch (e) {
        Log.logError(e, "CompanyInfoPage.vue userInfo");
        return "";
      }
    },
  },

  methods: {
    setErrorMessages(errors) {
      this.waiting = false;
      if (Array.isArray(errors)) {
        this.errorMessages = errors;
      } else {
        this.errorMessages.push(errors);
      }
      if (this.errorMessages.length > 0) {
        this.showErrorMessages = true;
      }
    },
    setSuccessMessages(messages) {
      this.waiting = false;
      if (Array.isArray(messages)) {
        this.successMessages = messages;
      } else {
        this.successMessages.push(messages);
      }
      if (this.successMessages.length > 0) {
        this.showSuccessMessages = true;
      }
    },

    close() {
      this.cleanup();
      this.dialog = false;
    },

    getContactUsSubjects() {
      dataService.getContactUsSubjects().then((response) => {
        let responseData = response.data;
        if (responseData.statusCode == 200) {
          this.subject = responseData.backOfficeDetails[0].subject;
        }
      });
    },

    validate() {
      try {
        if (this.$refs.form.validate()) {
          this.statusText = "submitting...";
          this.waiting = true;
          this.showSuccessMessages = false;
          this.showErrorMessages = false;
          this.successMessages = [];

          HTTP_Notify.get("NonCCMNotification/WorkSiteContactUSEmail", {
            params: {
              companyName: this.companyName,
              companyId: this.companyNumber,
              phone: this.phone.replace(/[{()}]/g, '').replace(/\s/g, '').replace(/-/g, '').trim(),
              emailAddress: this.emailAddress,
              subject: this.subject,
              comments: this.question,
            },
            //withCredentials: true
          })
            .then((response) => {
              let responseData = response.data;

              try {
                if (responseData == "Successfully submitted") {
                  this.setSuccessMessages(
                    "Information has been submitted successfully."
                  );
                } else {
                  this.setErrorMessages(
                    "Company Information has been not submitted, please check with administrator."
                  );
                }
                this.waiting = false;
              } catch (e) {
                Log.logError(e, "ContactUs.vue validate");
                this.searching = false;
              }
            })
            .catch((e) => {
              Log.logError(e, "ContactUs.vue validate (1)");
              this.setErrorMessages(
                "Company Information has been not submitted, please check with administrator."
              );
            });
          this.waiting = true;
        }
      } catch (e) {
        Log.logError(e, "ContactUs.vue validate (2)");
        this.searching = false;
      }
    },
  },

  created() {
    this.statusText = "Getting...";
    this.waiting = true;
    this.companyName = this.franchiseInfo.franchiseName;
    this.companyNumber = this.franchiseInfo.franchiseNumber;
    this.phone = this.franchiseInfo.franchisePhone;
    //this.emailAddress = this.userInfo;
    this.waiting = false;
  },
};
</script>
<style scoped>
.menuBtn {
  margin-top: 10px;
  text-transform: none !important;
  letter-spacing: normal;
  border-radius: 20px;
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
.tbBackground {
  background-color: #44aba8;
  /* background-color: #00558c; */
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
</style>

