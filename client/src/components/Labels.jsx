import React from "react";
import { default as api } from "../Store/API_Slice";
import { getLabels } from "./helper/helper";

const Labels = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const renderLabels = () => {
    if (isFetching) return <div>Fetching...</div>;
    if (isError) return <div>Error while fetching</div>;
    if (isSuccess) {
      const fetchedLabels = getLabels(data)
      if(data.length < 1) return <div>Please add a transaction first!</div>
      return fetchedLabels.map((v) => (
        <div className="flex justify-between" key={v.color}>
          <h3 className="flex ">
            <div
              className="w-2 h-2 mr-2 py-3 my-auto rounded"
              style={{ backgroundColor: v.color ?? "yellow" }}
            ></div>
            {v.type ?? "Savings"}
          </h3>
          <span>{v.percent ?? 0}%</span>
        </div>
      ));
    }
  };
  return <div className="flex flex-col gap-2">{renderLabels()}</div>;
};

export default Labels;
