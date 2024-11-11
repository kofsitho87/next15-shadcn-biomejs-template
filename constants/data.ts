import type { NavItem } from "@/types/index"
import { LanguageCode } from "./enums"

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard",
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "공고",
    url: "/dashboard/job",
    icon: "job",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "회원",
    url: "/dashboard/user",
    icon: "user",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "사업자",
    url: "/dashboard/business",
    icon: "business",
    isActive: false,
    items: [],
  },
  {
    title: "피드",
    url: "/dashboard/feed",
    icon: "feed",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "콘텐츠",
    url: "/dashboard/article",
    icon: "article",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "공지",
    url: "/dashboard/announcement",
    icon: "announcement",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "문의",
    url: "/dashboard/inquiry",
    icon: "inquiry",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "이벤트",
    url: "/dashboard/event",
    icon: "event",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "AI",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "ai",
    isActive: true,
    items: [
      {
        title: "자기소개서",
        url: "/dashboard/self-introduction-prompt",
        icon: "userPen",
      },
      {
        title: "AI 퀴즈",
        url: "/dashboard/ai-quiz",
        icon: "userPen",
      },
      // {
      //   title: 'AI 튜터',
      //   url: '/dashboard/ai-tutor',
      //   icon: 'userPen',
      // },
    ],
  },
  {
    title: "약관",
    url: "/dashboard/term",
    icon: "term",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "업무도구",
    url: "/dashboard/tool",
    icon: "tool",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "관리자",
    url: "/dashboard/admin",
    icon: "admin",
    isActive: false,
    items: [], // No child items
  },
]

export const LanguageCodeLabels: Record<LanguageCode, string> = {
  [LanguageCode.KO_KR]: "한국어",
  [LanguageCode.EN_US]: "미국식 영어",
  [LanguageCode.VI_VN]: "베트남어",
  [LanguageCode.MN_MN]: "몽골어",
  [LanguageCode.UZ_UZ]: "우즈베크어",
  // [LanguageCode.ZH_CN]: '중국어 간체',
  // [LanguageCode.TH_TH]: '태국어',
  // [LanguageCode.JA_JP]: '일본어',
  // [LanguageCode.KM_KH]: '캄보디아어',
  // [LanguageCode.KK_KZ]: '카자흐어',
  // [LanguageCode.MY_MM]: '버마어',
  // [LanguageCode.ZH_TW]: '중화민국어',
  // [LanguageCode.RU_RU]: '러시아어',
  // [LanguageCode.SI_LK]: '싱할라어',
  // [LanguageCode.TL_PH]: '타갈로그어',
  // [LanguageCode.NE_NP]: '네팔어',
  // [LanguageCode.ID_ID]: '인도네시아어',
}
