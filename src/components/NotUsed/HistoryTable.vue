<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="items"
    item-key="name"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:item.link="{ item }">
      <span class="viewLink" @click="getDetail(item)">view</span>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    items: {
      type: Array
    },
    headers: {
      type: Array
    }
  },
  methods: {
    getDetail(item) {
      this.$store.commit("setCurrentInvoice", item);
      this.$router.push({ name: "Invoice View" });
    }
  },

  data() {
    return {
      singleSelect: false,
      selected: []
    };
  }
};
</script>
<style scoped>
</style>