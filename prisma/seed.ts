import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

await prisma.user.deleteMany()

Array.from({ length: 50 }).map(async (_, i) => {
	const firstName = faker.person.firstName()
	const lastName = faker.person.lastName()

	await prisma.user.create({
		data: {
			email: faker.internet.email({
				firstName,
				lastName,
			}),
			name: `${firstName} ${lastName}`,
		},
	})
})
