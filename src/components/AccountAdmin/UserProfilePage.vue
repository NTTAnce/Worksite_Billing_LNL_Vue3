<template>
    <v-layout justify-center align-content-center>
        <v-dialog v-model="pinCodeDialog" max-width="550" persistent >
          <v-form ref="pincodeform" >
            <v-card>
              <v-card-title class="px-2 py-3 v-sheet v-sheet--tile theme--dark v-toolbar v-toolbar--flat tbBackground">
                One-Time Code
              </v-card-title>
              <v-card-text>
                <!-- <span style="margin-left: 15px;"><b>{{ pinCodeStatus }}</b></span> -->
                <br/>
                  <div style="margin-left: 15px;"><b>{{ messageType() }}, please check it for your one-time code.</b></div>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs9>
                        <v-text-field label="*one-time code" v-model="pincode" outlined single-line v-mask="'######'" autofocus :rules="pinCodeRules"
                         v-on:keypress.enter.prevent hide-spin-buttons />
                      </v-flex>
                    <v-flex xs3>
                        <v-btn align="right" color="#319B42" dark class="menuBtn topMargin"  ref="submitPinCode" @click.stop="verifyOTP()">
                          Submit
                        </v-btn>
                      </v-flex>
                    </v-layout>
                     <span
      :class="
        $vuetify.breakpoint.smAndDown ? 'waitCircleLoginSmMFA' : 'waitCircleLoginMFA'
      "
      :style="
        $vuetify.breakpoint.smAndDown
          ? 'width:100%; color: #319B42;'
          : 'width: 25%; color: #319B42;'
      "
    >
                      <v-layout justify-center align-content-center align-center column>
                        <v-progress-circular
                          v-if="mfaWaiting"
                          indeterminate
                          color="#319B42"
                          :size="70"
                          width="10"
                          
                        ></v-progress-circular>
                        <br />
                        <span class="status" v-if="mfaWaiting">{{ mfaStatusText }}</span>
                      </v-layout>
                    </span>
                    <v-layout row wrap>
                      <v-flex xs12 >
                        <hr />
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs9 >
                        <v-btn color="blue" dark class="menuBtn" @click.stop="resendCode">
                          Resend Code
                        </v-btn> 
                      </v-flex>
                      <v-flex xs3>
                        <v-btn color="#319B42" dark class="menuBtn" @click.stop="closePinDialog">
                          Close
                        </v-btn>
                      </v-flex>
                    </v-layout>
                    
                  </v-container>

              </v-card-text>
          </v-card>        
        </v-form>
      </v-dialog>
        <v-flex xs10>
        <v-card>
            <header class="px-2 py-3 v-sheet v-sheet--tile theme--dark v-toolbar v-toolbar--flat tbBackground">
            <v-flex style="padding-top: 5px; padding-left: 20px; ">
                <span class="title">{{ title }}</span>
            </v-flex>
            <v-flex style="padding-top: 5px; padding-left: 20px; ">
                <span class="subtitle">{{ subTitle }}</span>
            </v-flex>
            </header>
            <v-card-text>

                <v-alert text color="success" v-if="showSuccessMessages">
                    <v-row class="success-message">
                        <ul id="successMessage">
                            <li v-for="message in successMessages" v-bind:key="message">
                                {{ message }}
                            </li>
                        </ul>
                    </v-row>
                </v-alert>

                <v-alert text color="success" class="login-alert" v-if="isProfileUpdated">
                    <v-row class="success-message">                    
                        <ul>
                            <li>Click <a class="login-link-text" href="/login">Here</a> to log in</li>
                        </ul>
                    </v-row>
                </v-alert>                

                <v-form ref="form">      
                    <v-container>
                    <v-row>
                        <v-text-field label="*First Name" v-model="userInfo.firstName" dense outlined required
                        ref="firstName" :rules='firstNameRules'                        
                        ></v-text-field>
                        <div style="width:20px;"/>
                        <v-text-field label="*Last Name" v-model="userInfo.lastName" dense outlined required
                        ref="lastName" :rules='lastNameRules'                        
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field label="*New Password" v-model="password" dense outlined
                        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                        :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"
                        :rules='passwordRules' required ref="password"                        
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field label="*Confirm New Password" v-model="confirmPassword" dense outlined
                        :append-icon="showConfirm ? 'visibility' : 'visibility_off'"
                        :type="showConfirm ? 'text' : 'password'" @click:append="showConfirm = !showConfirm"
                        :rules='confirmRules' required ref="confirmPassword"                                                
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field label="*Phone Number" v-model="userInfo.phoneNumber" dense outlined
                        :rules='phoneRules'
                        ></v-text-field>                                        
                    </v-row>
                    </v-container>
                </v-form>                
                <UserDisclaimerDialog :isProfileUpdated="isProfileUpdated"/>
                <small>*indicates required field</small>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-col align="center">
                    <v-btn color="#319B42" v-if="isAccepted && !isProfileUpdated" dark class="menuBtn" @click="handleSave">Save</v-btn>
                    <v-btn class="menuBtn" v-if="!isAccepted || isProfileUpdated" @click="handleSaveError">Save</v-btn>
                </v-col>
            </v-card-actions>            
        </v-card>                    
        </v-flex>
        <v-progress-circular
        v-if="waiting"
        :class="$vuetify.breakpoint.smAndDown ? 'waitCircleSm' : 'waitCircle'"
        indeterminate
        color="#319B42"
        :size="100"
        width="10"
        >
        <span class="statusText" v-if="waiting">{{ statusText }}</span> 
        </v-progress-circular>
    </v-layout>
</template>
<script>
import UserDisclaimerDialog from './UserDisclaimerDialog.vue'
import eventBus from "@/event-bus.js";
import { MFA_Settings } from "@/HTTP-common.js";
import dataService from '@/services/dataService';
import Log from "@/log.js";

//Amplify Integration
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

var maxErrorCount = 3;

export default {
    name: "UserProfilePage",
    props: ["userProfile"],
    components: {
        UserDisclaimerDialog
    },
    mounted() {
        Amplify.configure({
            Auth: {
                region: MFA_Settings.Region,
                userPoolWebClientId: MFA_Settings.UserPoolClientId,
                userPoolId: MFA_Settings.UserPoolId
            }
        });
    },
    data() {
        return {
            waiting: false,
            statusText: 'Please wait',
            showSuccessMessages: false,
            successMessages:[],
            isAccepted: false,
            isProfileUpdated: false,
            userInfo: null,
            password: '',
            showPassword: false,
            passwordRules: [
                v => !!v || "Password is required",
                v => v.length >= 8 || "Password length must be greater than 8",
                v => /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v) || "Password must have at least one uppercase letter, one lowercase letter, one number and one special character.",
            ],
            confirmPassword: '',
            showConfirm: false,
            confirmRules: [
                v => !!v || "Confirm Password is required",
                v => v == this.password || "Confirm password doesn't match"
            ],
            phoneRules: [
                (v) => !!v || "Phone number is required",
                (v) => (!v || /^[\d{1}]?[ ]?[.\-( ]?[ ]?\d{3}[ ]?[.\-) ]?[ ]?\d{3}[.\- ]?\d{4}[ ]*$/.test(v)) || "Please enter a valid phone number with area code.",
            ],
            firstNameRules: [
                v => !!v || "First Name is required",
                v => /^[^_]+$/.test(v) || "Invalid First Name",
            ],                           
            lastNameRules: [
                v => !!v || "Last Name is required",
                v => /^[^_]+$/.test(v) || "Invalid Last Name",
            ],         
            failedCounter: 0,
            pincode: '',
            pinCodeDialog: false,
            pinCodeRules: [
                (v) => !!v || "One-time code is required.",
                v => (v && v.length == 6) || "One-time code must be digits.",
                v => /^\d+$/.test(v) || "One-time code must contain only digits."
            ],
            mfaWaiting: false,
            mfaStatusText: "",
            userMFAErrorId: 0,
            userMFAErrorCount: 0,
            remainingAttempts: 5
        }
    },    
    beforeDestroy() {
        eventBus.$off("is-accepted-changed");
    },     
    created(){
        this.userInfo = this.userProfile;
        this.userInfo.firstName = this.userProfile.linkInfo.firstName;
        this.userInfo.lastName = this.userProfile.linkInfo.lastName;
        this.userInfo.roleName = this.userProfile.linkInfo.roleName;
        this.userInfo.phoneNumber = this.userProfile.linkInfo.phone;
        this.userInfo.isRegistrantAdminLink = this.userProfile.linkInfo.isRegistrantAdminLink;

        eventBus.$on("is-accepted-changed", val => {
            this.isAccepted = val;
        });
    },
    methods: {
        messageType() {
            return "Email sent to " + this.maskedEmail;
        },
        showMessage(message, isError){
            this.waiting = false;
            if (isError) {
                let error = {};
                error.message = message;
                eventBus.$emit("appError", error);
            } else {
                let info = {};
                info.message = message;
                info.type = "success";
                eventBus.$emit("appInfo", info);
            }
        },
        validate(){
            return this.$refs.form.validate();
        }, 
        handleSaveError() {
            if(this.validate()) {
                if(!this.isAccepted) {
                    this.showMessage("Please accept terms and conditions to save.", true);
                }
            }
        },
        handleSave(){
            if (!this.validate()){
                return;
            }   

            this.waiting = true;            
            this.successMessages = [];

            let isRegistrant = this.userInfo.linkInfo.isRegistrantAdminLink; 
            let isMigrationUser = this.userInfo.linkInfo.isMigrationUser; 
            if (isRegistrant) {
                // Call getCompanyInfo. make sure company exists
                let companyId = this.userInfo.franchiseId;
                dataService.getCompanyInfo(companyId).then(response => {
                    let responseData = response.data;
                    if (responseData.statusCode == 200 || responseData.companyName) {
                        //found company, continue
                        this.processUser(isRegistrant, isMigrationUser);
                    } else {
                        this.showMessage("Invalid Account Number.", true);                            
                    }
                });
            } else {
                this.processUser(isRegistrant, isMigrationUser);                
            }
        },
        processUser(isRegistrant, isMigrationUser){
            //Step #2b, Save Cognito User
            this.createFranchiseUser().then(response => {
                let isSuccess = (response.status == 200 && response.data.statusCode == 200);

                if (!isSuccess){
                    Log.logError("Unable to save user info to Cognito", this.userInfo.emailId);

                    this.showMessage("Unable to save user info.", true);
                    
                    //Step #2b failed, Send Notification LNLWOBREGFAIL 
                    this.sendNotification("LNLWOBREGFAIL").then(response => {
                        let isSuccess = (response.status == 200);
                        if (!isSuccess) {
                            this.showMessage("Unable to send notification", true);
                            return;
                        }
                    });
                    return;
                }//!isSuccess

                //change link status
                Log.logInfo("User info is saved to Cognito", this.userInfo.emailId);
                Log.logInfo("Changing link status to inactive. Link Id=", this.userInfo.linkInfo.id);
                setTimeout(this.changeLinkStatus(this.userInfo.linkInfo.id, false), 1000);

                if (!isRegistrant) {
                    return this.saveNonRegistrant();
                }
                if (isMigrationUser) {
                    return this.saveMigrationUser();
                }                  

                this.saveRegistrant();
 
            })
            .catch((error) => { 
                Log.logError("Unexpected error", error);
                this.showMessage(error, true); 
            }); //#2b;

            window.sessionStorage.setItem("user_profile", null);

        },
        createFranchiseUser(){
            this.statusText = "Save user information";
            let cognitoReq = {};
            cognitoReq.userName = this.userInfo.emailId;
            cognitoReq.password = this.password;
            cognitoReq.firstName = this.userInfo.firstName;
            cognitoReq.lastName = this.userInfo.lastName;
            cognitoReq.email = this.userInfo.emailId;
            cognitoReq.phone = this.userInfo.phoneNumber;
            cognitoReq.franchiseId = this.userInfo.franchiseId;
            cognitoReq.franchiseName = this.userInfo.franchiseName.replace(/&/g, "");
            cognitoReq.role = this.userInfo.roleName;
            cognitoReq.isRegistrant = this.userInfo.isRegistrantAdminLink;
            return dataService.franchiseUserRegister(cognitoReq);
        },
        changeLinkStatus(linkId, isLinkActive) {
            var req = {};
            req.id = linkId;
            req.fieldName = "islinkactive";
            req.isLinkActive = isLinkActive;
            dataService.changeLinkStatus(req).then(response => { 
            if (response.data.statusCode != 200) {
                this.showMessage('unable to set link status');          
            }
            });
        },       
        sendNotification(identifier) {
            this.statusText = "Sending notification";
            let req = {};
            req.identifier = identifier;
            req.userName = this.userInfo.emailId;
            req.firstName = this.userInfo.firstName;
            req.lastName = this.userInfo.lastName;
            req.franchiseId = this.userInfo.franchiseId;
            req.franchiseName = this.userInfo.franchiseName;
            return dataService.sendCCMNotification(req);
        },
        sendAdditionalNotifications(identifier, newUserName) {
        dataService.getAdditionalRecipients(identifier, this.userInfo.franchiseId).then(recResponse => {
            if (recResponse.status == '200') {
                let recResponseData = recResponse.data;
                let recipients = recResponseData.recipientDetails;
                if (recipients) {
                    recipients.forEach(item => {
                        this.sendExtraNotification(identifier, item, newUserName).then(() => {});
                    });
                }
            }
        }); 
        },
        sendExtraNotification(identifier, item, newUserName) {
            this.statusText = "Sending notification";
            let req = {};
            req.identifier = identifier;
            req.userName = item.userName;
            req.firstName = item.firstName;
            req.lastName = item.lastName;
            req.franchiseId = item.franchiseId;
            req.franchiseName = item.franchiseName;
            if (req.franchiseName) {
                // SR 898944 - registration CORS fix
                req.franchiseName = req.franchiseName.replace(/&/g, "");
            }
            req.newUserName = newUserName;
            return dataService.sendCCMNotification(req);
        },
        disableFranchiseUser(){
            this.statusText = "Change user status";
            let userName = this.userInfo.emailId;
            dataService.franchiseEnableDisableUserAccount(userName, true)
            .then(response => {
                let isSuccess = (response.status == 200);
                    if (!isSuccess) {
                    this.showMessage("unable to disable user, please contact your administrator", true);
                    return;
                }
            })
        },        
        createUserRole() {
            this.statusText = "Create user role";
            let req = {};
            req.Id = this.userInfo.linkInfo.id;
            req.linkGuid = this.userInfo.linkInfo.linkGuid;
            req.franchiseId = this.userInfo.franchiseId;
            req.emailId = this.userInfo.emailId;
            req.phone = this.userInfo.phoneNumber;
            req.roleId = this.userInfo.linkInfo.roleId;
            req.roleName = this.userInfo.linkInfo.roleName;
            req.firstName = this.userInfo.firstName;
            req.lastName = this.userInfo.lastName;
            req.isRegistrantAdminLink = this.userInfo.linkInfo.isRegistrantAdminLink;
            req.isRegistrantUserEmailVerified = false;
            req.IsRegistrantUserSMSVerified = false;
            req.isRegistrantUserVerified = true;
            return dataService.createUserRole(req);
        },
        saveNonRegistrant() {
            //Create role
            this.createUserRole().then(response => {
                let isSuccess = (response.status == 200 && response.data.isSuccess);
                if (!isSuccess) {
                    this.showMessage("Unable to save user role.", true);
                    Log.logError("Unable to createUserRole for NonRegistrant", this.userInfo.emailId);
                    this.disableFranchiseUser();
                    return;
                }

                Log.logInfo("NonRegistrant is saved", this.userInfo.emailId);
                //Send Notifications
                this.sendNotification("LNLWOBREGCONF").then(response => {
                    let isSuccess = (response.status == 200);
                    if (!isSuccess) {
                        this.showMessage("Unable to send notification", true);
                        return;
                    }
                });
                //Done with Non-Registrant
                this.amplifySignIn(false);
                //Send Notification to additional users
                let newUserName = encodeURIComponent(this.userInfo.firstName + ' ' + this.userInfo.lastName + ' - ' + this.userInfo.emailId);
                window.setTimeout(this.sendAdditionalNotifications('LNLWOBNUCOMPNOTIF', newUserName), 1000);
            });

            return;
        },
        saveMigrationUser() {
            //Create role
            this.createUserRole().then(response => {
                let isSuccess = (response.status == 200 && response.data.isSuccess);
                if (!isSuccess) {
                    this.showMessage("Unable to save user role.", true);
                    Log.logError("Unable to createUserRole for Migration user", this.userInfo.emailId);
                    this.disableFranchiseUser();
                    return;
                }

                Log.logInfo("MigrationUser is saved", this.userInfo.emailId);
                //Send Notifications
                this.sendNotification("LNLWOBREGCONF").then(response => {
                    let isSuccess = (response.status == 200);
                    if (!isSuccess) {
                        this.showMessage("Unable to send notification", true);
                        return;
                    }
                });
                //Done with migration user
                this.amplifySignIn(false);
                //Send Notification to additional users
                let newUserName = encodeURIComponent(this.userInfo.firstName + ' ' + this.userInfo.lastName + ' - ' + this.userInfo.emailId);
                window.setTimeout(this.sendAdditionalNotifications('LNLWOBNUCOMPNOTIF', newUserName), 1000);
            });
            return;
        },
        saveRegistrant() {
            //Step #4, Create role
            this.createUserRole().then(response => {
            let isSuccess = (response.status == 200 && response.data.isSuccess);
            if (!isSuccess) {
                this.showMessage("Unable to save user role.", true);
                Log.logError("Unable to createUserRole for Registrant", this.userInfo.emailId);
                this.disableFranchiseUser();
                return;
            }
            Log.logInfo("Registrant is saved", this.userInfo.emailId);
            //Step #5a, Send Notification LNLWOBREGCONF 
            this.sendNotification("LNLWOBREGCONF").then(response => {
                let isSuccess = (response.status == 200);
                if (!isSuccess) {
                    this.showMessage("Unable to send notification", true);
                    return;
                }

                //done
                this.amplifySignIn(false);                          
            })
            .catch((error)=>{ this.showMessage(error, true); });  //#5

            })
            .catch((error) => { this.showMessage(error, true); }); //#4

            return;
        },
        closePinDialog(){
            this.$refs.pincodeform.resetValidation();
            this.pincode = null;
            this.pinCodeDialog = false;
        },
        resendCode() {
            this.$refs.pincodeform.resetValidation();
            this.pincode = null;
            this.pincodeDialog = false;
            this.waiting = true;
            this.amplifySignIn(false);
        },
        amplifySignIn(isVerifyPinCode) {
            this.userInfo.emailId = this.userInfo.emailId;
            Auth.signIn(this.userInfo.emailId)
                .then((amplifyUser) => {
                this.mfaUser = amplifyUser;
                this.mfaSession = JSON.stringify(amplifyUser);

                if (isVerifyPinCode) {
                    //if coming in from verifyOTP then display number of attempts remaining. 
                    //scenario of attempts left is 0 is handled in verifyOTP
                    this.mfaWaiting = false;
                    this.showMessage("Invalid one-time code. New email sent to address you registered with, please check it for your new one-time code.");
                }
                else {
                    //all good. Display popup
                    this.waiting = false;
                    this.mfaWaiting = false;
                    this.pincode = null;
                    this.pinCodeDialog = true;
                }

                return;
                })
                .catch((e) => {
                    Log.logError(
                        e,
                        "ExternalLogin.vue amplifySignIn"
                    );
                    Log.logError('One-time code generation failed for - ' + this.userInfo.emailId, 'ExternalLogin.vue amplifySignIn');
                    this.waiting = false;
                    this.mfaWaiting = false;
                    this.showMessage('One-time code generation failed');
                    return;
                });
        },
        verifyOTP() {
            if (this.$refs.form.validate()) {
                if (!this.$refs.pincodeform.validate()) {return; }
            }

            //do not display status text on parent
            this.waiting = false;

            //display mfa status text
            this.mfaWaiting = true;

            //set default failedText
            this.mfaStatusText = "Verifying one-time code ...";

            this.amplifyVerify();
        },
        amplifyVerify() {
            //update attempts made 
            this.remainingAttempts--;
            this.userMFAErrorCount++;

            //verify pin code
            Auth.sendCustomChallengeAnswer(this.mfaUser, this.pincode)
                .then((response) => {
                //update userMFAErrorCount
                this.mfaStatusText = "Updating MFA Status...";
                if (response.signInUserSession)
                {
                    //pin code verification is good. Reset errorCount
                    this.successMessages.push("User ID: " + this.userInfo.emailId + ", Registration successful.");
                    this.confirmEmail();
                    this.updUserMFAError(0);
                    this.waiting = false;
                    this.mfaWaiting = false;
                    this.pinCodeDialog = false;
                    this.showSuccessMessages = true;
                    this.isProfileUpdated = true;
                }
                else {
                    this.showMessage("Unable to verify pin code");
                    this.updUserMFAError(this.userMFAErrorCount);
                }
                })
                .catch((e) => {
                    Log.logError(
                        e,
                        "ExternalLogin.vue amplifyVerify"
                    );

                    //have we reached max try limit. if not, then ampify sign in
                    this.mfaStatusText = "Updating MFA Status...";
                    this.updUserMFAError(this.userMFAErrorCount);
                });
        },
        updUserMFAError(errorCount) {
        //update database with new errorCount
            dataService.postUserMFAError(this.userInfo.emailId, this.userMFAErrorId, errorCount, "email")
                .then((response) =>{
                Log.logInfo('User MFA Error update completed. ');

                if (response.data.statusCode == 200)
                {
                    if (errorCount == 0)
                    { 
                        //MFA is successful. Error Count in database has been reset.
                        this.remainingAttempts = maxErrorCount;
                        this.userMFAErrorCount = 0;
                    }
                    else
                    {
                        if (this.remainingAttempts > 0)
                        {
                            //error count is still not maxed out. do retry again.
                            this.userMFAErrorId = response.data.userMFAErrorResponseDTO.userMFAErrorDetails.id;

                            //call signIn
                            this.statusText = "Regenerating one-time code ...";
                            this.amplifySignIn(true);
                        }
                        else 
                        {
                            this.mfaWaiting = false;
                            Log.logInfo('User  ' + this.userInfo.emailId + ' will be locked for exceeding mfa attempts ....', 'UserProfilePage.vue amplifyVerify');
                            this.showMessage(`You have exceeded the amount of log in attempts. Please contact your company's administrator to unlock your account or contact Customer Service at 1-888-488-0134, select option #2.`, true)

                            //lock the user
                            window.setTimeout(dataService.setlockFranchiseUser(encodeURIComponent(this.userInfo.emailId.trim()), true, true), 1000);


                            //close mfa pop up
                            this.$refs.pincodeform.resetValidation();      
                            this.pincode = null;
                            this.pinCodeDialog = false;
                            return;
                        }
                    }
                }
                else
                {
                    this.mfaWaiting = false;
                    Log.logError(
                    'Database update of MFA ErrorCount failed',
                    "UserProfilePage.vue updUserMFAError"
                    );
                }
                })
                .catch((e) => {
                this.mfaWaiting = false;
                this.errors.push(e);
                Log.logError(
                    e,
                    "UserProfilePage.vue updUserMFAError"
                );
            });
        },
        confirmEmail() {
            let req = {};
            req.emailId = this.userInfo.emailId;
            dataService.confirmRegisteredUserEmail(req).then(response => {
            if (response.data.statusCode != "200") {
                Log.logInfo("confirmRegisteredUserEmail returned bad status code: " + response.data.statusCode);
                Log.logInfo("confirmRegisterdUserEmail data: " + JSON.stringify(response.data));
            }
            }).catch(e => {
                Log.logError(e, "UserProfilePage.vue confirmRegisteredUserEmail");
            });
        },
    },
    computed: {
        title() {
            let title = 'Update Profile';
            if (this.isProfileUpdated) {
                title = 'Profile Update Complete';
            }
            return title;
        },
        subTitle(){
            let subTitle = `Please provide your First and Last Name, and your new Password. Click and accept the Terms & Conditions to Save your profile settings.`;
            if (this.isProfileUpdated) {
                subTitle = '';
            }
            return subTitle;
        },
        maskedEmail() {
            if (this.userInfo.emailId) {
                let name = this.userInfo.emailId;
                let atIndex = name.indexOf('@');
                let periodIndex = name.indexOf('.', atIndex + 1);
                let maskedUser = name.substr(0, 1) + '****' + name.substr(atIndex - 1, 1) + '@*.' + name.substr(periodIndex + 1);
                return maskedUser;
            }
            return null;
        },
    }
}
</script>
<style scoped>
a.login-link-text {
    text-decoration: underline;
}
.login-alert {
    margin-top: -16px;
}
.waitCircle {
  z-index: 20;
  position: fixed;
  top: 35%;
  left: 35%;
}
.waitCircleSm {
  z-index: 20;
  position: fixed;
  top: 35%;
  left: 35%;
}
</style>