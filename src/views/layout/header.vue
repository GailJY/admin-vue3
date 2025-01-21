<template>
    <t-header class="header">
        <collapse-button v-model:collapse="appStore.menuCollapse"></collapse-button>
        <div class="operation-area">
            <t-dropdown :options="options" trigger="click" @click="clickHandler">
                <t-button variant="text">
                    <template #icon>
                        <icon name="user"></icon>
                    </template>
                    {{ userStore.currentUser && userStore.currentUser?.nickname }}
                </t-button>
            </t-dropdown>
        </div>
        <!-- <t-button click="logout">logout</t-button> -->

    </t-header>
</template>

<script lang="ts" setup>
import { Icon, } from 'tdesign-vue-next'
// import { defineProps } from 'vue'
import { useUserStore, useAppStore } from '@/store';
import type { DropdownOption } from 'tdesign-vue-next';
import { useRouter, useRoute } from 'vue-router';
import CollapseButton from '@/components/CollapseButton.vue';

const options = [
    {
        content: '退出登陆',
        value: 'logout',
    }
]
const userStore = useUserStore();
const appStore = useAppStore();
console.log(appStore.menuCollapse)
const router = useRouter();
const route = useRoute();

console.log(userStore);

const clickHandler = async ({ value }: DropdownOption) => {

    switch (value) {
        case 'logout':
            await useAppStore().loginout();
            await router.push(`login?redirect=${route.fullPath}`)
            break;

        default:
            throw new Error('未知操作')
    }

}

</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
}
</style>