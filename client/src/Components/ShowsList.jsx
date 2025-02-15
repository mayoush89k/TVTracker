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
  const {
    showList,
    loading,
    error,
    setToView,
    toView,
    toViewList,
    yearsList,
    year,
    setYear,
  } = useShowList();

  useEffect(() => {
    localStorage.setItem("toView", toViewSelect);
    setToView(toViewSelect);
    setInCompSelect(toViewSelect);
    setCompSelect(
      toViewSelect == "ToWatch" || toViewSelect == "InProgress"
        ? "InComplete"
        : toViewSelect
    );
    console.log("compSelect: " , compSelect);
    console.log("toViewSelect: " + toViewSelect);
    toViewList();
    
  }, [toViewSelect, localStorage.getItem("toView")]);

  return (
    <section>
      {/* {console.log(compSelect)} */}
      {loading ? (
        <SpinnerDotted />
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
            onChange={(e) => {
              // setCheckedYear(e.target.value)
              setYear(Number(e.target.value));
            }}
            value={year}
          >
            <option value="0">All Years</option>
            {yearsList.map((currYear, key) => (
              <option value={currYear} key={key}>
                {currYear}
              </option>
            ))}
          </select>
          <section className="showList">
            {showList.length == 0 ? (
              <h1 className="">No shows found</h1>
            ) : (
              showList.map((item) => (
                <ShowItemCard key={item._id} item={item} />
              ))
            )}
            </section>
        </section>
      )}
    </section>
  );
}

export default ShowsList;
