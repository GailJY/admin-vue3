<template>
    <t-aside :width="appStore.menuCollapse ? '64px' : '234px'">
        <t-menu :collapsed="appStore.menuCollapse">
            <t-menu-item value="0">
                <template #icon>
                    <t-icon name="app" />
                </template>
                仪表盘
            </t-menu-item>
        </t-menu>
    </t-aside>

</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
const appStore = useAppStore();


</script>

<style lang="less" scoped></style>