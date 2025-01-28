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
    setToView,
    toViewList,
    updateList,
    createNewList,
    deleteItem,
  } = useShowList();

  useEffect(() => {
    toViewList();
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
        <section>
          <button
            className="completed"
            onClick={() => {
              localStorage.setItem("toView", "Completed");
              setToView("Completed");
            }}
          >
            Completed
          </button>
          <button
            className="completed"
            onClick={() => {
              localStorage.setItem("toView", "InComplete");
              setToView("InComplete");
            }}
          >
            InComplete
          </button>
          <button
            className="completed"
            onClick={() => {
              localStorage.setItem("toView", "InProgress");
              setToView("InProgress");
            }}
          >
            In Progress
          </button>
          <button
            className="completed"
            onClick={() => {
              localStorage.setItem("toView", "ToWatch");
              setToView("ToWatch");
            }}
          >
            To Watch
          </button>
          <button
            className="completed"
            onClick={() => {
              localStorage.setItem("toView", "");
              setToView("");
            }}
          >
            All
          </button>
          <section className="showList">
            {showList.map((item) => (
              <ShowItemCard key={item._id} item={item} />
            ))}
          </section>
        </section>
      )}
    </section>
  );
}

export default ShowsList;
