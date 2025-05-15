<script setup lang="ts">
import { computed, ref } from 'vue';
import { getPaletteColorByNumber, mixColor } from '@sa/color';
import { useHandleSignInCallback, useLogto } from '@logto/vue';
import { getUserInfoByUserId } from '@/service/api';
import { useThemeStore } from '@/store/modules/theme';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';
import { localStg } from '@/utils/storage';
import { $t } from '@/locales';

defineOptions({
  name: 'LogtoCallBack'
});

const { VITE_BACKEND_ENDPOINT } = import.meta.env;

const authStore = useAuthStore();
const { getIdTokenClaims, fetchUserInfo, getAccessToken } = useLogto();

const { isLoading } = useHandleSignInCallback(async () => {
  // console.log('回调');
  const claims = await getIdTokenClaims();
  const token = (await getAccessToken(VITE_BACKEND_ENDPOINT)) as string;

  localStg.set('token', token);
  localStg.set('refreshToken', token);
  // 完成后执行某些操作，例如重定向到主页
  const res = await fetchUserInfo();
  const userInfo = ref<any>({});
  const { data } = await getUserInfoByUserId({
    userId: res?.sub as string
  });
  // 暂时并未添加异常处理
  if (!data) {
    // await createUser({
    //   userId: res?.sub,
    //   email: res?.email,
    // });
    // const { data: userData } = await getUserInfoByUserId({
    //   userId: res?.sub as string,
    // });
    // userInfo.value = userData;
  } else {
    userInfo.value = data;
  }
  authStore.logtoLoginSuccess({
    userId: res?.sub,
    token,
    ...res,
    ...claims,
    userInfo: userInfo.value
  });
});

const appStore = useAppStore();
const themeStore = useThemeStore();

const bgThemeColor = computed(() =>
  themeStore.darkMode ? getPaletteColorByNumber(themeStore.themeColor, 600) : themeStore.themeColor
);

const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff';

  const ratio = themeStore.darkMode ? 0.5 : 0.2;

  return mixColor(COLOR_WHITE, themeStore.themeColor, ratio);
});
</script>

<template>
  <div class="relative size-full flex-center overflow-hidden" :style="{ backgroundColor: bgColor }">
    <WaveBg :theme-color="bgThemeColor" />
    <NCard :bordered="false" class="relative z-4 w-auto rd-12px">
      <div class="w-400px lt-sm:w-300px">
        <header class="flex-y-center justify-between">
          <SystemLogo class="text-64px text-primary lt-sm:text-48px" />
          <h3 class="text-28px text-primary font-500 lt-sm:text-22px">{{ $t('system.title') }}</h3>
          <div class="i-flex-col">
            <ThemeSchemaSwitch
              :theme-schema="themeStore.themeScheme"
              :show-tooltip="false"
              class="text-20px lt-sm:text-18px"
              @switch="themeStore.toggleThemeScheme"
            />
            <LangSwitch
              v-if="themeStore.header.multilingual.visible"
              :lang="appStore.locale"
              :lang-options="appStore.localeOptions"
              :show-tooltip="false"
              @change-lang="appStore.changeLocale"
            />
          </div>
        </header>
        <main class="pt-24px">
          <h3 class="text-18px text-primary font-medium">{{ $t('page.logto-call-back.title') }}</h3>
          <div class="pt-24px">
            <Transition :name="themeStore.page.animateMode" mode="out-in" appear>
              <div class="flex items-center justify-center">
                <div
                  v-if="isLoading"
                  class="ml-4 h-6 w-6 animate-spin border-4 border-primary border-t-transparent rounded-full border-solid"
                ></div>
              </div>
            </Transition>
          </div>
        </main>
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
