"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  BuildingIcon,
  CheckCircleIcon,
  TagIcon,
  GraduationCapIcon,
  DollarSignIcon,
  LanguagesIcon,
  PersonStandingIcon,
  CrownIcon,
  SettingsIcon,
  InfoIcon,
  ShieldPlusIcon,
  CircleDollarSignIcon,
  HandCoinsIcon,
  TreePalmIcon,
  UtensilsIcon,
  HousePlusIcon,
  BedSingleIcon,
  BusIcon,
  CalendarDaysIcon,
  LinkIcon,
} from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getJobAction } from "../actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { LanguageCode } from "@/constants/enums"
import { useState } from "react"
import { format, formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  accommodationSupport,
  additionalAllowances,
  bonuses,
  fourMajorSocialInsurances,
  jobDueTypeList,
  jobPayTypeList,
  jobPeriodList,
  leaveSystem,
  mealSupport,
  preferentialEducationLevel,
  preferentialExperience,
  preferentialKoreanLanguageProficiency,
  preferentialLongTermEmployment,
  restSupport,
  transportationSupport,
  weekDaysList,
} from "./job-form/data"

export default function JobDetail({ jobId }: { jobId: number }) {
  const [language, setLanguage] = useState<LanguageCode>(LanguageCode.KO_KR)
  const { data: job } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobAction({ jobId: jobId }),
    initialData: undefined,
  })

  return (
    <div className='container mx-auto space-y-6 p-4'>
      <div className='w-[200px]'>
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
      <Card className='overflow-hidden'>
        <CardHeader className=''>
          <div className='space-y-2'>
            <div className='flex items-start justify-between'>
              <div className='space-x-2'>
                <Badge variant={job?.status === "OPENED" ? "default" : "destructive"} className='mb-2'>
                  {job?.status === "OPENED" ? "구인중" : "구인종료"}
                </Badge>
                <Badge variant='outline' className='mb-2'>
                  {job?.publishStatus === "PUBLISHED"
                    ? "게시됨"
                    : job?.publishStatus === "PUBLISHABLE"
                      ? "게시가능"
                      : job?.publishStatus === "REJECTED"
                        ? "거부됨"
                        : job?.publishStatus === "TRANSLATING"
                          ? "번역중"
                          : job?.publishStatus === "UNDER_REVIEW"
                            ? "검토중"
                            : "예약게시"}
                </Badge>
              </div>
              {job?.createdAt && (
                <time className='text-gray-500 text-sm'>
                  {format(job?.createdAt, "yyyy.MM.dd HH:mm")} (
                  {formatDistanceToNow(job?.createdAt, { addSuffix: true, locale: ko })})
                </time>
              )}
            </div>
            <CardTitle className='font-bold text-3xl'>
              {job?.title.find((t) => t.language === language)?.text}
            </CardTitle>
            <p className='text-xl'>{job?.categoryTitle}</p>
          </div>
        </CardHeader>
        <CardContent className='p-6'>
          <section className='mb-8'>
            <h2 className='mb-4 flex items-center font-semibold text-xl'>
              <InfoIcon className='mr-2' /> 채용 정보
            </h2>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='flex items-center space-x-2 text-sm'>
                <MapPinIcon className='text-gray-500' />
                {/* <span>{job?.business?.address.roadAddress}</span> */}
                <span>
                  {job?.address?.roadAddress || job?.address?.jibunAddress} {job?.address?.addressDetail}
                </span>
              </div>
              <div className='flex items-center space-x-2 text-sm'>
                <CalendarIcon className='text-gray-500' />
                <span>{jobPeriodList.find((t) => t.value === job?.periodType)?.label}</span>
                <span>
                  {job?.workWeekDays
                    ?.map((t) => weekDaysList.find((row) => row.value === t)?.label.slice(0, 1))
                    .join(", ")}
                </span>
              </div>
              <div className='flex items-center space-x-2 text-sm'>
                <ClockIcon className='text-gray-500' />
                {job?.startTime && job?.endTime ? (
                  <span>
                    {job?.startTime} ~ {job?.endTime}
                  </span>
                ) : (
                  <span>근무기간 정보 없음</span>
                )}
              </div>
              <div className='flex items-center space-x-2 text-sm'>
                <DollarSignIcon className='text-gray-500' />
                <div className='space-x-1'>
                  <span>{jobPayTypeList.find((t) => t.value === job?.payType)?.label}</span>
                  <span>{job?.payAmount?.toLocaleString()} 원</span>
                </div>
              </div>
              <div className='flex items-center space-x-2 text-sm'>
                <CalendarDaysIcon className='text-gray-500' />
                <div className='space-x-2'>
                  <span>마감기한: {jobDueTypeList.find((t) => t.value === job?.dueType)?.label}</span>
                  <span>{job?.dueDate ? format(job?.dueDate, "yyyy-MM-dd") : ""}</span>
                </div>
              </div>
            </div>
          </section>

          <Separator className='my-6' />

          <section className='mb-8'>
            <h2 className='mb-4 flex items-center font-semibold text-xl'>
              <SettingsIcon className='mr-2' /> 주요 업무
            </h2>
            {job?.tasks ? (
              <ul className='list-inside list-disc space-y-2'>
                {job.tasks
                  ?.find((t) => t.language === language)
                  ?.text.split(",")
                  .map((task) => (
                    <li key={`${task}-${language}`}>{task}</li>
                  ))}
              </ul>
            ) : (
              <span>주요 업무 정보 없음</span>
            )}
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 flex items-center font-semibold text-xl'>
              <CheckCircleIcon className='mr-2' /> 우대 사항
            </h2>
            {job?.preferential && (
              <ul className='mb-4 list-inside list-disc space-y-2'>
                {job?.preferential
                  ?.filter((t) => t.language === language)
                  ?.map((pref) => (
                    <li key={`${pref.text}-${language}`}>{pref.text}</li>
                  ))}
              </ul>
            )}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <GraduationCapIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>학력사항</span>
                </div>
                <span className='font-semibold text-sm'>
                  {preferentialEducationLevel.find((item) => job?.preferentialItems?.includes(item.value))?.label}
                </span>
              </div>

              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <BuildingIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>경력사항</span>
                </div>
                <span className='font-semibold text-sm'>
                  {preferentialExperience.find((item) => job?.preferentialItems?.includes(item.value))?.label}
                </span>
              </div>

              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <LanguagesIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>한국어능력</span>
                </div>
                <span className='font-semibold text-sm'>
                  {
                    preferentialKoreanLanguageProficiency.find((item) => job?.preferentialItems?.includes(item.value))
                      ?.label
                  }
                </span>
              </div>

              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <PersonStandingIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>장기 근속</span>
                </div>
                <span className='font-semibold text-sm'>
                  {preferentialLongTermEmployment.find((item) => job?.preferentialItems?.includes(item.value))?.label}
                </span>
              </div>
            </div>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 flex items-center font-semibold text-xl'>
              <CrownIcon className='mr-2' /> 복리 후생
            </h2>
            {job?.convenience && (
              <div className='mb-4 flex flex-wrap gap-2'>
                {job?.convenience
                  ?.filter((t) => t.language === language)
                  ?.map((item) => (
                    <Badge key={`${item.text}-${language}`} variant='secondary' className='px-3 py-1 text-sm'>
                      {item.text}
                    </Badge>
                  ))}
              </div>
            )}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <ShieldPlusIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>4대 보험</span>
                </div>
                <span className='font-semibold text-sm'>
                  {fourMajorSocialInsurances
                    .filter((item) => job?.providedItems?.includes(item.value))
                    .map((item) => item.label)
                    .join(", ")}
                </span>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <CircleDollarSignIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>추가 수당</span>
                </div>
                <span className='font-semibold text-sm'>
                  {additionalAllowances
                    .filter((item) => job?.providedItems?.includes(item.value))
                    .map((item) => item.label)
                    .join(", ")}
                </span>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <HandCoinsIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>보너스</span>
                </div>
                <span className='font-semibold text-sm'>
                  {bonuses
                    .filter((item) => job?.providedItems?.includes(item.value))
                    .map((item) => item.label)
                    .join(", ")}
                </span>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <TreePalmIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>휴가제도</span>
                </div>
                <span className='font-semibold text-sm'>
                  {leaveSystem
                    .filter((item) => job?.providedItems?.includes(item.value))
                    .map((item) => item.label)
                    .join(", ")}
                </span>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <UtensilsIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>식사지원</span>
                </div>
                <span className='font-semibold text-sm'>
                  {mealSupport
                    .filter((item) => job?.providedItems?.includes(item.value))
                    .map((item) => item.label)
                    .join(", ")}
                </span>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <HousePlusIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>숙박 지원</span>
                </div>
                <span className='font-semibold text-sm'>
                  {accommodationSupport
                    .filter((item) => job?.providedItems?.includes(item.value))
                    .map((item) => item.label)
                    .join(", ")}
                </span>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <BedSingleIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>휴식 지원</span>
                </div>
                <span className='font-semibold text-sm'>
                  {restSupport
                    .filter((item) => job?.providedItems?.includes(item.value))
                    .map((item) => item.label)
                    .join(", ")}
                </span>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <BusIcon className='text-gray-500' />
                  <span className='text-foreground text-sm'>교통 지원</span>
                </div>
                <span className='font-semibold text-sm'>
                  {transportationSupport
                    .filter((item) => job?.providedItems?.includes(item.value))
                    .map((item) => item.label)
                    .join(", ")}
                </span>
              </div>
            </div>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 font-semibold text-xl'>상세 설명</h2>

            <p className='mb-4 whitespace-pre-wrap'>{job?.description?.find((t) => t.language === language)?.text}</p>
          </section>

          <Separator className='my-6' />

          <section className='mb-8'>
            <h2 className='mb-4 flex items-center font-semibold text-xl'>
              <BuildingIcon className='mr-2' /> 기업 정보
            </h2>
            <div className='space-y-4'>
              <div className='grid grid-cols-[120px_auto] items-center'>
                <div className=''>
                  <Label className='font-bold'>회사 이름:</Label>
                </div>
                <Link
                  className='flex items-center space-x-2 text-blue-500 underline'
                  href={`/dashboard/business/${job?.business?.id}`}
                >
                  {job?.business?.profileImage && (
                    <Avatar className='h-10 w-10'>
                      <AvatarImage src={job?.business?.profileImage?.thumbnailUrl} />
                      <AvatarFallback>{job?.business?.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  )}
                  <p className='text-sm'>{job?.business?.name}</p>
                </Link>
              </div>
              <div className='grid grid-cols-[120px_auto] items-center'>
                <div>
                  <Label className='font-bold'>대표자:</Label>
                </div>
                <p className='text-sm'>{job?.business?.ownerName}</p>
              </div>

              <div className='grid grid-cols-[120px_auto] items-center'>
                <div>
                  <Label className='font-bold'>사업자 등록번호:</Label>
                </div>
                <p className='text-sm'>{job?.business?.businessNumber}</p>
              </div>
              <div className='grid grid-cols-[120px_auto] items-center'>
                <div>
                  <Label className='font-bold'>업종:</Label>
                </div>
                <p className='text-sm'>{job?.business?.categoryTitle}</p>
              </div>
              <div className='grid grid-cols-[120px_auto] items-center'>
                <div>
                  <Label className='font-bold'>주소:</Label>
                </div>
                <p className='text-sm'>{job?.business?.address?.roadAddress}</p>
              </div>
              <div className='grid grid-cols-[120px_auto] items-center'>
                <div>
                  <Label className='font-bold'>연락처:</Label>
                </div>
                <p className='text-sm'>{job?.business?.phoneNumber}</p>
              </div>
              <div className='grid grid-cols-[120px_auto] items-center'>
                <div>
                  <Label className='font-bold'>이메일:</Label>
                </div>
                <p className='text-sm'>{job?.business?.email}</p>
              </div>
            </div>
          </section>

          <Separator className='my-6' />

          <section className='mb-8'>
            <h2 className='mb-4 flex items-center font-semibold text-xl'>
              <TagIcon className='mr-2' /> 태그
            </h2>
            <div className='flex flex-wrap gap-2'>
              {job?.tags?.map((tag, index) => (
                <Badge key={`${index + 1}-${tag}`} variant='outline' className='px-3 py-1 text-sm'>
                  {tag}
                </Badge>
              ))}
            </div>
          </section>

          <Separator className='my-6' />

          <section className=''>
            <h2 className='mb-4 flex items-center font-semibold text-xl'>
              <LinkIcon className='mr-2' /> 출처
            </h2>
            <div className=''>
              {job?.refUrl && (
                <>
                  <div className='text-sm'>{job?.refCode}</div>
                  <Link passHref href={job?.refUrl} target='_blank' className='text-blue-500 text-sm underline'>
                    {job?.refUrl}
                  </Link>
                </>
              )}
            </div>
          </section>
        </CardContent>
        <CardFooter className='flex items-center justify-end space-x-2 border-t pt-4'>
          <Button variant='outline' asChild>
            <Link href={`/dashboard/job`}>목록</Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href={`/dashboard/job/${jobId}/edit`}>수정</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
