<template>
  <div>
    <!-- <ValidatePasswordLinkUrl v-if="!isValid"
      :linkGuid="linkGuid" v-on:validateStatusChange="handleValidateEvent">
    </ValidatePasswordLinkUrl>
    <ChangePassword v-if="isValid" :linkDetails="linkDetails"/> -->
  </div>
</template>
<script>
// import ChangePassword from '@/components/AccountAdmin/ChangePassword';
// import ValidatePasswordLinkUrl from '@/components/AccountAdmin/ValidatePasswordLinkUrl';

export default {
  name: "PasswordReset",
  data() {
      return {
          linkGuid: "",
          isValid: false,
          linkDetails: {}
      }
  },
  created(){
    this.linkGuid = this.$route.query.linkGuid;
    this.$store.state.loginType = 'ext';
  },
  // components: {
  //   ValidatePasswordLinkUrl,
  //   ChangePassword
  // },
  methods: {
    handleValidateEvent(e) {
      this.isValid = e.isValid;
      this.linkDetails = e.linkDetails;
    },
  },  
}
</script>

<style scoped></style>