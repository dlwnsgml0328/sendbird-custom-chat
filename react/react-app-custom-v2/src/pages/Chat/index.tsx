import { App as SendBirdApp } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';
import { configValue } from '../../config/env';

// uikit 중에서도 전부 제공되고 있는 상태 (색상 외의 커스텀은 힘들어 보임)

const Chat = () => {
  return (
    <div style={{ height: '90vh', width: '100vw' }}>
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
