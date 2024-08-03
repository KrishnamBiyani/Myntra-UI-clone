import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());
    fetch("https://2-actual-backend.vercel.app/items", { signal })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        if (Array.isArray(data.items)) {
          dispatch(itemsActions.addInitialItems(data.items));
        } else {
          console.error("Fetched data is not an array", data.items);
        }
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });

    return () => {
      controller.abort();
    };
  }, [fetchStatus, dispatch]);

  return null;
};

export default FetchItems;
