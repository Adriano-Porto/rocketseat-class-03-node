import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Search Nearby Gym (e2e)', () => {
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
				phone: '83 99',
            
				latitude: -27.0956228,
				longitude: -109.3449761,
			})
        
		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Python Gym',
				description: '',
				phone: '83 99',
				latitude: -6.9431477,
				longitude: -38.1720829,
			})

		const response = await request(app.server)
			.get('/gyms/nearby')
			.set('Authorization', `Bearer ${token}`)
			.query({
				latitude: -27.0956228,
				longitude: -109.3449761,
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