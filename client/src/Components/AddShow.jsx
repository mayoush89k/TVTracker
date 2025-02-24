import React, { useEffect, useState } from "react";
import { useShowList } from "../context/ShowListContext";
import { SpinnerDotted } from "spinners-react";

function AddShow() {
  const [newShowItem, setNewShowItem] = useState({ episode: 1, season: 1 });
  const { newShowError, setNewShowError, newShowLoading, addNewShowList } =
    useShowList();
  const [isModalOpen, setIsModalOpen] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // make the tooltip buttons index behind the modal i have to save them here
  const tooltipButtons = document.querySelectorAll(".tooltip-btn");

  const saveHandle = (e) => {
    e.preventDefault();
    if (newShowItem.name != "") {
      setNewShowError("Insert Show Name");
    }
    addNewShowList(newShowItem);

    setTimeout(() => {
      closeModal();
    }, 3000);
  };

  useEffect(() => {
    setNewShowError("");
  }, []);

  useEffect(() => {
  isModalOpen ? tooltipButtons.forEach((tooltipB) => (tooltipB.style.zIndex = -1)) :
  tooltipButtons.forEach((tooltipB) => (tooltipB.style.zIndex = 1));
}, [isModalOpen]);

  return (
    <section className="addModel-container">
      <button
        className="addNew"
        onClick={() => {
          setNewShowError("");
          isModalOpen ? closeModal() : openModal();
        }}
      >
        Add New Show
      </button>
      {isModalOpen && (
        <section className="addNewModal">
          {newShowLoading ? (
            <SpinnerDotted />
          ) : newShowError ? (
            <h4>{newShowError}</h4>
          ) : (
            <form>
              <section style={{ display: "flex", flexDirection: "row" }}>
                <h2>Add New TV Show </h2>
                <button style={{ padding: "10px" }} onClick={closeModal}>
                  X
                </button>
              </section>
              <input
                onChange={(e) =>
                  setNewShowItem({ ...newShowItem, name: e.target.value })
                }
                type="text"
                placeholder="Enter Show Name"
              />
              <label>Year:</label>
              <input
                onChange={(e) =>
                  setNewShowItem({ ...newShowItem, year: e.target.value })
                }
                type="number"
                placeholder="Enter Year"
              />
              <label>Season:</label>
              <input
                onChange={(e) =>
                  setNewShowItem({ ...newShowItem, season: e.target.value })
                }
                type="number"
                placeholder="Enter Season"
                defaultValue="1"
              />
              <label>Episode:</label>
              <input
                onChange={(e) =>
                  setNewShowItem({ ...newShowItem, episode: e.target.value })
                }
                type="number"
                placeholder="Enter Episode"
                defaultValue="1"
              />
              <label>Rating:</label>
              <select
                onChange={(e) =>
                  setNewShowItem({ ...newShowItem, rating: e.target.value })
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {newShowError && <label>{newShowError}</label>}
              <button onClick={saveHandle}>Save</button>
            </form>
          )}
        </section>
      )}
    </section>
  );
}

export default AddShow;
