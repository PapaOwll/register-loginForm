<template>

  <v-row justify="center">
    <v-dialog
        :model-value="props.show"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
            dark
            color="primary"
        >
          <v-btn
              icon
              dark
              @click="closeDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Update User Information</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
                variant="text"
                @click="submitData"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-divider></v-divider>
        <v-row justify="center" class="mt-5">

          <v-form class="w-50">
            <v-card-title>USER INFO</v-card-title>
            <v-text-field :name="fullName" label="FULLNAME"></v-text-field>
            <v-text-field label="EMAIL"></v-text-field>
            <v-text-field label="NATIONAL CODE"></v-text-field>
          </v-form>
        </v-row>


      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
const formLabelWidth = ref("140px");



const props = defineProps({
  show: Boolean,
  edit: Object,
});

const emit = defineEmits(["updateData", "closeDialog", "closeModal"]);
const { values } = useForm({
  validationSchema: yup.object().shape({
    userId: yup.string().required(),
    title: yup.string().required(),
    body: yup.string().required(),
  }),
});

const submitData = (val: any) => {
  val = values;
  console.log(props.edit);
  console.log(val);
  emit("updateData", val, props.edit);
};
const closeDialog = () => {
  emit("closeDialog");
};
const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped>

</style>