import { defineComponent, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { ElButton, ElCard, ElImage, ElText } from "element-plus";
import { FormilyForm, Space } from "~/KeepUp";
import AuthBgFragment from "~/assets/images/auth/auth_bg_fragment.svg";
import StarViewLogo from "~/assets/images/common/starview_logo.png";
import { useAuthStore } from "../../pinia/useAuthStore";
import { getSchema } from "./schema";
import styles from "./index.module.scss";

import type { IFormilyFormExpose } from "~/KeepUp";

export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();
    const formilyRef = ref<IFormilyFormExpose>();
    const formRef = computed(() => formilyRef.value?.formRef);
    const schema = ref(getSchema());
    const authStore = useAuthStore();
    const loginLoading = ref(false);
    const login = async () => {
      try {
        loginLoading.value = true;
        await formRef.value?.validate();
        await authStore.login(formRef.value);
      } catch (error: any) {
        console.log(`登录动作失败，失败原因：${error}`);
      } finally {
        loginLoading.value = false;
      }
    };
    const go = (path: string) => {
      router.push({ path });
    };
    return () => (
      <Space class={styles.container} fill justify="center">
        <ElImage class={styles.fragment} src={AuthBgFragment} />
        <ElCard class={styles.form}>
          <ElImage class={styles.logo} src={StarViewLogo} />
          <FormilyForm ref={formilyRef} config={schema.value} />
          <ElButton
            loading={loginLoading.value}
            class={styles.submit}
            type="primary"
            size="large"
            onClick={login}
          >
            登录
          </ElButton>
          <Space class={styles.btnGroup} fill justify="space-between">
            <ElButton
              text="plain"
              onClick={() => {
                go("/findPwd");
              }}
            >
              忘记密码
            </ElButton>
            {/* <ElButton 
              type='primary' 
              text='primary'
              onClick={() => { go('/register') }}
            >
              <ElText>没有账号？请先</ElText>注册
            </ElButton> */}
          </Space>
        </ElCard>
      </Space>
    );
  },
});
