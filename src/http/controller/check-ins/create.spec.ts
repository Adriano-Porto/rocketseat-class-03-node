import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Create check-in (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create checkin', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const gym = await prisma.gym.create({ // Inserts a gym inside the database
			data: {
				title: 'Javascript Gym',
				phone: '838383838',
				latitude: -27.0956228,
				longitude: -109.3449761,
			}
		})
        
		const response = await request(app.server)
			.post(`/gyms/${gym.id}/check-ins`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: -27.0956228,
				longitude: -109.3449761,
			})

		expect(response.statusCode).toEqual(201)
	})
})