import { useEffect } from "react";

export default function useMistakeTracker({
  attempts,
  languages,
  setIsGameRunning,
  setShowMessage,
  farewellMessages,
}) {
  useEffect(() => {
    if (attempts >= 8) {
      setIsGameRunning(false);
      setShowMessage({ text: "Game Over!", type: "lost", show: true });
    } else if (attempts > 0 && attempts < 8) {
      const currentLanguage = languages[attempts - 1].value;
      const currentMessage = farewellMessages[currentLanguage];
      setShowMessage({ text: currentMessage, type: "custom", show: true });
    }
  }, [attempts, languages, farewellMessages, setIsGameRunning, setShowMessage]);
}
