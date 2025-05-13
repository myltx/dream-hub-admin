<script setup lang="ts">
import { computed, ref } from 'vue';
import { NConfigProvider, darkTheme } from 'naive-ui';
import type { WatermarkProps } from 'naive-ui';
import { useLogto } from '@logto/vue';
import { getUserInfoByUserId } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';
import { useRouterPush } from '@/hooks/common/router';
import { localStg } from '@/utils/storage';
import { useAppStore } from './store/modules/app';
import { useThemeStore } from './store/modules/theme';
import { naiveDateLocales, naiveLocales } from './locales/naive';

defineOptions({
  name: 'App'
});

const { toLogin } = useRouterPush();

const { getIdTokenClaims, fetchUserInfo, getAccessToken, isAuthenticated } = useLogto();
console.log(isAuthenticated.value, 'isAuthenticated111');

const appStore = useAppStore();
const themeStore = useThemeStore();

const naiveDarkTheme = computed(() => (themeStore.darkMode ? darkTheme : undefined));

const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale];
});

const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale];
});

const watermarkProps = computed<WatermarkProps>(() => {
  return {
    content: themeStore.watermark.text,
    cross: true,
    fullscreen: true,
    fontSize: 16,
    lineHeight: 16,
    width: 384,
    height: 384,
    xOffset: 12,
    yOffset: 60,
    rotate: -15,
    zIndex: 9999
  };
});

// if (isAuthenticated.value) {
//   console.log('已登录');
//   const { VITE_BACKEND_ENDPOINT } = import.meta.env;

//   const authStore = useAuthStore();
//   const claims = await getIdTokenClaims();
//   const token = (await getAccessToken(VITE_BACKEND_ENDPOINT)) as string;

//   localStg.set('token', token);
//   localStg.set('refreshToken', token);
//   // 完成后执行某些操作，例如重定向到主页
//   const res = await fetchUserInfo();
//   const userInfo = ref<any>({});
//   const { data } = await getUserInfoByUserId({
//     userId: res?.sub as string
//   });
//   // 暂时并未添加异常处理
//   if (!data) {
//     // await createUser({
//     //   userId: res?.sub,
//     //   email: res?.email,
//     // });
//     // const { data: userData } = await getUserInfoByUserId({
//     //   userId: res?.sub as string,
//     // });
//     // userInfo.value = userData;
//   } else {
//     userInfo.value = data;
//   }
//   authStore.logtoLoginSuccess({
//     userId: res?.sub,
//     token,
//     ...res,
//     ...claims,
//     userInfo: userInfo.value
//   });
// } else {
//   console.log('未登录');
//   // toLogin();
// }
</script>

<template>
  <NConfigProvider
    :theme="naiveDarkTheme"
    :theme-overrides="themeStore.naiveTheme"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    class="h-full"
  >
    <AppProvider>
      <RouterView class="bg-layout" />
      <NWatermark v-if="themeStore.watermark.visible" v-bind="watermarkProps" />
    </AppProvider>
  </NConfigProvider>
</template>

<style scoped></style>
