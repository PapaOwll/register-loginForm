<template>
  <v-card>
    <v-layout class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation
          v-model="colorValue"
          :bg-color="colorChange"
          mode="shift"
      >
        <v-btn>
          <v-icon>mdi-television-play</v-icon>

          <span>Video</span>
        </v-btn>

        <v-btn>
          <v-icon>mdi-music-note</v-icon>

          <span>Music</span>
        </v-btn>

        <v-btn>
          <v-icon>mdi-book</v-icon>

          <span>Book</span>
        </v-btn>

        <v-btn>
          <v-icon>mdi-image</v-icon>

          <span>Image</span>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>



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
        <v-parallax
            height="300"
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">

          <div class="d-flex">
            <v-row class="pa-15">
              <v-col class="d-flex">
                <img src="https://sguru.org/wp-content/uploads/2018/02/facebook-text-transparent-logo-23.png" width="300" height="150" alt="logo"></v-col>
              <v-col class="h-100 my-auto" :md="4">
                <v-text-field
                    single-line
                    v-model="filterName">
                  <v-btn class="mr-3 m" color="success" variant="flat" @click="data(filterName)">
                    <v-icon>mdi-search-web</v-icon>
                  </v-btn>
                </v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-parallax>


        <v-toolbar class="pa-5" title="Users">
          <v-col class="h-100 align-self-end" :md="2">
            <v-btn
                color="success"
                variant="elevated"
                @click="userAdd">
              <span>Add User</span>
            </v-btn>
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
          <tr v-for="(item, index) in dataTable" :key="item.id">
            <td class="text-left">{{ item.fullName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.nationalCode }}</td>
            <td>
              <v-btn
                  class="h-100 mr-3"
                  color="primary"
                  variant="elevated"
                  @click="userEdit(dataTable[index])"
              >
                edit
              </v-btn>
              <v-btn
                  class="h-100"
                  color="error"
                  variant="elevated"
                  @click="deleteUser(dataTable[index])"
              >
                Delete
              </v-btn>
            </td>

          </tr>
          </tbody>
        </v-table>
      </v-main>
    </v-layout>


  </v-card>

  <add-user
      :show="addDialog"
      :edit="formValues"
      @closeEdit="updateTable"
  />
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import axios from "axios";
import AddUser from '../../Home/Component/AddEditDialogBox.vue'

const rail = ref(true)
const drawer = ref(true)
const token = localStorage.getItem('token')
const dataTable = ref(null)
const filterName = ref(null)
const addDialog = ref(false)
const colorValue: any = ref(null)
const formValues: any = ref(null);


const updateTable = () => {
  addDialog.value = false;
  formValues.value = null;
  data()
}

const data = (fullName?: any) => {
  let params = '';
  if (fullName) {
    params = fullName;
  }
  axios.get('http://192.168.1.151:2000/api/v1/user', {
        responseType: "json",
        headers: {Authorization: 'Bearer ' + token},
        params: {fullName: params}
      },
  ).then((res) => {
    dataTable.value = res.data
  })
}

const userAdd = () => {
  formValues.value = null;
  addDialog.value = true;
}

const userEdit = (row: any) => {
  addDialog.value = true;
  formValues.value = row;
}

const deleteUser = (row: any) => {
  axios.delete(`http://192.168.1.151:2000/api/v1/user/${row.id}`, {
    responseType: "json",
    headers: {Authorization: 'Bearer ' + token},
  })
      .then((res) => {
        console.log(res)
      })
      .then(() => {
        updateTable()
      })
}
const colorChange = computed(() => {
  switch (colorValue.value) {
    case 0 :
      return 'red'
    case 1 :
      return 'teal'
    case 2 :
      return 'indigo'
    case 3 :
      return 'orange'
    default :
      return 'blue-grey'
  }
})
onMounted(data)
</script>

<style>

</style>