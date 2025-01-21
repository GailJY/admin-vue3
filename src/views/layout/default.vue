<template>
    <div>
        <t-layout class="main-layout">
            <global-sidebar></global-sidebar>
            <t-layout>
                <global-header :collapsed.sync="state.collapsed"></global-header>
                <t-content><router-view></router-view></t-content>
                <t-footer>Footer</t-footer>
            </t-layout>
        </t-layout>
    </div>
</template>

<script lang="ts" setup>
import GlobalHeader from './header.vue';
import GlobalSidebar from './sidebar.vue';

import { reactive } from 'vue';

const state = reactive({
    collapsed: true
})

</script>

<style lang="less" scoped>
.main-layout {
    height: 100vh;

}
</style>