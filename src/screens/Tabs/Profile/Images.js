import {launchImageLibrary} from 'react-native-image-picker';

export const PickImage = (cb) => {
  const options = {
    title: 'Upload Photo',
    chooseFromLibraryButtonTitle: 'Choose photo from Library',
    storageOptions: {
      skipBackup: true,
      path: 'Pictures/myAppPicture/',
      privateDirectory: true,
    },
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.warn('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = {
        uri: response.uri,
        fileName: response.fileName,
        path: response.path,
      };
      cb(source);
    }
  });
};
