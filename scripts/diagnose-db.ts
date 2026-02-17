import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as path from "path";
import * as fs from "fs";

const serviceAccountPath = path.resolve(__dirname, "../service-account.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

const app = initializeApp({ credential: cert(serviceAccount) });

const CANDIDATE_NAMES = [
  "(default)",
  "cookhub-9c63a", // Project ID as DB name
  "cookhub",
  "production",
  "prod",
  "default", // "default" string vs "(default)"
  "test",
  "staging",
];

async function checkDatabase(dbName: string) {
  console.log(`\n🔍 Checking database: "${dbName}"...`);
  try {
    const db = getFirestore(app, dbName);
    // Try a lighter operation: listCollections or just read a non-existent doc
    // List collections requires read permissions and is a good text
    const collections = await db.listCollections();
    console.log(
      `   ✅ SUCCESS! Connected to "${dbName}". Found ${collections.length} collections.`,
    );
    return true;
  } catch (err: unknown) {
    const errCode =
      err instanceof Object && "code" in err
        ? (err as { code: unknown }).code
        : undefined;
    const errMessage = err instanceof Error ? err.message : String(err);
    if (errCode === 5) {
      // NOT_FOUND
      console.log(`   ❌ Not Found (code 5)`);
    } else {
      console.log(`   ❌ Error: ${errMessage} (code ${errCode})`);
    }
    return false;
  }
}

async function run() {
  console.log("🛠️  Starting Database Connectivity Diagnosis...");
  console.log(`   Project ID: ${serviceAccount.project_id}`);

  for (const name of CANDIDATE_NAMES) {
    const success = await checkDatabase(name);
    if (success) {
      console.log(`\n🎉 Found valid database: "${name}"`);
      process.exit(0);
    }
  }

  console.log("\n⚠️  No valid database found in standard candidates.");
}

run();
