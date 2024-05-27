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

import {
	h,
	VNode,
	FunctionalComponent,
} from 'vue'

import {
	MTextField,
	MTextFieldState,
} from '@/text-field'

export type MOutlinedTextFieldProps = {
	state?: MTextFieldState
	hasError?: boolean
	withoutLabelText?: boolean
}

export const MOutlinedTextField: FunctionalComponent<MOutlinedTextFieldProps> = ({
	state,
	hasError,
	withoutLabelText,
}, {
	slots,
	emit,
}): VNode => h(MTextField, {
	state: state ?? MTextFieldState.enabled,
	hasError,
	withoutLabelText,
	class: {
		'm-outlined': true,
	},
	onAutofill: () => emit('autofill'),
	onClick: (event: PointerEvent) => emit('click', event),
	onBlur: (event: FocusEvent) => emit('blur', event),
	onFocus: (event: FocusEvent) => emit('focus', event),
	'onUpdate:state': (newState: MTextFieldState, oldState: MTextFieldState) => emit('update:state', newState, oldState),
}, {
	default: () => slots.default?.(),
})

MOutlinedTextField.displayName = 'MOutlinedTextField'

MOutlinedTextField.emits = [
	'autofill',
	'click',
	'blur',
	'focus',
	'update:state'
]

MOutlinedTextField.props = [
	'state',
	'has-error',
	'without-label-text'
]

export default MOutlinedTextField