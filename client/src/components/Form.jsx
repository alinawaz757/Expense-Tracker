import React from "react";
import { useForm } from "react-hook-form";
import {default as api} from "../Store/API_Slice"
import List from "./List";

const Form = () => {
  const { register, resetField, handleSubmit } = useForm();
  const [addTransaction] = api.useAddTransactionMutation()
  const onSubmit = (data) => {
    addTransaction(data)
    resetField("name");
    resetField("amount");
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-8">Transaction</h1>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="shadow-lg py-1 rounded">
            <input
              className="px-2 w-full focus:outline-none text-2xl"
              type="text"
              placeholder="salary, house, rent, SIP"
              {...register("name")}
            />
          </div>
          <div className="shadow-lg py-1 rounded">
            <select
              className="bg-white outline-none w-full text-2xl"
              {...register("type")}
            >
              <option value="Investment">Investment</option>
              <option value="Savings">Savings</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className="shadow-lg py-1 rounded">
            <input
              className="px-2 w-full focus:outline-none text-2xl"
              type="number"
              placeholder="amount"
              {...register("amount")}
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 rounded text-white py-2">
            Make Transaction
          </button>
        </div>
      </form>
      <List />
    </div>
  );
};

export default Form;
