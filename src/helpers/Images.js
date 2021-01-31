import storage from '@react-native-firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import {launchImageLibrary} from 'react-native-image-picker';

export const UploadImageToStorage = (image, prefix,uid, cb) => {
  if (!image || typeof image !== 'object') {
    return cb('');
  }

  const ext = image.fileName.split('.').pop();
  const filename = `${uid}.${ext}`;

  const ref = storage().ref(`${prefix}/${filename}`);
  ref
    .putFile(image.uri)
    .then((res) => {
      ref.getDownloadURL().then((url) => {
        cb(url);
      });
    })
    .catch((err) => {
      console.warn({err});
    });
};

export const UploadImagesToStorageRecursive = (
  images,
  prefix,
  cb,
  urls = [],
  index = 0,
) => {
  if (index === images.length) {
    cb(urls);
  } else {
    UploadImageToStorage(images[index], prefix, (url) => {
      urls.push(url);
      UploadImagesToStorageRecursive(images, prefix, cb, urls, index + 1);
    });
  }
};

export const PickImage = (cb,cbb) => {
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
      cb(source.uri);
      cbb(source);
    }
  });

};
