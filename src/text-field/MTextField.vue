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
	PropType,
	ref,
	toRef,
	computed,
	onMounted,
	onBeforeUnmount,
	nextTick,
} from 'vue'

import {
	MField,
} from '@/forms'

import {
	MTextFieldState,
} from '@/text-field/MTextFieldState'

const props = defineProps({
	state: {
		type: String as PropType<MTextFieldState>,
		default: MTextFieldState.enabled,
	},
	hasError: {
		type: Boolean,
		default: false,
	},
	withoutLabelText: {
		type: Boolean,
		default: false,
	},
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars 
type TextFieldEvents = {
  (e: 'autofill', event: void): void
  (e: 'click', event: PointerEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'update:state', newState: MTextFieldState, oldState: MTextFieldState): void
}

const emits = defineEmits<TextFieldEvents>()

const fieldRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const stateRef = ref(props.state)
const enabledRef = ref(MTextFieldState.enabled === stateRef.value)
const hoveredRef = ref(MTextFieldState.hovered === stateRef.value)
const focusedRef = ref(MTextFieldState.focused === stateRef.value)
const disabledRef = ref(MTextFieldState.disabled === stateRef.value)
const withoutLabelTextRef = toRef(props, 'withoutLabelText')
const hasErrorRef = toRef(props, 'hasError')
const isMouseDown = ref(false)

const isEmpty = (): boolean => {
	const target = inputRef.value
	return target instanceof HTMLInputElement && 0 === target.value.length
}

const classRef = computed(() => ({
	'm-text-field': true,
	'has-error': hasErrorRef.value,
	'without-label-text': withoutLabelTextRef.value,
	'is-empty': isEmpty(),
	enabled: enabledRef.value,
	hovered: hoveredRef.value,
	focused: focusedRef.value,
	disabled: disabledRef.value,
}))

const updateState = (newState: MTextFieldState): void => {
	const oldState = stateRef.value
	if (newState !== oldState) {
		stateRef.value = newState

		const el = fieldRef.value

		if (el instanceof HTMLElement) {
			switch (newState) {
			case MTextFieldState.disabled:
				enabledRef.value = false
				hoveredRef.value = false
				focusedRef.value = false
				disabledRef.value = true
				break
			case MTextFieldState.enabled:
				enabledRef.value = true
				hoveredRef.value = false
				focusedRef.value = false
				disabledRef.value = false
				break
			case MTextFieldState.focused:
				enabledRef.value = true
				hoveredRef.value = false
				focusedRef.value = true
				disabledRef.value = false
				break
			case MTextFieldState.hovered:
				enabledRef.value = true
				hoveredRef.value = true
				focusedRef.value = false
				disabledRef.value = false
				break
			}
		}

		emits('update:state', newState, oldState)
	}
}

const handleMouseDown = (): void => {
	isMouseDown.value = true
}

const handleClick = (event: PointerEvent): void => {
	if (true !== disabledRef.value) {
		isMouseDown.value = false

		const el = fieldRef.value
		if (el instanceof HTMLElement) {
			const target = inputRef.value
			if (target instanceof HTMLInputElement) {
				nextTick(() => {
					target.focus()
				})
			}

			updateState(MTextFieldState.focused)
		}

		emits('click', event)
	}
}

const handleBlur = (event: FocusEvent): void => {
	if (!isMouseDown.value) {
		updateState(MTextFieldState.enabled)
		emits('blur', event)
	}
}

const handleFocus = (event: FocusEvent): void => {
	updateState(MTextFieldState.focused)
	emits('focus', event)
}

const handleAnimationStart = (event: AnimationEvent): void => {
	if ('onAutoFillStart' === event.animationName) {
		fieldRef?.value?.classList.remove('is-empty')
		emits('autofill')
	}
}

onMounted(() => {
	const el = fieldRef.value
	if (el instanceof HTMLElement) {
		const target = el.querySelector('.m-field-input') as HTMLInputElement
		if (target instanceof HTMLInputElement) {
			inputRef.value = target
			target.addEventListener('blur', handleBlur)
			target.addEventListener('focus', handleFocus)
			target.addEventListener('animationstart', handleAnimationStart, true)
		}
	}
})

onBeforeUnmount(() => {
	const el = fieldRef.value
	if (el instanceof HTMLElement) {
		const target = inputRef.value
		if (target instanceof HTMLInputElement) {
			target.removeEventListener('blur', handleBlur)
			target.removeEventListener('focus', handleFocus)
			target.removeEventListener('animationstart', handleAnimationStart, true)
		}
	}
})

const listeners = computed(() => ({
	mousedown: handleMouseDown,
	click: handleClick,
}))

</script>

<template>
  <m-field
    ref="fieldRef"
    :class="classRef"
    v-on="listeners"
  >
    <slot />
  </m-field>
</template>