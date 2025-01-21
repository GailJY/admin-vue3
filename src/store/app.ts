import type { TokenRequest } from "@/api/types";
import type { StoreDefinition } from "pinia";
import { defineStore } from "pinia";
import tokenApi from "@/api/token";
import { useUserStore } from '@/store';


type AppState = {
    token: string;
    menuCollapse: boolean;
}

export const useAppStore = defineStore("app", {
    state: (): AppState => {
        return{
            token: "",
            menuCollapse: false,
        }
    },
    persist: true,
    actions: {
        async login(LoginForm: TokenRequest): Promise<void>{
            this.token = await tokenApi.createToken(LoginForm);
        },
        loginout(): Promise<void>{
            const userStore = useUserStore();

            this.token = "";

            userStore.$reset();


        }
    },


})