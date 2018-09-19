import * as firebase from "firebase";
import firebaseConfig from "./config";
import newRecording from "./models/newRecording";

const url = "gs://anserphone-5de7a.appspot.com";

let database;

export const initializeFirebase = () => {
  console.log("initializing firebase!");
  firebase.initializeApp(firebaseConfig);
  return (database = firebase.database());
};

export const uploadToFB = async blob => {
  const blobToSend = await blob;
  const ref = firebase
    .storage()
    .ref()
    .child(blobToSend._data.name);
  const snapshot = await ref.put(blobToSend);
  const downloadURL = await snapshot.ref.getDownloadURL();
  console.log(downloadURL);
  // console.log(JSON.parse(snapshot));
  makeDatabaseEntry(downloadURL);
  return;
};

export const makeDatabaseEntry = url => {
  let key = database.ref("/recordings/").push().key;
  let model = newRecording(
    key,
    url,
    firebase.database.ServerValue.TIMESTAMP,
    true
  );
  return database.ref("/recordings/" + key).set(model);
};

export const getAllRecordings = async () => {
  const res = await database.ref("/recordings").once("value");
  const recordings = res.val();
  return Object.keys(recordings).map(key => ({
    ...recordings[key],
  }));
};
