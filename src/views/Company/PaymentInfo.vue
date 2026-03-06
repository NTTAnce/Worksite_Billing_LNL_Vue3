<template>
  <v-row align="center" justify="center"  wrap>
    <v-col cols="12" class="padding">
      <PaymentInfo />
    </v-col>
  </v-row>
</template>

<script>
import PaymentInfo from "@/components/Company/PaymentInfoPage.vue";
export default {
  name: "PaymentInformation",
  props: {
    mainColor: String
  },
  components: {
    PaymentInfo
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