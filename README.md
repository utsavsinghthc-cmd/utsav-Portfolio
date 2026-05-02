# utsav-Portfolio
# Utsav Portfolio Website

Multi-page resume portfolio with Firebase-powered certifications and CSV upload admin panel.

## Pages
- `index.html` - summary and contact
- `projects.html` - projects
- `experience.html` - experience and activities
- `certifications.html` - reads certifications from Firebase Firestore
- `admin.html` - upload CSV and push certifications to Firestore

## Firebase setup
1. Create a Firebase project and Firestore database.
2. Update `scripts/firebase-config.js` with your credentials.
3. Enable Firestore read/write rules for your environment.

## CSV format
Use the included `sample-certifications.csv` format:

```csv
title,issuer,description,year,credentialUrl
```

## Run locally
Open the HTML files via any static server, for example:

```bash
python3 -m http.server 8080
```
