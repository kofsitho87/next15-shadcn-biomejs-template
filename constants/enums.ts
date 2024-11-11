export enum AdminRole {
  MASTER = 'MASTER',
  MANAGER = 'MANAGER',
  TRANSLATOR = 'TRANSLATOR',
  WRITER = 'WRITER',
}

export enum ChatMessageType {
  TEXT = 'TEXT',
  IMAGES = 'IMAGES',
  FILE = 'FILE',
  STICKER = 'STICKER',
  VIDEO = 'VIDEO',
  CARD = 'CARD',
  RESUME = 'RESUME',
  SYSTEM = 'SYSTEM',
}

export enum ConnectSnsType {
  APPLE = 'APPLE',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  ZALO = 'ZALO',
}

export enum NationalityCode {
  // Ref; https://ko.wikipedia.org/wiki/ISO_639
  US = 'US', // 미국
  KR = 'KR', // 한국
  VN = 'VN', // 베트남
  CN = 'CN', // 중국
  TH = 'TH', // 태국
  JP = 'JP', // 일본
  KH = 'KH', // 캄보디아
  KZ = 'KZ', // 카자흐스탄
  MM = 'MM', // 미얀마
  TW = 'TW', // 중화민국
  RU = 'RU', // 러시아
  LK = 'LK', // 스리랑카
  UZ = 'UZ', // 우즈베키스탄
  PH = 'PH', // 필리핀
  NP = 'NP', // 네팔
  ID = 'ID', // 인도네시아
  MN = 'MN', // 몽골
  ETC = 'ETC', // 기타
}

export enum NationalityNameCode {
  US = '미국',
  KR = '한국',
  VN = '베트남',
  CN = '중국',
  TH = '태국',
  JP = '일본',
  KH = '캄보디아',
  KZ = '카자흐스탄',
  MM = '미얀마',
  TW = '중화민국',
  RU = '러시아',
  LK = '스리랑카',
  UZ = '우즈베키스탄',
  PH = '필리핀',
  NP = '네팔',
  ID = '인도네시아',
  MN = '몽골',
  ETC = '기타',
}

export enum LanguageCode {
  // Ref; https://ko.wikipedia.org/wiki/%EA%B5%AD%EA%B0%80%EB%B3%84_%EA%B5%AD%EA%B0%80_%EC%BD%94%EB%93%9C_%EB%AA%A9%EB%A1%9D
  // Ref; https://coderzero.tistory.com/entry/%EA%B8%B0%ED%83%80-%EA%B5%AD%EA%B0%80%EB%B3%84-%EC%96%B8%EC%96%B4-%EC%BD%94%EB%93%9C
  KO_KR = 'KO_KR', // 한국어
  EN_US = 'EN_US', // 미국식 영어
  VI_VN = 'VI_VN', // 베트남
  MN_MN = 'MN_MN', // 몽골
  UZ_UZ = 'UZ_UZ', // 우즈베키스탄 - 우즈베크어
  // ZH_CN = 'ZH_CN', // 중국어 간체
  // TH_TH = 'TH_TH', // 태국
  // JA_JP = 'JA_JP', // 일본어
  // KM_KH = 'KM_KH', // 캄보디아 - 크메르어
  // KK_KZ = 'KK_KZ', // 카자흐스탄 - 카자흐어
  // MY_MM = 'MY_MM', // 미얀마 - 버마어
  // ZH_TW = 'ZH_TW', // 중화민국
  // RU_RU = 'RU_RU', // 러시아
  // SI_LK = 'SI_LK', // 스리랑카 - 싱할라어
  // TL_PH = 'TL_PH', // 필리핀 - 타갈로그어
  // NE_NP = 'NE_NP', // 네팔
  // ID_ID = 'ID_ID', // 인도네시아
}

export enum JobType {
  BUSINESS = 'BUSINESS',
  SYSTEM = 'SYSTEM',
  FREE = 'FREE',
}

export enum JobPeriodType {
  UNKNOWN = 'UNKNOWN',
  SHORT_TERM = 'SHORT_TERM',
  ONE_MONTH_OR_MORE = 'ONE_MONTH_OR_MORE',
  LONG_TERM = 'LONG_TERM',
  DISCUSSION = 'DISCUSSION',
}

export enum JobPayType {
  UNKNOWN = 'UNKNOWN',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
  DISCUSSION = 'DISCUSSION',
}

export enum JobDueType {
  UNKNOWN = 'UNKNOWN',
  NEVER = 'NEVER',
  SPECIFIC_DATE = 'SPECIFIC_DATE',
  WHEN_HIRED = 'WHEN_HIRED',
}

export enum BusinessType {
  MAJOR = 'MAJOR', // 대기업 // 총저선 >5000b,
  MIDSIZE = 'MIDSIZE', // 중견기업 // 총자산 500b~5000b, 3년 평균매출 40b~150b, 근로자 >1k
  SMALL_MEDIUM = 'SMALL_MEDIUM', // 중소기업 // 총자산 <500b, 대부분
  SMALL_MEDIUM_STRONG = 'SMALL_MEDIUM_STRONG', // 강소기업 // 중소기업 중, 2년 인금체불x, 고용유지율 높음, 산재사망x, 근로자 >10 (건설업 >30)
  VENTURE = 'VENTURE', // 벤처기업
  PUBLIC_INSTITUTION = 'PUBLIC_INSTITUTION', // 공공기관
  SERVICE = 'SERVICE',
  UNKNOWN = 'UNKNOWN',
}

export enum BusinessEmployeesCountCode {
  UNDER_5 = 'UNDER_5',
  FROM_5_UNDER_10 = 'FROM_5_UNDER_10',
  FROM_10_UNDER_30 = 'FROM_10_UNDER_30',
  FROM_30_UNDER_50 = 'FROM_30_UNDER_50',
  FROM_50_UNDER_100 = 'FROM_50_UNDER_100',
  FROM_100 = 'FROM_100',
}

export enum UploadImageTarget {
  USER_PROFILE_IMAGE = 'USER_PROFILE_IMAGE',
  FEED_IMAGE = 'FEED_IMAGE',
  JOB_IMAGE = 'JOB_IMAGE',
  BUSINESS_PROFILE_IMAGE = 'BUSINESS_PROFILE_IMAGE',
  BUSINESS_IMAGE = 'BUSINESS_IMAGE',
  CHAT_MESSAGE_IMAGE = 'CHAT_MESSAGE_IMAGE',
  INQUIRY_IMAGE = 'INQUIRY_IMAGE',
}

export enum UploadFileTarget {
  CHAT_MESSAGE_FILE = 'CHAT_MESSAGE_FILE',
}

export enum WeekDay {
  SUN = 'SUN',
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
}

export enum ReportTarget {
  FEED = 'FEED',
  FEED_COMMENT = 'FEED_COMMENT',
  JOB = 'JOB',
  JOB_COMMENT = 'JOB_COMMENT',
  BUSINESS = 'BUSINESS',
  BUSINESS_CHAT_ROOM = 'BUSINESS_CHAT_ROOM',
  // COMPANY = 'COMPANY',
  CHAT_ROOM = 'CHAT_ROOM',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  USER = 'USER',
}

export enum ContextMenuTarget {
  FEED = 'FEED',
  FEED_COMMENT = 'FEED_COMMENT',
  JOB = 'JOB',
  JOB_COMMENT = 'JOB_COMMENT',
  BUSINESS = 'BUSINESS',
  // COMPANY = 'COMPANY',
  CHAT_ROOM = 'CHAT_ROOM',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  USER = 'USER',
}

export enum LegalTarget {
  USER_APP = 'USER_APP',
  BUSINESS_WEB = 'BUSINESS_WEB',
}

export enum VisaCode {
  H2 = 'H2',
  F4 = 'F4',
  F2 = 'F2',
  F5 = 'F5',
  F6 = 'F6',
  E9 = 'E9',
  E7 = 'E7',
  D2 = 'D2',
  D4 = 'D4',
  D10 = 'D10',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

export enum JobStatus {
  CLOSED = 'CLOSED',
  OPENED = 'OPENED',
}

export enum JobPublishStatus {
  UNDER_REVIEW = 'UNDER_REVIEW',
  TRANSLATING = 'TRANSLATING',
  REJECTED = 'REJECTED',
  PUBLISHABLE = 'PUBLISHABLE',
  PUBLISHED = 'PUBLISHED',
  PUBLISH_RESERVED = 'PUBLISH_RESERVED',
}

export enum PreferentialItemType {
  // 학력
  NO_MATTER_PREFERRED_EDUCATION_LEVEL = 'NO_MATTER_PREFERRED_EDUCATION_LEVEL', // 학력 상관없음
  BACHELORS_DEGREE_OR_HIGHER = 'BACHELORS_DEGREE_OR_HIGHER', // 학사 이상
  HIGH_SCHOOL_GRADUATE_OR_HIGHER = 'HIGH_SCHOOL_GRADUATE_OR_HIGHER', // 고등학교 졸업 이상
  MIDDLE_SCHOOL_GRADUATE_OR_HIGHER = 'MIDDLE_SCHOOL_GRADUATE_OR_HIGHER', // 중학교 졸업 이상

  // 경력
  NO_MATTER_EXPERIENCE = 'NO_MATTER_EXPERIENCE', // 관계없음
  EXPERIENCED = 'EXPERIENCED', // 경력
  ENTRY_LEVEL = 'ENTRY_LEVEL', // 신입

  // 한국어 능력
  NO_MATTER_KOREAN_LANGUAGE_PROFICIENCY = 'NO_MATTER_KOREAN_LANGUAGE_PROFICIENCY', // 한국어 능력 상관없음
  TOPIK_LEVEL_5_6 = 'TOPIK_LEVEL_5_6', // TOPIK 5급 이상
  TOPIK_LEVEL_3_4 = 'TOPIK_LEVEL_3_4', // TOPIK 3, 4급
  TOPIK_LEVEL_2 = 'TOPIK_LEVEL_2', // TOPIK 2급 이상
  TOPIK_LEVEL_1 = 'TOPIK_LEVEL_1', // TOPIK 1급 이상

  // 장기 근속
  NO_MATTER_LONG_TERM_EMPLOYMENT = 'NO_MATTER_LONG_TERM_EMPLOYMENT', // 장기 근속 상관없음
  CANDIDATES_WILLING_TO_WORK_FOR_3_YEARS_OR_MORE = 'CANDIDATES_WILLING_TO_WORK_FOR_3_YEARS_OR_MORE', // 3년 이상 근속 가능
  CANDIDATES_WILLING_TO_WORK_FOR_1_YEAR_OR_MORE = 'CANDIDATES_WILLING_TO_WORK_FOR_1_YEAR_OR_MORE', // 1년 이상 근속 가능
}

export enum JobProvidedItem {
  //4대 보험
  FOUR_MAJOR_SOCIAL_INSURANCES = 'FOUR_MAJOR_SOCIAL_INSURANCES', // 4대 보험
  NATIONAL_PENSION = 'NATIONAL_PENSION', // 국민 연금
  HEALTH_INSURANCE = 'HEALTH_INSURANCE', // 건강 보험
  EMPLOYMENT_INSURANCE = 'EMPLOYMENT_INSURANCE', // 고용 보험
  INDUSTRIAL_ACCIDENT_COMPENSATION_INSURANCE = 'INDUSTRIAL_ACCIDENT_COMPENSATION_INSURANCE', // 산재 보험

  // 추가 수당
  ADDITIONAL_ALLOWANCES = 'ADDITIONAL_ALLOWANCES', // 추가 혜택
  WEEKLY_HOLIDAY_ALLOWANCE = 'WEEKLY_HOLIDAY_ALLOWANCE', // 주휴 수당
  SEVERANCE_PAY = 'SEVERANCE_PAY', // 퇴직 금
  LONG_SERVICE_ALLOWANCE = 'LONG_SERVICE_ALLOWANCE', // 장기근속 수당
  HOLIDAY_WORK_ALLOWANCE = 'HOLIDAY_WORK_ALLOWANCE', // 공휴일근무 수당
  NIGHT_SHIFT_ALLOWANCE = 'NIGHT_SHIFT_ALLOWANCE', // 야간근로 수당
  WAGE_INCREASE_FOR_LONG_TERM_SERVICE = 'WAGE_INCREASE_FOR_LONG_TERM_SERVICE', // 장기 근무 시급 인상
  OVERTIME_WORK_ALLOWANCE = 'OVERTIME_WORK_ALLOWANCE', // 연장근로 수당
  HAZARD_ALLOWANCE = 'HAZARD_ALLOWANCE', // 위험 수당

  // 보너스
  BONUSES = 'BONUSES', // 보너스
  PERFORMANCE_BONUS = 'PERFORMANCE_BONUS', // 성과금
  REGULAR_BONUS = 'REGULAR_BONUS', // 정기 보너스
  HOLIDAY_BONUS = 'HOLIDAY_BONUS', // 공휴일 보너스
  INCENTIVE_SYSTEM = 'INCENTIVE_SYSTEM', // 인센티브제
  SUMMER_VACATION_ALLOWANCE = 'SUMMER_VACATION_ALLOWANCE', // 여름 휴가비
  CONGRATULATORY_AND_CONDOLENCE_MONEY = 'CONGRATULATORY_AND_CONDOLENCE_MONEY', // 경조금

  // 휴가제도
  LEAVE_SYSTEM = 'LEAVE_SYSTEM', // 휴가 시스템
  MONTHLY_LEAVE = 'MONTHLY_LEAVE', // 월차
  ANNUAL_LEAVE = 'ANNUAL_LEAVE', // 연차
  REGULAR_LEAVE = 'REGULAR_LEAVE', // 정기 휴가

  // 식사지원
  MEAL_SUPPORT = 'MEAL_SUPPORT', // 식비 지원
  BREAKFAST_PROVIDED = 'BREAKFAST_PROVIDED', // 조식 제공
  LUNCH_PROVIDED = 'LUNCH_PROVIDED', // 중식 제공
  DINNER_PROVIDED = 'DINNER_PROVIDED', // 석식 제공

  // 숙박지원
  ACCOMMODATION_SUPPORT = 'ACCOMMODATION_SUPPORT', // 주거 지원
  DORMITORY_PROVIDED = 'DORMITORY_PROVIDED', // 기숙사 제공
  RENT_SUPPORT = 'RENT_SUPPORT', // 월세 지원

  // 휴식지원
  REST_SUPPORT = 'REST_SUPPORT', // 휴게시간 지원
  BREAK_TIME = 'BREAK_TIME', // 휴게시간
  STAFF_LOUNGE = 'STAFF_LOUNGE', // 직원 휴게실

  // 교통 지원
  TRANSPORTATION_SUPPORT = 'TRANSPORTATION_SUPPORT', // 교통 지원
  COMMUTER_BUS_OPERATION = 'COMMUTER_BUS_OPERATION', // 통근버스 운행
  TRANSPORTATION_ALLOWANCE = 'TRANSPORTATION_ALLOWANCE', // 교통비 지원
  VEHICLE_MAINTENANCE_ALLOWANCE = 'VEHICLE_MAINTENANCE_ALLOWANCE', // 차량유지비 지원
  FUEL_SUPPORT = 'FUEL_SUPPORT', // 차량 유류대 지원
  PARKING_AVAILABLE = 'PARKING_AVAILABLE', // 주차 가능

  // 건강 지원
  HEALTH_SUPPORT = 'HEALTH_SUPPORT', // 건강 지원
  PAID_HEALTH_CHECK_UP = 'PAID_HEALTH_CHECK_UP', // 유료 건강검진

  // 기타 지원
  OTHER_SUPPORTS = 'OTHER_SUPPORTS', // 기타 지원
  EMPLOYEE_TUITION_SUPPORT = 'EMPLOYEE_TUITION_SUPPORT', // 본인 학자금 지원
  CHILD_EDUCATION_SUPPORT = 'CHILD_EDUCATION_SUPPORT', // 자녀 학자금 지원
  FAMILY_HEALTH_CHECK_UP_SUPPORT = 'FAMILY_HEALTH_CHECK_UP_SUPPORT', // 가족 건강검진 지원
  UNIFORM_SUPPORT = 'UNIFORM_SUPPORT', // 근무복 지원
  WORK_SHOES_SUPPORT = 'WORK_SHOES_SUPPORT', // 근무화 지원
}
