<template>
  <v-row justify="center">
    <v-dialog
        v-model="props.show"
        width="840"
        class="pa-5"
    >
      <v-card elevation="10" class="rounded-lg pa-5 bg-1 ">
        <v-card-item class="pa-10 text-center ">
          <span class="text-h5 text-white font-weight-bold text-uppercase">user information</span>
        </v-card-item>
        <v-container class="text-uppercase">
          <v-form @submit.prevent="submitData" >
            <v-row justify="center">
              <v-col cols="8">
                <input-text
                    :name="'fullName'"
                    :type="'string'"
                    :label="'full name'"
                    class="input-text"
                    clearable
                />
                <input-text
                    :name="'password'"
                    :label="'password'"
                    :type="'password'"
                    class="input-text"
                    clearable
                />
                <input-text
                    :label="'email'"
                    :name="'email'"
                    :type="'email'"
                    class="input-text"
                    clearable
                />
                <input-text
                    :name="'phone'"
                    :label="'phone number'"
                    :type="'tell'"
                    class="input-text"
                    clearable
                />
                <input-text
                    :label="'national code'"
                    :name="'nationalCode'"
                    :type="'tell'"
                    class="input-text"
                    clearable
                />
                <InputText
                    style="display: none"
                    :name="'role'"
                    label="Role"
                    type="number"
                    value="1"
                    disabled="true"/>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="red-darken-1"
                      variant="flat"
                      type="button"
                      @click="closeDialog"
                  >Close
                  </v-btn>
                  <v-btn type="submit" color="success" variant="flat" t="flat">submit</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-form>
        </v-container>

      </v-card>

    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import {useForm} from "vee-validate";
import InputText from '../../../components/InputText.vue'
import * as yup from 'yup'
import axios from "axios";
import {watch, watchEffect} from "vue";

const token = localStorage.getItem('token')

let props = defineProps({
  show: Boolean,
  edit: {default: null, type: Object, required: false}
})

const emit = defineEmits(["updateData", "closeDialog", "closeEdit",])

const {handleSubmit, values, setFieldValue} = useForm({
  validationSchema: yup.object().shape({
    fullName: yup.string(),
    email: yup.string(),
    nationalCode: yup.number(),
    phone: yup.number(),
    password: yup.string(),
    role: yup.number()
  }),
});

const submitData = () => {
  console.log('in submit', values)
  if (props.edit && props.edit.id) {
    axios
        .put(`http://192.168.1.151:2000/api/v1/user/${props.edit.id}`, values, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(() => {
          emit("closeEdit", true)

        })
  } else {
    axios.post(
        'http://192.168.1.151:2000/api/v1/user',
        values,
        {
          responseType: "json",
          headers: {Authorization: 'Bearer ' + token},
        }
    ).then(() => {
      emit("closeEdit", true);
    })
  }
}

const closeDialog = () => {
  emit("closeEdit", true);
};


watch(props, (value) => {
  if (value.edit && value.edit.id) {
    setTimeout(() => {
      setFieldValue('phone', props.edit.phone);
      setFieldValue('email', props.edit.email);
      setFieldValue('fullName', props.edit.fullName);
      setFieldValue('password', props.edit.password);
      setFieldValue('nationalCode', props.edit.nationalCode);
    }, 300);
  }
});


</script>

<style scoped>
.bg-1 {
  background-image: url("https://www.teahub.io/photos/full/2-21147_space-wallpapers-collection-data-src-space-wallpaper-hd.jpg");
}

.input-text {
  color: white;

  font-weight: bold;
}

.input-text:focus {
  color: white;
  font-weight: bold;
}
</style>