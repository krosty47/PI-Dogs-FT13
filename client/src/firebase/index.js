import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDJO5Z0G3YDLOBEYTjdE5YsWROGyMFQDHE",
    authDomain: "fir-react-uploads.firebaseapp.com",
    projectId: "fir-react-uploads",
    storageBucket: "fir-react-uploads.appspot.com",
    messagingSenderId: "867501304075",
    appId: "1:867501304075:web:cb713abcc08f9363019a0e",
    measurementId: "G-YM2FWDPN97"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export { storage, firebase as default };
