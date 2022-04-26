import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';

import kr from 'date-fns/locale/ko';
// import '@sendbird/uikit-react/dist/index.css';

const DateLocalization = () => {
  return (
    <SendbirdProvider
      appId="ABD4B8EB-4479-4478-9C51-D41B009C6780"
      userId="yessen"
      nickname="yessen"
      dateLocale={kr}
    />
  );
};

export default DateLocalization;
