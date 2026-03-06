<template>
  <v-row align="center" justify="center" wrap>
    <v-col cols="12" class="padding">
      <CompanyPaymentInfo />
    </v-col>
  </v-row>
</template>

<script>
import CompanyPaymentInfo from "@/components/Company/CompanyPaymentInfoPage.vue";
export default {
  name: "CompanyPaymentInformation",
  props: {
    mainColor: String
  },
  components: {
    CompanyPaymentInfo
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