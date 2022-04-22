import React from 'react'
import ItemsAccount from '../Components/ItemsAccount'

const ManagerAccount = () => {
  return (
    <div className="float-left main top-0 left-0">
        <div
          className="p-3 overflow-x-auto"
          style={{ width: "calc(100vw - 12rem)", height: "calc(100vh - 4rem)" }}
        >

          <div className="float-right">
            <button className="border-2 border-black py-1 px-2 mb-3 rounded-lg">+ Thêm tài khoản mới</button>
          </div>

          <div className="">
            <ItemsAccount />
          </div>
        </div>
      </div>
  )
}

export default ManagerAccount