<template>
    <div>
        <ValidateLinkUrl linkType="registration" v-if="!isValid"
        :linkGuid="linkGuid" v-on:validateStatusChange="handleValidateEvent">
        </ValidateLinkUrl>
        <UserWelcome v-if="isValid" :linkDetails="linkDetails"/>
    </div>    
</template>
<script>
import ValidateLinkUrl from '@/components/AccountAdmin/ValidateLinkUrl';
import UserWelcome from '@/components/AccountAdmin/UserWelcome';
import eventBus from "@/event-bus.js";

export default {
    name: "UserRegistration",
    data() {
        return {
            linkGuid: "",
            isValid: false,     //link guid valid
            linkDetails: {}
        }
    },
    beforeDestroy() {
        eventBus.$off("userVerified");
    },    
    created(){
        eventBus.$on("userVerified", userInfo => {
            let isVerified = userInfo.isVerified;
            if (isVerified) {
                //set session variable
                let userData = JSON.stringify(userInfo);
                window.sessionStorage.setItem("user_profile", userData);  
                window.setTimeout( this.moveToUserProfile, 200);                              
            }
        });

        let linkGuid = this.$route.query.Register;
        if (!linkGuid) {
            linkGuid = this.$route.query.register;
        }
        this.linkGuid = linkGuid;
        this.$store.state.loginType = 'ext';
    },
    components: {
        ValidateLinkUrl,
        UserWelcome
    },
    methods: {

        handleValidateEvent(e) {
            this.isValid = e.isValid;
            this.linkDetails = e.linkDetails;
        },
        moveToUserProfile() {
            this.$router.push('/profile');
        },
    },    
}
</script>