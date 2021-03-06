import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProduct, getAllProduct } from "../redux/features/product";
import { closeDetail, toggleShowModalConfirm } from "../redux/features/system";
import { RootState } from "../redux/store";
import { formatDateTime, processStatus } from "../Utils/Function";
import ModalConfirm from "./ModalConfirm";
import { actionNumber, actionTitle } from "../Utils/staticVariable";

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
    setX(actionNumber.Finish);
    setIdState(id);
    setTitle(actionTitle.Finish);
    dispatch(toggleShowModalConfirm());
  };

  const rejectProductButton = async (id: string) => {
    setX(actionNumber.Rejected);
    setIdState(id);
    setTitle(actionTitle.Rejected);
    dispatch(toggleShowModalConfirm());
  };

  const deliveredProductButton = async (id: string) => {
    setX(actionNumber.Delivered);
    setIdState(id);
    setTitle(actionTitle.Delivered);
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
                Th??ng tin b??u ph???m: {data[0].NameProduct}
              </p>
            </div>

            <div className="flex justify-around mt-5">
              <div>
                <p className="mt-2">
                  <span className="font-semibold mr-2">M?? b??u ph???m:</span>{" "}
                  {data[0]._id.slice(0, 11)}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">Ng?????i g???i:</span>
                  {data[0].UserSend}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">
                    S??? ??i???n tho???i ng?????i g???i:
                  </span>
                  {data[0].PhoneNumberSend}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">N??i g???i:</span>
                  {data[0].UserSendAddress}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">Ng?????i t???o: </span>
                  {data[0].UserCreated[0].FullName}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">
                    S??? ??i???n tho???i ng?????i t???o:
                  </span>
                  {data[0].UserCreated[0].PhoneNumber}
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">Th???i gian t???o:</span>
                  {formatDateTime(data[0].createdAt)}
                </p>

                {data[0].Note ? (
                  <p className="mt-2">
                    <span className="font-semibold mr-2">Ghi ch??:</span>
                    {data[0].Note}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <p className="mt-2">
                  <span className="font-semibold mr-2">Tr???ng th??i:</span>
                  <span className={processStatus(data[0].Status).css + ""}>
                    {processStatus(data[0].Status).content}
                  </span>
                </p>

                <p className="mt-2">
                  <span className="font-semibold mr-2">Ng?????i nh???n:</span>
                  {data[0].UserReceive}
                </p>
                <p className="mt-2">
                  <span className="font-semibold mr-2">
                    S??? ??i???n tho???i ng?????i nh???n:
                  </span>
                  {data[0].PhoneNumberReceive}
                </p>
                <p className="mt-2">
                  <span className="font-semibold mr-2">N??i nh???n:</span>
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
                        S??? ??i???n tho???i shipper:
                      </span>
                      {data[0].Shipper[0].PhoneNumber}
                    </p>
                  </>
                ) : (
                  ""
                )}

                <p className="mt-2">
                  <span className="font-semibold mr-2">Tr???ng l?????ng:</span>
                  {data[0].Weight} kg
                </p>
              </div>
            </div>
            <div className="w-full text-center mt-10">
              <button
                className="border-[1px] rounded-md p-2 ml-2 hover:bg-gray-200"
                onClick={() => closeShowDetailButton()}
              >
                ????ng
              </button>

              {action?.canForward && DataResponse?.Object?.Rule === 2 ? (
                <button
                  className="border-[1px] rounded-md p-2 ml-2 hover:bg-gray-200"
                  onClick={() => deliveredProductButton(id)}
                >
                  Nh???n chuy???n h??ng
                </button>
              ) : (
                ""
              )}

              {action?.canFinish && DataResponse?.Object?.Rule === 2 ? (
                <button
                  className="border-[1px] rounded-md p-2 ml-2 hover:bg-gray-200"
                  onClick={() => finishProductButton(id)}
                >
                  Ho??n th??nh
                </button>
              ) : (
                ""
              )}

              {action?.canFinish && DataResponse?.Object?.Rule === 2 ? (
                <button
                  className="border-[1px] rounded-md p-2 ml-2 hover:bg-gray-200"
                  onClick={() => rejectProductButton(id)}
                >
                  Th???t b???i
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
