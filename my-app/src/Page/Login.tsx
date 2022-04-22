import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../interface";
import { login } from "../redux/features/login";
import { RootState } from "../redux/store";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn } = useSelector((state: RootState) => state.systemLogin)

  useEffect(() => {
      if (loggedIn) {
        navigate("/")
        window.location.reload()
      }
  }, [loggedIn])

  const [model, setModel] = useState<ILogin>({
    Username: "",
    Password: "",
  });

  const updatedModel = (event: ChangeEvent<HTMLInputElement>) => {
    setModel({
      ...model,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    var result: any = await dispatch(login(model))
    if (result.error.name === "Error") {
      alert("Đăng nhập thất bại")
    }
  };

  return (
    <Fragment>
      <div className="h-screen w-screen loginBgc">
        <div className="container mx-auto h-screen w-screen flex flex-col justify-center">
          <div className="w-1/2 text-center mx-auto mt-52">
            <form onSubmit={onSubmit} className="flex items-center flex-col shadow-2xl rounded-xl py-24 bg-white">
              <h1 className="mb-3 text-2xl">ĐĂNG NHẬP TÀI KHOẢN</h1>
              <label className="block w-96">
                {/* <span className="block text-sm font-medium text-slate-700">
                  Tên đăng nhập
                </span> */}
                <input
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updatedModel(event)
                  }
                  placeholder="Tài khoản"
                  type="text"
                  name="Username"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                />
              </label>
              <label className="block mt-3 w-96">
                {/* <span className="block text-sm font-medium text-slate-700">
                  Mật khẩu
                </span> */}
                <input
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updatedModel(event)
                  }
                  placeholder="Mật khẩu"
                  name="Password"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                />
              </label>
              <button type="submit" className="bg-blue-500 py-2 px-10 text-white mt-3 rounded-xl hover:bg-blue-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-blue-300 ...">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
