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
        // setModel({
        //   NameProduct: data[0].NameProduct,
        //   AddressReceive: data[0].AddressReceive,
        //   Note: data[0].Note,
        //   PhoneNumberReceive: data[0].PhoneNumberReceive,
        //   PhoneNumberSend: data[0].PhoneNumberSend,
        //   UserReceive: data[0].UserReceive,
        //   UserSend: data[0].UserSend,
        //   UserSendAddress: data[0].UserSendAddress,
        //   Weight: data[0].Weight,
        // })
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

  // const updatedModel = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
  //   setModel({
  //     ...model,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setTitle(props.id ? "cập nhật" : "thêm")
  //   dispatch(toggleShowModalConfirm())
  // };

  const onSubmit: SubmitHandler<IProductDocumentPost> = (data) => {
    setModel({
      ...data,
    })
    setTitle(props.id ? "cập nhật" : "thêm")
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
            {/* <pre>{JSON.stringify(model, undefined, 2)}</pre> */}
            <div className="mt-16 grid grid-cols-2 gap-6 px-10">
              <div>
                {/* <label>Tên bưu phẩm</label> */}
                <input
                  placeholder="Tên bưu phẩm"
                  // name="NameProduct"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  //   updatedModel(event)
                  // }
                  defaultValue={model.NameProduct}
                  // value={model.NameProduct}
                  {...register("NameProduct")}
                  // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  //   updatedModel(event)
                  // }
                />
                {errors.NameProduct && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập tên hàng hóa</span>}
              </div>

              <div>
                {/* <label>Cân nặng (kg)</label> */}
                <input
                  placeholder="Cân nặng"
                  // name="Weight"
                  type="number"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  //   updatedModel(event)
                  // }
                  // value={model.Weight}
                  step="any"
                  defaultValue={model.Weight}
                  {...register("Weight")}
                />
              </div>

              <div>
                {/* <label>Người nhận</label> */}
                <input
                  placeholder="Người nhận"
                  // name="UserReceive"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  //   updatedModel(event)
                  // }
                  // value={model.UserReceive}
                  defaultValue={model.UserReceive}
                  {...register("UserReceive")}
                />
                {errors.UserReceive && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập tên người nhận</span>}
              </div>

              <div>
                {/* <label>Người gửi</label> */}
                <input
                  placeholder="Người gửi"
                  // name="UserSend"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  //   updatedModel(event)
                  // }
                  // value={model.UserSend}
                  defaultValue={model.UserSend}
                  {...register("UserSend")}
                />
                {errors.UserSend && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập tên người gửi</span>}
              </div>

              <div>
                {/* <label>Số điện thoại người gửi</label> */}
                <input
                  placeholder="Số điện thoại người nhận"
                  // name="PhoneNumberReceive"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  //   updatedModel(event)
                  // }
                  // value={model.PhoneNumberReceive}
                  defaultValue={model.PhoneNumberReceive}
                  {...register("PhoneNumberReceive")}
                />{errors.PhoneNumberReceive && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập số điện thoại người nhận</span>}
              </div>

              <div>
                {/* <label>Số điện thoại nguời nhận</label> */}
                <input
                  placeholder="Số điện thoại người gửi"
                  // name="PhoneNumberSend"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  //   updatedModel(event)
                  // }
                  // value={model.PhoneNumberSend}
                  defaultValue={model.PhoneNumberSend}
                  {...register("PhoneNumberSend")}
                />
                {errors.PhoneNumberSend && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắc buộc nhập số điện thoại người gửi</span>}
              </div>

              <div>
                {/* <label>Nơi nhận</label> */}
                <input
                  placeholder="Nơi nhận"
                  // name="AddressReceive"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  //   updatedModel(event)
                  // }
                  // value={model.AddressReceive}
                  defaultValue={model.AddressReceive}
                  {...register("AddressReceive")}
                />
                {errors.AddressReceive && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập địa chỉ người nhận</span>}
              </div>

              <div>
                {/* <label>Nơi gửi</label> */}
                <input
                  placeholder="Nơi gửi"
                  // name="UserSendAddress"
                  type="text"
                  className="border-b-2 px-2 text-black focus:outline-0 w-full"
                  // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  //   updatedModel(event)
                  // }
                  // value={model.UserSendAddress}
                  defaultValue={model.UserSendAddress}
                  {...register("UserSendAddress")}
                />
                {errors.UserSendAddress && <span className="text-red-600 mt-1 ml-1 errorIcon">Bắt buộc nhập dịa chỉ người gửi</span>}
              </div>
            </div>

            <div className="mx-10 mt-10">
              <textarea
                placeholder="Ghi chú"
                // name="Note"
                className="p-2 w-full border-2 resize-y rounded-md"
                // onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                //   updatedModel(event)
                // }
                // value={model.Note}
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
                  Đóng
                </button>
              </div>

              <div className="ml-2">
                <button
                  type="submit"
                  className="border-[1px] rounded-md p-2 ml-2 hover:bg-gray-200"
                >
                  { props.id ? "Cập nhật" : "Thêm" }
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      { ModalConfirmStatus ? <ModalConfirm 
        title={title}
        model={model}
        x={1}
        id={props.id}
      /> : "" }
    </Fragment>
  );
};

export default Add;
