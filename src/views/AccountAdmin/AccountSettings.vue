<template>
  <v-layout align-center justify-center row wrap>
    <v-flex xs12 class="padding">
      <AccountSettingsPage />
    </v-flex>
  </v-layout>
</template>

<script>
import AccountSettingsPage from "@/components/AccountAdmin/AccountSettingsPage.vue";
export default {
  name: "AccountSettings",
  props: {
    mainColor: String
  },
  components: {
    AccountSettingsPage
  },
  methods: {}
};
</script>
<style scoped>
.padding {
  margin-left: 25px;
  margin-right: 25px;
}
</style>