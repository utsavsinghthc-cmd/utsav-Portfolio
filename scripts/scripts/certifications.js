import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const list = document.getElementById("certification-list");

async function loadCertifications() {
  list.innerHTML = "<p>Loading...</p>";
  const q = query(collection(db, "certifications"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    list.innerHTML = "<p>No certifications uploaded yet.</p>";
    return;
  }

  list.innerHTML = "";
  snapshot.forEach((doc) => {
    const cert = doc.data();
    const card = document.createElement("article");
    card.className = "item";
    card.innerHTML = `
      <h3>${cert.title || "Untitled"}</h3>
      <p><strong>Issuer:</strong> ${cert.issuer || "N/A"}</p>
      <p><strong>Year:</strong> ${cert.year || "N/A"}</p>
      <p>${cert.description || ""}</p>
      ${cert.credentialUrl ? `<a href="${cert.credentialUrl}" target="_blank">View Credential</a>` : ""}
    `;
    list.appendChild(card);
  });
}

loadCertifications().catch((err) => {
  list.innerHTML = `<p>Unable to load certifications: ${err.message}</p>`;
});
