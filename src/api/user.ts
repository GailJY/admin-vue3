import type { UserType } from '@/api/types'
import request from "@/api/request"
const me = ():Promise<UserType> => {
    return request.get("/users/current")
}

export default {
    me,
};