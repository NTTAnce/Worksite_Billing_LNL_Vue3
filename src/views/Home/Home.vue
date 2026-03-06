<template>
  <div></div>
</template>
<script>
export default {
  created() {
    var host = window.location.hostname;
    var path = window.location.pathname;
    if (path.length <= 1) {  
      if (host.toLowerCase().indexOf('-ho.') > 0) {
        return this.loginAs('homeoffice');
      }
      if (host.toLowerCase().indexOf('-homeoffice.') > 0) {
        return this.loginAs('homeoffice');
      }
      if (host.toLowerCase().indexOf('-sso.') > 0) {
        return this.loginAs('sso');
      }      
      if (host.toLowerCase().indexOf('-agency.') > 0) {
        return this.loginAs('agency');
      }
    }
    return this.loginAs('ext');
  },
  methods: {
    loginAs(loginType) {
        this.$store.state.loginType = loginType;
        return this.$router.push({ path: 'login', query: { login: loginType } });    
    }
  }
};
</script>
<style scoped>
</style>