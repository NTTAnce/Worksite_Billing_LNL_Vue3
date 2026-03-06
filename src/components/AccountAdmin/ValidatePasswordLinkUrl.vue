<template>
    <div>
        <v-row v-show="errorMessages.length > 0" class="error-message">
            <ul id="example-1">
                <li v-for="message in errorMessages" v-bind:key="message">
                    {{ message }}
                </li>
            </ul>
        </v-row>
    </div>
</template>
<script>
import dataService from '@/services/dataService';

export default {
    name: "ValidateLinkUrl",
    props: ['linkGuid'],
    data() {
        return {
            waiting: false,
            errorMessages: [],
            validationResult: {},
        }
    },
    created() {
        this.validatePasswordLinkGuid();
    },
    methods: {
        setErrorMessages(errors){
            if (Array.isArray(errors)) {
                this.errorMessages = errors;
            } 
            else {
                this.errorMessages.push(errors);
            }
        },               
        validatePasswordLinkGuid() {
            this.waiting = true;
            this.validationResult.isValid = false;
            this.validationResult.linkDetails = {};
            this.validationResult.errorMessages = [];

            dataService.validatePasswordLinkUrl(this.linkGuid).then(response => {
                this.waiting = false;
                let responseData = response.data;
                if (responseData.statusCode == 200) {
                    let link = responseData.passwordLinkDetails[0];
                    if (link.isLinkActive.toLowerCase() == 'yes')
                    {
                        this.validationResult.isValid = true;
                        this.validationResult.linkDetails = responseData.passwordLinkDetails[0];
                    } else {
                        this.setErrorMessages("The registration link has expired. Please contact your account administrator or Customer Service at 1-888-488-0134 and select option2.");
                        this.validationResult.isValid = false;
                        this.validationResult.errorMessages = this.errorMessages;
                    }

                } else {
                    this.setErrorMessages(responseData.errorMessage);
                    this.validationResult.isValid = false;
                    this.validationResult.errorMessages = this.errorMessages;
                    //redirect to not found
                    this.$router.push("/notfound");
                }
                this.$emit('validateStatusChange', this.validationResult);
            })
            .catch(error => { alert(error); });
        }
    }
}
</script>
<style scoped>
.error-message {
    margin-left: 20px;
    color: red;
}
</style>