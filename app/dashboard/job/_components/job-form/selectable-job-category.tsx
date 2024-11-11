'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCallback, useMemo, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

const jobCategories = [
  //   { id: 1, parentId: null, title: '생산/포장/물류' },
  //   { id: 2, parentId: null, title: '생산기술' },
  //   { id: 3, parentId: null, title: '건설노무직' },
  //   { id: 4, parentId: null, title: '건설기능직' },
  //   { id: 5, parentId: null, title: '배달/운송/운전' },
  //   { id: 6, parentId: null, title: '농업/임업/원예' },
  //   { id: 7, parentId: null, title: '어업' },
  //   { id: 8, parentId: null, title: '광업' },
  //   { id: 9, parentId: null, title: '조리/주방/서빙' },
  //   { id: 10, parentId: null, title: '청소/세탁/이사' },
  //   { id: 11, parentId: null, title: '매장판매/전단지배포' },
  //   { id: 12, parentId: null, title: '간병/요양보호/시터' },
  //   { id: 13, parentId: null, title: '미용/네일/화장' },
  //   { id: 14, parentId: null, title: '엔지니어링/연구개발/IT' },
  //   { id: 15, parentId: null, title: '디자인' },
  //   { id: 16, parentId: null, title: '마케팅/기획/조사' },
  //   { id: 17, parentId: null, title: '상담/영업' },
  //   { id: 18, parentId: null, title: '경리/총무/인사' },
  //   { id: 19, parentId: null, title: '학원/강사/과외' },
  //   { id: 20, parentId: null, title: '통역/번역' },
  { id: 1000, parentId: null, title: '건설 / 현장' },
  { id: 1001, parentId: 1000, title: '건축가' },
  { id: 1002, parentId: 1000, title: '건축기사' },
  { id: 1003, parentId: 1000, title: '시공기사' },
  { id: 1004, parentId: 1000, title: '전기기사' },
  { id: 1005, parentId: 1000, title: '토목기사' },
  { id: 1006, parentId: 1000, title: '시설관리자' },
  { id: 1007, parentId: 1000, title: '현장관리자' },
  { id: 1008, parentId: 1000, title: '안전관리자' },
  { id: 1009, parentId: 1000, title: '공무' },
  { id: 1010, parentId: 1000, title: '소방설비' },
  { id: 1011, parentId: 1000, title: '현장보조' },
  { id: 1012, parentId: 1000, title: '감리원' },
  { id: 1013, parentId: 1000, title: '도시 · 조경설계' },
  { id: 1014, parentId: 1000, title: '환경기사' },
  { id: 1015, parentId: 1000, title: '비파괴검사원' },
  { id: 1016, parentId: 1000, title: '공인중개사' },
  { id: 1017, parentId: 1000, title: '감정평가사' },
  { id: 1018, parentId: 1000, title: '분양매니저' },
  { id: 2000, parentId: null, title: '사무 / 경영' },
  { id: 2001, parentId: 2000, title: '경영 · 비즈니스기획' },
  { id: 2002, parentId: 2000, title: '서비스 기획' },
  { id: 2003, parentId: 2000, title: '전략 기획' },
  { id: 2004, parentId: 2000, title: '경영지원' },
  { id: 2005, parentId: 2000, title: '사무담당자' },
  { id: 2006, parentId: 2000, title: '총무' },
  { id: 2007, parentId: 2000, title: '사무보조' },
  { id: 2008, parentId: 2000, title: '법무담당자' },
  { id: 2009, parentId: 2000, title: '비서' },
  { id: 2010, parentId: 2000, title: '인사담당자' },
  { id: 2011, parentId: 2000, title: 'HRD · HRM' },
  { id: 2012, parentId: 2000, title: '노무관리자' },
  { id: 2013, parentId: 2000, title: '잡매니저' },
  { id: 2014, parentId: 2000, title: '헤드헌터' },
  { id: 2015, parentId: 2000, title: '회계담당자' },
  { id: 2016, parentId: 2000, title: '경리' },
  { id: 2017, parentId: 2000, title: '세무담당자' },
  { id: 2018, parentId: 2000, title: '재무담당자' },
  { id: 2019, parentId: 2000, title: '감사' },
  { id: 2020, parentId: 2000, title: 'IR · 공시' },
  { id: 3000, parentId: null, title: '금융 / 보험' },
  { id: 3001, parentId: 3000, title: '금융사무' },
  { id: 3002, parentId: 3000, title: '보험설계사' },
  { id: 3003, parentId: 3000, title: '손해사정사' },
  { id: 3004, parentId: 3000, title: '심사' },
  { id: 3005, parentId: 3000, title: '은행원 · 텔러' },
  { id: 3006, parentId: 3000, title: '계리사' },
  { id: 3007, parentId: 3000, title: '펀드매니저' },
  { id: 3008, parentId: 3000, title: '애널리스트' },
  { id: 4000, parentId: null, title: '교육 / 법률' },
  { id: 4001, parentId: 4000, title: '유치원 · 보육교사' },
  { id: 4002, parentId: 4000, title: '학교 · 특수학교교사' },
  { id: 4003, parentId: 4000, title: '대학교수 · 강사' },
  { id: 4004, parentId: 4000, title: '학원강사' },
  { id: 4005, parentId: 4000, title: '외국어강사' },
  { id: 4006, parentId: 4000, title: '기술 · 전문강사' },
  { id: 4007, parentId: 4000, title: '학습지 · 방문교사' },
  { id: 4008, parentId: 4000, title: '학원상담 · 운영' },
  { id: 4009, parentId: 4000, title: '교직원 · 조교' },
  { id: 4010, parentId: 4000, title: '교재개발 · 교수설계' },
  { id: 4011, parentId: 4000, title: '번역' },
  { id: 4012, parentId: 4000, title: '법률사무원' },
  { id: 4013, parentId: 4000, title: '법학 연구원' },
  { id: 4014, parentId: 4000, title: '사내 변호사' },
  { id: 4015, parentId: 4000, title: '변호사' },
  { id: 4016, parentId: 4000, title: '법무사' },
  { id: 4017, parentId: 4000, title: '변리사' },
  { id: 4018, parentId: 4000, title: '노무사' },
  { id: 4019, parentId: 4000, title: '회계사' },
  { id: 4020, parentId: 4000, title: '세무사' },
  { id: 4021, parentId: 4000, title: '관세사' },
  { id: 5000, parentId: null, title: '사회복지 / 돌봄' },
  { id: 5001, parentId: 5000, title: '사회복지사' },
  { id: 5002, parentId: 5000, title: '요양보호사' },
  { id: 5003, parentId: 5000, title: '환경미화원' },
  { id: 5004, parentId: 5000, title: '보건관리자' },
  { id: 5005, parentId: 5000, title: '사서' },
  { id: 5006, parentId: 5000, title: '자원봉사자' },
  { id: 5007, parentId: 5000, title: '방역 · 방재기사' },
  { id: 5008, parentId: 5000, title: '간병인' },
  { id: 5009, parentId: 5000, title: '베이비시터' },
  { id: 6000, parentId: null, title: '농업 / 어업' },
  { id: 6001, parentId: 6000, title: '농업생산' },
  { id: 6002, parentId: 6000, title: '유기농' },
  { id: 6003, parentId: 6000, title: '어업생산' },
  { id: 6004, parentId: 6000, title: '수산양식' },
  { id: 7000, parentId: null, title: '임업 / 원예업' },
  { id: 7001, parentId: 7000, title: '원예' },
  { id: 7002, parentId: 7000, title: '화훼장식' },
  { id: 7003, parentId: 7000, title: '버섯종균' },
  { id: 7004, parentId: 7000, title: '산림' },
  { id: 7005, parentId: 7000, title: '임업종묘' },
  { id: 7006, parentId: 7000, title: '목재가공' },
  { id: 7007, parentId: 7000, title: '펄프종이제조' },
  { id: 8000, parentId: null, title: '축산업 / 광업' },
  { id: 8001, parentId: 8000, title: '축산' },
  { id: 8002, parentId: 8000, title: '식육처리' },
  { id: 8003, parentId: 8000, title: '광업생산' },
  { id: 9000, parentId: null, title: '식음료' },
  { id: 9001, parentId: 9000, title: '요리사' },
  { id: 9002, parentId: 9000, title: '조리사' },
  { id: 9003, parentId: 9000, title: '제과제빵사' },
  { id: 9004, parentId: 9000, title: '바리스타' },
  { id: 9005, parentId: 9000, title: '셰프 · 주방장' },
  { id: 9006, parentId: 9000, title: '카페 · 레스토랑매니저' },
  { id: 9007, parentId: 9000, title: '홀서버' },
  { id: 9008, parentId: 9000, title: '주방보조' },
  { id: 9009, parentId: 9000, title: '소믈리에 · 바텐더' },
  { id: 9010, parentId: 9000, title: '영양사' },
  { id: 9011, parentId: 9000, title: '식품연구원' },
  { id: 9012, parentId: 9000, title: '푸드스타일리스트' },
  { id: 9013, parentId: 9000, title: '카운터 · 주문접수' },
  { id: 10000, parentId: null, title: '판매 / 매장관리' },
  { id: 10001, parentId: 10000, title: '매장관리자' },
  { id: 10002, parentId: 10000, title: '매장판매' },
  { id: 10003, parentId: 10000, title: '뷰티 · 미용사' },
  { id: 10004, parentId: 10000, title: '주차 · 주유원' },
  { id: 10005, parentId: 10000, title: '운영보조 · 매니저' },
  { id: 11000, parentId: null, title: '여행 / 숙박' },
  { id: 11001, parentId: 11000, title: '호텔종사자' },
  { id: 11002, parentId: 11000, title: '여행에이전트' },
  { id: 12000, parentId: null, title: '경비 / 청소' },
  { id: 12001, parentId: 12000, title: '경호 · 경비' },
  { id: 12002, parentId: 12000, title: '청소' },
  { id: 12003, parentId: 12000, title: '세탁' },
  { id: 12004, parentId: 12000, title: '세차' },
  { id: 12005, parentId: 12000, title: '가사도우미' },
  { id: 13000, parentId: null, title: '정비 / 수리' },
  { id: 13001, parentId: 13000, title: '설치 · 수리기사' },
  { id: 13002, parentId: 13000, title: '정비기사' },
  { id: 14000, parentId: null, title: '전문 서비스 / 고객 지원' },
  { id: 14001, parentId: 14000, title: '안내데스크 · 리셉셔니스트' },
  { id: 14002, parentId: 14000, title: '애견미용 · 훈련' },
  { id: 14003, parentId: 14000, title: '승무원' },
  { id: 14004, parentId: 14000, title: '플로리스트' },
  { id: 14005, parentId: 14000, title: '장례지도사' },
  { id: 14006, parentId: 14000, title: '스타일리스트' },
  { id: 14007, parentId: 14000, title: '이벤트 · 웨딩플래너' },
  { id: 14008, parentId: 14000, title: '전단지 배포' },
  { id: 15000, parentId: null, title: '보건 / 의료' },
  { id: 15001, parentId: 15000, title: '의사' },
  { id: 15002, parentId: 15000, title: '한의사' },
  { id: 15003, parentId: 15000, title: '간호조무사' },
  { id: 15004, parentId: 15000, title: '약사 · 한약사' },
  { id: 15005, parentId: 15000, title: '의료 · 약무보조' },
  { id: 15006, parentId: 15000, title: '의료기사' },
  { id: 15007, parentId: 15000, title: '수의사' },
  { id: 15008, parentId: 15000, title: '수의테크니션' },
  { id: 15009, parentId: 15000, title: '병원코디네이터' },
  { id: 15010, parentId: 15000, title: '원무행정' },
  { id: 15011, parentId: 15000, title: '기타의료종사자' },
  { id: 16000, parentId: null, title: '생산 / 제조' },
  { id: 16001, parentId: 16000, title: '생산직종사자' },
  { id: 16002, parentId: 16000, title: '생산 · 공정관리자' },
  { id: 16003, parentId: 16000, title: '품질관리자' },
  { id: 16004, parentId: 16000, title: '포장 · 가공담당자' },
  { id: 16005, parentId: 16000, title: '공장관리자' },
  { id: 16006, parentId: 16000, title: '용접사' },
  { id: 16007, parentId: 16000, title: '제조' },
  { id: 16008, parentId: 16000, title: '가공' },
  { id: 16009, parentId: 16000, title: '화학' },
  { id: 16010, parentId: 16000, title: '섬유' },
  { id: 16011, parentId: 16000, title: '의복' },
  { id: 16012, parentId: 16000, title: '식품가공' },
  { id: 16013, parentId: 16000, title: '조립' },
  { id: 16014, parentId: 16000, title: '재료' },
  { id: 16015, parentId: 16000, title: '기계' },
  { id: 16016, parentId: 16000, title: '금속' },
  { id: 17000, parentId: null, title: '연구 / 공학' },
  { id: 17001, parentId: 17000, title: '전기 · 전자엔지니어' },
  { id: 17002, parentId: 17000, title: '기계엔지니어' },
  { id: 17003, parentId: 17000, title: '설계엔지니어' },
  { id: 17004, parentId: 17000, title: '설비엔지니어' },
  { id: 17005, parentId: 17000, title: '반도체엔지니어' },
  { id: 17006, parentId: 17000, title: '화학엔지니어' },
  { id: 17007, parentId: 17000, title: '공정엔지니어' },
  { id: 17008, parentId: 17000, title: '하드웨어엔지니어' },
  { id: 17009, parentId: 17000, title: '통신엔지니어' },
  { id: 17010, parentId: 17000, title: 'RF엔지니어' },
  { id: 17011, parentId: 17000, title: '필드엔지니어' },
  { id: 17012, parentId: 17000, title: 'R&D · 연구원' },
  { id: 17013, parentId: 17000, title: '바이오 · 제약연구원' },
  { id: 17014, parentId: 17000, title: '임상연구원' },
  { id: 18000, parentId: null, title: '영업 / 상담' },
  { id: 18001, parentId: 18000, title: '제품영업' },
  { id: 18002, parentId: 18000, title: '서비스영업' },
  { id: 18003, parentId: 18000, title: '해외영업' },
  { id: 18004, parentId: 18000, title: '광고영업' },
  { id: 18005, parentId: 18000, title: '금융영업' },
  { id: 18006, parentId: 18000, title: '법인영업' },
  { id: 18007, parentId: 18000, title: 'IT · 기술영업' },
  { id: 18008, parentId: 18000, title: '영업관리' },
  { id: 18009, parentId: 18000, title: '영업지원' },
  { id: 18010, parentId: 18000, title: '직업상담사' },
  { id: 18011, parentId: 18000, title: '인바운드상담원' },
  { id: 18012, parentId: 18000, title: '아웃바운드상담원' },
  { id: 18013, parentId: 18000, title: '고객센터관리자' },
  { id: 19000, parentId: null, title: '물류 / 운송' },
  { id: 19001, parentId: 19000, title: '물류관리자' },
  { id: 19002, parentId: 19000, title: '구매관리자' },
  { id: 19003, parentId: 19000, title: '자재관리자' },
  { id: 19004, parentId: 19000, title: '유통관리자' },
  { id: 19005, parentId: 19000, title: '무역사무원' },
  { id: 19006, parentId: 19000, title: '납품 · 배송기사' },
  { id: 19007, parentId: 19000, title: '배달기사' },
  { id: 19008, parentId: 19000, title: '수행 · 운전기사' },
  { id: 19009, parentId: 19000, title: '화물 · 중장비기사' },
  { id: 19010, parentId: 19000, title: '버스기사' },
  { id: 19011, parentId: 19000, title: '택시기사' },
  { id: 19012, parentId: 19000, title: '조종 · 기관사' },
  { id: 19013, parentId: 19000, title: '포장 · 일반 이사' },
  { id: 20000, parentId: null, title: '예술 / 디자인' },
  { id: 20001, parentId: 20000, title: '그래픽디자이너' },
  { id: 20002, parentId: 20000, title: '3D디자이너' },
  { id: 20003, parentId: 20000, title: '제품디자이너' },
  { id: 20004, parentId: 20000, title: '산업디자이너' },
  { id: 20005, parentId: 20000, title: '광고디자이너' },
  { id: 20006, parentId: 20000, title: '시각디자이너' },
  { id: 20007, parentId: 20000, title: '영상디자이너' },
  { id: 20008, parentId: 20000, title: '웹디자이너' },
  { id: 20009, parentId: 20000, title: 'UI · UX디자이너' },
  { id: 20010, parentId: 20000, title: '패션디자이너' },
  { id: 20011, parentId: 20000, title: '편집디자이너' },
  { id: 20012, parentId: 20000, title: '실내디자이너' },
  { id: 20013, parentId: 20000, title: '공간디자이너' },
  { id: 20014, parentId: 20000, title: '캐릭터디자이너' },
  { id: 20015, parentId: 20000, title: '환경디자이너' },
  { id: 20016, parentId: 20000, title: '아트디렉터' },
  { id: 20017, parentId: 20000, title: '일러스트레이터' },
  { id: 21000, parentId: null, title: '방송 / 스포츠' },
  { id: 21001, parentId: 21000, title: 'PD · 감독' },
  { id: 21002, parentId: 21000, title: '포토그래퍼' },
  { id: 21003, parentId: 21000, title: '영상편집자' },
  { id: 21004, parentId: 21000, title: '사운드엔지니어' },
  { id: 21005, parentId: 21000, title: '스태프' },
  { id: 21006, parentId: 21000, title: '출판 · 편집' },
  { id: 21007, parentId: 21000, title: '배급 · 제작자' },
  { id: 21008, parentId: 21000, title: '콘텐츠에디터' },
  { id: 21009, parentId: 21000, title: '크리에이터' },
  { id: 21010, parentId: 21000, title: '기자' },
  { id: 21011, parentId: 21000, title: '작가' },
  { id: 21012, parentId: 21000, title: '아나운서' },
  { id: 21013, parentId: 21000, title: '리포터 · 성우' },
  { id: 21014, parentId: 21000, title: 'MC · 쇼호스트' },
  { id: 21015, parentId: 21000, title: '모델' },
  { id: 21016, parentId: 21000, title: '연예인 · 매니저' },
  { id: 21017, parentId: 21000, title: '인플루언서' },
  { id: 21018, parentId: 21000, title: '통번역사' },
  { id: 21019, parentId: 21000, title: '큐레이터' },
  { id: 21020, parentId: 21000, title: '음반기획' },
  { id: 21021, parentId: 21000, title: '스포츠강사' },
  { id: 21022, parentId: 21000, title: '보조출연 · 엑스트라' },
  { id: 22000, parentId: null, title: '마케팅 / 홍보' },
  { id: 22001, parentId: 22000, title: '마케팅기획' },
  { id: 22002, parentId: 22000, title: 'AE(광고기획자)' },
  { id: 22003, parentId: 22000, title: '브랜드마케터' },
  { id: 22004, parentId: 22000, title: '퍼포먼스마케터' },
  { id: 22005, parentId: 22000, title: 'CRM마케터' },
  { id: 22006, parentId: 22000, title: '온라인마케터' },
  { id: 22007, parentId: 22000, title: '콘텐츠마케터' },
  { id: 22008, parentId: 22000, title: '홍보' },
  { id: 22009, parentId: 22000, title: '설문 · 리서치' },
  { id: 22010, parentId: 22000, title: 'MD' },
  { id: 22011, parentId: 22000, title: '카피라이터' },
  { id: 22012, parentId: 22000, title: '크리에이티브디렉터' },
  { id: 22013, parentId: 22000, title: '채널관리자' },
  { id: 22014, parentId: 22000, title: '그로스해커' },
  { id: 23000, parentId: null, title: '개발 / 데이터' },
  { id: 23001, parentId: 23000, title: '백엔드개발자' },
  { id: 23002, parentId: 23000, title: '프론트엔드개발자' },
  { id: 23003, parentId: 23000, title: '웹개발자' },
  { id: 23004, parentId: 23000, title: '앱개발자' },
  { id: 23005, parentId: 23000, title: '시스템엔지니어' },
  { id: 23006, parentId: 23000, title: '네트워크엔지니어' },
  { id: 23007, parentId: 23000, title: 'DBA' },
  { id: 23008, parentId: 23000, title: '데이터엔지니어' },
  { id: 23009, parentId: 23000, title: '데이터사이언티스트' },
  { id: 23010, parentId: 23000, title: '보안엔지니어' },
  { id: 23011, parentId: 23000, title: '소프트웨어개발자' },
  { id: 23012, parentId: 23000, title: '게임개발자' },
  { id: 23013, parentId: 23000, title: '하드웨어개발자' },
  { id: 23014, parentId: 23000, title: '머신러닝엔지니어' },
  { id: 23015, parentId: 23000, title: '블록체인개발자' },
  { id: 23016, parentId: 23000, title: '클라우드엔지니어' },
  { id: 23017, parentId: 23000, title: '웹퍼블리셔' },
  { id: 23018, parentId: 23000, title: 'IT컨설팅' },
  { id: 23019, parentId: 23000, title: 'QA' },
];

const jobCategories1depth = jobCategories.filter(category => category.parentId === null);

export default function SelectableJobCategory({ value, onChange }: { value?: number; onChange: (value: number) => void }) {
  const [open, setOpen] = useState(false);

  const currentParentId = useCallback(() => {
    const item = jobCategories.find(c => c.id === value);
    return item?.parentId;
  }, [value]);

  const buttonText = useMemo(() => {
    if (!value) {
      return '업종선택';
    }
    const item = jobCategories.find(c => c.id === value);
    if (!item) {
      return '업종선택';
    }
    const parentItem = jobCategories.find(c => c.id === item.parentId);
    return parentItem ? `${parentItem.title} > ${item.title}` : item.title;
  }, [value]);

  return (
    <DropdownMenu key="categoryId" open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          {buttonText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="">
        <DropdownMenuLabel>업종</DropdownMenuLabel>

        <DropdownMenuGroup className="">
          <ScrollArea className="h-[400px]">
            {jobCategories1depth.map(category => {
              const subItems = jobCategories.filter(c => c.parentId === category.id);
              if (subItems.length === 0) {
                return <DropdownMenuItem key={category.id}>{category.title}</DropdownMenuItem>;
              }
              return (
                <DropdownMenuSub key={category.id}>
                  <DropdownMenuSubTrigger>
                    <Check className={cn('mr-2 h-4 w-4', category.id === currentParentId() ? 'opacity-100' : 'opacity-0')} />
                    {category.title}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <Command>
                      <CommandInput placeholder="Filter label..." autoFocus={true} />
                      <CommandList>
                        <CommandEmpty>No label found.</CommandEmpty>
                        <CommandGroup>
                          {subItems.map(subCategory => (
                            <CommandItem
                              key={subCategory.id}
                              value={subCategory.title}
                              onSelect={value => {
                                onChange(subCategory.id);
                                setOpen(false);
                              }}
                            >
                              <Check className={cn('mr-2 h-4 w-4', value === subCategory.id ? 'opacity-100' : 'opacity-0')} />
                              {subCategory.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              );
            })}
          </ScrollArea>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
