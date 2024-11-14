import { Column } from '@tanstack/react-table'
import { Check, PlusCircle } from 'lucide-react'
import * as React from 'react'

import {
	Badge,
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Separator
} from '@/shared/components/ui'
import { cn } from '@/shared/utils'

interface DataTableFacetedFilterProps<TData, TValue> {
	column?: Column<TData, TValue>
	title?: string
	options: {
		label: string
		value: string
		icon?: React.ComponentType<{ className?: string }>
	}[]
}

export function DataTableFacetedFilter<TData, TValue>({
	column,
	title,
	options
}: DataTableFacetedFilterProps<TData, TValue>) {
	const facets = column?.getFacetedUniqueValues()
	const selectedValues = new Set(column?.getFilterValue() as string[])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className='h-8 border-dashed'
				>
					<PlusCircle />
					{title}
					{selectedValues?.size > 0 && (
						<>
							<Separator
								orientation='vertical'
								className='mx-2 h-4'
							/>
							<Badge
								variant='secondary'
								className='rounded-sm px-1 font-normal lg:hidden'
							>
								{selectedValues.size}
							</Badge>
							<div className='hidden space-x-1 lg:flex'>
								{selectedValues.size > 2 ? (
									<Badge
										variant='secondary'
										className='rounded-sm px-1 font-normal'
									>
										{selectedValues.size} выбрано
									</Badge>
								) : (
									options
										.filter(option =>
											selectedValues.has(option.value)
										)
										.map(option => (
											<Badge
												variant='secondary'
												key={option.value}
												className='rounded-sm px-1 font-normal'
											>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0' align='start'>
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>Результаты не найдены.</CommandEmpty>
						<CommandGroup>
							{options.map(option => {
								const isSelected = selectedValues.has(
									option.value
								)
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(
													option.value
												)
											} else {
												selectedValues.add(option.value)
											}
											const filterValues =
												Array.from(selectedValues)
											column?.setFilterValue(
												filterValues.length
													? filterValues
													: undefined
											)
										}}
									>
										<div
											className={cn(
												'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
												isSelected
													? 'bg-primary text-primary-foreground'
													: 'opacity-50 [&_svg]:invisible'
											)}
										>
											<Check />
										</div>
										{option.icon && (
											<option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
										)}
										<span>{option.label}</span>
										{facets?.get(option.value) && (
											<span className='ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
												{facets.get(option.value)}
											</span>
										)}
									</CommandItem>
								)
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() =>
											column?.setFilterValue(undefined)
										}
										className='justify-center text-center'
									>
										Очистить фильтры
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
