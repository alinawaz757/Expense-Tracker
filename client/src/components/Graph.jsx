import React, { useEffect, useState } from "react";
import { ArcElement, Chart } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Labels from "./Labels";
import { default as api } from "../Store/API_Slice";
import { getLabels } from "./helper/helper";
import _ from "lodash";

Chart.register(ArcElement);
const Graph = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  if (isFetching) return <div>Fetching...</div>;
  if (isError) return <div>Error while fetching</div>;
  if (isSuccess) {
    const percent = getLabels(data);
    const totals = percent.map(v=>v.total)
    const backgroundColor = percent.map(v=>v.color)
    const config = {
      data: {
        datasets: [
          {
            label: "My First Dataset",
            data: totals,
            backgroundColor,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        cutout: 125,
        spacing: 10,
        borderRadius: 50,
      },
    };

    return (
      <div>
        <div className="max-w-xs flex flex-col mx-auto">
          <div className="item">
            {data && (
              <div className=" relative">
                <Doughnut {...config} className="mb-8" />
                <h3 className="mb-4 absolute top-[40%] left-[38%] font-bold">
                  Total
                  <span className="block text-emerald-400 text-3xl">${_.sum(totals)}</span>
                </h3>
              </div>
            )}
          </div>
          <Labels />
        </div>
      </div>
    );

  }
  
  
};

export default Graph;
