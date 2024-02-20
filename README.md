## Installation
For this code to work you need to make a folder called Firebase.
And in there add a file called Config.js.
In the Config file import the following:

    import { initializeApp } from "firebase/app";
    import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query} from "firebase/firestore";
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

Then add your own web app's Firebase configuration.
Next initialize Firebase
    `initializeApp(firebaseConfig);`
And add two variables and exports:

    const firestore = getFirestore();
    const MESSAGES = 'messages';
    export {
        firestore,
        collection,
        addDoc,
        serverTimestamp,
        onSnapshot,
        query,
        MESSAGES,
        getAuth,
        signInWithEmailAndPassword
    };

If done right the app should work.
