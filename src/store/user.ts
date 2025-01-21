import { defineStore } from 'pinia'
import type { UserType } from '@/api/types'
import userApi from "@/api/user";



type UserState = {
    currentUser: UserType | null;
}

export const useUserStore = defineStore("user",{
        state: () => {
            return{
                currentUser: null,
            }
        },
        persist: true,
        actions: {
            async fetchCurrentUser(){
                const user = await userApi.me();
                console.log('Fetched user:', user); // 添加调试信息
                this.currentUser = user;
            },
        }
    }
)