/* Copyright © 2023, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

import {
	h,
	VNode,
	SetupContext,
} from 'vue'

export type MRowColumnsProps = {}
export type MRowColumnsEvents = {}

export function MRowColumns(_: MRowColumnsProps, {
	slots,
}: SetupContext<MRowColumnsEvents>): VNode {
	return h('div', {
		class: {
			'm-row-columns': true,
		},
	}, {
		default: () => slots.default?.(),
	})
}

MRowColumns.props = {}
MRowColumns.emits = {}