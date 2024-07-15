import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCrnqhQm50qO-kVqkONTZ0z8gxCYpiFsPo",
//   authDomain: "bistro-boss-d5479.firebaseapp.com",
//   projectId: "bistro-boss-d5479",
//   storageBucket: "bistro-boss-d5479.appspot.com",
//   messagingSenderId: "826537551488",
//   appId: "1:826537551488:web:539e02277a773df6a2e865"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
export default app;
