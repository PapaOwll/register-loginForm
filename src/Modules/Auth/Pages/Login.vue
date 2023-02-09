<template>
  <div style="margin-top: 5%; ">

    <v-card
        class="mx-auto  v-card rounded-xl"
        max-width="600"
        height="auto"
        elevation="15"
        density="compact"
    >
      <v-card
          class="pa-10 rounded-t-xl"
          color="green"
          style="width: 100%"
          align="center"
      >
        <span style="color: white ; font-size: 2rem;font-weight: 750 ; align-items: center">
        SIGN IN
        </span>
      </v-card>
      <v-form @submit.prevent="signIn">
        <v-card class="pa-15">
          <InputText
              :name="'phone'"
              label="USERNAME"
              class="font-weight-bold"
              type="tell"
              readonly
              clearable/>
          <InputText
              :name="'password'"
              class="font-weight-bold"
              label="PASSWORD"
              type="password"
              hint="Enter your password to access this website"
              clearable/>
          <InputText
              :name="'code'"
              class="font-weight-bold"
              label="CODE"
              type="tell"
              hint="Enter your password to access this website"
              clearable/>
          <span class="text-amber-darken-4 float-right mb-10">Forget Password?</span>
          <div class="fill-height">
            <v-btn
                type="submit"
                block
                height="50"
                style="background-color: rgb(17, 100, 7); color: white ;"
            >
              LOGIN
            </v-btn>
          </div>
          <div class="text-center" style="margin-top: 200px">
            <span class=" text-amber-darken-4">Don't have an account?</span>
            <br>
            <router-link class="text-decoration-none" to="/"><span class="text-green-darken-4 font-weight-bold">SIGN UP Now</span>
            </router-link>
          </div>
        </v-card>
      </v-form>


    </v-card>
  </div>
  <v-snackbar
      :color="snackbarColor"
      :timeout="snackbarTimer"
      v-model="snackbar"
      bottom
      right
  >
    <v-icon left>{{snackbarIcon}}</v-icon>{{snackbarText}}
  </v-snackbar>
</template>

<script setup lang="ts">
import InputText from '../../../components/InputText.vue'
import {logIn} from "../Api/api";
import * as yup from 'yup'
import {useForm} from "vee-validate";
import {onMounted, ref, watch, watchEffect} from "vue";
import {useRouter} from "vue-router";
const snackbar = ref(false)
const snackbarText = ref('' )
const snackbarColor = ref('success')
const snackbarIcon =ref('mdi-check')
const snackbarTimer = ref('3000')
const route = useRouter();
const {handleSubmit, values} = useForm({
  validationSchema: yup.object().shape({
    phone: yup.string(),
    password: yup.string(),
    code: yup.number(),
  })
})
const url =useRouter().currentRoute.value.params.phone

onMounted(() =>{

  values.phone = url
})
const signIn = handleSubmit(async (values) => {
  await logIn(values)
      .then((res)=>{
        console.log(res)
        localStorage.setItem("token" , res.data.data)
        snackbar.value=true;
        snackbarText.value='Your Signed In Successfully'
        snackbarIcon.value ='mdi-check'
        snackbarColor.value = 'green'
        snackbarTimer.value='3000'
        route.push({path : '/dashboard'})
      })
      .catch( () => {
        snackbar.value=true;
        snackbarText.value='Something Went Wrong! Try Again'
        snackbarIcon.value ='mdi-check'
        snackbarColor.value = 'red'
        snackbarTimer.value='3000'
      })
})
</script>
<style scoped>

</style>