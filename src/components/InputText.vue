<template>
  <v-text-field
      :id="name"
      :label="label"
      :name="name"
      :type="type"
      :input-style="{ direction: isRtl ? 'rtl' : 'ltr' }"
      :model-value="inputValue"
      :placeholder="placeholder"
      :disabled="readonly"
      :rows="height"
      @input="handleChange"
      @blur="handleBlur"
      :maxlength="maxlength"
  />
</template>

<script lang="ts" setup>
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  value: String,
  maxlength: Number,
  name: String,
  height: Number,
  placeholder: String,
  type: String,
  label: String,
  readonly: Boolean,
  showInfo: Boolean,
  infoTitle: String,
  infoBody: String,
  isRtl: {
    default: true,
    type: Boolean,
  },
});

const name: any = toRef(props, "name");

const {
  value: inputValue,
  handleBlur,
  handleChange,
  meta: { touched },
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<style scoped></style>
