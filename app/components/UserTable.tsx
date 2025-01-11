import * as React from 'react'

import {
	useReactTable,
	getCoreRowModel,
	createColumnHelper,
	flexRender,
	getSortedRowModel,
	type SortingState,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '~/components/ui/table'

export type UserTableData = {
	name: string
	email: string
}

function useTableColumns(disabled: boolean) {
	return React.useMemo(() => {
		const columnHelper = createColumnHelper<UserTableData>()

		return [
			columnHelper.accessor('name', {
				header: 'Name',
			}),
			columnHelper.accessor('email', {
				header: 'Email',
			}),
		]
	}, [])
}

type UsersTableProps = {
	initialData: UserTableData[] | undefined
	disabled: boolean
}

export const UsersTable = React.memo(
	({ initialData, disabled }: UsersTableProps) => {
		const [sorting, setSorting] = React.useState<SortingState>([])
		const [data, setData] = React.useState<UserTableData[]>()

		React.useEffect(() => {
			setData(initialData)
		}, [initialData])

		console.log('################# redraw table #####################')

		const columns = useTableColumns(disabled)

		const tanstackTable = useReactTable({
			columns,
			state: {
				sorting,
			},
			onSortingChange: setSorting,
			data: data ?? [],
			getCoreRowModel: getCoreRowModel(),
			getSortedRowModel: getSortedRowModel(),
			debugTable: false,
		})

		return (
			<Table>
				<TableHeader>
					{tanstackTable.getFlatHeaders().map((header) => (
						<TableColumn
							key={header.column.id}
							id={header.column.id}
							onClick={header.column.getToggleSortingHandler()}
						>
							<div className="flex items-center gap-2">
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
								{/* {header.column.getIsSorted() === 'desc' && (
								<Icon name="arrow-down" className="h-4 w-4" />
							)}
							{header.column.getIsSorted() === 'asc' && (
								<Icon name="arrow-up" className="h-4 w-4" />
							)} */}
							</div>
						</TableColumn>
					))}
				</TableHeader>
				<TableBody>
					{tanstackTable.getRowModel().rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		)
	},
)
