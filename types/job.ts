import type { LanguageCode } from "@/constants/enums"

export type JobTitleType = {
  language: LanguageCode
  text: string
}

export type JobStatus = "OPENED" | "CLOSED"

export type JobPublishStatus = "PUBLISHED" | "PUBLISHABLE" | "REJECTED" | "TRANSLATING" | "UNDER_REVIEW" | "PUBLISH_RESERVED"

export type JobItemType = {
  id: number
  title: JobTitleType[]
  status: JobStatus
  publishStatus: JobPublishStatus
  publishIn?: Date
  updatedAt: Date
  createdAt: Date
} 