import React, { useEffect, useState } from "react";
import ProgressComps from "../components/Progress";
import AdminLayout from "../layouts/AdminLayout";
import axios from "axios";
import { FadeLoader } from "react-spinners";
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data.length === 0)
      axios
        .get(
          `https://api.thingspeak.com/channels/1895967
    /feeds.json?api_key=ZMJ1CC36Y1GFYEDU
    `
        )
        .then((result) => {
          setData(result.data);
          setLoading(false);
        })

        .catch((err) => {
          console.log(err);
        });
  }, [data]);
  console.log(data);
  return (
    <AdminLayout>
      {loading ? (
        <div className="wrapper flex items-center justify-center h-screen -mt-24">
          <FadeLoader className="text-center" color="rgb(249 115 22)" />
        </div>
      ) : (
        <div className="container flex flex-row gap-x-10 justify-center items-center  h-screen -mt-24">
          <ProgressComps percentage={data.feeds[data.feeds.length - 1].field1} value={data.feeds[data.feeds.length - 1].field1 + " mm"} caption={"water altitude"} time={data.feeds[data.feeds.length - 1].created_at} />
          <ProgressComps percentage={data.feeds[data.feeds.length - 1].field2} value={data.feeds[data.feeds.length - 1].field2 + " pH"} caption={"water pH"} time={data.feeds[data.feeds.length - 1].created_at} />
        </div>
      )}
    </AdminLayout>
  );
}
