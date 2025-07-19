import admin from "firebase-admin";
import fetch from "node-fetch";
import * as path from "path";
import * as fs from "fs";

// Path to your service account key
const serviceAccountPath = path.resolve(__dirname, "../firebase/prepwise-d8190-firebase-adminsdk-fbsvc-5bf1a95117.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("Service account file not found:", serviceAccountPath);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

const db = admin.firestore();

const AUTH_EMULATOR_URL = "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key";

async function createTestUser(email: string, password: string) {
  const res = await fetch(AUTH_EMULATOR_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const data = await res.json();
  if (!data.localId) throw new Error("Failed to create user: " + JSON.stringify(data));
  return data.localId;
}

async function seed() {
  const email = "testuser@example.com";
  const password = "password123";
  console.log("Creating test user...");
  const userId = await createTestUser(email, password);
  console.log("Test user created with UID:", userId);

  console.log("Adding sample interview...");
  await db.collection("interviews").add({
    userId,
    createdAt: admin.firestore.Timestamp.now(),
    type: "text",
    logs: [],
  });
  console.log("Sample interview added.");
}

seed().then(() => {
  console.log("Seeding complete!");
  process.exit(0);
}).catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
}); 