// src/api/auth.ts
import { apiClient } from '../config/api';

/* =========================
   Local Auth
========================= */

export const localLogin = (email: string, password: string) =>
  apiClient.post('/auth/login/local', { email, password });

export const localSignUp = (
  email: string,
  password: string,
  agreedTermIds: number[]
) => apiClient.post('/auth/signup/local', { email, password, agreedTermIds });

/* =========================
   Social Auth
========================= */

export const getSocialSignUpInfo = () =>
  apiClient.get<{ email: string }>('/auth/signup-info/social');

export const socialSignUp = (agreedTermIds: number[]) =>
  apiClient.post('/auth/signup/social', { agreedTermIds });

export const reissueToken = () => apiClient.post('/auth/reissue');

/* =========================
   Email / Nickname
========================= */

export const checkEmailAvailability = (email: string) =>
  apiClient.get('/auth/email/availability', { params: { email } });

export const getRandomNickname = () =>
  apiClient.get('/auth/nickname/random');

export const checkNicknameAvailability = (nickname: string) =>
  apiClient.get('/auth/nickname/availability', { params: { nickname } });

/* =========================
   Terms
========================= */

export const getTerms = () => apiClient.get('/auth/terms');

export const getTermDetail = (id: number) => apiClient.get(`/auth/terms/${id}`);

export const getMyTerms = () =>
  apiClient.get('/auth/terms/me');

export const updateMyTerms = (
  agreements: Array<{ termId: number; agreed: boolean }>
) => apiClient.patch('/auth/terms/me', { agreements });

/* =========================
   User Info / MyPage
========================= */

export const logout = () => apiClient.post('/auth/logout');

export const deleteAccount = () => apiClient.delete('/auth/delete');

export const updateNickname = (nickname: string) =>
  apiClient.patch('/auth/nickname', { nickname });

/* =========================
   Member Settings - Visibility
========================= */

export type PerformanceVisibility = 'TODAY_ONLY' | 'ALL';
export type SeatVisibility = 'SECTION_ONLY' | 'ROW_ONLY' | 'EXACT_SEAT';

export interface VisibilitySettings {
  performanceVisibility: PerformanceVisibility;
  seatVisibility: SeatVisibility;
}

export const getVisibilitySettings = () =>
  apiClient.get<{ payload: VisibilitySettings }>('/members/me/settings/visibility');

export const updateVisibilitySettings = (data: VisibilitySettings) =>
  apiClient.patch('/members/me/settings/visibility', data);

/* =========================
   Member Settings - Notifications
========================= */

export interface NotificationSettings {
  serviceEnabled: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
}

export const getNotificationSettings = () =>
  apiClient.get<{ payload: NotificationSettings }>('/members/me/settings/notifications');

export const updateNotificationSettings = (data: NotificationSettings) =>
  apiClient.patch('/members/me/settings/notifications', data);