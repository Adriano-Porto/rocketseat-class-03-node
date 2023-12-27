import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Search Gym (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to search gym', async () => {
		const { token } = await createAndAuthenticateUser(app, 'ADMIN')

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Javascript Gym',
				description: '',
				phone: '838383838',
				latitude: -27.0956228,
				longitude: -109.3449761,
			})
		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Typescript Gym',
				description: '',
				phone: '838383838',
				latitude: -27.0956228,
				longitude: -109.3449761,
			})

		const response = await request(app.server)
			.get('/gyms/search')
			.set('Authorization', `Bearer ${token}`)
			.query({
				q: 'Javascript'
			})

		expect(response.statusCode).toEqual(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: 'Javascript Gym'
			})
		])
	})
})