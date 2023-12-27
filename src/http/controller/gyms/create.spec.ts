import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Create Gym (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create gym', async () => {
		const { token } = await createAndAuthenticateUser(app, 'ADMIN')

		const response = await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Javascript Gym',
				description: '',
				phone: '838383838',
				latitude: -27.0956228,
				longitude: -109.3449761,
			})

		expect(response.statusCode).toEqual(201)
	})
})