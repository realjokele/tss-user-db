import { createFileRoute } from '@tanstack/react-router'
import { $getUsers } from '~/features/users'

export const Route = createFileRoute('/users')({
	component: Users,
	loader: async () => $getUsers(),
})

async function Users() {
	const users = Route.useLoaderData()
	return <div>Hello {users.map((user) => user.name)}</div>
}
