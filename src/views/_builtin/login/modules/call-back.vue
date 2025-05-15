<script setup lang="ts">
import { ref } from 'vue';
import { useHandleSignInCallback, useLogto } from '@logto/vue';
import { getUserInfoByUserId } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';
import { localStg } from '@/utils/storage';

const { VITE_BACKEND_ENDPOINT } = import.meta.env;

const authStore = useAuthStore();
const { getIdTokenClaims, fetchUserInfo, getAccessToken } = useLogto();
console.log('我是回掉页面');
alert('我是回掉页面');

const { isLoading } = useHandleSignInCallback(async () => {
  console.log('回调');
  alert('回调');
  // try {
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
  // } catch (error) {
  //   console.log('call-back error:--->', error);
  // }
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      v-if="isLoading"
      class="ml-4 h-6 w-6 animate-spin border-4 border-primary border-t-transparent rounded-full border-solid"
    ></div>
  </div>
</template>

<style scoped></style>
