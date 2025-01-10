import React, { useState } from "react";
import StarRating from "./StarRating";
import { useShowList } from "../context/ShowListContext";

function ShowItemCard({ key, item }) {
  const [error, setError] = useState("");
  const {
    deleteShowItem,
    increaseEpisode,
    decreaseEpisode,
    increaseSeason,
    decreaseSeason,
    updateIsComplete
  } = useShowList();
  return (
    <section className="card">
      {item.name}
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "24px" }}>
        <span
          style={{
            cursor: "pointer",
            color: item.isCompleted ? "green" : "red",
            marginRight: "10px",
          }}
          onClick={() => updateIsComplete(item._id, item.isCompleted)}
        >
          {item.isCompleted ? "✔" : "✖"}
        </span>
        
      </div>
      <br />
      <StarRating rating={item.rating} />S{item.season} / E{item.episode}
      <br />
      Season:
      <input
        type="button"
        className="bMinus"
        value="-"
        onClick={() => {
          item.season - 1 < 1
            ? setError("Season Must be > 0")
            : decreaseSeason(item._id, item.season);
        }}
      />
      <input
        type="button"
        value="+"
        className="bPlus"
        onClick={() => {
          increaseSeason(item._id, item.season);
        }}
      />
      <br />
      Episode:
      <input
        type="button"
        className="bMinus"
        value="-"
        onClick={() => {
          item.episode - 1 < 1
            ? setError("Episode Must be > 0")
            : decreaseEpisode(item._id, item.episode);
        }}
      />
      <input
        type="button"
        value="+"
        className="bPlus"
        onClick={() => {
          increaseEpisode(item._id, item.episode);
        }}
      />
      {error && (
        <h4>
          <br />
          {error}
        </h4>
      )}
      <br />
      <button
        className="delete"
        onClick={() => {
          deleteShowItem(item._id);
        }}
      >
        🗑️
      </button>
    </section>
  );
}

export default ShowItemCard;
