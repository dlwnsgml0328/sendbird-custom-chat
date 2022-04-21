import { App as SendBirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

const Chat = () => {
  return (
    <div style={{ height: "90vh", width: "100vw" }}>
      <SendBirdApp
        // Add the two lines below.
        appId="A8145FFF-D372-4D0A-BC71-53FC1F852AB9" // Specify your Sendbird application ID.
        userId="junhee" // Specify your user ID.
        nickname="junhee"
      />
    </div>
  );
};

export default Chat;
