<template>
    <div>
    <v-layout justify-center align-content-center>
        <v-flex xs6>
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
                <v-form ref="form">                
                    <v-flex>
                        Account Number: {{ linkDetails.franchiseId }}
                    </v-flex>
                    <v-flex>
                        <p/>
                        <v-text-field label="*Email address for registration link" v-model="emailId" dense outlined
                        :rules='emailIdRules' required
                        v-on:keydown.enter.prevent="handleContinue"
                        ></v-text-field>
                    </v-flex>
                </v-form>
                <small>*indicates required field</small>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-col align="center">
                    <v-btn color="#319B42" dark class="menuBtn" @click="handleContinue" v-if="canContinue && !waiting">Continue</v-btn>
                    <v-btn color="grey" dark class="menuBtn" v-if="!canContinue || waiting">Continue</v-btn>
                </v-col>
            </v-card-actions>            
        </v-card>                    
        </v-flex>
    </v-layout>

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

    </div>
</template>
<script>
import dataService from '@/services/dataService';
import eventBus from "@/event-bus.js";

export default {
    name: "UserWelcome",
    props:['linkDetails'],
    data() {
        return {
            waiting: false,
            statusText: 'Please wait',
            showSuccessMessages: false,
            successMessages:[],
            emailId: null,
            phone: null,
            isMigrationUser: false,
            franchiseId: '',
            franchiseName: '',
            emailIdRules: [
                v => !!v || "User Email address (Log-in ID)",
                v => (v != null && v.length > 3) || "User Email address (Log-in ID) is invalid",
                v => (v != null && /[\w-]+@([\w-]+\.)+[\w-]+/.test(v.trim())) || "User Email address (Log-in ID) is invalid",
            ],    
            failedCounter: 0,
        }
    },
    created() {
        this.franchiseId = this.linkDetails.franchiseId;
        this.isMigrationUser = this.linkDetails.isMigrationUser;
    },
    methods: {
        validate(){
            return this.$refs.form.validate();
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
        setFailedCounter(){
            this.failedCounter += 1;
            if (this.failedCounter > 3) {
                this.showMessage("Too many attempts please try again later or contact your administrator", true);
                this.$router.push("/login");  
            }
        },        
        handleContinue() {
            if (!this.validate()){
                return;
            } 

            //Step #1, Validate Franchise Id
            this.waiting = true;
            this.validateFranchiseId()
            .then(response => {
                this.waiting = false;                
                let isSuccess = (response.status == 200 && response.data.isSuccess);
                if (!isSuccess) {
                    this.showMessage("Please use the same email address that received this registration link.", true);
                    this.setFailedCounter();
                    return;
                } else {            
                    this.franchiseName = response.data.companyName;

                    //user is valid, set jwt token
                    this.$store.commit("setJWT", response.data.wsbApiAuthToken);

                    //Step #2, VerifyUserExists
                    this.waiting = true;
                    this.verifyUserExists()
                    .then(response => {
                        this.waiting = false;

                        let isSuccess = (response.status == 200);
                        if (!isSuccess){
                            this.showMessage("Unable to verify user exists", true);
                            return;
                        }
                        if (isSuccess && response.data.userExists) {
                            this.showMessage("User already exists", true);
                            return;
                        }

                        this.waiting = false;
                        let userInfo = {};
                        userInfo.isVerified = true;
                        userInfo.emailId = this.emailId.trim();
                        userInfo.franchiseId = this.linkDetails.franchiseId;
                        userInfo.franchiseName = this.franchiseName;
                        userInfo.linkInfo = this.linkDetails;
                        userInfo.phone = this.phone;
                        eventBus.$emit("userVerified", userInfo);                    

                    });                    

                }
            });
        },
        validateFranchiseId() {
            this.statusText = "Validate user information";
            let req = {};
            req.Id = this.linkDetails.id;
            req.linkGuid = this.linkDetails.linkGuid;
            req.emailId = this.emailId.trim();
            req.franchiseId = this.franchiseId;
            return dataService.validateFranchiseUser(req);
        },  
        verifyUserExists(){
            this.statusText = "Verify user exists";
            return dataService.verifyFranchiseUserExists(this.emailId.trim());
        },            
    },
    computed: {
        title() {
            let title = 'Welcome to the Worksite Online Billing System';
            if (this.isMigrationUser) {
                title = 'Welcome to the upgraded Worksite Online Billing System!';
            }
            return title;
        },
        subTitle(){
            let subTitle = 'Please enter the same email address that received this registration link.';
            return subTitle;
        },
        canContinue() {
            let result = false;
            if (this.emailId) {
                let regex = /[\w-]+@([\w-]+\.)+[\w-]+/;
                result = regex.test(this.emailId.trim());
            }
            return result;
        },
    }
}
</script>
<style scoped>
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