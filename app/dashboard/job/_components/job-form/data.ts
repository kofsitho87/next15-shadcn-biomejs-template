import { JobDueType, JobPayType, JobPeriodType, JobProvidedItem, PreferentialItemType } from '@/constants/enums';

export const jobPeriodList = [
  { value: JobPeriodType.UNKNOWN, label: '미정' },
  { value: JobPeriodType.SHORT_TERM, label: '단기' },
  { value: JobPeriodType.ONE_MONTH_OR_MORE, label: '1개월 이상' },
  { value: JobPeriodType.LONG_TERM, label: '장기' },
  { value: JobPeriodType.DISCUSSION, label: '협의' },
];

export const jobPayTypeList = [
  { value: JobPayType.UNKNOWN, label: '미정' },
  { value: JobPayType.HOURLY, label: '시급' },
  { value: JobPayType.DAILY, label: '일급' },
  { value: JobPayType.WEEKLY, label: '주급' },
  { value: JobPayType.MONTHLY, label: '월급' },
  { value: JobPayType.ANNUAL, label: '연봉' },
  { value: JobPayType.DISCUSSION, label: '협의' },
];

export const weekDaysList = [
  { value: 'MON', label: '월요일' },
  { value: 'TUE', label: '화요일' },
  { value: 'WED', label: '수요일' },
  { value: 'THU', label: '목요일' },
  { value: 'FRI', label: '금요일' },
  { value: 'SAT', label: '토요일' },
  { value: 'SUN', label: '일요일' },
];

export const jobDueTypeList = [
  { value: JobDueType.SPECIFIC_DATE, label: '직접설정' },
  { value: JobDueType.NEVER, label: '상시채용' },
  { value: JobDueType.WHEN_HIRED, label: '채용시마감' },
];

//우대사항 - 학력
export const preferentialEducationLevel = [
  { value: PreferentialItemType.NO_MATTER_PREFERRED_EDUCATION_LEVEL, label: '학력 상관없음' },
  { value: PreferentialItemType.BACHELORS_DEGREE_OR_HIGHER, label: '학사 이상' },
  { value: PreferentialItemType.HIGH_SCHOOL_GRADUATE_OR_HIGHER, label: '고등학교 졸업 이상' },
  { value: PreferentialItemType.MIDDLE_SCHOOL_GRADUATE_OR_HIGHER, label: '중학교 졸업 이상' },
];

//우대사항 - 경력
export const preferentialExperience = [
  { value: PreferentialItemType.NO_MATTER_EXPERIENCE, label: '관계없음' },
  { value: PreferentialItemType.EXPERIENCED, label: '경력' },
  { value: PreferentialItemType.ENTRY_LEVEL, label: '신입' },
];

//우대사항 - 한국어 능력
export const preferentialKoreanLanguageProficiency = [
  { value: PreferentialItemType.NO_MATTER_KOREAN_LANGUAGE_PROFICIENCY, label: '한국어 능력 상관없음' },
  { value: PreferentialItemType.TOPIK_LEVEL_1, label: 'TOPIK 1급 이상' },
  { value: PreferentialItemType.TOPIK_LEVEL_2, label: 'TOPIK 2급 이상' },
  { value: PreferentialItemType.TOPIK_LEVEL_3_4, label: 'TOPIK 3~4급' },
  { value: PreferentialItemType.TOPIK_LEVEL_5_6, label: 'TOPIK 5~6급' },
];

//우대사항 - 장기 근속
export const preferentialLongTermEmployment = [
  { value: PreferentialItemType.NO_MATTER_LONG_TERM_EMPLOYMENT, label: '장기 근속 상관없음' },
  { value: PreferentialItemType.CANDIDATES_WILLING_TO_WORK_FOR_3_YEARS_OR_MORE, label: '3년 이상 근속 가능' },
  { value: PreferentialItemType.CANDIDATES_WILLING_TO_WORK_FOR_1_YEAR_OR_MORE, label: '1년 이상 근속 가능' },
];

// 4대 보험
export const fourMajorSocialInsurances = [
  { value: JobProvidedItem.NATIONAL_PENSION, label: '국민 연금' },
  { value: JobProvidedItem.HEALTH_INSURANCE, label: '건강 보험' },
  { value: JobProvidedItem.EMPLOYMENT_INSURANCE, label: '고용 보험' },
  { value: JobProvidedItem.INDUSTRIAL_ACCIDENT_COMPENSATION_INSURANCE, label: '산재 보험' },
];

// 추가 수당
export const additionalAllowances = [
  { value: JobProvidedItem.WEEKLY_HOLIDAY_ALLOWANCE, label: '주휴 수당' },
  { value: JobProvidedItem.SEVERANCE_PAY, label: '퇴직 금' },
  { value: JobProvidedItem.LONG_SERVICE_ALLOWANCE, label: '장기근속 수당' },
  { value: JobProvidedItem.HOLIDAY_WORK_ALLOWANCE, label: '휴일근로 수당' },
  { value: JobProvidedItem.NIGHT_SHIFT_ALLOWANCE, label: '야간근로 수당' },
  { value: JobProvidedItem.OVERTIME_WORK_ALLOWANCE, label: '시간외 근로 수당' },
  { value: JobProvidedItem.WAGE_INCREASE_FOR_LONG_TERM_SERVICE, label: '장기 근무 시급 인상' },
  { value: JobProvidedItem.HAZARD_ALLOWANCE, label: '위험 수당' },
];

// 보너스
export const bonuses = [
  { value: JobProvidedItem.BONUSES, label: '보너스' },
  { value: JobProvidedItem.PERFORMANCE_BONUS, label: '성과금' },
  { value: JobProvidedItem.REGULAR_BONUS, label: '정기 보너스' },
  //   { value: JobProvidedItem.HOLIDAY_BONUS, label: '공휴일 보너스' },
  { value: JobProvidedItem.INCENTIVE_SYSTEM, label: '인센티브제' },
  { value: JobProvidedItem.SUMMER_VACATION_ALLOWANCE, label: '여름 휴가비' },
  { value: JobProvidedItem.CONGRATULATORY_AND_CONDOLENCE_MONEY, label: '경조금' },
];

// 휴가제도
export const leaveSystem = [
  { value: JobProvidedItem.MONTHLY_LEAVE, label: '월차' },
  { value: JobProvidedItem.ANNUAL_LEAVE, label: '연차' },
  { value: JobProvidedItem.REGULAR_LEAVE, label: '정기 휴가' },
];

// 식사지원
export const mealSupport = [
  { value: JobProvidedItem.MEAL_SUPPORT, label: '식비 지원' },
  { value: JobProvidedItem.BREAKFAST_PROVIDED, label: '조식 제공' },
  { value: JobProvidedItem.LUNCH_PROVIDED, label: '중식 제공' },
  { value: JobProvidedItem.DINNER_PROVIDED, label: '석식 제공' },
];

// 숙박지원
export const accommodationSupport = [
  { value: JobProvidedItem.ACCOMMODATION_SUPPORT, label: '주거 지원' },
  { value: JobProvidedItem.DORMITORY_PROVIDED, label: '기숙사 제공' },
  { value: JobProvidedItem.RENT_SUPPORT, label: '월세 지원' },
];

// 휴식지원
export const restSupport = [
  { value: JobProvidedItem.REST_SUPPORT, label: '휴게시간 지원' },
  { value: JobProvidedItem.BREAK_TIME, label: '휴게시간' },
  { value: JobProvidedItem.STAFF_LOUNGE, label: '직원 휴게실' },
];

// 교통 지원
export const transportationSupport = [
  { value: JobProvidedItem.TRANSPORTATION_SUPPORT, label: '교통 지원' },
  { value: JobProvidedItem.COMMUTER_BUS_OPERATION, label: '통근버스 운행' },
  { value: JobProvidedItem.TRANSPORTATION_ALLOWANCE, label: '교통비 지원' },
  { value: JobProvidedItem.VEHICLE_MAINTENANCE_ALLOWANCE, label: '차량유지비 지원' },
  { value: JobProvidedItem.FUEL_SUPPORT, label: '차량 유류대 지원' },
  { value: JobProvidedItem.PARKING_AVAILABLE, label: '주차 가능' },
];

// 건강 지원
export const healthSupport = [{ value: JobProvidedItem.PAID_HEALTH_CHECK_UP, label: '유료 건강검진' }];

// 기타 지원
export const otherSupports = [
  { value: JobProvidedItem.EMPLOYEE_TUITION_SUPPORT, label: '본인 학자금 지원' },
  { value: JobProvidedItem.CHILD_EDUCATION_SUPPORT, label: '자녀 학자금 지원' },
  { value: JobProvidedItem.FAMILY_HEALTH_CHECK_UP_SUPPORT, label: '가족 건강검진 지원' },
  { value: JobProvidedItem.UNIFORM_SUPPORT, label: '근무복 지원' },
  { value: JobProvidedItem.WORK_SHOES_SUPPORT, label: '근무화 지원' },
];
