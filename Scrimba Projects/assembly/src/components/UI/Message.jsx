import React from "react";

export default function Message({ showMessage }) {
  const style = {
    visibility: showMessage.show ? "visible" : "hidden",
  };

  if (showMessage.type === "lost") {
    return (
      <div style={style} className="message-container">
        <div className="message message-lost">
          <h3 className="message-title">{showMessage.text}</h3>
          <p>You lost! Better start learning Assembly! 😭</p>
        </div>
      </div>
    );
  } else if (showMessage.type === "win") {
    return (
      <div style={style} className="message-container">
        <div className="message message-win">
          <h3 className="message-title">{showMessage.text}</h3>
          <p>Well done! 🎉</p>
        </div>
      </div>
    );
  } else if (showMessage.type === "custom") {
    return (
      <div style={style} className="message-container">
        <p className="message">{showMessage.text}</p>
      </div>
    );
  }

  return (
    <div style={style} className="message-container">
      <p className="message">
        Something slipped in the whitespace... but you're still alive. 🐍
      </p>
    </div>
  );
}
