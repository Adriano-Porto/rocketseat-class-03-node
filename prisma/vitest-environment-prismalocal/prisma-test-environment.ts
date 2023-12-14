import { Environment } from 'vitest'

export default <Environment> {
	name: 'prismalocal',
	transformMode: 'ssr',
	async setup() {
		console.log('SETUP')
		return {
			async teardown() {
				console.log('TEARDOWN')
			}
		}
	}
}