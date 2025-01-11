import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/start'

import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { UsersTable, type UserTableData } from '~/components/UserTable'
import { TextField } from '~/components/ui/textfield'

import { $getUsers } from '~/features/user/user'
import { useDebounceValue } from '~/hooks/useDebounceValue'

export const Route = createFileRoute('/users')({
	component: Users,
	errorComponent: DefaultCatchBoundary,
	// loader: async () => $getUsers(),
})

function Users() {
	// const users = Route.useLoaderData()
	const [value, setValue] = React.useState('')
	const filter = useDebounceValue(value, 750)

	const users = useServerFn($getUsers)
	const userQuery = useQuery({
		queryKey: ['users', filter],
		queryFn: () => users({ data: { filter } }),
	})

	return (
		<div>
			<TextField onChange={setValue} value={value} aria-label="bla" />
			<UsersTable initialData={userQuery.data} disabled />
		</div>
	)
}
