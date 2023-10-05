import { useState } from "react";
import { axiosWithAuth } from "../Utils/axiosWithAuth";

export const useAxios = ({
  reqType,
  endpoint,
  payload,
  config,
  initialValue,
}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const doRequest = () => {
    setLoading(true);
    return axiosWithAuth()
      [reqType](endpoint, payload, config)
      .then((res) => {
        setData(res.data);
        return res.data;
      })
      .catch((err) => {
        setErr(err);
        throw err;
      })
      .finally(() => setLoading(false));
  };

  return [data, doRequest, loading, err];
};
