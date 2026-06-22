import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore"
import { env } from "../config/env.js";

admin.initializeApp({ projectId: env.FIREBASE_PROJECT_ID });

export const db = getFirestore();

