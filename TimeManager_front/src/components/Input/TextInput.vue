<template>
    <div>
      <label class="text-base font-medium">{{ label }}</label>
      <div class="mt-2.5 relative">
        <div v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <slot name="icon"></slot>
        </div>
        <input
          :type="type"
          :placeholder="placeholder"
          class="block w-full py-4 pl-10 pr-4 text-txtBlack bg-light_bg border-2 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
          :required="isRequired"
          v-model="inputValue"
          @input="emitChange"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  
  const props = defineProps({
    label: { type: String, required: true },
    type: { type: String, required: true },
    placeholder: { type: String, required: true },
    icon: { type: Boolean, default: false },
    isRequired: { type: Boolean, default: false },
    value: { type: String, default: '' }
  });
  
  const emits = defineEmits(['update:value']);
  
  const inputValue = ref(props.value);
  
  const emitChange = (e) => {
    emits('update:value', e.target.value);
  };
  </script>