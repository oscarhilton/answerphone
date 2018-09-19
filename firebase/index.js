import * as firebase from 'firebase';
import firebaseConfig from "./config";
import uuid from "uuid";

const url =
  'gs://anserphone-5de7a.appspot.com';

export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  console.log("initializing firebase!");
};

export const uploadToFB = async blob => {
  const blobToSend = await blob;
  const ref = firebase.storage().ref().child(blobToSend._data.name);
  const snapshot = await ref.put(blobToSend);
  return snapshot.downloadURL;
};
