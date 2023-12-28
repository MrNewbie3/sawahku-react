import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { formatDistanceToNowStrict } from "date-fns";
import Chart from "../components/ChartData";
import axios from "axios";
import { Switch } from "@headlessui/react";
export default function Controls() {
  const [feeds, setFeeds] = useState([]);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (feeds.length === 0)
      return () => {
        axios
          .get(
            `https://api.thingspeak.com/channels/1895967
          /fields/1.json?api_key=ZMJ1CC36Y1GFYEDU
          `
          )
          .then((response) => {
            setFeeds(response.data.feeds);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  }, []);
  const gettingDate = new Date();
  const dateNow = `${gettingDate.getFullYear()}-0${parseFloat(gettingDate.getUTCMonth()) + 1}-${parseFloat(gettingDate.getDate()) - 1}T23:59:00Z`;
  const toUnix = new Date(dateNow).getTime();
  const labels = feeds.map((params) => {
    const dataToUnix = new Date(params.created_at).getTime();
    return formatDistanceToNowStrict(new Date(params.created_at), { addSuffix: true });
  });

  const handleChange = () => {
    enabled ? setEnabled(false) : setEnabled(true);
    axios
      .post(`https://api.thingspeak.com/update?api_key=03TXG8KE7R52F6YF`, { field4: enabled ? 0 : 1 })
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = {
    labels,
    datasets: [
      {
        label: "maximum level",
        data: labels.map(() => 2.1),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Water Latitude",
        data: labels.map((e, index) => feeds[index].field1),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="controller text-xl font-bold">
        <h1 className=" my-4 ">Water Switch</h1>
        <div className="waterController flex flex-row items-center text-lg font-bold gap-x-4">
          <p>Off</p>
          <Switch checked={enabled} onChange={handleChange} className={`${enabled ? "bg-blue-600" : "bg-red-600"} relative inline-flex h-10 w-20 items-center rounded-full`}>
            <span className="sr-only">Enable notifications</span>
            <span className={`${enabled ? "translate-x-11" : "translate-x-1"} inline-block h-8 w-8 transform rounded-full bg-white transition`} />
          </Switch>
          <p>On</p>
        </div>
      </div>
      {<Chart data={data} title={"Water Altitude"} />}{" "}
    </AdminLayout>
  );
}
