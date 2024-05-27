<!--
/* Copyright © 2023, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */
-->

<script lang="ts" setup>
import {
	watch,
	unref,
	shallowRef,
	onBeforeUnmount,
} from 'vue'

import {
	Nullable,
	guard,
} from '@cosmicmind/foundationjs'

const dropdownRef = shallowRef<Nullable<Node>>(null)

const isOpenedRef = shallowRef(false)
const open = (): void => {
	isOpenedRef.value = true
}

const close = (): void => {
	isOpenedRef.value = false
}

const toggle = (): void => {
	isOpenedRef.value = !isOpenedRef.value
}

const onDocumentClick = (event: MouseEvent): void => {
	const {
		target,
	} = event

	const dropdown = unref(dropdownRef)

	if (guard<Node>(target) && guard<Node>(dropdown) && !dropdown.contains(target)) {
		close()
	}
}

const addDocumentEventHandlers = (): void => {
	document.addEventListener('click', onDocumentClick)
}

const removeDocumentEventHandlers = (): void => {
	document.removeEventListener('click', onDocumentClick)
}

const unwatchOpenedRef = watch(isOpenedRef, isOpened => {
	if (isOpened) {
		addDocumentEventHandlers()
	}
	else {
		removeDocumentEventHandlers()
	}
})

defineExpose({
	open,
	close,
	toggle,
})

onBeforeUnmount(() => {
	unwatchOpenedRef()
	removeDocumentEventHandlers()
})

</script>

<template>
  <div
    ref="dropdownRef"
    :class="{
      'm-dropdown': true,
      'is-opened': isOpenedRef,
      'is-closed': !isOpenedRef
    }"
  >
    <slot />
  </div>
</template>