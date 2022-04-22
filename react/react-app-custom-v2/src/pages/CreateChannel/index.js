import { useCallback, useState } from 'react';
import {
  SendBirdProvider,
  withSendBird,
  sendBirdSelectors,
  ChannelList,
} from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';

const appId = 'A8145FFF-D372-4D0A-BC71-53FC1F852AB9';
const userId = 'junhee';
// const channelUrl = '';

// 내부 컴포넌트 (hoc로 감싸서 사용하고자 하는 메서드를 하위 props로 내려준다.)
const CreateChannel = ({ createChannel, sdk, leaveChannel }) => {
  console.log('sdk: ', sdk);

  const [channelUrl, setChannelUrl] = useState('');

  const makeNewChannel = useCallback(() => {
    let params = new sdk.GroupChannelParams();
    params.isPublic = false;
    params.isEphemeral = false;
    params.isDistinct = false;
    params.addUserIds(['sravan']);
    params.name = 'sravan';
    createChannel(params)
      .then((c) => {
        setChannelUrl(c.url);
      })
      .catch((c) => console.warn(c));
  }, [createChannel, sdk]);

  return (
    <div style={{ border: '2px solid #fff', borderBottom: '2px solid #000' }}>
      <button onClick={makeNewChannel} style={{ marginRight: '1%' }}>
        {' '}
        Create channel
      </button>
      <button
        onClick={() => {
          leaveChannel(channelUrl)
            .then((c) => {
              setChannelUrl('');
            })
            .catch((c) => console.warn(c));
        }}
      >
        Leave channel
      </button>

      <p
        style={{
          background: '#fff',
          margin: 0,
          padding: '1%',
        }}
      >{`Created channel is: ${channelUrl}`}</p>
    </div>
  );
};

// hoc 관련 기능
const CustomComponentWithSendBird = withSendBird(CreateChannel, (state) => {
  const createChannel = sendBirdSelectors.getCreateChannel(state);
  const leaveChannel = sendBirdSelectors.getLeaveChannel(state);
  const sdk = sendBirdSelectors.getSdk(state);
  return { createChannel, sdk, leaveChannel };
});

// 최상위 export 할 컴포넌트
export const ChannelCRUDSelectors = () => (
  <SendBirdProvider appId={appId} userId={userId} nickname={userId}>
    <div style={{ width: '100vw', height: '90vh', background: '#CABDFF' }}>
      <CustomComponentWithSendBird />
      <div style={{ width: '320px', height: '100%' }}>
        <ChannelList />
      </div>
    </div>
  </SendBirdProvider>
);
