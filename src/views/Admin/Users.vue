<template>
  <FranchiseUserRoles :franchiseId="currentFranchiseNumber"/>
</template>
<script>
import FranchiseUserRoles from "@/components/AccountAdmin/FranchiseUserRoles";
import permissions from "@/permissions.js";

export default {
  name: "Users",
  mixins: [permissions],
  components: {
    FranchiseUserRoles
  },
  data() {
    return {
      currentFranchiseNumber : null,
    }
  },
  created(){
    this.currentFranchiseNumber = this.$store.state.currentFranchise.franchiseNumber;
  }, 
}
</script>
<style scoped>
</style>