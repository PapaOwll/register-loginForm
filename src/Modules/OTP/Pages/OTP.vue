<template>
  <div style="margin-top: 10%; ">
    <v-card
        class="mx-auto  v-card rounded-lg"
        max-width="600"
        elevation="15"
        density="compact"
    >
      <v-card class="rounded-t-lg pa-10" color="green" align="center">
        <span style="color: white ; font-size: 2rem;font-weight: 750 ; align-items: center">
        LogIn
        </span>
      </v-card>
      <v-form @submit.prevent="toLoginPage">
        <v-card align="center" class="pa-10">
          <input-text
              label="Enter Number"
              hint="Enter  Your Number"
              :name="'phone'"
              type="tell"
          />
          <div class="fill-height">
            <v-btn block
                   color="green"
                   type="submit"
                   class="mt-5"
            >
              Submit
            </v-btn>
          </div>

        </v-card>
      </v-form>
    </v-card>
  </div>

</template>

<script setup lang="ts">
import InputText from '../../../components/InputText.vue'
import {useForm} from "vee-validate";
import * as yup from 'yup'
import {useRouter} from "vue-router";
import {otpCode} from "../Api/api";
const router = useRouter()

const {handleSubmit, values} = useForm({
  validationSchema: yup.object().shape({
    phone: yup.number().required()
  })
})
const toLoginPage = handleSubmit(async (values: any) => {
  await  otpCode(values.phone).then((res) => {
    console.log(res)
    router.push({path: '/login/' + values.phone})
  })


})
</script>

<style scoped>

</style>