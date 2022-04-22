import { createSlice } from "@reduxjs/toolkit"

export interface ISystem {
    ModalAvatar: boolean;
    ModalCreate: boolean;
    ShowDetail: boolean;
    Id: string;
    ModalConfirmStatus: boolean;
    filter: any
}

const initialState: ISystem = {
    ModalAvatar: false,
    ModalCreate: false,
    ShowDetail: false,
    Id: "",
    ModalConfirmStatus: false,
    filter: "All"
}

const systemSlice = createSlice({
    name: "System",
    initialState,
    reducers: {
        toggleShowModalAvatar(state) {
            state.ModalAvatar = !state.ModalAvatar
        },
        toggleShowModalCreate(state) {
            state.ModalCreate = !state.ModalCreate
        },
        toggleShowModalConfirm(state) {
            state.ModalConfirmStatus = !state.ModalConfirmStatus
        },
        closeModalCreate(state) {
            state.ModalCreate = false
        },
        showDetail (state, action) {
            state.ShowDetail = !state.ShowDetail
            state.Id = action.payload
        },
        closeDetail (state) {
            state.ShowDetail = false;
        },
        closeModalConfirm (state) {
            state.ModalConfirmStatus = false;
        },
        filterStatus(state, action: any) {
            // console.log({ action })
            state.filter = action.payload
        }
    },
    extraReducers: {}
})

export const systemReducer = systemSlice.reducer

export const {
    toggleShowModalAvatar,
    toggleShowModalCreate,
    closeModalCreate,
    showDetail,
    closeDetail,
    toggleShowModalConfirm,
    closeModalConfirm,
    filterStatus,
} = systemSlice.actions