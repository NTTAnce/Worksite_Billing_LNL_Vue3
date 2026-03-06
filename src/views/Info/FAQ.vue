<template>
  <div>
    <v-container align="center" justify="center" row wrap>
      <v-row cols="10" class="padding">
        <FAQ />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FAQ from "@/components/Info/FAQ.vue";
export default {
  components: {
    FAQ
  }
};
</script>

<style scoped>
.padding {
  margin-left: 50px;
  margin-right: 25px;
}
</style>
