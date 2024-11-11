import { JobDueType, JobPayType, JobPeriodType, JobProvidedItem, JobStatus, WeekDay } from '@/constants/enums';
import { JobPublishStatus } from '@/constants/enums';
import { z } from 'zod';
import { LanguageCode } from '@/constants/enums';
import { IntegerString } from '@/lib/zod.validation.utils';
import { PreferentialItemType } from '@/constants/enums';

const baseSchema = z.object({
  // businessId: IntegerString(
  //   z
  //     .number({
  //       errorMap: () => ({ message: '사업자를 선택해주세요.' }),
  //     })
  //     .positive('사업자를 선택해주세요.'),
  // ),

  title: z.object({
    [LanguageCode.KO_KR]: z
      .string({
        errorMap: () => ({ message: '한국어 공고제목을 입력해주세요.' }),
      })
      .min(1, '한국어 공고제목을 입력해주세요.'),
    [LanguageCode.EN_US]: z
      .string({
        errorMap: () => ({ message: '영어 공고제목을 입력해주세요.' }),
      })
      .min(1, '영어 공고제목을 입력해주세요.'),
    [LanguageCode.VI_VN]: z
      .string({
        errorMap: () => ({ message: '베트남어 공고제목을 입력해주세요.' }),
      })
      .min(1, '베트남어 공고제목을 입력해주세요.'),
    [LanguageCode.MN_MN]: z
      .string({
        errorMap: () => ({ message: '몽골어 공고제목을 입력해주세요.' }),
      })
      .min(1, '몽골어 공고제목을 입력해주세요.'),
    [LanguageCode.UZ_UZ]: z
      .string({
        errorMap: () => ({ message: '우즈베크어 공고제목을 입력해주세요.' }),
      })
      .min(1, '우즈베크어 공고제목을 입력해주세요.'),
  }),
  // .array(
  //   z.object({
  //     language: z.nativeEnum(LanguageCode),
  //     text: z
  //       .string({
  //         errorMap: () => ({ message: '공고제목을 입력해주세요.' }),
  //       })
  //       .min(1, '공고제목을 입력해주세요.'),
  //   }),
  // )
  // .min(1, '공고제목을 입력해주세요.'),
  description: z.object({
    [LanguageCode.KO_KR]: z
      .string({
        errorMap: () => ({ message: '한국어 공고내용을 입력해주세요.' }),
      })
      .min(1, '한국어 공고내용을 입력해주세요.'),
    [LanguageCode.EN_US]: z
      .string({
        errorMap: () => ({ message: '영어 공고내용을 입력해주세요.' }),
      })
      .min(1, '영어 공고내용을 입력해주세요.'),
    [LanguageCode.VI_VN]: z
      .string({
        errorMap: () => ({ message: '베트남어 공고내용을 입력해주세요.' }),
      })
      .min(1, '베트남어 공고내용을 입력해주세요.'),
    [LanguageCode.MN_MN]: z
      .string({
        errorMap: () => ({ message: '몽골어 공고내용을 입력해주세요.' }),
      })
      .min(1, '몽골어 공고내용을 입력해주세요.'),
    [LanguageCode.UZ_UZ]: z
      .string({
        errorMap: () => ({ message: '우즈베크어 공고내용을 입력해주세요.' }),
      })
      .min(1, '우즈베크어 공고내용을 입력해주세요.'),
  }),

  // 업무 내용
  tasks: z.object({
    [LanguageCode.KO_KR]: z
      .array(z.string(), {
        message: '한국어 업무 내용을 입력해주세요.',
      })
      .min(1, '한국어 업무 내용을 입력해주세요.'),
    [LanguageCode.EN_US]: z
      .array(z.string(), {
        message: '영어 업무 내용을 입력해주세요.',
      })
      .min(1, '영어 업무 내용을 입력해주세요.'),
    [LanguageCode.VI_VN]: z
      .array(z.string(), {
        message: '베트남어 업무 내용을 입력해주세요.',
      })
      .min(1, '베트남어 업무 내용을 입력해주세요.'),
    [LanguageCode.MN_MN]: z
      .array(z.string(), {
        message: '몽골어 업무 내용을 입력해주세요.',
      })
      .min(1, '몽골어 업무 내용을 입력해주세요.'),
    [LanguageCode.UZ_UZ]: z
      .array(z.string(), {
        message: '우즈베크어 업무 내용을 입력해주세요.',
      })
      .min(1, '우즈베크어 업무 내용을 입력해주세요.'),
  }),

  //우대사항 - 학력
  preferentialEducationLevel: z.nativeEnum(PreferentialItemType, {
    errorMap: () => ({ message: '학력을 선택해주세요.' }),
  }),
  //우대사항 - 경력
  preferentialExperience: z.nativeEnum(PreferentialItemType, {
    errorMap: () => ({ message: '경력을 선택해주세요.' }),
  }),
  //우대사항 - 한국어 능력
  preferentialKoreanLanguageProficiency: z.nativeEnum(PreferentialItemType, {
    errorMap: () => ({ message: '한국어 능력을 선택해주세요.' }),
  }),
  //우대사항 - 장기 근속
  preferentialLongTermEmployment: z.nativeEnum(PreferentialItemType, {
    errorMap: () => ({ message: '장기 근속을 선택해주세요.' }),
  }),

  // 근무 편의
  // 4대보험
  providedFourMajorSocialInsurances: z.array(z.nativeEnum(JobProvidedItem)).optional(),
  // 추가수당
  providedAdditionalAllowances: z.array(z.nativeEnum(JobProvidedItem)).optional(),
  // 보너스
  providedBonuses: z.array(z.nativeEnum(JobProvidedItem)).optional(),
  // 휴가제도
  providedLeaveSystem: z.array(z.nativeEnum(JobProvidedItem)).optional(),
  // 식사지원
  providedMealSupport: z.array(z.nativeEnum(JobProvidedItem)).optional(),
  // 숙박지원
  providedAccommodationSupport: z.array(z.nativeEnum(JobProvidedItem)).optional(),
  // 휴식지원
  providedRestSupport: z.array(z.nativeEnum(JobProvidedItem)).optional(),
  // 교통 지원
  providedTransportationSupport: z.array(z.nativeEnum(JobProvidedItem)).optional(),
  // 건강 지원
  providedHealthSupport: z.array(z.nativeEnum(JobProvidedItem)).optional(),
  // 기타 지원
  providedOtherSupports: z.array(z.nativeEnum(JobProvidedItem)).optional(),

  payType: z.nativeEnum(JobPayType, {
    errorMap: () => ({ message: '급여형태를 선택해주세요.' }),
  }),
  payAmount: IntegerString(
    z
      .number({
        errorMap: () => ({ message: '숫자만 입력해주세요.' }),
      })
      .min(1, '급여는 필수입니다.'),
  ),

  categoryId: z
    .number({
      errorMap: () => ({ message: '업종을 선택해주세요.' }),
    })
    .positive('업종을 선택해주세요.'),

  // 근무기간
  periodType: z.nativeEnum(JobPeriodType),

  // 근무요일
  workWeekDays: z.array(z.nativeEnum(WeekDay)).min(1, '근무요일을 선택해주세요.'),

  // 근무시작시간
  startTime: z.string().optional(),
  // 근무종료시간
  endTime: z.string().optional(),

  // 근무시간 협의 여부
  isTimeNegotiable: z.boolean().optional().nullable(),

  // 마감유형
  dueType: z.nativeEnum(JobDueType, {
    errorMap: () => ({ message: '마감유형을 선택해주세요.' }),
  }),

  // 마감일
  dueDate: z.date().optional(),

  // 주소
  address: z.object({
    jibunAddress: z.array(
      z.object({
        language: z.nativeEnum(LanguageCode),
        text: z.string(),
      }),
    ),
    roadAddress: z
      .array(
        z.object({
          language: z.nativeEnum(LanguageCode),
          text: z.string(),
        }),
      )
      .min(1, '주소를 입력해주세요.'),
    addressDetail: z
      .string({
        errorMap: () => ({ message: '상세주소를 입력해주세요.' }),
      })
      .min(1, '상세주소를 입력해주세요.'),
    zipCode: z
      .string({
        errorMap: () => ({ message: '우편번호를 입력해주세요.' }),
      })
      .min(1, '우편번호를 입력해주세요.'),
    //읍면동 코드
    townCode: z.string({
      errorMap: () => ({ message: '읍면동 코드를 입력해주세요.' }),
    }),
    // location: z
    //   .object({
    //     latitude: IntegerString(z.number()),
    //     longitude: IntegerString(z.number()),
    //   })
    //   .nullable()
    //   .optional(),
  }),

  status: z.nativeEnum(JobStatus, {
    errorMap: () => ({ message: '상태를 선택해주세요.' }),
  }),
  publishStatus: z.nativeEnum(JobPublishStatus, {
    errorMap: () => ({ message: '공개상태를 선택해주세요.' }),
  }),
  publishIn: z.string().optional(),

  tags: z.array(z.string()).optional(),
});
// .superRefine((data, ctx) => {
//   if (data.dueType === JobDueType.SPECIFIC_DATE && !data.dueDate) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: '마감일을 입력해주세요.',
//       path: ['dueDate'],
//     });
//   }
// });

export const commonFormSchema = baseSchema.superRefine((data, ctx) => {
  if (data.dueType === JobDueType.SPECIFIC_DATE && !data.dueDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '마감일을 입력해주세요.',
      path: ['dueDate'],
    });
  }
});
export type CommonFormData = z.infer<typeof commonFormSchema>;

export const createFormSchema = baseSchema.extend({
  businessId: IntegerString(z.number({ errorMap: () => ({ message: '사업자를 선택해주세요.' }) })),
  businessName: z.string().optional(),
});

export type CreateFormData = z.infer<typeof createFormSchema>;
