<!--
/**
 * BSD 3-Clause License
 *
 * Copyright © 2023, Daniel Jonathan <daniel at cosmicmind dot com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES LOSS OF USE, DATA, OR PROFITS OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
-->

<script lang="ts" setup>
import {
	toRef,
	computed,
} from 'vue'

import {
	useField,
} from 'vee-validate'

// interface FieldMeta {
//   dirty: boolean;
//   pending: boolean;
//   touched: boolean;
//   valid: boolean;
//   initialValue: any;
// }

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	modelValue: {
		type: String,
		default: '',
	},
})

const nameRef = toRef(props, 'name')

const {
	errorMessage,
	value,
	handleChange,
	// meta
} = useField(nameRef, undefined, {
	validateOnValueUpdate: false,
})

const listeners = computed(() => {
	// if the field is valid or have not been validated yet
	if (!errorMessage.value) {
		return {
			blur: handleChange,
			change: handleChange,
			// disable `shouldValidate` to avoid validating on input
			input: (event: Event): void => handleChange(event, false),
		}
	}

	return {
		blur: handleChange,
		change: handleChange,
		input: handleChange, // only switched this
	}
})

</script>

<template>
  <input
    class="m-field-input"
    type="text"
    :name="nameRef"
    v-model="value"
    v-on="listeners"
    autocomplete="off"
  >
</template>