"use client"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import JobListTable from "./job-tables"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getJobListAction } from "../actions"
import { useSearchParams } from "next/navigation"
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function JobListView() {
  const searchParams = useSearchParams()
  const pageNumber = Number.parseInt(searchParams.get("page") || "1", 10)
  const itemCount = Number.parseInt(searchParams.get("limit") || "20", 10)
  const keyword = searchParams.get("q")

  const { data: jobList, isLoading } = useQuery({
    queryKey: ["jobs", { pageNumber, itemCount, keyword }],
    queryFn: () => getJobListAction({ pageNumber: pageNumber, itemCount: itemCount, keyword: keyword ?? undefined }),
    placeholderData: keepPreviousData,
  })

  return (
    <div className='space-y-4'>
      <div className='flex items-start justify-between'>
        <Heading
          title={`공고 조회 (${jobList?.count || 0})`}
          description='구인공고를 관리합니다. 구인공고의 검수, 번역 상태를 확인할 수 있습니다.'
        />
        <Button variant='default' asChild>
          <Link href={`/dashboard/job/create`}>
            <Plus className='mr-2 h-4 w-4' /> 생성
          </Link>
        </Button>
      </div>
      <Separator />

      {isLoading ? (
        <DataTableSkeleton columnCount={5} searchableColumnCount={1} />
      ) : (
        <JobListTable data={jobList?.items || []} totalData={jobList?.count || 0} />
      )}
    </div>
  )
}
