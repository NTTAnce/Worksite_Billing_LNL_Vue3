<template>
  <v-row align="center" justify="center">
    <v-col cols="12" class="padding">
      <CompanyInfo />
    </v-col>
  </v-row>
</template>

<script>
import CompanyInfo from "@/components/Company/CompanyInfoPage.vue";
export default {
  name: "CompanyInformation",
  props: {
    mainColor: String
  },
  components: {
  CompanyInfo
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