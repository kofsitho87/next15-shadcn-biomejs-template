"use server"

import {
  type JobType,
  type JobDueType,
  type JobPayType,
  type JobPeriodType,
  type WeekDay,
  type JobStatus,
  type JobPublishStatus,
  type PreferentialItemType,
  type JobProvidedItem,
  LanguageCode,
} from "@/constants/enums"
import { getSession } from "@/lib/session"
import type { JobItemType } from "@/types/job"

export const getJobListAction = async (params: {
  type?: JobType
  pageNumber: number
  lastItemId?: number
  itemCount?: number
  keyword?: string  
  status?: "CLOSED" | "OPENED"
}): Promise<{ items: JobItemType[]; count: number } | null> => {
  const session = await getSession()

  // TODO: API 연동
  const sampleItems: JobItemType[] = [
    {
      id: 1,
      title: [
        { language: LanguageCode.KO_KR, text: "웹 프론트엔드 개발자 (React)" },
        { language: LanguageCode.EN_US, text: "Web Frontend Developer (React)" }
      ],
      status: "OPENED",
      publishStatus: "PUBLISHED",
      updatedAt: new Date("2024-01-10T09:00:00"),
      createdAt: new Date("2024-01-01T09:00:00")
    },
    {
      id: 2,
      title: [
        { language: LanguageCode.KO_KR, text: "백엔드 개발자 (Node.js)" },
        { language: LanguageCode.EN_US, text: "Backend Developer (Node.js)" }
      ],
      status: "OPENED",
      publishStatus: "UNDER_REVIEW",
      updatedAt: new Date("2024-01-09T15:00:00"),
      createdAt: new Date("2024-01-02T10:00:00")
    },
    {
      id: 3,
      title: [
        { language: LanguageCode.KO_KR, text: "iOS 개발자" },
        { language: LanguageCode.EN_US, text: "iOS Developer" }
      ],
      status: "CLOSED",
      publishStatus: "PUBLISHED",
      updatedAt: new Date("2024-01-08T11:00:00"),
      createdAt: new Date("2024-01-03T14:00:00")
    },
    {
      id: 4,
      title: [
        { language: LanguageCode.KO_KR, text: "안드로이드 개발자" },
        { language: LanguageCode.EN_US, text: "Android Developer" }
      ],
      status: "OPENED",
      publishStatus: "PUBLISH_RESERVED",
      publishIn: new Date("2024-01-15T09:00:00"),
      updatedAt: new Date("2024-01-07T16:00:00"),
      createdAt: new Date("2024-01-04T11:00:00")
    },
    {
      id: 5,
      title: [
        { language: LanguageCode.KO_KR, text: "데브옵스 엔지니어" },
        { language: LanguageCode.EN_US, text: "DevOps Engineer" }
      ],
      status: "OPENED",
      publishStatus: "TRANSLATING",
      updatedAt: new Date("2024-01-06T10:00:00"),
      createdAt: new Date("2024-01-05T13:00:00")
    }
  ];

  // 검색어로 필터링
  let filteredItems = [...sampleItems];
  if (params.keyword) {
    filteredItems = sampleItems.filter(item => 
      item.title.some(t => t.text.toLowerCase().includes(params.keyword!.toLowerCase()))
    );
  }

  // 상태로 필터링
  if (params.status) {
    filteredItems = filteredItems.filter(item => item.status === params.status);
  }

  // 페이지네이션
  const startIndex = (params.pageNumber - 1) * (params.itemCount || 20);
  const endIndex = startIndex + (params.itemCount || 20);
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return { 
    items: paginatedItems,
    count: filteredItems.length 
  }
}

export const getJobAction = async (params: { jobId: number }): Promise<JobItemType | null> => {
  const session = await getSession()
  const endpoint = `${process.env.NEXT_PUBLIC_ADMIN_API_HOST}/v1/jobs/${params.jobId}`

  const response = await fetch(endpoint, {
    cache: "no-store",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.sign.accessToken}`,
      Language: "KO_KR",
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  if (!data.success) {
    return null
  }

  return data.data
}
