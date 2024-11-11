"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { JobDueType, LanguageCode } from "@/constants/enums"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createJobAction, getJobAction, updateJobAction, translateJobAction } from "../../actions"
import { format, parse } from "date-fns"
import { toast } from "sonner"
import {
  BriefcaseBusinessIcon,
  BriefcaseIcon,
  CalendarIcon,
  LanguagesIcon,
  Loader2,
  LucideBriefcaseBusiness,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import SelectableJobCategory from "./selectable-job-category"
import { commonFormSchema, createFormSchema, type CommonFormData, type CreateFormData } from "./schema"
import { Separator } from "@/components/ui/separator"
import { MultiSelect } from "@/components/ui/multi-select"
import { TimePicker } from "@/components/ui/time-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { TagsInput } from "@/components/ui/tags-input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

import { useDaumPostcodePopup } from "react-daum-postcode"
import {
  weekDaysList,
  fourMajorSocialInsurances,
  additionalAllowances,
  bonuses,
  leaveSystem,
  mealSupport,
  accommodationSupport,
  restSupport,
  transportationSupport,
  healthSupport,
  otherSupports,
  preferentialEducationLevel,
  preferentialExperience,
  preferentialKoreanLanguageProficiency,
  preferentialLongTermEmployment,
  jobPeriodList,
  jobPayTypeList,
  jobDueTypeList,
} from "./data"

import SelectableBusiness from "./selectable-business"
import { useRouter } from "next/navigation"
import Link from "next/link"
import InputCurrency from "@/components/ui/input-currency"
import DebugComponent from "./debug"
import { DevTool } from "@hookform/devtools"

export default function JobForm({ jobId }: { jobId?: number }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [language, setLanguage] = useState<LanguageCode>(LanguageCode.KO_KR)
  const openDaumPostcodePopup = useDaumPostcodePopup()

  const { data: job, refetch } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => {
      if (jobId) {
        return getJobAction({ jobId })
      }
      return null
    },
    initialData: undefined,
  })
  // console.log(job);

  const title = {
    [LanguageCode.KO_KR]: job?.title?.find((t) => t.language === LanguageCode.KO_KR)?.text || "",
    [LanguageCode.EN_US]: job?.title?.find((t) => t.language === LanguageCode.EN_US)?.text || "",
    [LanguageCode.VI_VN]: job?.title?.find((t) => t.language === LanguageCode.VI_VN)?.text || "",
    [LanguageCode.MN_MN]: job?.title?.find((t) => t.language === LanguageCode.MN_MN)?.text || "",
    [LanguageCode.UZ_UZ]: job?.title?.find((t) => t.language === LanguageCode.UZ_UZ)?.text || "",
  }
  const description = {
    [LanguageCode.KO_KR]: job?.description?.find((t) => t.language === LanguageCode.KO_KR)?.text || "",
    [LanguageCode.EN_US]: job?.description?.find((t) => t.language === LanguageCode.EN_US)?.text || "",
    [LanguageCode.VI_VN]: job?.description?.find((t) => t.language === LanguageCode.VI_VN)?.text || "",
    [LanguageCode.MN_MN]: job?.description?.find((t) => t.language === LanguageCode.MN_MN)?.text || "",
    [LanguageCode.UZ_UZ]: job?.description?.find((t) => t.language === LanguageCode.UZ_UZ)?.text || "",
  }
  const tasks = {
    [LanguageCode.KO_KR]: job?.tasks?.find((t) => t.language === LanguageCode.KO_KR)?.text.split(",") || [],
    [LanguageCode.EN_US]: job?.tasks?.find((t) => t.language === LanguageCode.EN_US)?.text.split(",") || [],
    [LanguageCode.VI_VN]: job?.tasks?.find((t) => t.language === LanguageCode.VI_VN)?.text.split(",") || [],
    [LanguageCode.MN_MN]: job?.tasks?.find((t) => t.language === LanguageCode.MN_MN)?.text.split(",") || [],
    [LanguageCode.UZ_UZ]: job?.tasks?.find((t) => t.language === LanguageCode.UZ_UZ)?.text.split(",") || [],
  }

  const form = useForm<CommonFormData | CreateFormData>({
    resolver: zodResolver(job ? commonFormSchema : createFormSchema),
    defaultValues: {
      // ...job,

      // 주요 정보
      title: title,
      description: description,
      tasks: tasks,

      // 기본정보
      categoryId: job?.categoryId || 0,
      payType: (job?.payType as CommonFormData["payType"]) || "HOURLY",
      payAmount: job?.payAmount || "",
      periodType: (job?.periodType as CommonFormData["periodType"]) || "UNKNOWN",
      workWeekDays: job?.workWeekDays || [],
      startTime: job?.startTime || undefined,
      endTime: job?.endTime || undefined,
      isTimeNegotiable: job?.isTimeNegotiable,

      // 우대사항 - 학력
      preferentialEducationLevel:
        job?.preferentialItems?.find((t) => preferentialEducationLevel.find((p) => p.value === t)) || undefined,
      // 우대사항 - 경력
      preferentialExperience:
        job?.preferentialItems?.find((t) => preferentialExperience.find((p) => p.value === t)) || undefined,
      // 우대사항 - 한국어 능력
      preferentialKoreanLanguageProficiency:
        job?.preferentialItems?.find((t) => preferentialKoreanLanguageProficiency.find((p) => p.value === t)) ||
        undefined,
      // 우대사항 - 장기 근속
      preferentialLongTermEmployment:
        job?.preferentialItems?.find((t) => preferentialLongTermEmployment.find((p) => p.value === t)) || undefined,

      // 근무 편의
      // 4대보험
      providedFourMajorSocialInsurances:
        job?.providedItems?.filter((t) => fourMajorSocialInsurances.find((p) => p.value === t)) || undefined,
      // 추가수당
      providedAdditionalAllowances:
        job?.providedItems?.filter((t) => additionalAllowances.find((p) => p.value === t)) || undefined,
      // 보너스
      providedBonuses: job?.providedItems?.filter((t) => bonuses.find((p) => p.value === t)) || undefined,
      // 휴가제도
      providedLeaveSystem: job?.providedItems?.filter((t) => leaveSystem.find((p) => p.value === t)) || undefined,
      // 식사지원
      providedMealSupport: job?.providedItems?.filter((t) => mealSupport.find((p) => p.value === t)) || undefined,
      // 숙박지원
      providedAccommodationSupport:
        job?.providedItems?.filter((t) => accommodationSupport.find((p) => p.value === t)) || undefined,
      // 휴식지원
      providedRestSupport: job?.providedItems?.filter((t) => restSupport.find((p) => p.value === t)) || undefined,
      // 교통 지원
      providedTransportationSupport:
        job?.providedItems?.filter((t) => transportationSupport.find((p) => p.value === t)) || undefined,
      // 건강 지원
      providedHealthSupport: job?.providedItems?.filter((t) => healthSupport.find((p) => p.value === t)) || undefined,
      // 기타 지원
      providedOtherSupports: job?.providedItems?.filter((t) => otherSupports.find((p) => p.value === t)) || undefined,

      // 상세정보
      dueType: job?.dueType || undefined,
      dueDate: job?.dueDate ? new Date(job.dueDate) : undefined,
      address: {
        jibunAddress: job?.address?.jibunAddress
          ? [{ language: LanguageCode.KO_KR, text: job.address.jibunAddress }]
          : [],
        roadAddress: job?.address?.roadAddress ? [{ language: LanguageCode.KO_KR, text: job.address.roadAddress }] : [],
        addressDetail: job?.address?.addressDetail || "",
        zipCode: job?.address?.zipCode || "",
        townCode: job?.address?.townCode || "",
      },

      // 상태
      status: job?.status,
      publishStatus: job?.publishStatus,
      publishIn: job?.publishIn ? format(job.publishIn, "yyyy-MM-dd HH:mm") : "",
      tags: job?.tags || [],
    },
  })

  const updateJobMutation = useMutation({
    mutationFn: async (data: CommonFormData) => {
      if (!jobId) {
        return
      }
      const response = await updateJobAction(jobId, {
        title: Object.entries(data.title)
          .filter(([_, value]) => value)
          .map(([key, value]) => ({ language: key as LanguageCode, text: value })),
        description: Object.entries(data.description)
          .filter(([_, value]) => value)
          .map(([key, value]) => ({ language: key as LanguageCode, text: value })),
        tasks: Object.entries(data.tasks)
          .filter(([_, value]) => value.length > 0)
          .map(([key, value]) => ({ language: key as LanguageCode, text: value.join(",") })),

        // 기본정보
        categoryId: data.categoryId,
        periodType: data.periodType,
        workWeekDays: data.workWeekDays,
        payType: data.payType,
        payAmount: data.payAmount,
        startTime: data.startTime,
        endTime: data.endTime,
        isTimeNegotiable: data.isTimeNegotiable,

        // 우대사항
        preferentialItems: [
          data.preferentialEducationLevel,
          data.preferentialExperience,
          data.preferentialKoreanLanguageProficiency,
          data.preferentialLongTermEmployment,
        ].filter((t) => t),

        providedItems: [
          ...(data.providedFourMajorSocialInsurances || []),
          ...(data.providedAdditionalAllowances || []),
          ...(data.providedBonuses || []),
          ...(data.providedLeaveSystem || []),
          ...(data.providedMealSupport || []),
          ...(data.providedAccommodationSupport || []),
          ...(data.providedRestSupport || []),
          ...(data.providedTransportationSupport || []),
          ...(data.providedHealthSupport || []),
          ...(data.providedOtherSupports || []),
        ].filter((t) => t),

        // 상세정보
        dueType: data.dueType,
        dueDate: data.dueDate ? format(data.dueDate, "yyyy-MM-dd") : undefined,
        address: data.address,

        status: data.status,
        publishStatus: data.publishStatus,
        publishIn: data.publishIn ? new Date(data.publishIn).getTime() : null,
        tags: data.tags,
      })
      return response
    },
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      toast.success("저장되었습니다.")
    },
    onError: () => {
      toast.error("저장에 실패했습니다.")
    },
  })

  const createJobMutation = useMutation({
    mutationFn: async (data: CreateFormData) => {
      return await createJobAction({
        businessId: data.businessId,
        title: Object.entries(data.title)
          .filter(([_, value]) => value)
          .map(([key, value]) => ({ language: key as LanguageCode, text: value })),
        description: Object.entries(data.description)
          .filter(([_, value]) => value)
          .map(([key, value]) => ({ language: key as LanguageCode, text: value })),
        tasks: Object.entries(data.tasks)
          .filter(([_, value]) => value.length > 0)
          .map(([key, value]) => ({ language: key as LanguageCode, text: value.join(",") })),

        // 기본정보
        categoryId: data.categoryId,
        periodType: data.periodType,
        workWeekDays: data.workWeekDays,
        payType: data.payType,
        payAmount: data.payAmount,
        startTime: data.startTime,
        endTime: data.endTime,
        isTimeNegotiable: data.isTimeNegotiable,

        // 우대사항
        preferentialItems: [
          data.preferentialEducationLevel,
          data.preferentialExperience,
          data.preferentialKoreanLanguageProficiency,
          data.preferentialLongTermEmployment,
        ].filter((t) => t),

        providedItems: [
          ...(data.providedFourMajorSocialInsurances || []),
          ...(data.providedAdditionalAllowances || []),
          ...(data.providedBonuses || []),
          ...(data.providedLeaveSystem || []),
          ...(data.providedMealSupport || []),
          ...(data.providedAccommodationSupport || []),
          ...(data.providedRestSupport || []),
          ...(data.providedTransportationSupport || []),
          ...(data.providedHealthSupport || []),
          ...(data.providedOtherSupports || []),
        ].filter((t) => t),

        // 상세정보
        dueType: data.dueType,
        dueDate: data.dueDate ? format(data.dueDate, "yyyy-MM-dd") : undefined,
        address: data.address,

        status: data.status,
        publishStatus: data.publishStatus,
        publishIn: data.publishIn ? new Date(data.publishIn).getTime() : null,
        tags: data.tags,
      })
    },
    onSuccess: (response) => {
      refetch()
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      toast.success("생성되었습니다.")

      router.replace(`/dashboard/job/${response.id}`)
    },
    onError: () => {
      toast.error("생성에 실패했습니다.")
    },
  })

  async function onSubmit(values: CommonFormData | CreateFormData) {
    // console.log('onSubmit');
    // console.log(values);

    if (job) {
      updateJobMutation.mutate(values)
    } else {
      createJobMutation.mutate(values)
    }
  }

  const handleCompleteDaumZipCode = (data: any) => {
    form.setValue("address.zipCode", data.zonecode)
    form.setValue("address.roadAddress", [
      { language: LanguageCode.KO_KR, text: data.roadAddress },
      { language: LanguageCode.EN_US, text: data.roadAddressEnglish },
    ])
    form.setValue("address.jibunAddress", [
      { language: LanguageCode.KO_KR, text: data.jibunAddress },
      { language: LanguageCode.EN_US, text: data.jibunAddressEnglish },
    ])
    form.setValue("address.townCode", data.sigunguCode)
  }

  const handleTranslate = async (language: LanguageCode) => {
    const businessId = job?.businessId || form.getValues("businessId")
    const businessName = job?.business?.name || form.getValues("businessName")

    const requiredLanguage = language === LanguageCode.EN_US ? LanguageCode.KO_KR : LanguageCode.EN_US

    const jobTitle = form.getValues("title")[requiredLanguage]
    const jobDescription = form.getValues("description")[requiredLanguage]
    const jobTasks = form.getValues("tasks")[requiredLanguage]

    if (!businessName || !businessId) {
      form.trigger("businessId")
      toast.error("사업자를 선택해주세요.")
      return
    }
    if (!jobTitle) {
      form.trigger("title")
      toast.error(`${requiredLanguage} 공고제목을 입력해주세요.`)
      return
    }
    if (!jobDescription) {
      form.trigger("description")
      toast.error(`${requiredLanguage} 공고내용을 입력해주세요.`)
      return
    }
    if (!jobTasks || jobTasks.length === 0) {
      form.trigger("tasks")
      toast.error(`${requiredLanguage} 주요 업무를 입력해주세요.`)
      return
    }

    translateMutation.mutate({
      language: language,
      company_name: businessName,
      title: jobTitle,
      description: jobDescription,
      tasks: jobTasks,
    })
  }

  const translateMutation = useMutation({
    mutationFn: async ({
      language,
      company_name,
      title,
      description,
      tasks,
    }: {
      language: LanguageCode
      company_name: string
      title: string
      description: string
      tasks: string[]
    }) => {
      return await translateJobAction({
        language,
        company_name,
        title,
        description,
        tasks,
      })
    },
    onSuccess: (data) => {
      console.log(data)

      form.setValue("title", {
        ...form.getValues("title"),
        [data.language]: data.title,
      })
      form.setValue("description", {
        ...form.getValues("description"),
        [data.language]: data.description,
      })
      form.setValue("tasks", {
        ...form.getValues("tasks"),
        [data.language]: data.tasks,
      })
      form.trigger("title")
      form.trigger("description")
      form.trigger("tasks")
      toast.success("번역되었습니다.")
    },
    onError: () => {
      toast.error("번역에 실패했습니다.")
    },
  })

  return (
    <>
      <Form {...form}>
        {/* 디버그 모드일 경우 디버그 컴포넌트 표시 */}
        {process.env.NODE_ENV === "development" && <DebugComponent />}

        <form onSubmit={form.handleSubmit(onSubmit)} className='flex space-x-4 py-4'>
          <Card className='flex-grow'>
            <CardHeader>
              <CardTitle className='text-left font-bold text-2xl'>Job Information</CardTitle>
              <CardDescription>공고정보를 입력해주세요.</CardDescription>
            </CardHeader>

            <CardContent className='space-y-8'>
              {!job && (
                <section>
                  <h2 className='mb-2 flex items-center font-semibold text-xl'>
                    <LucideBriefcaseBusiness className='mr-2' /> 사업자 정보
                  </h2>
                  <div className=''>
                    <FormField
                      control={form.control}
                      name='businessId'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <SelectableBusiness
                              key='businessId'
                              value={field.value}
                              onChange={(value) => {
                                form.setValue("businessName", value.name)
                                field.onChange(value.id)
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>
              )}

              <section className='mb-8 space-y-4'>
                <div className='space-y-2'>
                  <h2 className='flex items-center font-semibold text-xl'>
                    <LanguagesIcon className='mr-2' /> 주요 정보
                  </h2>

                  <CardDescription className='text-xs'>
                    언어를 변경해서 공고제목, 공고내용, 주요 업무를 입력해주세요.
                  </CardDescription>

                  <div className='flex items-center justify-between'>
                    <div className='w-[200px] space-y-2'>
                      <FormLabel>언어선택</FormLabel>
                      <Select value={language} onValueChange={(value) => setLanguage(value as LanguageCode)}>
                        <SelectTrigger>
                          <SelectValue placeholder='언어변경' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={LanguageCode.KO_KR}>한국어</SelectItem>
                          <SelectItem value={LanguageCode.EN_US}>영어</SelectItem>
                          <SelectItem value={LanguageCode.VI_VN}>베트남어</SelectItem>
                          <SelectItem value={LanguageCode.MN_MN}>몽골어</SelectItem>
                          <SelectItem value={LanguageCode.UZ_UZ}>우즈베크어</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {language !== LanguageCode.KO_KR && (
                      <Button
                        size='sm'
                        type='button'
                        variant='outline'
                        disabled={translateMutation.isPending}
                        onClick={() => handleTranslate(language)}
                      >
                        {translateMutation.isPending ? (
                          <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 번역중...
                          </>
                        ) : (
                          "언어번역"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>공고제목</FormLabel>
                      <FormControl>
                        <Input
                          id='title'
                          placeholder='공고제목을 입력해주세요.'
                          value={field.value?.[language] || ""}
                          onChange={(e) => {
                            // field.onChange({ ...field.value, [language]: e.target.value });

                            const newValue = e.target.value.trim()
                            if (
                              (language === LanguageCode.KO_KR || language === LanguageCode.EN_US) &&
                              newValue !== field.value?.[language]
                            ) {
                              const newTitleValues = { ...field.value, [language]: newValue }
                              if (language === LanguageCode.KO_KR) {
                                newTitleValues[LanguageCode.EN_US] = ""
                              }
                              newTitleValues[LanguageCode.VI_VN] = ""
                              newTitleValues[LanguageCode.MN_MN] = ""
                              newTitleValues[LanguageCode.UZ_UZ] = ""
                              field.onChange(newTitleValues)
                            } else {
                              field.onChange({ ...field.value, [language]: newValue })
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>예시: [회사이름]에서 [업무내용] 아르바이트 모집</FormDescription>
                      {form.formState.errors.title && (
                        <>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.title[LanguageCode.KO_KR]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.title[LanguageCode.EN_US]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.title[LanguageCode.VI_VN]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.title[LanguageCode.MN_MN]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.title[LanguageCode.UZ_UZ]?.message}
                          </p>
                        </>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>공고내용</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='공고내용을 입력해주세요.'
                          rows={8}
                          value={field.value?.[language] || ""}
                          onChange={(e) => {
                            // field.onChange({ ...field.value, [language]: e.target.value });

                            const newValue = e.target.value.trim()
                            if (
                              (language === LanguageCode.KO_KR || language === LanguageCode.EN_US) &&
                              newValue !== field.value?.[language]
                            ) {
                              const newDescriptionValues = { ...field.value, [language]: newValue }
                              if (language === LanguageCode.KO_KR) {
                                newDescriptionValues[LanguageCode.EN_US] = ""
                              }
                              newDescriptionValues[LanguageCode.VI_VN] = ""
                              newDescriptionValues[LanguageCode.MN_MN] = ""
                              newDescriptionValues[LanguageCode.UZ_UZ] = ""
                              field.onChange(newDescriptionValues)
                            } else {
                              field.onChange({ ...field.value, [language]: newValue })
                            }
                          }}
                        />
                      </FormControl>
                      {form.formState.errors.description && (
                        <>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.description[LanguageCode.KO_KR]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.description[LanguageCode.EN_US]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.description[LanguageCode.VI_VN]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.description[LanguageCode.MN_MN]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.description[LanguageCode.UZ_UZ]?.message}
                          </p>
                        </>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tasks'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>주요 업무</FormLabel>
                      <FormControl>
                        <TagsInput
                          key='tasks'
                          value={field.value?.[language] || []}
                          onValueChange={(tags) => {
                            // const newValue = { ...field.value, [language]: tags };
                            // field.onChange(newValue);

                            if (
                              (language === LanguageCode.KO_KR || language === LanguageCode.EN_US) &&
                              tags !== field.value?.[language]
                            ) {
                              const newTasksValues = { ...field.value, [language]: tags }
                              if (language === LanguageCode.KO_KR) {
                                newTasksValues[LanguageCode.EN_US] = []
                              }
                              newTasksValues[LanguageCode.VI_VN] = []
                              newTasksValues[LanguageCode.MN_MN] = []
                              newTasksValues[LanguageCode.UZ_UZ] = []
                              field.onChange(newTasksValues)
                            } else {
                              field.onChange({ ...field.value, [language]: tags })
                            }
                          }}
                          placeholder='주요 업무를 입력해주세요.'
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                      {form.formState.errors.tasks && (
                        <>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.tasks[LanguageCode.KO_KR]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.tasks[LanguageCode.EN_US]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.tasks[LanguageCode.VI_VN]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.tasks[LanguageCode.MN_MN]?.message}
                          </p>
                          <p className='text-destructive text-xs'>
                            {form.formState.errors.tasks[LanguageCode.UZ_UZ]?.message}
                          </p>
                        </>
                      )}
                    </FormItem>
                  )}
                />
              </section>

              <section className='mb-8 space-y-4'>
                <h2 className='mb-4 flex items-center font-semibold text-xl'>
                  <BriefcaseIcon className='mr-2' /> 기본 정보
                </h2>

                <FormField
                  control={form.control}
                  name='categoryId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>업종</FormLabel>
                      <FormControl>
                        <div className='max-w-md'>
                          <SelectableJobCategory key='categoryId' value={field.value} onChange={field.onChange} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='grid gap-4' style={{ gridTemplateColumns: "200px 1fr" }}>
                  <FormField
                    control={form.control}
                    name='periodType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>근무기간</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder='근무기간을 선택해주세요.' />
                            </SelectTrigger>
                            <SelectContent>
                              {jobPeriodList.map((period) => (
                                <SelectItem key={period.value} value={period.value}>
                                  {period.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='workWeekDays'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>근무요일</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={weekDaysList}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder='근무요일을 선택해주세요.'
                            variant='inverted'
                            maxCount={7}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2' style={{ gridTemplateColumns: "200px 1fr" }}>
                  <FormField
                    control={form.control}
                    name='payType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>급여형태</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder='급여형태를 선택해주세요.' />
                            </SelectTrigger>
                            <SelectContent>
                              {jobPayTypeList.map((payType) => (
                                <SelectItem key={payType.value} value={payType.value}>
                                  {payType.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='payAmount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>급여: 금액 입력 (원)</FormLabel>
                        <FormControl>
                          {/* <Input id="payAmount" placeholder="급여를 입력해주세요." {...field} /> */}
                          <InputCurrency value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='startTime'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>근무시작시간</FormLabel>
                        <FormControl>
                          <TimePicker
                            date={field.value ? parse(field.value, "HH:mm", new Date()) : undefined}
                            setDate={(value) => {
                              field.onChange(format(value!, "HH:mm"))
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='endTime'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>근무종료시간</FormLabel>
                        <FormControl>
                          <TimePicker
                            date={field.value ? parse(field.value, "HH:mm", new Date()) : undefined}
                            setDate={(value) => {
                              field.onChange(format(value!, "HH:mm"))
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='isTimeNegotiable'
                  render={({ field: isTimeNegotiableField }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={isTimeNegotiableField.value ?? false}
                          onCheckedChange={isTimeNegotiableField.onChange}
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel>근무시간 협의 가능(선택 시, &quot;기간 협의&quot; 로 표시됩니다.)</FormLabel>
                        <FormDescription>
                          근무시간 협의 가능 여부를 설정합니다. 근무시간 협의 가능 여부를 설정하지 않으면 근무시간은
                          고정됩니다.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
              <Separator className='my-6' />

              <section className='mb-8 space-y-4'>
                <h2 className='mb-4 flex items-center font-semibold text-xl'>
                  <BriefcaseIcon className='mr-2' /> 우대 사항
                </h2>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='preferentialEducationLevel'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>학력</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder='학력을 선택해주세요.' />
                            </SelectTrigger>
                            <SelectContent>
                              {preferentialEducationLevel.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='preferentialExperience'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>경력</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder='경력을 선택해주세요.' />
                            </SelectTrigger>
                            <SelectContent>
                              {preferentialExperience.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='preferentialKoreanLanguageProficiency'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>한국어 능력</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder='한국어 능력을 선택해주세요.' />
                            </SelectTrigger>
                            <SelectContent>
                              {preferentialKoreanLanguageProficiency.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='preferentialLongTermEmployment'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>장기 근속</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder='장기 근속을 선택해주세요.' />
                            </SelectTrigger>
                            <SelectContent>
                              {preferentialLongTermEmployment.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
              <Separator className='my-6' />

              <section className='mb-8 space-y-4'>
                <h2 className='mb-4 flex items-center font-semibold text-xl'>
                  <BriefcaseIcon className='mr-2' /> 복리 후생
                </h2>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='providedFourMajorSocialInsurances'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>4대보험</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={fourMajorSocialInsurances}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder='4대보험을 선택해주세요.'
                            variant='inverted'
                            maxCount={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='providedAdditionalAllowances'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>추가 수당</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={additionalAllowances}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder='추가 수당을 선택해주세요.'
                            variant='inverted'
                            maxCount={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='providedBonuses'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>보너스</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={bonuses}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder='보너스를 선택해주세요.'
                            variant='inverted'
                            maxCount={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='providedLeaveSystem'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>휴가제도</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={leaveSystem}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder='휴가제도를 선택해주세요.'
                            variant='inverted'
                            maxCount={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='providedMealSupport'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>식사지원</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={mealSupport}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder='식사지원을 선택해주세요.'
                            variant='inverted'
                            maxCount={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='providedAccommodationSupport'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>숙박지원</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={accommodationSupport}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder='숙박지원을 선택해주세요.'
                            variant='inverted'
                            maxCount={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='providedRestSupport'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>휴식지원</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={restSupport}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder='휴식지원을 선택해주세요.'
                            variant='inverted'
                            maxCount={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='providedTransportationSupport'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>교통지원</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={transportationSupport}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder='교통지원을 선택해주세요.'
                            variant='inverted'
                            maxCount={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='providedHealthSupport'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>건강지원</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={healthSupport}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder='건강지원을 선택해주세요.'
                            variant='inverted'
                            maxCount={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='providedOtherSupports'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>기타지원</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={otherSupports}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder='기타지원을 선택해주세요.'
                            variant='inverted'
                            maxCount={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
              <Separator className='my-6' />

              <section className='mb-8 space-y-4'>
                <h2 className='mb-4 flex items-center font-semibold text-xl'>
                  <BriefcaseBusinessIcon className='mr-2' /> 상세정보
                </h2>

                <FormField
                  control={form.control}
                  name='dueType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>마감유형</FormLabel>
                      <FormControl>
                        <RadioGroup orientation='horizontal' defaultValue={field.value} onValueChange={field.onChange}>
                          {jobDueTypeList.map((item) => (
                            <div className='flex items-center space-x-2' key={item.value}>
                              <RadioGroupItem value={item.value} id={item.value} />
                              <Label htmlFor={item.value}>{item.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("dueType") === JobDueType.SPECIFIC_DATE && (
                  <FormField
                    control={form.control}
                    name='dueDate'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "yyyy-MM-dd") : <span>게시마감일 설정</span>}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className='space-y-2'>
                  <Label>주소</Label>
                  <div className='max-w-md space-y-2'>
                    <FormField
                      control={form.control}
                      name='address.zipCode'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormItem>
                            <FormControl>
                              <div className='flex w-full max-w-md items-center space-x-2'>
                                <Input placeholder='우편번호' {...field} readOnly />
                                <Button
                                  variant='outline'
                                  className='w-24'
                                  type='button'
                                  onClick={() => {
                                    openDaumPostcodePopup({ onComplete: handleCompleteDaumZipCode })
                                  }}
                                >
                                  주소검색
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='address.roadAddress'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder='도로명주소'
                                value={field.value?.find((t) => t.language === language)?.text || ""}
                                onChange={(e) => {
                                  const newValue = field.value?.map((t) =>
                                    t.language === language ? { ...t, text: e.target.value } : t,
                                  )
                                  field.onChange(newValue)
                                }}
                                readOnly
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='address.addressDetail'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormItem>
                            <FormControl>
                              <Input placeholder='상세주소' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name='tags'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>태그</FormLabel>
                      <FormControl>
                        <TagsInput
                          key='tags'
                          value={field.value || []}
                          onValueChange={field.onChange}
                          placeholder='태그를 입력해주세요.'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
            </CardContent>
          </Card>
          <Card className='w-[320px]'>
            <CardHeader>
              <CardTitle>상세설정</CardTitle>

              <CardContent className='space-y-4 px-0'>
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>공고 상태</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder='공고 상태를 선택해주세요.' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='OPENED'>구인중</SelectItem>
                            <SelectItem value='CLOSED'>구인종료</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='publishStatus'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>게시 상태</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            if (value !== "PUBLISH_RESERVED") {
                              form.setValue("publishIn", "")
                            }
                            field.onChange(value)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='게시 상태를 선택해주세요.' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='PUBLISHED'>게시됨</SelectItem>
                            <SelectItem value='PUBLISHABLE'>게시가능</SelectItem>
                            <SelectItem value='REJECTED'>거부됨</SelectItem>
                            <SelectItem value='TRANSLATING'>번역중</SelectItem>
                            <SelectItem value='UNDER_REVIEW'>검토중</SelectItem>
                            <SelectItem value='PUBLISH_RESERVED'>예약게시</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='publishIn'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>예약게시일</FormLabel>
                      <FormControl>
                        <Input
                          id='publishIn'
                          type='datetime-local'
                          placeholder='예약게시일을 선택해주세요.'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {job && (
                  <>
                    <div>
                      <Label htmlFor='updatedAt' className='text-sm'>
                        사업정보
                      </Label>
                      <ol className='space-y-1 pl-2 text-sm'>
                        <li>
                          고유번호:{" "}
                          <span className='ml-3 rounded-lg bg-blue-500 px-2 font-semibold text-white text-xs'>
                            {job?.business?.categoryId}
                          </span>
                        </li>
                        <li>회사명: {job?.business?.name}</li>
                        <li>업종: {job?.business?.categoryTitle}</li>
                        <li>대표번호: {job?.business?.phoneNumber || "없음"}</li>
                        <li>사업자번호: {job?.business?.businessNumber || "없음"}</li>
                        <li>
                          회사주소: {job?.business?.address?.roadAddress} {job?.business?.address?.addressDetail}
                        </li>
                      </ol>
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor='updatedAt' className='text-sm'>
                        수정일
                      </Label>
                      <div className='text-gray-500 text-sm'>
                        {format(job?.updatedAt || new Date(), "yyyy-MM-dd HH:mm")}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor='createdAt' className='text-sm'>
                        생성일
                      </Label>
                      <div className='text-gray-500 text-sm'>
                        {format(job?.createdAt || new Date(), "yyyy-MM-dd HH:mm")}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>

              <CardFooter className='flex flex-col gap-2 p-0'>
                {job && (
                  <>
                    <Button variant='outline' className='w-full' asChild>
                      <Link href={`/dashboard/job/${job.id}`}>상세공고</Link>
                    </Button>
                    <Button
                      type='submit'
                      className='w-full'
                      disabled={updateJobMutation.isPending || translateMutation.isPending}
                    >
                      {updateJobMutation.isPending ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 수정중
                        </>
                      ) : (
                        "수정"
                      )}
                    </Button>
                  </>
                )}
                {!job && (
                  <Button
                    type='submit'
                    className='w-full'
                    disabled={createJobMutation.isPending || translateMutation.isPending}
                  >
                    {createJobMutation.isPending ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 생성중
                      </>
                    ) : (
                      "생성"
                    )}
                  </Button>
                )}
              </CardFooter>
            </CardHeader>
          </Card>

          <DevTool control={form.control} />
        </form>
      </Form>
    </>
  )
}
