import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInsRepository {
    create (data:Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    countByUserId(userId: string): Promise<number>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    findById(checkInId: string): Promise<CheckIn | null>
    save(checkId: CheckIn): Promise<CheckIn>
}