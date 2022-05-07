import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin, IResponse, IResponseJson, ISystemLogin, UserDocument } from "../../interface";
import API, { APINonAuth } from "../../Utils/API";
import { actionStatus } from "../../Utils/staticVariable";

export const login = createAsyncThunk("SystemLogin/Login", async(item: ILogin) => {
    const res = await APINonAuth.post<IResponseJson<IResponse<UserDocument>>>('/login', item)
    return res.data
})

export const getCurrentUser = createAsyncThunk("SystemLogin/GetCurrent", async() => {
    const res = await API.get("/currentUser")
    return res.data
})

const initialState: ISystemLogin<UserDocument> = {
    loggedIn: false,
    DataResponse: undefined,
    accessToken: "",
    Error: true
}

const loginSystem = createSlice({
    name: "SystemLogin",
    initialState,
    reducers: {
        logout (state) {
            localStorage.removeItem("accessToken")
            state.loggedIn = false;
            window.location.reload()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<IResponseJson<IResponse<UserDocument>>>) => {
            state.accessToken = action.payload.DataResponse?.AccessToken
            if (state.accessToken) {
                localStorage.setItem("accessToken", state.accessToken)
            } else {
                alert(actionStatus.LoginFail)
            }
            state.loggedIn = true;
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.DataResponse = action.payload.DataResponse
        })
    }
})

export const loginSystemReducer = loginSystem.reducer

export const {
    logout
} = loginSystem.actions