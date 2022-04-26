import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProduct, getAllProduct } from "../redux/features/product";
import { closeDetail, toggleShowModalConfirm } from "../redux/features/system";
import { RootState } from "../redux/store";
import { formatDateTime, processStatus } from "../Utils/Function";
import ModalConfirm from "./ModalConfirm";

const ModalDetail = () => {
  const dispatch = useDispatch();

  const { DataResponse } = useSelector((state: RootState) => state.systemLogin);
  const { productDetail } = useSelector((state: RootState) => state.product);
  const { ModalConfirmStatus } = useSelector(
    (state: RootState) => state.system
  );

  const [idState, setIdState] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [x, setX] = useState<number>(0);

  const { filter } = useSelector(
    (state: RootState) => state.system
  );

  const closeShowDetailButton = async () => {
    dispatch(closeDetail());
    if (filter) {
      await dispatch(filterProduct(filter))
    } else {
      dispatch(getAllProduct());
    }
    
  };

  const finishProductButton = async (id: string) => {
    setX(4);
    setIdState(id);
    setTitle("xác nhận vận chuyển thành công");
    dispatch(toggleShowModalConfirm());
  };

  const rejectProductButton = async (id: string) => {
    setX(5);
    setIdState(id);
    setTitle("xác nhận vận chuyển không thành công");
    dispatch(toggleShowModalConfirm());
  };

  const deliveredProductButton = async (id: string) => {
    setX(3);
    setIdState(id);
    setTitle("nhận vận chuyển");
    dispatch(toggleShowModalConfirm());
  };

  const data: any = productDetail?.DataResponse?.Object;
  const action = productDetail?.DataResponse?.Action;
  const id: string = data[0]._id;

  return (
    <Fragment>
      <div
        className="absolute w-full h-screen"
        style={{ background: "rgba(0, 0, 0 , 0.5)" }}
      >
        <div className="flex justify-center mt-20 w3-animate-top">
          <div className="w-[50rem] h-full mx-40 bg-white border-2 border-gray-400 p-4 rounded-md">
            <div className="flex justify-between">
              <p className="text-3xl w-full text-center">
                {/* {data[0].NameProduct} - {data[0].UserReceive}  */}
                Thông tin bưu phẩm: {data[0].NameProduct}
              </p>
            </div>

            <div className="flex justify-around mt-5">
              <div>
                <p className="mt-2">
                  <span className="font-semibold mr-2">Mã bưu phẩm:</span>{" "}
                  {data[0]._id.slice(0, 11)}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">Người gửi:</span>
                  {data[0].UserSend}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">
                    Số điện thoại người gửi:
                  </span>
                  {data[0].PhoneNumberSend}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">Nơi gửi:</span>
                  {data[0].UserSendAddress}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">Người tạo: </span>
                  {data[0].UserCreated[0].FullName}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">
                    Số điện thoại người tạo:
                  </span>
                  {data[0].UserCreated[0].PhoneNumber}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">Thời gian tạo:</span>
                  {formatDateTime(data[0].createdAt)}
                </p>

                {data[0].Note ? (
                  <p className="mt-2">
                    <span className="font-semibold mr-2">Ghi chú:</span>
                    {data[0].Note}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <p className="mt-2">
                  <span className="font-semibold mr-2">Trạng thái:</span>
                  <span className={processStatus(data[0].Status).css + ""}>
                    {processStatus(data[0].Status).content}
                  </span>
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">Người nhận:</span>
                  {data[0].UserReceive}
                </p>
                <p className="mt-2">
                  <span className="font-semibold mr-2">
                    Số điện thoại người nhận:
                  </span>
                  {data[0].PhoneNumberReceive}
                </p>
                <p className="mt-2">
                  <span className="font-semibold mr-2">Nơi nhận:</span>
                  {data[0].AddressReceive}
                </p>

                {data[0].Shipper.length > 0 ? (
                  <>
                    <p className="mt-2">
                      <span className="font-semibold mr-2">Shipper:</span>
                      {data[0].Shipper[0].FullName}
                    </p>
                    <p className="mt-2">
                      <span className="font-semibold mr-2">
                        Số điện thoại shipper:
                      </span>
                      {data[0].Shipper[0].PhoneNumber}
                    </p>
                  </>
                ) : (
                  ""
                )}

                <p className="mt-2">
                  <span className="font-semibold mr-2">Trọng lượng:</span>
                  {data[0].Weight} kg
                </p>
              </div>
            </div>

            {/* <div className="ml-">
              {data[0].Note ? (
                <p className="mt-2">
                  <span className="font-semibold mr-2">Ghi chú:</span>
                  {data[0].Note}
                </p>
              ) : (
                ""
              )}
            </div> */}

            <div className="w-full text-center mt-10">
              <button
                className="border-[1px] rounded-md p-2 ml-2 hover:bg-gray-200"
                onClick={() => closeShowDetailButton()}
              >
                Đóng
              </button>

              {action?.canForward && DataResponse?.Object?.Rule === 2 ? (
                <button
                  className="border-[1px] rounded-md p-2 ml-2 hover:bg-gray-200"
                  onClick={() => deliveredProductButton(id)}
                >
                  Nhận chuyển hàng
                </button>
              ) : (
                ""
              )}

              {action?.canFinish && DataResponse?.Object?.Rule === 2 ? (
                <button
                  className="border-[1px] rounded-md p-2 ml-2 hover:bg-gray-200"
                  onClick={() => finishProductButton(id)}
                >
                  Hoàn thành
                </button>
              ) : (
                ""
              )}

              {action?.canFinish && DataResponse?.Object?.Rule === 2 ? (
                <button
                  className="border-[1px] rounded-md p-2 ml-2 hover:bg-gray-200"
                  onClick={() => rejectProductButton(id)}
                >
                  Thất bại
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      {ModalConfirmStatus ? (
        <ModalConfirm title={title} x={x} id={idState} />
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ModalDetail;
