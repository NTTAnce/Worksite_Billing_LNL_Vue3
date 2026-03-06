<template>
  <v-row justify="start">
    <v-dialog
      v-model="dialog"
      scrollable
      :persistent="isAccepted"
      max-width="800px"
    >
      <template v-slot:activator="{ on, attrs }">
        <a class="term-link-text" v-bind="attrs" v-on="on">
            {{ termLinkText }}
        </a>
      </template>
      <v-card>
        <v-card-title>Terms & Conditions</v-card-title>
        <v-divider></v-divider>
        <v-textarea class="disclaimer-text" no-resize rows="12" solo v-model="disclaimerText" readonly @scroll="onScroll"></v-textarea>   
        <span class="disclaimer-end-text">Please read to the end</span>                 
        <v-card-actions>
            <v-checkbox :readonly="!isScrollEnd || isProfileUpdated || isContinueClicked" v-model="isAccepted" :label="`Yes, I Agree`" :rules="[rules.required]"></v-checkbox>        
            <v-spacer></v-spacer>
            <v-btn color="#319B42" v-if="isAccepted && !isContinueClicked" dark class="menuBtn" @click="handleContinue">Continue</v-btn>
            <v-btn color="#319B42" v-if="isContinueClicked" dark class="menuBtn" @click="handleClose">Close</v-btn>
            <v-btn class="menuBtn" v-if="!isAccepted">Continue</v-btn>            
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import eventBus from "@/event-bus.js";

  export default {
    name: "UserDisclaimerDialog",
    props: ["isProfileUpdated"],
    data() {
      return {
        dialog: false,
        isAccepted: false,
        isScrollEnd: false,
        isContinueClicked: false,
        rules: {
            required: v => !!v || 'This field is required',
        },            
        disclaimerText : `
TERMS AND CONDITIONS

IMPORTANT: Please read the terms and conditions set forth below carefully before using this site or any of the programs, content or material available therein. The following Terms and Conditions govern your use of this site.  By using this site or any of the programs, content or material available through the site, you signify your assent to and acceptance of these terms and conditions and you represent on a continuing basis that you are authorized to access the account information available through Worksite Online Billing.  If you do not agree with any part of the terms and conditions set forth below, you must not use this site or any portion thereof.  We may request confirmation of your valid authorization at any time.  We may also terminate or restrict your access to the site, or its available service(s), including but not limited to access to the account you represent, at any time.

Who We Are
This site, WS.GlobeLifeLN.com (Site), is owned and operated by Liberty National Life Insurance Company, (Liberty National),  which is a wholly owned subsidiary of Globe Life Inc.  

Services Offered Through WS.GlobeLifeLN.com
The Worksite Online Billing services available on this Site are designed to allow employers the ability to locate and view invoices and remit payments electronically to our Company associated with insurance and insurance-related products purchased by employees in the worksite setting.

Customer Complaints
Users who have complaints regarding the Site may address such concerns in writing to the contact listed below. 

Users may also call 1-888-488-0134 between the hours of 8:00 AM and 5:00 PM Central Standard Time. 

Ownership 
The Site, each of its components, and the content, programs and materials provided thereby, are the copyrighted property of Globe Life Inc., the appropriate Globe Life Inc. affiliate or its affiliated entities. None of the content, programs, materials or data found on the Site may be modified, reproduced, republished, distributed, sold, or transferred without the express written consent of Globe Life Inc., the appropriate Globe Life Inc. affiliate or the applicable third-party provider. The trademarks and service marks ("Marks") displayed on this Site are the property of Globe Life Inc. unless specifically indicated otherwise. Users are prohibited from using any Mark without the prior written consent of Globe Life Inc. or the Globe Life Inc. affiliate owning the Mark. Nothing contained on this Site is intended or should be construed to grant by implication, estoppel, or otherwise, any license to use any of the Marks without the express written consent of Globe Life Inc. or the Globe Life Inc. affiliate owning the mark.

Use 
This Site, and the content provided on this Site, may not be copied, reproduced, republished, uploaded, posted, transmitted or distributed without the prior written consent of Globe Life Inc.  Unauthorized use of this Site or the materials contained on this Site may violate applicable intellectual property or other laws. You are prohibited from posting on or transmitting to or through the Site any unlawful, threatening, libelous, defamatory, obscene, indecent, inflammatory, pornographic or profane material or any material that could constitute or encourage conduct that would be considered a criminal offense, give rise to civil liability or otherwise violate any law.  You agree to maintain the confidentiality of any information available through Worksite Online Billing.  You further agree to use Worksite Online Billing and the information provided therein only for the conduct of business between Liberty National and the Liberty National account whose information you are authorized to access.

Age and Responsibility
You represent that you are of legal age and competency to use this Site and to create binding legal obligations for any liability you incur as a result of using this Site. You understand and acknowledge that you are financially and otherwise responsible for any use of this Site by you and anyone using your login information.

Exclusion of Warranty 
GLOBE LIFE INC., ITS AFFILIATED ENTITIES AND APPLICABLE THIRD-PARTY PROVIDERS MAKE NO WARRANTIES OF ANY KIND REGARDING THIS SITE OR THE CONTENT, PROGRAMS OR MATERIAL PROVIDED ON THIS SITE, ALL OF WHICH ARE PROVIDED ON AN "AS IS" BASIS. GLOBE LIFE INC., ITS AFFILIATED ENTITIES AND APPLICABLE THIRD-PARTY PROVIDERS DO NOT WARRANT THE ACCURACY, COMPLETENESS, CURRENCY, RELIABILITY OR AVAILABILITY OF ANY OF THE CONTENT, PROGRAMS, MATERIAL OR DATA FOUND ON THIS SITE AND SUCH PARTIES EXPRESSLY DISCLAIM ALL WARRANTIES AND CONDITIONS, INCLUDING IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT, AND ANY SUCH WARRANTIES OR CONDITIONS ARISING BY STATUTE OR OTHERWISE IN LAW OR FROM A COURSE OF DEALING OR USAGE OF TRADE. SOME STATES DO NOT ALLOW THE DISCLAIMER OF IMPLIED WARRANTIES, SO THE FOREGOING EXCLUSION AND DISCLAIMER MAY NOT APPLY TO YOU.

Limitation of Liability 
GLOBE LIFE INC., ITS AFFILIATED ENTITIES, AND THIRD-PARTY PROVIDERS, WILL NOT BE RESPONSIBLE, AND WILL NOT BE LIABLE, FOR ANY DAMAGES TO YOUR COMPUTER EQUIPMENT OR OTHER PROPERTY ARISING FROM YOUR USE OF, BROWSING IN OR DOWNLOADING OF ANY CONTENT, PROGRAMS, MATERIALS, DATA, TEXT, IMAGES, AUDIO OR VIDEO FROM THE SITE. IN NO EVENT WILL GLOBE LIFE INC., AFFILIATED ENTITIES OR APPLICABLE THIRD-PARTY PROVIDERS BE LIABLE FOR ANY INJURY, LOSS, DAMAGE OR CLAIM, OR ANY SPECIAL, EXEMPLARY, PUNITIVE, INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES OF ANY KIND (INCLUDING, BUT NOT LIMITED TO, LOST PROFITS OR SAVINGS), WHETHER BASED IN CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE, ARISING FROM OR IN ANY WAY CONNECTED WITH (A) ANY USE OF THIS SITE, OR CONTENT, PROGRAMS OR MATERIALS PROVIDED THROUGH THIS SITE, (B) ANY FAILURE, DELAY, OR UNAVAILABILITY (INCLUDING, BUT NOT LIMITED TO THE USE OF OR INABILITY TO USE OR ACCESS ANY CONTENT, PROGRAMS, MATERIAL OR DATA PROVIDED ON THE SITE), (C) THE PERFORMANCE OR NON-PERFORMANCE OF GLOBE LIFE INC., ITS AFFILIATED ENTITIES OR APPLICABLE THIRD-PARTY PROVIDERS, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES TO SUCH PARTIES OR ANY OTHER PARTY, (D) YOUR DISCLOSURE OF YOUR PASSWORD TO, OR USE OF YOUR PASSWORD BY, ANY THIRD PARTY, OR (E) ANY ACCESS TO, OR USE OF, YOUR INFORMATION BY AN UNAUTHORIZED PERSON OR UNAUTHORIZED PERSONS. SOME STATES DO NOT ALLOW LIMITATION OF LIABILITY, SO THE FOREGOING LIMITATION MAY NOT APPLY TO YOU.

Indemnification
You will indemnify and hold harmless Globe Life Inc.,  its affiliated entities, any third-party providers, and their respective officers, directors, employees and agents from and against any claim, damages, cause of action or demand, including, but not limited to, reasonable legal, accounting and other professional fees, brought by or on your behalf or by third parties as a result of your use of the Site, or any content, programs or materials provided through the Site.

Modification
Globe Life Inc.  may at any time modify these terms and conditions in whole or in part and your continued use of the Site, or any content, programs or materials provided through the Site, will be subject in all respects to the terms and conditions in force at the time of such use.

Assignment 
You may not assign, convey, subcontract or delegate your rights, duties or obligations hereunder. Globe Life Inc. may, at any time, assign, convey, transfer, delegate or subcontract any or all of its rights or obligations without prior notice.

Severability
These terms and conditions will be deemed severable so that if any provision is determined to be unenforceable or invalid, such provision will nonetheless be enforced to the fullest extent permitted by applicable law, and such determination will not affect the validity or enforceability of any other remaining provision.

Headings
The headings used in these terms and conditions are included for convenience only and will not limit or affect in any way these terms and conditions.

Entire Agreement
These terms and conditions, together with those incorporated or referred to herein, constitute the entire agreement between us relating to the subject matter hereof, and supersede any prior understandings or agreements (whether oral or written) regarding the subject matter, any may not be amended or modified except in writing or by making such amendments or modifications available on this Site.

You are encouraged to visit these Terms and Conditions from time to time to review any updates and changes.

Choice of Law
These Terms and Conditions will be governed by and construed in accordance with the laws of the State of Texas, without giving effect to its conflict of laws provisions or your actual state or country of residence.

Contact Information
You may reach us at:
Liberty National Life Insurance Company
PO Box 8080 
McKinney, Texas 75070
            `,

      }
    },
    watch: {
      isAccepted: function (val) {
        eventBus.$emit("is-accepted-changed", val);
        return;
      },
    },    
    computed: {
        termLinkText() {
            let linkText = '*Accept Terms & Conditions';
            if (this.isAccepted) {
              linkText = 'View Terms & Conditions';
            }
            return linkText;
        },
    },
    methods: {
      handleContinue() {
        eventBus.$emit("is-accepted-changed", this.isAccepted);        
        this.dialog = false;
        this.isContinueClicked = true;
      },
      handleClose() {
        this.dialog = false;
      },
      onScroll({ target: { scrollTop, clientHeight, scrollHeight }}) {
        if (Math.ceil(scrollTop) + clientHeight >= scrollHeight) {
          this.isScrollEnd = true;
        }
      }
    },
  }
</script>
<style scoped>
a.term-link-text {
    text-decoration: underline;
    margin-left: 10px;
}
.disclaimer-text {
    font-size: 14px;
    margin-left: 3px;
    margin-right: 3px;    
}
.disclaimer-end-text {
    margin-top: -25px;
    margin-left: 300px;
    font-size: 12px;
    color: darkgrey;
    font-weight: bold;
}
</style>