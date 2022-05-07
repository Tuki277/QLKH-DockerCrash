import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "../Components/ModalConfirm";
import { IProductDocumentPost } from "../interface";
import { getAllProduct } from "../redux/features/product";
import { closeModalCreate, toggleShowModalConfirm } from "../redux/features/system";
import { RootState } from "../redux/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { button, actionNumber, actionTitle } from '../Utils/staticVariable'

const Add = (props: { id?: string }) => {

  const schema = yup.object().shape({
    NameProduct: yup.string().required().trim(),
    AddressReceive: yup.string().required().trim(),
    PhoneNumberReceive: yup.string().required().min(10).max(11),
    PhoneNumberSend: yup.string().required().min(10).max(11),
    UserReceive: yup.string().required().trim(),
    UserSend: yup.string().required().trim(),
    UserSendAddress: yup.string().required().trim(),
    Weight: yup.number().required(),
    Note: yup.string().trim()
  }).required()
  
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IProductDocumentPost>({
    resolver: yupResolver(schema)
  });

  const [title, setTitle] = useState("");

  const { ModalConfirmStatus } = useSelector((state: RootState) => state.system)

  const { productDetail } = useSelector((state: RootState) => state.product)

  const [model, setModel] = useState<IProductDocumentPost>({
    NameProduct: "",
    AddressReceive: "",
    Note: "",
    PhoneNumberReceive: "",
    PhoneNumberSend: "",
    UserReceive: "",
    UserSend: "",
    UserSendAddress: "",
    Weight: 0,
  });

  const closeModalCreateButton = () => {
    dispatch(closeModalCreate());
    dispatch(getAllProduct());
  };

  useEffect(() => {
    if (!ModalConfirmStatus && props.id) {
      if (productDetail) {
        const data: any = productDetail?.DataResponse?.Object;
        setValue("NameProduct", data[0].NameProduct)
        setValue("AddressReceive", data[0].AddressReceive)
        setValue("Note", data[0].Note)
        setValue("PhoneNumberReceive", data[0].PhoneNumberReceive)
        setValue("PhoneNumberSend", data[0].PhoneNumberSend)
        setValue("UserReceive", data[0].UserReceive)
        setValue("UserSend", data[0].UserSend)
        setValue("UserSendAddress", data[0].UserSendAddress)
        setValue("Weight", data[0].Weight)
      }
    } else {
      setValue("NameProduct", "")
      setValue("AddressReceive", "")
      setValue("Note", "")
      setValue("PhoneNumberReceive", "")
      setValue("PhoneNumberSend", "")
      setValue("UserReceive", "")
      setValue("UserSend", "")
      setValue("UserSendAddress", "")
      setValue("Weight", 0)
    }
  }, [props.id !== null])

  const onSubmit: SubmitHandler<IProductDocumentPost> = (data) => {
    setModel({
      ...data,
    })
    setTitle(props.id ? actionTitle.Update : actionTitle.Add)
    dispatch(toggleShowModalConfirm())
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="float-left main top-0 left-0 w3-animate-opacity">
          <div
            className="p-3 overflow-x-auto"
            style={{
              width: "calc(100vw - 12rem)",
              height: "calc(100vh - 4rem)",
            }}
          >
            <div className="mt-16 grid grid-cols-2 gap-6 px-10">
              <div>
                <input
                  placeholder="Tên bưu phẩm"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  defaultValue={model.NameProduct}
                  {...register("NameProduct")}
                />
                {errors.NameProduct && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập tên hàng hóa</span>}
              </div>

              <div>
                <input
                  placeholder="Cân nặng"
                  type="number"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  step="any"
                  defaultValue={model.Weight}
                  {...register("Weight")}
                />
              </div>

              <div>
                <input
                  placeholder="Người nhận"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  defaultValue={model.UserReceive}
                  {...register("UserReceive")}
                />
                {errors.UserReceive && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập tên người nhận</span>}
              </div>

              <div>
                <input
                  placeholder="Người gửi"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  defaultValue={model.UserSend}
                  {...register("UserSend")}
                />
                {errors.UserSend && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập tên người gửi</span>}
              </div>

              <div>
                <input
                  placeholder="Số điện thoại người nhận"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  defaultValue={model.PhoneNumberReceive}
                  {...register("PhoneNumberReceive")}
                />{errors.PhoneNumberReceive && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập số điện thoại người nhận</span>}
              </div>

              <div>
                <input
                  placeholder="Số điện thoại người gửi"
                  // name="PhoneNumberSend"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  defaultValue={model.PhoneNumberSend}
                  {...register("PhoneNumberSend")}
                />
                {errors.PhoneNumberSend && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắc buộc nhập số điện thoại người gửi</span>}
              </div>

              <div>
                <input
                  placeholder="Nơi nhận"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  defaultValue={model.AddressReceive}
                  {...register("AddressReceive")}
                />
                {errors.AddressReceive && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập địa chỉ người nhận</span>}
              </div>

              <div>
                <input
                  placeholder="Nơi gửi"
                  // name="UserSendAddress"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  defaultValue={model.UserSendAddress}
                  {...register("UserSendAddress")}
                />
                {errors.UserSendAddress && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập dịa chỉ người gửi</span>}
              </div>
            </div>

            <div className="mx-10 mt-10">
              <textarea
                placeholder="Ghi chú"
                className="p-2 w-full border-2 resize-y rounded-md"
                defaultValue={model.Note}
                {...register("Note")}
              ></textarea>
            </div>

            <div className="flex justify-center mt-5">
              <div className="">
                <button
                  onClick={() => closeModalCreateButton()}
                  className="border-[1px] rounded-md p-2 ml-2 hover:bg-gray-200"
                >
                  { button.Close }
                </button>
              </div>

              <div className="ml-2">
                <button
                  type="submit"
                  className="border-[1px] rounded-md p-2 ml-2 hover:bg-gray-200"
                >
                  { props.id ? button.Update : button.Add }
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      { ModalConfirmStatus ? <ModalConfirm 
        title={title}
        model={model}
        x={actionNumber.Add}
        id={props.id}
      /> : "" }
    </Fragment>
  );
};

export default Add;
