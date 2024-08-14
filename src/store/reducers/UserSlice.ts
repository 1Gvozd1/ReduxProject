// слайсы - это обертка над редьюсерами которая доп функционал добавляет и упрощаает работу

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser"
import { fetchUsers } from "./ActionCreators";

interface UserState { //для типизации нашего состояния
    users: IUser[];
    isLoading: boolean;
    error: string;

}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error:'',

} //начальное значение

export const userSlice = createSlice({
    name: 'user', // название
    initialState, // начальное значение стейта
    reducers: {},
    //БЕЗ Toolkit в файле ActionCreators
    // reducers: { //список функций, которые возвращают action (dispatch(usersFetching()) и если передают что-то, нужно доставать из action.payload
    //     usersFetching(state) { 
    //         state.isLoading = true;
            
    //     },
    //     usersFetchingSucces(state, action: PayloadAction<IUser[]>) { // пеердаем массив юзеров в ActionCreators
    //         state.isLoading = false;
    //         state.error = ''
    //         state.users = action.payload;
    //     },
    //     usersFetchingError(state, action: PayloadAction<string>) { // придумаем и передадим мтроку ошибки в случае неудачной загрузки пользователей
    //         state.isLoading = false;
    //         state.error = action.payload
    //     },
    // },
    extraReducers: (builder) => { //C Toolkit в файле ActionCreators
        builder.addCase(fetchUsers.fulfilled.type, (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.error = ''
            state.users = action.payload;
        }).addCase(fetchUsers.pending.type, (state) => {
            state.isLoading = true;
        }).addCase(fetchUsers.rejected.type, (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload 
        })  
    }
})


export default userSlice.reducer;