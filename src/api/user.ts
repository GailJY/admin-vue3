import type { UserType,ListResult,UserFilter } from '@/api/types'
import request from "@/api/request"
const me = ():Promise<UserType> => {
    return request.get("/users/current")
}


const list = (filter: UserFilter): Promise<ListResult<UserType>> => {
    return request.get('/users',{
        params: filter,
    });
}

export default {
    me,
    list,
};