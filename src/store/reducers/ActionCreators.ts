import axios from "axios";
import { AppDispatch } from "../store";
import { IUser } from "../../models/IUser";
import { userSlice } from "./UserSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

//БЕЗ Toolkit
// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.usersFetching()) // достаем из слайса нужный нам action
//         const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
//         dispatch(userSlice.actions.usersFetchingSucces(response.data))
//     } catch(error: any) {
//         dispatch(userSlice.actions.usersFetchingError(error.message))
//     }
// }

//C Toolkit

export const fetchUsers = createAsyncThunk(
    'user/fetchAll', // название асинронного thunk
    async (_, thunkAPI) => { // сам коллбэк
        try{
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }

    }
)