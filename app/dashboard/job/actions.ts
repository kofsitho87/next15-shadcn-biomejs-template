"use server"

import type { JobItemType } from "@/types/job"
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
import { QueryStringUtils } from "@/lib/QueryStringUtils"
import { getSession } from "@/lib/session"
import type { BusinessItemType } from "@/types/business"

import { ChatOpenAI } from "@langchain/openai"
import { ChatAnthropic } from "@langchain/anthropic"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { z } from "zod"
import type { LanguageTextType } from "@/types/common.type"

export const getJobListAction = async (params: {
  type?: JobType
  pageNumber: number
  lastItemId?: number
  itemCount?: number
  keyword?: string
  status?: "CLOSED" | "OPENED"
}): Promise<{ items: JobItemType[]; count: number } | null> => {
  const session = await getSession()

  const endpoint = `${process.env.NEXT_PUBLIC_ADMIN_API_HOST}/v1/jobs`
  const queryString = QueryStringUtils.make({
    type: params.type,
    listType: "PAGE",
    pageNumber: params.pageNumber,
    itemCount: params.itemCount || 5,
    sortBy: "ID",
    sortDirection: "DESC",
    keyword: params.keyword,
    status: params.status, // 상태 (CLOSED, OPENED)
  })

  const response = await fetch(endpoint + queryString, {
    cache: "no-store",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${authorization?.user?.accessToken}`,
      Authorization: `Bearer ${session?.sign.accessToken}`,
      Language: "KO_KR",
    },
  })

  const data = await response.json()
  if (data.success === false) {
    return null
  }

  return data.data
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

export const createJobAction = async (data: {
  businessId: number

  title: LanguageTextType[]
  description: LanguageTextType[]
  // 주요 업무
  tasks?: LanguageTextType[] | null

  categoryId: number
  periodType: JobPeriodType
  workWeekDays?: WeekDay[] | null
  payType?: JobPayType
  payAmount?: number | null
  startTime?: string | null
  endTime?: string | null
  isTimeNegotiable?: boolean | null

  // 우대사항
  preferentialItems?: PreferentialItemType[] | null
  // 근무 편의
  providedItems?: JobProvidedItem[] | null

  // 상세정보
  dueType: JobDueType
  dueDate?: string | null
  address?: {
    jibunAddress: LanguageTextType[]
    roadAddress: LanguageTextType[]
    addressDetail: string
    zipCode?: string | null
    townCode?: string | null
  }

  //
  status?: JobStatus
  publishStatus?: JobPublishStatus
  isBlocked?: boolean
  publishIn?: number | null
  tags?: string[] | null
}) => {
  const session = await getSession()

  const endpoint = `${process.env.NEXT_PUBLIC_ADMIN_API_HOST}/v1/jobs`
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.sign.accessToken}`,
      // Language: 'KO_KR',
    },
  })

  const result = await response.json()
  if (result.success === false) {
    throw new Error(result.message)
  }
  return result.data
}

export const updateJobAction = async (
  jobId: number,
  job: {
    title: LanguageTextType[]
    description: LanguageTextType[]
    // 주요 업무
    tasks?: LanguageTextType[] | null

    categoryId: number
    periodType: JobPeriodType
    workWeekDays?: WeekDay[] | null
    payType?: JobPayType
    payAmount?: number | null
    startTime?: string | null
    endTime?: string | null
    isTimeNegotiable?: boolean | null

    // 우대사항
    preferentialItems?: PreferentialItemType[] | null
    // 근무 편의
    providedItems?: JobProvidedItem[] | null

    // 상세정보
    dueType: JobDueType
    dueDate?: string | null
    address?: {
      jibunAddress: LanguageTextType[]
      roadAddress: LanguageTextType[]
      addressDetail: string
      zipCode?: string | null
      townCode?: string | null
    }

    //
    status?: JobStatus
    publishStatus?: JobPublishStatus
    isBlocked?: boolean
    publishIn?: number | null
    tags?: string[] | null
  },
): Promise<{ code: string; success: boolean } | null> => {
  const session = await getSession()
  const endpoint = `${process.env.NEXT_PUBLIC_ADMIN_API_HOST}/v1/jobs/${jobId}`
  const response = await fetch(endpoint, {
    cache: "no-store",
    method: "PATCH",
    body: JSON.stringify(job),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.sign.accessToken}`,
      Language: "KO_KR",
    },
  })

  const data = await response.json()
  return data
}

export async function getBusinessList(params: { pageNumber: number; itemCount?: number; keyword?: string }) {
  const session = await getSession()
  const endpoint = `${process.env.NEXT_PUBLIC_ADMIN_API_HOST}/v1/businesses`
  const queryString = QueryStringUtils.make({
    pageNumber: params.pageNumber,
    itemCount: params.itemCount || 10,
    // sortBy: 'ID',
    // sortDirection: 'DESC',
    keyword: params.keyword,
  })

  const response = await fetch(endpoint + queryString, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.sign.accessToken}`,
    },
  })

  const data = await response.json()
  return data.data as { items: BusinessItemType[]; count: number }
}

export async function translateJobTitleAction(data: { title: string; language: string }) {
  const llm = new ChatOpenAI({ modelName: "gpt-4o", temperature: 0.2 })
  const prompt = ChatPromptTemplate.fromTemplate(`Translate the following {title} to {language}.`)

  const outputParser = new StringOutputParser()
  const chain = prompt.pipe(llm).pipe(outputParser)
  const response = await chain.invoke({
    language: data.language,
    title: data.title,
  })
  console.log(response)

  return response
}

// 번역 결과의 타입을 정의하는 Zod 스키마
const TranslateResult = z.object({
  title: z.string().describe(`The title of the job posting.`),
  description: z.string().describe(`The description of the job posting.`),
  tasks: z.array(z.string()).describe(`The tasks of the job posting.`),
})

// 채용공고 번역 함수
export async function translateJobAction(data: {
  language: LanguageCode
  company_name: string
  title: string
  description: string
  tasks: string[]
}) {
  // Claude 3 Sonnet 모델을 사용하여 LLM 인스턴스 생성 (온도 0.2로 일관된 결과 유도)
  const llm = new ChatAnthropic({ modelName: "claude-3-5-sonnet-20240620", temperature: 0.2 })

  // 전체 채용공고 번역을 위한 프롬프트 템플릿 정의
  const prompt = ChatPromptTemplate.fromTemplate(
    `Translate the following <job_posting> to {language}, following these steps:
  1. First, translate the <title> to {language}.
  2. Once the title is translated, proceed to translate the <description> to {language}.
  Remember, if the <company_name> appears within the <title> or <description>, do NOT translate it; keep it as it appears in Korean or English.

  <job_posting>
    <company_name>{company_name}</company_name>
    <title>{title}</title>
    <description>{description}</description>
    <tasks>{tasks}</tasks>
  </job_posting>`,
  )

  // LLM에 구조화된 출력 형식 지정
  const structured_llm = llm.withStructuredOutput(TranslateResult)
  const chain = prompt.pipe(structured_llm)

  // 영어 번역의 경우 단일 프롬프트로 처리
  if (data.language === LanguageCode.EN_US) {
    const result = await chain.invoke({
      language: "English",
      company_name: data.company_name,
      title: data.title,
      description: data.description,
      tasks: data.tasks,
    })
    return {
      ...result,
      language: data.language,
    }
  }

  // 제목 번역을 위한 프롬프트 템플릿
  const titlePrompt = ChatPromptTemplate.fromTemplate(
    `Translate only the following "title" to {language}, without additional explanations or introductory text.
  Remember, If the "company_name" appears within the "title", do NOT translate it; keep it as it appears in Korean or English.

  company_name: {company_name}
  title: {title}`,
  )

  // 설명 번역을 위한 프롬프트 템플릿
  const descriptionPrompt = ChatPromptTemplate.fromTemplate(
    `Translate the following "description" to {language}, without additional explanations or introductory text.
  "description" is part of the job posting.
  Remember, if the "company_name" appears within the "description", do NOT translate it; keep it as it appears in Korean or English.

  company_name: {company_name}
  description: {description}`,
  )

  // 각 언어별 업무 번역 예시 데이터
  const taskExamples: { [key in LanguageCode]: { input: string; output: string } } = {
    [LanguageCode.KO_KR]: {
      input: `[]`,
      output: `[]`,
    },
    [LanguageCode.EN_US]: {
      input: `["서빙", "포장", "전화응대", "주방보조"]`,
      output: `["serving", "packaging", "phone response", "kitchen assistants"]]`,
    },
    [LanguageCode.VI_VN]: {
      input: `["serving", "packaging", "phone response", "kitchen assistants"]`,
      output: `["Tuyển phục vụ bàn", "đóng gói", "tiếp nhận điện thoại", "phụ bếp"]`,
    },
    [LanguageCode.MN_MN]: {
      input: `["serving", "packaging", "phone response", "kitchen assistants"]`,
      output: `["зөөгч", "савлах", "утсаар үйлчлэх", "гал тогооны туслах"]`,
    },
    [LanguageCode.UZ_UZ]: {
      input: `["serving", "packaging", "phone response", "kitchen assistants"]`,
      output: `["xizmat ko'rsatish", "qadoqlash", "telefon orqali javob berish", "oshpaz yordamchilari"]`,
    },
  }

  // 업무 목록 번역을 위한 프롬프트 템플릿
  const tasksPrompt = ChatPromptTemplate.fromTemplate(
    `Translate the following "tasks" which is part of the job posting to {language}, without additional explanations or introductory text.

  ### Example
  tasks: ${taskExamples[data.language].input}
  output: ${taskExamples[data.language].output}

  tasks: {tasks}
  output:`,
  )

  // 문자열 출력 파서 생성
  const outputParser = new StringOutputParser()

  // 각 부분별 번역 체인 구성
  const titleChain = titlePrompt.pipe(llm).pipe(outputParser)
  const descriptionChain = descriptionPrompt.pipe(llm).pipe(outputParser)
  const tasksChain = tasksPrompt.pipe(llm).pipe(outputParser)

  const LanguageMap = {
    [LanguageCode.KO_KR]: "Korean",
    [LanguageCode.EN_US]: "English",
    [LanguageCode.VI_VN]: "Vietnamese (Vietnam)",
    [LanguageCode.MN_MN]: "Mongolian (Mongolia)",
    [LanguageCode.UZ_UZ]: "Uzbek Latin (Uzbekistan)",
  }

  // 제목 번역 요청
  const titlePromise = titleChain.invoke({
    language: LanguageMap[data.language],
    company_name: data.company_name,
    title: data.title,
  })

  // 설명 번역 요청
  const descriptionPromise = descriptionChain.invoke({
    language: LanguageMap[data.language],
    company_name: data.company_name,
    description: data.description,
  })

  // 업무 목록 번역 요청
  const tasksPromise = tasksChain.invoke({
    language: LanguageMap[data.language],
    tasks: data.tasks,
  })

  // 모든 번역 요청을 병렬로 처리
  const [titleResponse, descriptionResponse, tasksResponse] = await Promise.all([
    titlePromise,
    descriptionPromise,
    tasksPromise,
  ])

  // 업무 목록 JSON 파싱 처리
  let tasks = []
  try {
    tasks = JSON.parse(tasksResponse)
  } catch (e) {
    // 1. 번역 실패 시 [] 빈 tasks 배열 반환
    // 2. 추후 번역 실패 시 재시도 횟수 3회 제한, 3회 재시도 후 실패 시 원본 tasks 배열 반환
    console.log(e)
  }

  // 최종 번역 결과 반환
  return {
    title: titleResponse,
    description: descriptionResponse,
    tasks: tasks,
    language: data.language,
  }
}
