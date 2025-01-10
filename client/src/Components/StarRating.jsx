import React, { useState } from "react";

function StarRating(props) {

  const [rating, setRating] = useState(props.rating); // Current saved rating
  const [tempRating, setTempRating] = useState(0); // Temporary rating for hover
  const [isEditing, setIsEditing] = useState(false); // Edit mode toggle

  const handleSave = () => {
    setRating(tempRating); // Save the temporary rating
    setIsEditing(false); // Exit edit mode
    console.log(rating)
  };

  const handleEdit = () => {
    setTempRating(rating); // Set temp rating to current rating
    setIsEditing(true); // Enter edit mode
  };

  return (
    <div style={{ fontSize: "1rem", textAlign: "center" }}>
      {isEditing ? (
        <div>
          {/* Editable Rating */}
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                onClick={() => setTempRating(index + 1)}
                onMouseEnter={() => setTempRating(index + 1)}
                onMouseLeave={() => setTempRating(rating)}
                style={{
                  cursor: "pointer",
                  color: index < tempRating ? "gold" : "lightgray",
                  transition: "color 0.2s",
                }}
              >
                {index < tempRating ? "⭐" : "☆"}
              </span>
            ))}
          </div>
          <button onClick={handleSave} style={{ margin: "10px", padding: "5px 15px" }}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)} style={{ margin: "10px", padding: "5px 15px" }}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {/* Saved View */}
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                style={{
                  color: index < rating ? "gold" : "lightgray",
                }}
              >
                {index < rating ? "⭐" : "☆"}
              </span>
            ))}
          </div>
          <button onClick={handleEdit} style={{ margin: "10px", padding: "5px 15px" }}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default StarRating;
