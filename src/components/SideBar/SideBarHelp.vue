<template>
  <v-card class="helpDiv" elevation="1">
    <div class="helpBanner">
      <router-link to="/faq" style="color: #e6bd4b">
        <v-icon color="#e6bd4b" large>mdi-comment-question-outline</v-icon>
        Need Help?
      </router-link>
    </div>

    <div class="indentDiv">
      <p style="line-height: 180%">
      <br v-if="$route.name != 'Training'"/>
      <router-link to="/training" class="helpText" v-if="$route.name != 'Training'">
        Watch the training video
        <v-icon color="#319B42" small>mdi-chevron-double-right</v-icon>
      </router-link>
      <br v-if="$route.name != 'Frequently Asked Questions'"/>
      <router-link to="/faq" class="helpText" v-if="$route.name != 'Frequently Asked Questions'">
        Read answers to common questions
        <v-icon color="#319B42" small>mdi-chevron-double-right</v-icon>
      </router-link>
      <br v-if="$route.name != 'Contact Us'"/>      
      <router-link to="/contactus" class="helpText" v-if="$route.name != 'Contact Us'">
        Send us an email
        <v-icon color="#319B42" small>mdi-chevron-double-right</v-icon>
      </router-link>
      </p>
      <span class="custServ">
        Call Customer Service
        <br />
        <span style="color:#474C55">
          <strong>{{ contactPhoneNumber }}</strong>
        </span>
        <br />8am-5pm CST Monday-Friday
        <br />
        <br />
      </span>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      contactPhoneNumber: "1-888-488-0134"
    };
  }
};
</script>
<style scoped>
.indentDiv {
  margin-left: 25px;
}
.helpText {
  color: #319b42 !important;
  text-decoration: none;
  font-family: "Lato", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1rem;
}
.helpDiv {
  margin-left: 0;
  margin-right: 20px;
  color: #bfb9b6;
  /* border: 1px solid rgb(119, 115, 113); */
}
.custServ {
  color: rgb(119, 115, 113);
}
</style>