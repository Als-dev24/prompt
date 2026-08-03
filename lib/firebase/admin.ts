import * as admin from "firebase-admin"

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const adminKey = process.env.FIREBASE_ADMIN_SDK_KEY

  if (!adminKey) {
    throw new Error("FIREBASE_ADMIN_SDK_KEY environment variable is not set")
  }

  try {
    const serviceAccount = JSON.parse(adminKey)

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  } catch (error) {
    console.error("Failed to parse FIREBASE_ADMIN_SDK_KEY:", error)
    throw error
  }
}

export const adminDb = admin.firestore()
export const adminAuth = admin.auth()

export default admin
