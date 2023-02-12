<template>
  <v-card>
    <v-layout>

      <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
      >
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
        >
          <template v-slot:append>
            <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
            ></v-btn>
          </template>

        </v-list-item>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn v-if="!rail" block style="background-color: green ; color: white">
              Logout
            </v-btn>
          </div>
        </template>
        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: auto">
        <div class="pa-5 d-flex">
          <v-row>
            <v-col>
              <h1 class="pa-5">dashboard</h1>
            </v-col>
            <v-col>
            </v-col>
          </v-row>
        </div>

        <v-toolbar class="pa-5" title="Users">
          <v-col class="h-100 align-self-end" :md="1">
            <v-btn class="h-100" color="success" variant="elevated" @click="">Add User</v-btn>
          </v-col>
          <v-col class="h-100 align-self-end" :md="1">

          </v-col>
          <v-col class="h-100 align-self-center" :md="2">
            <v-text-field
                v-model="filterName">
              <v-btn class="position-absolute" color="success" variant="flat" @click="data(filterName)">
                <v-icon>mdi-search-web</v-icon>
              </v-btn>
            </v-text-field>
          </v-col>
        </v-toolbar>
        <v-table fixed-header class="pa-5  h-100 text-center">
          <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-center">
              E-MAIL
            </th>
            <th class="text-center">
              National Code
            </th>
            <th class="text-center">
              Edit/Delete
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in dataTable" :key="item.id">
            <td class="text-left">{{ item.fullName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.nationalCode }}</td>
            <td >
              <v-btn
                  class="h-100"
                  color="primary"
                  variant="elevated"
                  @click="editUser">Edit</v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
      </v-main>
    </v-layout>
  </v-card>
<dialog-box
    :show="dialogVisible"
    :edit = 'formValues'
    @closeDialog="dialogVisible=false"
    @closeModal="dialogVisible=false"
    @updateData="updateUser"
/>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import axios from "axios";
import {useForm} from "vee-validate";
import * as yup from 'yup'
import DialogBox from "../../Home/Component/DialogBox.vue";
const rail = ref(true)
const drawer = ref(true)
const token = localStorage.getItem('token')
const dataTable = ref(null)
const filterName = ref(null)
const dialogVisible = ref(false)
let formValues: any = ref(null);
const data = (fullName?: any) => {
  let params = '';
  if (fullName) {
    params = fullName;
  }
  console.log(params)
  axios.get('http://192.168.1.151:2000/api/v1/user', {
        responseType: "json",
        headers: {Authorization: 'Bearer ' + token},
        params: {fullName: fullName}
      },
  ).then((res) => {
    console.log(res)
    dataTable.value = res.data
  })
}
const {handleSubmit , values} = useForm({
  validationSchema : yup.object().shape({
    nationalCode : yup.number().required(),
    fullName : yup.string().required(),
    email: yup.string().required(),
  })
})
const editUser = (user : any) => {
  dialogVisible.value=true;
  formValues.value= user ;
  console.log(formValues.value)
}
onMounted(data)
</script>

<style>

</style>