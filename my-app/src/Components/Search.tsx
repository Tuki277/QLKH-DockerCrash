import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchProduct } from "../redux/features/product";

const Search = () => {

  const dispatch = useDispatch()

  const [model, setModel] = useState({
    NameProduct: ""
  });

  const updatedModel = (event: ChangeEvent<HTMLInputElement>) => {
    setModel({
      ...model,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(searchProduct(model.NameProduct))
  };

  useEffect(() => {
      dispatch(searchProduct((model.NameProduct).trim()))
  }, [model.NameProduct])
  

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-3 mr-40">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <input
            className="placeholder:text-slate-400 block bg-white w-96 border border-slate-300 py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Tìm kiếm"
            type="text"
            name="NameProduct"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updatedModel(event)
            }
          />
        </label>
      </div>
    </form>
  );
};

export default Search;
