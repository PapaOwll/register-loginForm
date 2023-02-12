<template>
  <div style="margin-top: 5%; ">
    <v-card
        class="mx-auto pa-15 v-card rounded-sm"
        max-width="600"
        elevation="15"
        density="compact"
    >
      <v-form @submit.prevent="userRegister">
        <div class="text-overline mb-4">
          Register Form
        </div>
        <div class="text-h6 mb-10 ">
            <span style="color: black">
            USER INFORMATION
            </span>
        </div>

        <InputText
            :name="'fullName'"
            label="Full Name"
            type="string"
            clearable/>

        <InputText
            :name="'password'"
            :label="'Password'"
            type="password"
            clearable/>

        <input-text
            :name="'phone'"
            label="Phone Number"
            type="tell"
            clearable/>

        <InputText
            :name="'nationalCode'"
            label="National Code"
            type="number"
            clearable/>

        <InputText
            :name="'email'"
            label="Email"
            type="email"
            clearable/>
        <InputText
            style="display: none"
            :name="'role'"
            label="Role"
            type="number"
            value="1"
            disabled="true"/>
        <div class="fill-height">
        <v-btn block
            type="submit"
               height="50"
            style="background-color: rgb(17, 100, 7); color: white"
        >
          Submit
        </v-btn>
        </div>

      </v-form>
    </v-card>
  </div>

</template>

<script setup lang="ts">

import {useForm} from 'vee-validate'
import * as yup from 'yup'
import InputText from "../../../components/InputText.vue";
import {register} from "../Api/api"
import router from '../../../router'
import {ref} from "vue";
const snackbar = ref(false)
const snackbarText = ref('' )
const snackbarColor = ref('success')
const snackbarIcon =ref('mdi-check')
const snackbarTimer = ref('3000')

const {handleSubmit, values} = useForm({
  validationSchema: yup.object().shape({
    fullName: yup.string(),
    password: yup.string(),
    nationalCode: yup.number(),
    phone: yup.number(),
    email: yup.mixed(),
    role : yup.string()
  })
})


const userRegister = handleSubmit(async (values: any) => {
  console.log(values)
  await register(values)
      .then(  (res) => {
        snackbar.value = true;
        snackbarText.value='Your Register Completed'
        snackbarIcon.value ='mdi-check'
        snackbarColor.value = 'green'
        snackbarTimer.value='3000'

        console.log(res)
      }).then(() =>{
        router.push('otp')
      })
      .catch((err) => {
    snackbar.value=true;
    snackbarText.value='Something Went Wrong! Try Again'
    snackbarIcon.value ='mdi-check'
    snackbarColor.value = 'red'
    snackbarTimer.value='3000'
    console.log(err)

  })
}, (error) => {
  console.log(error);
})

</script>

<style scoped>
.v-card:hover{
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
</style>