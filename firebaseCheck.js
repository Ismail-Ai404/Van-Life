/** @format */

import { initializeApp } from "firebase/app";
import {
	getFirestore,
	doc,
	getDoc,
	collection,
	getDocs,
} from "firebase/firestore";

// Use the same config as firebaseInitialize.js
const firebaseConfig = {
	apiKey: "AIzaSyCSN3rkzSvIgUUw9hDikeLrjOanQ8umu-Q",
	authDomain: "vanlife-a280f.firebaseapp.com",
	projectId: "vanlife-a280f",
	storageBucket: "vanlife-a280f.firebasestorage.app",
	messagingSenderId: "593479224254",
	appId: "1:593479224254:web:4aef577447de29198647ef",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkUsers() {
	try {
		console.log("Checking user document id=123...");
		const userRef = doc(db, "users", "123");
		const snap = await getDoc(userRef);
		if (snap.exists()) {
			console.log("Document data for users/123:");
			console.log(JSON.stringify(snap.data(), null, 2));
		} else {
			console.log("No document found at users/123");
		}

		console.log("\nListing all documents in `users` collection:");
		const usersCol = collection(db, "users");
		const querySnap = await getDocs(usersCol);
		if (querySnap.empty) {
			console.log("`users` collection is empty.");
		} else {
			for (const d of querySnap.docs) {
				console.log(`- ${d.id}: ${JSON.stringify(d.data())}`);
			}
		}
	} catch (e) {
		console.error("Error reading users collection:", e);
	}
}

checkUsers();
