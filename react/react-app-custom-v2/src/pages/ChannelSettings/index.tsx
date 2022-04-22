import { SendBirdProvider, OpenChannelSettings } from 'sendbird-uikit';

import { configRoom, configValue } from '../../config/env';

const ChannelSettings = () => {
  return (
    <SendBirdProvider appId={configValue} userId={'junhee'}>
      <div style={{ height: '90vh' }}>
        {/* 
            예를 들면 uikit을 사용할 경우 해당 kit 중 세부적인 컴포넌트에 대해서 컨트롤이 안된다. 
            포탈을 통해서 모달을 열어주고 있는데, 모달의 배치가 이상할 경우 모달을 선택하기 까다롭다
        */}
        <OpenChannelSettings
          renderChannelProfile={({ channel, user }) => (
            <div>
              {channel.url} {user.nickname}
            </div>
          )}
          channelUrl={configRoom} // Pass your channel URL here
        />
      </div>
    </SendBirdProvider>
  );
};

export default ChannelSettings;
