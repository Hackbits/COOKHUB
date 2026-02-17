/**
 * COOKHUB - Storage Service (Firebase Storage)
 * Handles recipe image uploads and deletions.
 */

import { storage } from "@/lib/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  type UploadTaskSnapshot,
} from "firebase/storage";

/**
 * Upload a recipe image to Firebase Storage.
 * @returns The public download URL of the uploaded image.
 */
export async function uploadRecipeImage(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<string> {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storageRef = ref(storage, `recipes/${timestamp}_${safeName}`);

  const metadata = { contentType: file.type };
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      },
    );
  });
}

/**
 * Delete an image from Firebase Storage by its full path.
 */
export async function deleteImage(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}
