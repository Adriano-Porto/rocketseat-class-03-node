import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { User } from '@prisma/client'

interface RegisterInterface {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
	user: User
}

// SOLID
// D - Dependency Injection 

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository){}

	async execute({
		name,
		email,
		password
	}:RegisterInterface) : Promise<RegisterUseCaseResponse> {
		const password_hash = await hash(password, 6)
	
		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError()
		}

		const user = await this.usersRepository.create({name, email, password_hash})
		return { user }
	}
}

