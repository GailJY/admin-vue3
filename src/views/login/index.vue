<template>
    <div class="login-container">
        <div class="content">
            <t-card>
                <h1>Admin</h1>
                <t-form ref="form" :data="loginFrom" :rules="rules" class="login-form" :colon="true" :label-width="0"
                    @submit="handleLogin">
                    <t-form-item name="username">
                        <t-input v-model="loginFrom.username" clearable placeholder="请输入用户名">
                            <template #prefix-icon>
                                <desktop-icon />
                            </template>
                        </t-input>
                    </t-form-item>

                    <t-form-item name="password">
                        <t-input v-model="loginFrom.password" type="password" clearable placeholder="请输入密码">
                            <template #prefix-icon>
                                <lock-on-icon />
                            </template>
                        </t-input>
                    </t-form-item>

                    <t-form-item>
                        <t-button theme="primary" type="submit" block :loading="loading">登录</t-button>
                    </t-form-item>
                </t-form>
            </t-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { MessagePlugin, type SubmitContext } from 'tdesign-vue-next';
import type { TokenRequest } from '@/api/types';
import tokenApi from '@/api/token';
import { useAppStore, useUserStore } from '@/store';
import { useRouter } from 'vue-router';
// import { Icon } 
// import { reactive } from 'vue';
// import { MessagePlugin, FormProps } from 'tdesign-vue-next';
// import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
// const formData: FormProps['data'] = reactive({
//     username: '',
//     password: '',
// });
type loginFrom = {
    username: string;
    password: string;
}

const loginFrom = reactive<TokenRequest>({
    username: '',
    password: '',
})

const rules = {
    username: [
        { required: true, message: '用户名必填', }
    ],
    password: [
        { required: true, message: '密码必填', }
    ]
}

const appStore = useAppStore();
const userStore = useUserStore();
const loading = ref(false);
const router = useRouter();
const handleLogin = async ({ validateResult }: SubmitContext) => {
    if (validateResult != true) {
        return;
    }
    loading.value = true;
    try {
        await appStore.login(loginFrom);
        await userStore.fetchCurrentUser();
        await MessagePlugin.success('登录成功');
        await router.push({ name: "dashboard" })
    } finally {
        loading.value = false;
    }
}


</script>

<style scoped lang="less">
.login-container {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        text-align: center;
    }

    .content {
        width: 500px;

    }
}
</style>