import {
  SendBirdProvider,
  withSendBird,
  sendBirdSelectors,
} from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';

const Welcome = ({ currentUser }) => {
  return <div>{`Hello, ${currentUser || 'unknown user'}`}</div>;
};

const WelcomeWithSendBird = withSendBird(Welcome, (state) => {
  const sdk = sendBirdSelectors.getSdk(state);
  const currentUser = sdk && sdk.getCurrentUserId && sdk.getCurrentUserId();
  return { currentUser };
});

const GetSDK = () => (
  <SendBirdProvider
    appId={'A8145FFF-D372-4D0A-BC71-53FC1F852AB9'}
    userId={'junhee'}
    nickname={'junhee'}
  >
    <WelcomeWithSendBird />
  </SendBirdProvider>
);

export default GetSDK;
