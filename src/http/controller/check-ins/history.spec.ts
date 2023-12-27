import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Check-in History (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to list a user history', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const user = await prisma.user.findFirstOrThrow()

		const gym = await prisma.gym.create({ // Inserts a gym inside the database
			data: {
				title: 'Javascript Gym',
				phone: '838383838',
				latitude: -27.0956228,
				longitude: -109.3449761,
			}
		})

		await prisma.checkIn.createMany({ // Inserts a gym inside the database
			data: [
				{
					gym_id: gym.id,
					user_id: user.id,
				},
				{
					gym_id: gym.id,
					user_id: user.id,
				},
			]
		})
        
		const response = await request(app.server)
			.get('/check-ins/history')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.checkIns).toEqual([
			expect.objectContaining({
				gym_id: gym.id
			}),
			expect.objectContaining({
				gym_id: gym.id
			})
		])

	})
})