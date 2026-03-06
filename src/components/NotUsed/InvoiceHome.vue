<template>
  <v-container grid-list-md text-xs-center>
    <v-layout align-center justify-center row wrap>
      <v-flex xs11>
        <template>
          <v-layout style="border-radius:10px">
            <v-expansion-panel>
              <v-expansion-panel-content style="background:#9E9E9E ;color:white;">
                <template v-slot:header>
                  <div>
                    <h5>Reconcile &amp; Pay Invoices</h5>
                  </div>
                </template>
                <v-card>
                  <v-card-text class="grey lighten-3">
                    <p>
                      View and adjust current bills, review bill changes, and pay bills.
                    </p>
                    <div align="right">
                      <v-btn
                        class="white--text"
                        color="#00558C"
                        @click="ShowReconcile()"
                      >Reconcile &amp; Pay</v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>

              <v-expansion-panel-content style="background:#9E9E9E ;color:white;">
                <template v-slot:header>
                  <div>
                    <h5>Invoice History</h5>
                  </div>
                </template>
                <v-card>
                  <v-card-text class="grey lighten-3">
                    <p>
                      View past bills, bill statuses, remittance notices,
                      adjustments, due dates and paid dates.
                    </p>
                    <div align="right">
                      <v-btn
                        class="white--text"
                        color="#00558C"
                        @click="ShowBillHistory()"
                      >View History</v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>

              <v-expansion-panel-content style="background:#9E9E9E ;color:white;">
                <template v-slot:header>
                  <div>
                    <h5>Company Account Information</h5>
                  </div>
                </template>
                <v-card>
                  <v-card-text class="grey lighten-3">
                    <p>
                      Update the worksite group's address, contact information,
                      and stored payment information.
                    </p>
                    <div align="right">
                      <v-btn class="white--text" color="#00558C">Update Account</v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>

              <v-expansion-panel-content style="background:#9E9E9E ;color:white;">
                <template v-slot:header>
                  <div>
                    <h5>Company Users</h5>
                  </div>
                </template>
                <v-card>
                  <v-card-text class="grey lighten-3">
                    <div style="padding: 10px;">
                      <p>
                        Add, update, or deactivate users, and assign security
                        roles to users.
                      </p>
                      <div align="right">
                        <v-btn class="white--text" color="#00558C">Edit &amp; Update Users</v-btn>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <!-- <v-expansion-panel-content style="background:yellow;color:black"> -->
              <v-expansion-panel-content style="background:#9E9E9E ;color:white;">
                <!-- v-on:click="style = 'background:Red'" -->
                <template v-slot:header>
                  <div>
                    <h5>Administration</h5>
                  </div>
                  <!-- <div>Administration</div> -->
                </template>
                <v-card>
                  <v-card-text class="grey lighten-3">
                    <div style="padding: 10px;">
                      <p>
                        Administer configuration for the worksite online payment
                        reconciliation system.
                      </p>
                      <div align="right">
                        <v-btn class="white--text" color="#00558C">Modify Settings</v-btn>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-layout>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import store from "../store";
export default {
  name: "invoicehome",
  props: { mainColor: String, FranchiseId: String },
  created() {},
  methods: {
    ShowReconcile() {
      //this.$router.push("Reconcile");
      this.$router.push({
        name: "Reconcile",
        params: { FranchiseId: this.FranchiseId }
      });
    },
    ShowBillHistory() {
      this.$router.push("InvoiceHistory");
    }
  }
};
</script>

<style scoped>
.rounded-card {
  background-color: #d99b1a;
  border-radius: 50px;
}
/* #IVH {
  background-image: url('../assets/hands_joined_team.jpeg');
  background-color: #8f2c2c;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
} */
/* wfbox {
  width: 650px;
  float: left;
  position: relative;
  margin: 0px 5px 0px 10px;
}
wfbox h1 {
  background-color: #d99b1a;
  color: #fff;
  font-family: verdana;
  font-size: 120%;
  margin: 0px;
  padding: 4px 15px;
}
.wfoption {
  width: 600px;
  margin: 20px auto;
  position: relative;
}
.wfoption h2 {
  background-color: #d99b1a;
  color: #fff;
  font-family: verdana;
  font-size: 120%;
  margin: 0px;
  padding: 4px 15px;
}
.inVDetail {
  position: absolute;

  width: 210px;
  padding: 3px;
  font-size: 16px;
} */
</style>
