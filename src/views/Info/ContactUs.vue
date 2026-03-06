<template>
  <div>
    <v-container align="center" justify="center" row wrap>
      <v-row  class="padding">
        <ContactUs />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ContactUs from "@/components/Info/ContactUs.vue";
export default {
  components: {
    ContactUs
  }
};
</script>

<style scoped>
.padding {
  margin-left: 50px;
  margin-right: 25px;
}
</style>
