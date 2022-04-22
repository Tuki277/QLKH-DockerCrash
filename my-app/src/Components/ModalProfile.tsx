import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/login";
import { RootState } from "../redux/store";

const ModalProfile = () => {

  const { DataResponse } = useSelector((state: RootState) => state.systemLogin)

  const dispatch = useDispatch()

  const logoutButton = () => {
    dispatch(logout())
  }

  return (
    <div className="bg-white shadow-2xl w-40 absolute rounded-xl right-5 top-16 border-[1px]">
      <div className="flex justify-center flex-col text-center my-3">
        <p>{ DataResponse?.Object?.FullName }</p>
        <p>{ DataResponse?.Object?.PhoneNumber }</p>
        <button className="border-t-[1px] mt-2 hover:bg-gray-200" onClick={() => logoutButton()}>Đăng Xuất</button>
      </div>
    </div>
  );
};

export default ModalProfile;
