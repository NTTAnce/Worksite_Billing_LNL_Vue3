<template>
  <div>
    <ValidateLinkUrl linkType="registration" v-if="!isValid"
      :linkGuid="linkGuid" v-on:validateStatusChange="handleValidateEvent">
    </ValidateLinkUrl>
    <Disclaimer v-if="isValid && !isAccepted" :linkDetails="linkDetails"
      v-on:disclaimerStatusChange="handleDisclaimerEvent">
    </Disclaimer>
    <Register v-if="isValid && isAccepted" :linkDetails="linkDetails"/>    
  </div>
</template>
<script>
import ValidateLinkUrl from '@/components/AccountAdmin/ValidateLinkUrl';
import Disclaimer from '@/components/AccountAdmin/Disclaimer';
import Register from '@/components/AccountAdmin/Register';

export default {
  name: "Registration",
  data() {
      return {
          linkGuid: "",
          isValid: false,
          isAccepted: false,
          linkDetails: {}
      }
  },
  created(){
    let linkGuid = this.$route.query.Register;
    if (!linkGuid) {
      linkGuid = this.$route.query.register;
    }
    this.linkGuid = linkGuid;
    this.$store.state.loginType = 'ext';
  },
  components: {
    ValidateLinkUrl,
    Disclaimer,
    Register
  },
  methods: {
    handleValidateEvent(e) {
      this.isValid = e.isValid;
      this.linkDetails = e.linkDetails;
    },
    handleDisclaimerEvent(e) {
      this.isAccepted = e.isAccepted;
    },
  },
}
</script>

<style scoped></style>
