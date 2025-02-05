import React, { useState } from "react";
import { useShowList } from "../context/ShowListContext";
import { SpinnerDotted } from "spinners-react";

function EditingShow({ item, setIsOpenEditModel }) {
  const [editedItem, setEditedItem] = useState(item);

  const { editError, editLoading, editShowData } = useShowList();
  const saveHandle = (e) => {
    e.preventDefault();
    editShowData(editedItem);
    !editError && setIsOpenEditModel(true)
    if (!editError && !editLoading) {
      setIsOpenEditModel(false);
    }
  };
  return (
    <section className="addNewModal">
      {editLoading && <SpinnerDotted />}
      <form>
        <section style={{ display: "flex", flexDirection: "row" }}>
          <h2>Edit {item.name} </h2>
          <button
            style={{ padding: "10px" }}
            onClick={() => setIsOpenEditModel(false)}
          >
            X
          </button>
        </section>
        <input
          onChange={(e) =>
            setEditedItem({ ...editedItem, name: e.target.value })
          }
          type="text"
          value={editedItem.name}
        />
        <label>Season:</label>
        <input
          onChange={(e) =>
            setEditedItem({ ...editedItem, season: e.target.value })
          }
          type="number"
          value={editedItem.season}
        />
        <label>Episode:</label>
        <input
          onChange={(e) =>
            setEditedItem({ ...editedItem, episode: e.target.value })
          }
          type="number"
          value={editedItem.episode}
        />
        <label>Rating:</label>
        <select
          value={editedItem.rating}
          onChange={(e) =>
            setEditedItem({ ...editedItem, rating: e.target.value })
          }
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {editError && <label>{editError}</label>}
        <button onClick={saveHandle}>Save</button>
      </form>
    </section>
  );
}

export default EditingShow;
