import React from "react";

function Die({ id, value, isHeld, handleDieHold }) {
  return (
    <>
      <button
        className={`btn-die ${isHeld ? "die-held" : undefined}`}
        onClick={() => handleDieHold(id)}
      >
        {value}
      </button>
    </>
  );
}

export default React.memo(Die);
