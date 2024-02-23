'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useModal } from '@/providers/modal-provider'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/global/custom-modal'

interface DataTableProps<TData, TValue>{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filterValue: string
    actionButtonText?: React.ReactNode
    modalChildren?: React.ReactNode
}

const DataTable: React.FC<DataTableProps<unknown,any>> = ({
    columns,
    data,
    filterValue,
    actionButtonText,
    modalChildren,
}) => {
    const { setOpen } = useModal()
    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
        },
    )
    return (
        <div className="flex items-center justify-between">
            <div className='felx items-center py-4 gap-2'>
                <Search size={20} />
                <Input 
                    placeholder='Search Name ...' 
                    value={
                        (table.getColumn(filterValue)?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) => {
                        table.getColumn(filterValue)?.setFilterValue(event.target.value)
                    }} 
                    className='h-12'
                />
            </div>
            <Button 
                className='flex gap-2' 
                onClick={() => {
                    
                }}
            ></Button>
        </div>
            
    )
}

export default DataTable