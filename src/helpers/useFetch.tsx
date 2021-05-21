import React, { useState, useEffect } from "react";
import axios from "axios";
import { accessToken } from "./helperFunc";
const FetchFunc = (usertype: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${usertype}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        let allData = res.data;
        console.log("seller", allData);
        setData(allData);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setLoading(true);
        setError(err.message);
      });
  }, [usertype]);

  return { data, loading, error };
};

export default FetchFunc;
