import { OpenChannel, SendBirdProvider } from 'sendbird-uikit';
import { configValue } from '../../config/env';

// https://sendbird.com/docs/uikit/v1/react/guides/open-channel

const Channel = () => {
  return (
    <SendBirdProvider appId={configValue} userId="yessen" nickname="yessen">
      <div style={{ height: '90vh' }}>
        <OpenChannel
          fetchingParticipants={false}
          useMessageGrouping={false} // To determine whether to use message grouping,
          disableUserProfile // to determine whether to display user profile on clicking userIcons,
          channelUrl="sendbird_open_channel_5417_8bdafff58fb3ac01575fb463383a50ffdf3a0149" // pass your channel URL here.
        />
      </div>
    </SendBirdProvider>
  );
};

export default Channel;
