import React, { Fragment } from "react";

const Items = () => {
  return (
    <Fragment>
      <div className="flex h-auto w-full border-2 p-3 justify-between text-gray-500 hover:bg-slate-300">
        <div className="">
          <p className="text-xl text-black">Product 11 - User Receive 1</p>
          <p>Số điện thoại: 0914136118</p>
          <p>Tạo lúc: 15/3/2022</p>
        </div>
        <div>
          <div className="mt-5">
            <p>Xác nhận đã giao hàng: Ship 1</p>
            <p>Nơi gửi: VN - Nơii nhận: VN</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
        <span className="text-green-600 text-sm">Đã Hoàn Thành</span>
        </div>

        <div className="flex flex-col justify-center">
          <button className="border-[1px] hover:bg-blue-200">Xóa</button>
          <button className="border-[1px] p-2 hover:bg-blue-200">Chuyển vận chuyển</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Items;
