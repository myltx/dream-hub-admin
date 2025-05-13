<script setup lang="ts">
import { computed } from 'vue';
import type { VNode } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { useRouterPush } from '@/hooks/common/router';
import { useSvgIcon } from '@/hooks/common/icon';
import { $t } from '@/locales';

defineOptions({
  name: 'UserAvatar'
});
const { VITE_BACKEND_ENDPOINT } = import.meta.env;
const authStore = useAuthStore();
const { routerPushByKey, toLogin } = useRouterPush();
const { SvgIconVNode } = useSvgIcon();

function loginOrRegister() {
  toLogin();
}

type DropdownKey = 'logout' | 'lookEffect';

type DropdownOption =
  | {
      key: DropdownKey;
      label: string;
      icon?: () => VNode;
    }
  | {
      type: 'divider';
      key: string;
    };

const options = computed(() => {
  const opts: DropdownOption[] = [
    // {
    //   label: $t('common.logout'),
    //   key: 'logout',
    //   icon: SvgIconVNode({ icon: 'ph:sign-out', fontSize: 18 })
    // },
    {
      label: $t('common.lookEffect'),
      key: 'lookEffect',
      icon: SvgIconVNode({ icon: 'ph:sign-out', fontSize: 18 })
    }
  ];

  return opts;
});

function logout() {
  window.$dialog?.info({
    title: $t('common.tip'),
    content: $t('common.logoutConfirm'),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      // window.location.href = 'http://localhost:3000';
      authStore.resetStore();
    }
  });
}

function lookEffect() {
  window.$dialog?.info({
    title: $t('common.tip'),
    content: $t('common.lookEffectConfirm'),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      window.location.href = VITE_BACKEND_ENDPOINT;
      // const { signOut } = useLogto();
      // const { VITE_LOGTO_SIGN_OUT_REDIRECT_URI } = import.meta.env;
      // authStore.resetStore();
      // signOut(VITE_LOGTO_SIGN_OUT_REDIRECT_URI);
    }
  });
}

function handleDropdown(key: DropdownKey) {
  if (key === 'logout') {
    logout();
  } else if (key === 'lookEffect') {
    lookEffect();
  } else {
    // If your other options are jumps from other routes, they will be directly supported here
    routerPushByKey(key);
  }
}
</script>

<template>
  <NButton v-if="!authStore.isLogin" quaternary @click="loginOrRegister">
    {{ $t('page.login.common.loginOrRegister') }}
  </NButton>
  <NDropdown v-else placement="bottom" trigger="click" :options="options" @select="handleDropdown">
    <div>
      <ButtonIcon>
        <SvgIcon icon="ph:user-circle" class="text-icon-large" />
        <span class="text-16px font-medium">{{ authStore.userInfo.username }}</span>
      </ButtonIcon>
    </div>
  </NDropdown>
</template>

<style scoped></style>
