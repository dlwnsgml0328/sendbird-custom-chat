import { App as SendBirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

const Chat = () => {
  const configValue: string = process.env.REACT_APP_APP_ID as string;

  return (
    <div style={{ height: "90vh", width: "100vw" }}>
      <SendBirdApp
        // Add the two lines below.
        appId={configValue} // Specify your Sendbird application ID.
        userId="junhee" // Specify your user ID.
        nickname="junhee"
      />
    </div>
  );
};

export default Chat;
