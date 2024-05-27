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
	PropType,
	defineComponent,
} from 'vue'

export enum MListItemState {
  enabled = 'enabled',
  hovered = 'hovered',
  focused = 'focused',
	pressed = 'pressed',
	dragged = 'dragged',
	disabled = 'disabled',
}

export const MListItem = defineComponent({
	props: {
		state: {
			type: String as PropType<MListItemState>,
			required: false,
			default: undefined,
		},
		hasLeadingVideo: {
			type: Boolean,
			default: false,
		},
	},

	emits: [
		'click'
	],

	render(): VNode {
		const {
			state,
			hasLeadingVideo,
		} = this.$props

		return h('li', {
			tabindex: MListItemState.disabled === state ? undefined : 0,
			class: {
				'm-list-item': true,
				'has-leading-video': hasLeadingVideo,
				enabled: MListItemState.enabled === state,
				hovered: MListItemState.hovered === state,
				focused: MListItemState.focused === state,
				pressed: MListItemState.pressed === state,
				dragged: MListItemState.dragged === state,
				disabled: MListItemState.disabled === state,
			},
			onClick: (event: PointerEvent) => {
				if ('undefined' === typeof this.$props.state) {
					this.$el.blur()
					this.$emit('click', event)
				}
			},
		}, {
			default: () => this.$slots.default?.(),
		})
	},
})

export default MListItem