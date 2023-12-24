import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Validate check-in (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to validate checkin', async () => {
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

		let checkIn = await prisma.checkIn.create({
			data: {
				user_id: user.id,
				gym_id: gym.id
			}
		})
        
		const response = await request(app.server)
			.patch(`/check-ins/${checkIn.id}/validate`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(204)
        

		checkIn = await prisma.checkIn.findUniqueOrThrow({
			where: {
				id: checkIn.id,
			}
		})

		expect(checkIn.validated_at).toEqual(expect.any(Date))
	})
})