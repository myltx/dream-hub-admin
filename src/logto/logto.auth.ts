import { useLogto } from '@logto/vue';

const { VITE_LOGTO_SIGN_IN_REDIRECT_URI, VITE_LOGTO_SIGN_OUT_REDIRECT_URI, VITE_BACKEND_ENDPOINT } = import.meta.env;

// const logto = useLogto();
export async function logtoSignIn() {
  const { signIn } = useLogto();
  console.log(import.meta.env, 'env');
  return signIn(VITE_LOGTO_SIGN_IN_REDIRECT_URI);
}

export function logtoSignOut() {
  const { signOut } = useLogto();
  return signOut(VITE_LOGTO_SIGN_OUT_REDIRECT_URI);
}

export function logtoFetchUserInfo() {
  const { fetchUserInfo } = useLogto();
  return fetchUserInfo();
}

export function logtoIsAuthenticated() {
  const { isAuthenticated } = useLogto();
  return isAuthenticated.value;
}

export async function getToken() {
  const { getAccessToken } = useLogto();
  const accessToken = await getAccessToken(VITE_BACKEND_ENDPOINT);
  return accessToken;
}

export async function isTokenExpired() {
  if (logtoIsAuthenticated()) {
    const token = await getToken();
    return Boolean(token);
  }
  return false;
}
