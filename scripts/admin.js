import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const fileInput = document.getElementById("csv-file");
const uploadBtn = document.getElementById("upload-btn");
const statusBox = document.getElementById("status");

const parseCsv = (text) => {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    return Object.fromEntries(headers.map((h, i) => [h, (cols[i] || "").trim()]));
  });
};

uploadBtn.addEventListener("click", async () => {
  const file = fileInput.files?.[0];
  if (!file) {
    statusBox.textContent = "Please select a CSV file first.";
    return;
  }

  const text = await file.text();
  const certs = parseCsv(text);

  let successCount = 0;
  for (const cert of certs) {
    await addDoc(collection(db, "certifications"), {
      title: cert.title,
      issuer: cert.issuer,
      description: cert.description,
      year: cert.year,
      credentialUrl: cert.credentialUrl,
      createdAt: Date.now()
    });
    successCount++;
  }
  statusBox.textContent = `Uploaded ${successCount} certification records.`;
});
