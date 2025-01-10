import React from "react";
import { SpinnerDotted } from "spinners-react";
import { useEffect } from "react";
import { useShowList } from "../context/ShowListContext.jsx";
import ShowItemCard from "./ShowItemCard.jsx";

function ShowsList() {
  const {
    showList,
    loading,
    error,
    setError,
    getAll,
    updateList,
    createNewList,
    deleteItem,
  } = useShowList();

  useEffect(() => {
    getAll();
  }, []);
  return (
    <section>
      {console.log(showList)}
      {loading ? (
        <SpinnerDotted />
      ) : showList.length == 0 ? (
        <h1>Empty List</h1>
      ) : error ? (
        <h1>Something went wrong</h1>
      ) : (
        <section className="showList">
          {showList.map((item) => (
            <ShowItemCard key={item._id} item={item} />
          ))}
        </section>
      )}
    </section>
  );
}

export default ShowsList;
