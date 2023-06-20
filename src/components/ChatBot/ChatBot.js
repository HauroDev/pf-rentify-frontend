import { useEffect } from "react";

function TestBot() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v0/inject.js";
    script.async = true;
    script.onload = () => {
      window.botpressWebChat.init({
        botId: "8997c940-2247-450a-8ada-4b8afd4b910e",
        hostUrl: "https://cdn.botpress.cloud/webchat/v0",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "8997c940-2247-450a-8ada-4b8afd4b910e",
      });
      window.botpressWebChat.onEvent(() => {
        window.botpressWebChat.sendEvent({ type: "show" });
      }, ["LIFECYCLE.LOADED"]);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
}

export default TestBot;
