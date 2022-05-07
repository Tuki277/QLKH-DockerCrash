import React, { useEffect } from "react";
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
import { processTitle } from "../Utils/Function"
import { actionStatus } from "../Utils/staticVariable";

export interface IProps {
  x: number
  title: String,
  model?: IProductDocumentPost,
  id?: string,
}

const ModalConfirm = (props: IProps) => {
  const title = processTitle(props.x, props.id)
  console.log("🚀 ~ file: ModalConfirm.tsx ~ line 28 ~ ModalConfirm ~ title", title)


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

    switch (props.x) {
      case 1:
        if (props.model) {
          if (props.id === "") {
            const result: any = await dispatch(addProduct(props.model));
            if (!result.payload.DataResponse.Error) {
              alert(actionStatus.Add);
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
              alert(actionStatus.Update);
              await dispatch(getAllProduct())
              dispatch(closeModalConfirm());
              dispatch(closeModalCreate());
            } else {
              alert(result.payload.sDataResponse.Message)
              dispatch(closeModalConfirm());
            }
          }
        }
        break;
      case 2:
        if (props.id) {
          await dispatch(deleteProduct(props.id));
          alert(actionStatus.Delete);
          dispatch(closeModalConfirm());
          dispatch(getAllProduct());
        }
        break;
      case 3:
        if (props.id) {
          await dispatch(deliveredProduct(props.id));
          alert(actionStatus.Delivered);
          dispatch(closeModalConfirm());
          dispatch(getProductById(props.id));
        }
        break;
      case 4:
        if (props.id) {
          await dispatch(finishProduct(props.id));
          alert(actionStatus.Finish);
          dispatch(closeModalConfirm());
          dispatch(getProductById(props.id));
        }
        break;
      case 5:
        if (props.id) {
          await dispatch(rejectProduct(props.id));
          alert(actionStatus.Rejected);
          dispatch(closeModalConfirm());
          dispatch(getProductById(props.id));
        }
        break;
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
                Bạn có chắc chắn muốn <span className="font-semibold"> { title } </span>bưu phẩm này?
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
function closeModalConfirmForDelete(): any {
  throw new Error("Function not implemented.");
}

