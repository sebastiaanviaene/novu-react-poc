import React from 'react';
import './App.css';
import { NovuProvider, PopoverNotificationCenter, NotificationBell, IMessage, useNotifications } from '@novu/notification-center';

 enum ButtonTypeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  CLICKED = 'clicked',
}

 enum MessageActionStatusEnum {
  PENDING = 'pending',
  DONE = 'done',
}


const App = () => {
  return (
    <div className="App">
      <NovuProvider
      backendUrl={"https://api.sebaguan.be"}
      socketUrl={"https://ws.sebaguan.be"}
      subscriberId={'1'}
      applicationIdentifier={'LWLDoiUFi-px'}
    >
      <NotificationCenter />
    </NovuProvider>
    
    </div>
  );
}

const NotificationCenter = () => {
  const { updateAction } = useNotifications();
  const onActionClick = async (
    templateIdentifier: string,
    type: string,
    message: IMessage
  ) => {
    if (type === 'primary') {
     console.log(message);
     await updateAction(message._id, ButtonTypeEnum.PRIMARY, MessageActionStatusEnum.DONE);

    }
    console.log(message)
  }
  return <PopoverNotificationCenter onNotificationClick={() => console.log('click')} colorScheme={'dark'} onActionClick={onActionClick}>
  {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
</PopoverNotificationCenter>;
}

export default App;
