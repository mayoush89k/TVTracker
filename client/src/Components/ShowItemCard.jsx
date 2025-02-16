import React, { useState } from "react";
import StarRating from "./StarRating";
import { useShowList } from "../context/ShowListContext";
import EditingShow from "./EditingShow";

function ShowItemCard({ item }) {
  const [error, setError] = useState("");
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
  const {
    deleteShowItem,
    increaseEpisode,
    decreaseEpisode,
    increaseSeason,
    decreaseSeason,
    updateIsComplete,
  } = useShowList();

  return (
    <section className="cardContainer">
      {isOpenEditModel && <EditingShow item={item} setIsOpenEditModel={setIsOpenEditModel} />}
      {/* Name */}
      <div className="title">{item.name}

      </div>
      {/* Year */}
      {item.year > 0 ? <div className="title">{item.year}</div>: <div>-</div>}
      <section className="card">
        {/* Completed icon */}
        <div className="completedIcon">
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
        {/* Rating */}

        <div>
          <StarRating rating={item.rating} />
        </div>
        {/* current S/Ep */}
        <div>
          S{item.season} / E{item.episode}
        </div>
        {/* Inc/Dec Season */}
        <div className="SeasonContainer">
          <label>Season:</label>
          <span className="seasonButtons">
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
          </span>
        </div>
        {/* Inc/Dec Episode */}
        <div className="EpisodeContainer">
          <label>Episode:</label>
          <span className="episodeButtons">
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
          </span>
        </div>
        <div>
          {/* Delete */}
          <button
            className="delete"
            onClick={() => {
              deleteShowItem(item._id);
            }}
          >
            🗑️
          </button>
          {/* Edit */}
          <button
            className="edit"
            onClick={() => {
              setIsOpenEditModel(true);
            }}
          >
            ✏️
          </button>
        </div>
        {error && <h4>{error}</h4>}
      </section>
    </section>
  );
}

export default ShowItemCard;
