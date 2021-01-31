import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const COLLECTION = 'Users';

const User = {
  RegisterEmployee: (username, email, password,type,bio, onSuccess, onError) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((authResponse) => {
          const { uid } = authResponse.user;
          firestore()
            .collection(COLLECTION)
            .doc(uid)
            .set({
              uid,
              username,
              email: email,
              bio: bio,
              type:type,
              createdAt:Date.now(),
              imageUrl:null
            })
            .then((res) => {
              firestore()
                .collection(COLLECTION)
                .doc(uid)
                .get()
                .then((querySnapshot) => {
                  var user = querySnapshot.data()
                  onSuccess({uid,...user});
                })
                .catch((error) => {
                  onError(error);
                });
            });
        })
        .catch((error) => {
          alert(error.message)
          console.error(error);
          if (error.code === 'auth/email-already-in-use') {
            onError('Email already in use.');
          } else if (error.code === 'auth/invalid-email') {
            onError('Invalid Email.');
          } else if (error.code === 'auth/weak-password') {
            onError('Strong password required.');
          } else {
            onError('Try later.');
          }
        });
  },
  RegisterManager: (username, email, password,type,companyName,officeTime, onSuccess, onError) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authResponse) => {
        const { uid } = authResponse.user;
        firestore()
          .collection(COLLECTION)
          .doc(uid)
          .set({
            uid,
            username,
            email: email,
            type:type,
            bio:companyName,
            officeTime,
            createdAt:Date.now(),
            imageUrl:null
          })
          .then((res) => {
            firestore()
              .collection(COLLECTION)
              .doc(uid)
              .get()
              .then((querySnapshot) => {
                var user = querySnapshot.data()
                onSuccess({uid,...user});
              })
              .catch((error) => {
                onError(error);
              });
          });
      })
      .catch((error) => {
        alert(error.message)
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
          onError('Email already in use.');
        } else if (error.code === 'auth/invalid-email') {
          onError('Invalid Email.');
        } else if (error.code === 'auth/weak-password') {
          onError('Strong password required.');
        } else {
          onError('Try later.');
        }
      });
},
  SignInUsingGoogle: (isNewUser, uid, username, email, image_url, onSuccess, onError) => {
    if (isNewUser) {
      firestore()
        .collection(COLLECTION)
        .doc(uid)
        .set({
          uid,
          username,
          email: email,
          imageUrl: image_url,
          bio: '',
          type:'Employee',
          createdAt:Date.now(),
        })
        .then((res) => {
          firestore()
            .collection(COLLECTION)
            .doc(uid)
            .get()
            .then((querySnapshot) => {
              var user = querySnapshot.data()
              onSuccess({uid,...user});
            })
            .catch((error) => {
              onError(error);
            });
        });
    } else {
      firestore()
        .collection(COLLECTION)
        .doc(uid)
        .get()
        .then((querySnapshot) => {
          var user = querySnapshot.data()
              onSuccess({uid,...user});
        })
        .catch((error) => {
          onError(error);
        });
    }
  },
  SignInUsingFacebook: (isNewUser, uid, username, email, image_url, onSuccess, onError) => {
    if (isNewUser) {
      firestore()
        .collection(COLLECTION)
        .doc(uid)
        .set({
          uid,
          username,
          email: email,
          imageUrl: image_url,
          bio: '',
          type:'Employee',
          createdAt:Date.now(),
        })
        .then((res) => {
          firestore()
            .collection(COLLECTION)
            .doc(uid)
            .get()
            .then((querySnapshot) => {
              var user = querySnapshot.data()
              onSuccess({uid,...user});
            })
            .catch((error) => {
              onError(error);
            });
        })
    } else {
      firestore()
        .collection(COLLECTION)
        .doc(uid)
        .get()
        .then((querySnapshot) => {
          var user = querySnapshot.data()
          onSuccess({uid,...user});
        })
        .catch((error) => {
          onError(error);
        });
    }
  },
  Login: (email, password, onSuccess, onError) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((authResponse) => {
        const { uid } = authResponse.user;
        firestore()
          .collection(COLLECTION)
          .doc(uid)
          .get()
          .then((querySnapshot) => {
            var user = querySnapshot.data()
              onSuccess({uid,...user});
          })
          .catch((error) => {
            onError(error);
          });
      })
      .catch((error) => {
        onError(error);
      });
  },
  UpdateProfile: (uid, fields, onSuccess, onError) => {
    firestore()
      .collection(COLLECTION)
      .doc(uid)
      .update(fields)
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        onError(err);
      });
  },
  UpdatePassword: (previousPassword, newPassword, onSuccess, onError,onSocialError) => {
    auth().fetchSignInMethodsForEmail(auth().currentUser.email)
      .then((res) => {
        if (res[0] === 'facebook.com') {
          onSocialError('You are registered via Facebook login');
        } else if (res[0] === 'google.com') {
          onSocialError('You are registered via Google login');
        } else {
          const user = auth().currentUser;
          const cred = auth.EmailAuthProvider.credential(
            user.email,
            previousPassword,
          );

          user
            .reauthenticateWithCredential(cred)
            .then(() => {
              user.updatePassword(newPassword).then(onSuccess).catch(onError);
            })
            .catch(onError);
        }
      });
  },
  LogoutUser: (onSuccess, onError) => {
    auth().signOut().then(onSuccess).catch(onError);
    
  },
};

export default User;
