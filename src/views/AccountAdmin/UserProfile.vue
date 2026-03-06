<template>
    <div>
        <UserProfilePage :userProfile="userProfile"/>
    </div>
</template>
<script>
import UserProfilePage from '@/components/AccountAdmin/UserProfilePage.vue'
export default {
    name: "UserProfile",
    components: {
        UserProfilePage
    },
    created(){
        let userData = window.sessionStorage.getItem("user_profile");
        if (userData) {
            this.userProfile = JSON.parse(userData);
        }
        //if user profile is null, redirect to login page
    },
    data() {
        return {
            userProfile: null
        }
    },

    
}
</script>