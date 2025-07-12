# 🧠 StackIt – A Minimal Q&A Platform for Collaborative Learning

StackIt is a streamlined, community-driven question-and-answer web platform built to support collaborative learning and structured knowledge sharing. Inspired by StackOverflow, it empowers users to ask, answer, and discover questions in a developer-friendly ecosystem.

---

## 👥 Collaborators

- Chirag Singh
- Sneha Singh
- Harsh Pandey

## 🚀 Features

### ✅ Ask a Question
- Submit a *new question* with:
  - *Title* – Clear and descriptive
  - *Description* – Written using a full-featured *Rich Text Editor*
  - *Tags* – Multi-select from relevant technologies (e.g., React, JWT, Node.js)

### 📝 Rich Text Editor Capabilities
- Format support:
  - *Bold, *Italic, ~Strikethrough~
  - 📋 Numbered & Bullet Lists
  - 😃 Emoji insertion
  - 🔗 Hyperlinks
  - 🖼 Image uploads
  - 📐 Text alignment (Left, Center, Right)

### 💬 Answer Questions
- Anyone can view questions
- *Only logged-in users* can post answers
- Answers use the same *Rich Text Editor* for formatting

### 👍 Voting & ✔ Accepted Answers
- Upvote or downvote any answer
- Question owners can *mark one answer as "Accepted"*

### 🏷 Tagging System
- Questions must include *at least one relevant tag*
- Helps with filtering, discovery, and categorization

### 🔔 Notification System
- Bell icon in top navbar shows unread notifications count
- Users receive notifications when:
  - Someone answers their question
  - Someone comments on their answer
  - Someone mentions them using @username
- Clicking the bell shows a dropdown of *recent activity*

---

## 🛠 Tech Stack

| Frontend              | Backend           | Database       | Authentication |
|-----------------------|------------------|----------------|----------------|
| React + Vite          | Node.js + Express | MongoDB Atlas  | JWT            |
| Tailwind CSS          | REST APIs         | Mongoose       | bcrypt         |
| React Quill (Editor)  |                   |                |                |

---

## ⚙ Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/stackit-platform.git
cd stackit-platform

# 2. Install dependencies for client and server
cd client
npm install

cd ../server
npm install

# 3. Setup environment variables
# Create a .env file inside /server with the following:
MONGO_URI=your_mongo_db_connection
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

# 4. Run the app
# In one terminal: run server
cd server
npm run dev

# In another terminal: run client
cd client
npm run dev
🙌 Contributing
We welcome contributions!

Fork the repo

Create your feature branch: git checkout -b feature/awesome-feature

Commit your changes: git commit -m 'Add awesome feature'

Push to the branch: git push origin feature/awesome-feature

Open a pull request 🚀

📄 License
This project is licensed under the MIT License.
See LICENSE for more information.

🌐 Live Demo
Coming Soon – Deployed on Vercel + Render

🧩 Future Roadmap
 User Profiles & Avatars

 Dark/Light Theme Toggle

 Real-Time Chat for Q&A Discussion

 Admin Dashboard

“A good question is never answered. It is not a bolt to be tightened into place, but a seed to be planted.” 🌱
— John Ciardi

yaml
Copy
Edit
