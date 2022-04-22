import React, { Fragment } from "react";

const ItemsAccount = () => {
  return (
    <Fragment>
      <div className="flex h-auto w-full border-2 p-3 justify-between text-gray-500 hover:bg-slate-300">
        <div className="">
          <p className="text-xl text-black">Nhân Viên 1</p>
          <p>Chức vụ: Nhân Viên</p>
          <p>Tạo lúc: 15/3/2022</p>
        </div>
        <div>
          <div className="mt-5">
            <p>Số điện thoại: 0914136118</p>
            <p>Giới tính: Nam</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <button className="border-[1px] hover:bg-blue-200 p-1">Xóa tài khoản</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ItemsAccount;
