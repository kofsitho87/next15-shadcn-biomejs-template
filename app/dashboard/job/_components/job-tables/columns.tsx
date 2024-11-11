"use client"
import type { JobItemType } from "@/types/job"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import Link from "next/link"
import { CellAction } from "./cell-action"

export const columns: ColumnDef<JobItemType>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />
  //   ),
  //   cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label="Select row" />,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    cell: (info) => (
      <Link className='line-clamp-1 block w-full hover:underline' href={`/dashboard/job/${info.row.original.id}`}>
        {info.row.original.title?.find((t) => t.language === "KO_KR")?.text}
      </Link>
    ),
    header: "제목",
  },
  {
    accessorKey: "status",
    cell: (info) => {
      if (info.getValue() === "OPENED") {
        return <div className='text-sky-500'>구인중</div>
      }
      return <div className='text-red-500'>구인종료</div>
    },
    header: "공고상태",
    size: 100,
  },
  {
    accessorKey: "publishStatus",
    cell: (info) => {
      if (info.getValue() === "PUBLISHED") {
        return <div className='text-green-500'>게시됨</div>
      } else if (info.getValue() === "PUBLISHABLE") {
        return <div className='text-blue-500'>게시가능</div>
      } else if (info.getValue() === "REJECTED") {
        return <div className='text-red-500'>거부됨</div>
      } else if (info.getValue() === "TRANSLATING") {
        return <div className='text-gray-500'>번역중</div>
      } else if (info.getValue() === "UNDER_REVIEW") {
        return <div className='text-gray-500'>검토중</div>
      } else if (info.getValue() === "PUBLISH_RESERVED") {
        return (
          <div className='text-gray-500'>
            게시 예약
            <br />
            {info.row.original.publishIn && format(info.row.original.publishIn, "yyyy.M.dd HH:mm")}
          </div>
        )
      }
    },
    header: "게시상태",
    minSize: 76,
    size: 100,
  },
  {
    accessorKey: "updatedAt",
    cell: (info) => format(info.getValue() as Date, "yyyy.M.dd HH:mm"),
    header: "수정일",
    size: 140,
    // maxSize: 100,
  },
  {
    accessorKey: "createdAt",
    cell: (info) => format(info.getValue() as Date, "yyyy.M.dd HH:mm"),
    header: "작성일",
    size: 140,
    // maxSize: 100,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
