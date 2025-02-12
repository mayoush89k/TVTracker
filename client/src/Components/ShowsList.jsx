import React, { useState } from "react";
import { SpinnerDotted } from "spinners-react";
import { useEffect } from "react";
import { useShowList } from "../context/ShowListContext.jsx";
import ShowItemCard from "./ShowItemCard.jsx";

function ShowsList() {
  const [toViewSelect, setToViewSelect] = useState(
    localStorage.getItem("toView")
  );
  const [compSelect, setCompSelect] = useState("");
  const [inCompSelect, setInCompSelect] = useState("");
  const { showList, loading, error, setToView, toViewList, yearsList , getShowsListByYear} =
    useShowList();
  const [checkedYear, setCheckedYear] = useState("");

  useEffect(() => {
    localStorage.setItem("toView", toViewSelect);
    setToView(toViewSelect);
    setInCompSelect(toViewSelect);
    setCompSelect(
      toViewSelect == "ToWatch" || toViewSelect == "InProgress"
        ? "InComplete"
        : toViewSelect
    );
    toViewList();
  }, [toViewSelect]);

  return (
    <section>
      {console.log(compSelect)}
      {loading ? (
        <SpinnerDotted />
      ) : showList.length == 0 ? (
        <h1>Empty List</h1>
      ) : error ? (
        <h1>Something went wrong</h1>
      ) : (
        <section>
          <select
            className="completed"
            onChange={(e) => {
              setToViewSelect(e.target.value);
            }}
            value={compSelect}
          >
            <option value="" disabled hidden>
              Choose an option
            </option>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="InComplete">InComplete</option>
          </select>

          {compSelect == "InComplete" && (
            <select
              onChange={(e) => setToViewSelect(e.target.value)}
              className="completed"
              value={inCompSelect}
            >
              <option value="" disabled hidden>
                Choose an option
              </option>
              <option value="InComplete">All</option>
              <option value="InProgress">in Progress</option>
              <option value="ToWatch">To Watch</option>
            </select>
          )}
          <select
            className="completed"
            onChange={(e) => {setCheckedYear(e.target.value)
              getShowsListByYear(Number(e.target.value))
            }}
            value={checkedYear}
          >
            <option value="" disabled>
              Choose a Year
            </option>
            {yearsList.map((year , key) => (
              <option value={year} key={key}>{year}</option>
            ))}
          </select>
          {/* <button
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
          </button> */}
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
