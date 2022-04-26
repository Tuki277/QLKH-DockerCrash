import { createSlice } from "@reduxjs/toolkit"

export interface ISystem {
    ModalAvatar: boolean;
    ModalCreate: boolean;
    ShowDetail: boolean;
    Id: string;
    ModalConfirmStatus: boolean;
    ModalConfirmStatusForDelete: boolean;
    filter: any
}

const initialState: ISystem = {
    ModalAvatar: false,
    ModalCreate: false,
    ShowDetail: false,
    Id: "",
    ModalConfirmStatus: false,
    ModalConfirmStatusForDelete: false,
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
        toggleShowModalConfirmForDelete(state) {
            state.ModalConfirmStatusForDelete = !state.ModalConfirmStatusForDelete
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
            state.ModalConfirmStatusForDelete = false;
        },
        closeModalConfirmForDelete (state) {
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
    toggleShowModalConfirmForDelete,
    closeModalConfirm,
    filterStatus,
} = systemSlice.actions