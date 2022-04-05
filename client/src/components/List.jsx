import React from "react";
import "boxicons";
import { default as api } from "../Store/API_Slice";
const List = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();

  const renderHistory = () => {
    if (isFetching) return <div>Fetching...</div>;
    if (isSuccess) {
      if (data.length < 1) return <div>No record found</div>;
      const reverseData = [...data];
      return reverseData
        .reverse()
        .slice(0, 10)
        .map((item) => (
          <div
            key={item._id}
            className="flex justify-center shadow-lg py-2 bg-gray-50 rounded"
            style={{ borderRight: `8px solid ${item?.color}` }}
          >
            <button className="px-3">
              <box-icon
                name="trash"
                color="red"
                onClick={(e) => deleteTransaction({ _id: item._id })}
              />
            </button>
            <span className="block w-full">{item.name}</span>
          </div>
        ));
    }
    if (isError) return <div>Error while loading history!</div>;
  };
  return (
    <div className="mt-8 flex flex-col gap-4">
      <h1 className="text-xl font-bold">History</h1>
      <div className="flex flex-col text-xl gap-4">{renderHistory()}</div>
    </div>
  );
};

export default List;
