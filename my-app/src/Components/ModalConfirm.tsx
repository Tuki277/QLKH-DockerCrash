import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProductDocumentPost, IProductDocumentUpdate } from "../interface";
import {
  addProduct,
  deleteProduct,
  deliveredProduct,
  filterProduct,
  finishProduct,
  getAllProduct,
  getProductById,
  rejectProduct,
  updateProduct,
} from "../redux/features/product";
import { closeModalConfirm, closeModalCreate } from "../redux/features/system";
import { RootState } from "../redux/store";

export interface IProps {
  x: number
  title: String,
  model?: IProductDocumentPost,
  id?: string,
}

const ModalConfirm = (props: IProps) => {

  const dispatch = useDispatch();

  const { filter } = useSelector(
    (state: RootState) => state.system
  );

  const closeShowDetailButton = async () => {
    await dispatch(closeModalConfirm());
    if (filter) {
      await dispatch(filterProduct(filter))
    }
    await dispatch(getAllProduct());
  };

  const submitForm = async () => {
    if (props.x === 1) {
      if (props.model) {
        if (props.id === "") {
          const result: any = await dispatch(addProduct(props.model));
          if (!result.payload.DataResponse.Error) {
            alert('Thêm mới thành công');
            await dispatch(getAllProduct())
            dispatch(closeModalConfirm());
            dispatch(closeModalCreate());
          } else {
            alert(result.payload.DataResponse.Message)
            dispatch(closeModalConfirm());
          }
        } else {
          const modelUpdate: IProductDocumentUpdate<IProductDocumentPost> = {
            model: props.model,
            id: props.id
          }
          const result: any = await dispatch(updateProduct(modelUpdate));
          if (!result.payload.DataResponse.Error) {
            alert('Cập nhật thành công');
            await dispatch(getAllProduct())
            dispatch(closeModalConfirm());
            dispatch(closeModalCreate());
          } else {
            alert(result.payload.sDataResponse.Message)
            dispatch(closeModalConfirm());
          }
        }
        
      }
    }

    if (props.x === 2) {
      if (props.id) {
        await dispatch(deleteProduct(props.id));
        alert("Xóa thành công");
        dispatch(closeModalConfirm());
        dispatch(getAllProduct());
      }
    }

    if (props.x === 3) {
      if (props.id) {
        await dispatch(deliveredProduct(props.id));
        alert("Nhận chuyển hàng thành công");
        dispatch(closeModalConfirm());
        dispatch(getProductById(props.id));
      }
    }

    if (props.x === 4) {
      if (props.id) {
        await dispatch(finishProduct(props.id));
        alert("Giao hàng thành công");
        dispatch(closeModalConfirm());
        dispatch(getProductById(props.id));
      }
    }

    if(props.x === 5) {
      if (props.id) {
        await dispatch(rejectProduct(props.id));
        alert("Giao hàng thất bại");
        dispatch(closeModalConfirm());
        dispatch(getProductById(props.id));
      }
      
    }
  }

  return (
    <div
      className="absolute w-full h-screen z-30 w3-animate-opacity"
      style={{ background: "rgba(0, 0, 0 , 0.5)" }}
    >
        <div className="flex justify-center">
          <div className="w-[34rem] h-full mx-40 my-[40vh] bg-white border-2 border-gray-400 p-7 rounded-md">
            <div className="flex justify-between">
              <p className="text-2xl w-full text-center">
                Bạn có chắc chắn muốn <span className="font-semibold"> { props.title } </span> sản phẩm này?
              </p>
            </div>

            <div className="w-full text-center mt-3">
              <button
                className="border-[1px] p-2 ml-2 rounded-md hover:bg-gray-200"
                onClick={() => submitForm()}
              >
                Xác nhận
              </button>
              <button
                className="border-[1px] p-2 ml-2 rounded-md hover:bg-gray-200"
                onClick={() => closeShowDetailButton()}
              >
                Hủy
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
