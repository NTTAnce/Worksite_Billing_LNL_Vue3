<template>
    <v-card class="registerDiv" elevation="0">
      <div class="registerBanner">New User?</div>
  
      <div>
        <p style="line-height: 180%">
        <router-link to="/selfregister" class="registerText">
          Register your administrator account here.
        </router-link>
        </p>
        <span>
          <br />View account information, invoice history, and pay invoices online.
          <br />
          <br />
        </span>
      </div>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {}
  };
  </script>
  <style scoped>
  .indentDiv {
    margin-left: 25px;
  }
  .registerText {
    color: #319b42 !important;
    text-decoration: none;
    font-family: "Lato", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1.68rem;
  }
  .registerDiv {
    margin-left: 0;
    margin-right: 20px;
    /* border: 1px solid rgb(119, 115, 113); */
  }
  p {
    margin-bottom: unset !important;
  }
  </style>