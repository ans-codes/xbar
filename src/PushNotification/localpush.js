import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: '1', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.configure({
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export function EmployeeGotInvite() {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: 'You have been invited to join a group',
    subText: 'Group invitation',
    title: 'Group Invite',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Accept", "Reject"]',
  });
}

export function EmployeeAcceptedInvite() {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: 'Employee accepted your invitation',
    subText: 'Group invitation',
    title: 'Group Invite',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
  });
}
