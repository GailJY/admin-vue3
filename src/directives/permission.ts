import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore} from '@/store';
const hasNotPermission = (value: string) => {
    return useUserStore().currentUser?.permissions.indexOf(value) === -1;
}

export const permissionDirective: Directive = {
    mounted(el: Element, {value} : DirectiveBinding) {
        console.log(hasNotPermission(value) && el.parentNode?.removeChild(el))
        hasNotPermission(value) && el.parentNode?.removeChild(el);
    }
}