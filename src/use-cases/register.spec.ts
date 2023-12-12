import {describe, it,  expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

// Unitários

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new RegisterUseCase(usersRepository)
	})
	it('should hash user password', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'John-doe@mail.com',
			password: '123456'
		})

		const isPasswordHashed = await compare('123456', user.password_hash)
		expect(isPasswordHashed).toBe(true)
	})

	it('should not be able to register with the same email', async () => {
		const email = 'johndoe@example.com'

		await sut.execute({
			name: 'John Doe',
			email,
			password: '123456'
		})

		await expect(() => sut.execute({
			name: 'John Doe',
			email,
			password: '123456'
		})).rejects.toBeInstanceOf(UserAlreadyExistsError)
            
	})

	it('should be Able to register',async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'John-doefirst@mail.com',
			password: '123456'
		})

		expect(user.id).toEqual(expect.any(String))
	})
})

