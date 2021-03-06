import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "../Components/ModalConfirm";
import ModalDetail from "../Components/ModalDetail";
import ModalProfile from "../Components/ModalProfile";
import Search from "../Components/Search";
import { getCurrentUser } from "../redux/features/login";
import {
  filterProduct,
  getAllProduct,
  getProductById,
} from "../redux/features/product";
import {
  filterStatus,
  showDetail,
  toggleShowModalAvatar,
  toggleShowModalConfirmForDelete,
  toggleShowModalCreate,
} from "../redux/features/system";
import { RootState } from "../redux/store";
import { processStatus } from "../Utils/Function";
import Add from "./Add";
import { actionNumber, actionTitle } from "../Utils/staticVariable";

const Home = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state: RootState) => state.product);
  const { DataResponse } = useSelector((state: RootState) => state.systemLogin);
  const { ModalAvatar, ModalCreate, ShowDetail, ModalConfirmStatusForDelete, filter  } = useSelector(
    (state: RootState) => state.system
  );

  const [id, setId] = useState<string>("")

  const [idState, setIdState] = useState<string>("");
  // const [filterStatus, setFilterStatusState] = useState<string>("All");

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    customEffect()
  }, [filter]);

  const customEffect = async () => {
    // if (filterStatus && filterStatus !== "All") {
    if (filter !== "All") {
      await dispatch(filterProduct(filter));
    } else {
      await dispatch(getAllProduct());
    }
  }

  const showModalAvatar = () => {
    dispatch(toggleShowModalAvatar());
  };

  const deleteButton = (id: string) => {
    setIdState(id);
    dispatch(toggleShowModalConfirmForDelete());
    console.log(ModalConfirmStatusForDelete);
  };

  const showModalCreateButton = () => {
    setId("")
    dispatch(toggleShowModalCreate());
  };

  const showDetailButton = async (id: string) => {
    await dispatch(getProductById(id));
    await dispatch(showDetail(id));
  };

  const updateButton = async (id: string) => {
    setId(id)
    await dispatch(getProductById(id));
    await dispatch(toggleShowModalCreate())
  }

  const changeStatusFilter = (status: string) => {
    dispatch(filterStatus(status))
  }

  return (
    <div className="w-screen h-screen">
      <div className="header">
        <div className="bg-blue-400 h-16 w-full float-left">
          <div className="flex justify-between">
            <div className="flex">
              <div className="logo w-48 bg-blue-400 h-16 text-center">
                <p className="font-bold text-5xl pt-1 text-white">{ process.env.IP_ACCESS }</p>
              </div>

              <div>
                <p className="text-xl ml-10 mt-4 text-white"> </p>
              </div>
            </div>

            <Search />

            <div className="flex flex-col justify-center mr-5">
              <div className="shrink-0">
                <img
                  onClick={() => showModalAvatar()}
                  className="h-12 w-12 object-cover rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                  alt="Current profile photo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {ModalAvatar ? <ModalProfile /> : ""}

      <div className="menu">
        <div
          className="w-48 bg-slate-800 float-left"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <ul>
            <li className="pt-5">
              <div className="w-full text-white p-3">
                <a href="#">B??u ph???m</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* <ModalConfirm /> */}

      {!ModalCreate ? (
        <>
          <div>
            <div className="float-left mt-4 mx-5">
              <input
                type="radio"
                onChange={() => changeStatusFilter("All")}
                name="filter"
                defaultChecked
              />{" "}
              <span className=" ml-2">T???t c???</span>
            </div>
            <div className="float-left mt-4 mx-5">
              <input
                type="radio"
                onChange={() => changeStatusFilter("New")}
                // onChange={() => setFilterStatusState("New")}
                name="filter"
                // value={filterStatus}
              />{" "}
              <span className=" ml-2">Ch??a giao</span>
            </div>
            <div className="float-left mt-4 mx-5">
              <input
                type="radio"
                onChange={() => changeStatusFilter("Delivered")}
                name="filter"
                // value={filterStatus}
              />{" "}
              <span className="ml-2">??ang giao</span>
            </div>
            <div className="float-left mt-4 mx-5">
              <input
                type="radio"
                onChange={() => changeStatusFilter("Finish")}
                name="filter"
                // value={filterStatus}
              />{" "}
              <span className="ml-2">Giao th??nh c??ng</span>
            </div>
            <div className="float-left mt-4 mx-5">
              <input
                type="radio"
                onChange={() => changeStatusFilter("Rejected")}
                name="filter"
                // value={filterStatus}
              />{" "}
              <span className="ml-2">Giao th???t b???i</span>
            </div>
          </div>

          <div>
            <div className="float-right">
              { DataResponse?.Object?.Rule === 1 ? 
                <button
                  onClick={() => showModalCreateButton()}
                  className="mr-3 mt-3 border-black py-1 px-2 mb-3 rounded"
                >
                  + Th??m m???i
                </button>
                : ""
              }
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {ModalCreate ? (
        <Add
          id={id}
        />
      ) : (
        <div className="float-left main top-0 left-0">
          <div
            className="p-3 scrollbar-thin scrollbar-thumb-blue-300 overflow-auto scrollbar-thumb-rounded-xl scrollbar-track-rounded-full border-t-[1px] border-blue-300"
            style={{
              width: "calc(100vw - 12.3rem)",
              height: "calc(100vh - 8rem)",
            }}
            id="style-2 "
          >
            <div className="w-full w3-animate-opacity">
              {product?.DataResponse?.Object?.map((x) => (
                <div key={x._id}>
                  <div className="h-auto w-full border-b-2 p-3 border-blue-300 text-gray-500 hover:bg-slate-300">
                    <div
                      className="cursor-pointer"
                      onClick={() => showDetailButton(x._id)}
                    >
                      <div className="flex flex-row w-full">
                        <div className="w-[50%]">
                          <p className="text-xl text-black">{x.NameProduct}</p>
                        </div>
                        <div className="w-[20%]">
                          <p>{x.Weight}Kg</p>
                        </div>
                        <div className="w-[30%]">
                          <div className="float-right">
                            <span
                              className={
                                processStatus(x.Status).css + " text-sm"
                              }
                            >
                              {processStatus(x.Status).content}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <p>N??i nh???n: {x.UserSendAddress} </p>
                        <p>N??i g???i: {x.AddressReceive} </p>
                      </div>
                      <div className="mt-4">
                        {x.Action?.canEdit &&
                        DataResponse?.Object?.Rule === 1 ? (
                          <button onClick={() => updateButton(x._id)} className="mr-3">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        ) : (
                          ""
                        )}
                        {x.Action?.canDelete &&
                        DataResponse?.Object?.Rule === 1 ? (
                          <button
                            onClick={() => deleteButton(x._id)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {ShowDetail ? 
        <ModalDetail /> 
      : <div className="w3-animate-opacity"></div>}
      {ModalConfirmStatusForDelete && idState ? (
        <ModalConfirm title={actionTitle.Delete} id={idState} x={actionNumber.Delete} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
