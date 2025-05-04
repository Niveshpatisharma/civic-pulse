
# 🚀 CivicSync – Community Issue Reporting & Voting Platform

**CivicSync** is a modern web-based platform that empowers citizens to report, track, and prioritize civic issues in their communities. Whether it's potholes, broken streetlights, or waste management concerns, CivicSync helps users raise their voices and track resolution transparently.

---

## 🌟 Features

* **🔐 User Authentication**

  * Secure login & registration with password strength indicators
  * Auth tokens persist across sessions

* **📝 Report Issues**

  * Submit civic issues with title, description, category, and location
  * Support for location tagging using an interactive map

* **🗺️ Interactive Map**

  * View submitted issues geographically
  * Toggle between list and map-based views

* **👍 Voting System**

  * Upvote public issues to surface community priorities
  * Each user can vote once per issue

* **📊 Dashboard & Analytics**

  * Personal dashboard to track submitted issues
  * Visualize breakdowns by status, category, and votes using charts

* **🧭 Issue Lifecycle Management**

  * Only issue owners can edit/delete their reports
  * Issues can be edited/deleted only in the “Pending” state

---

## 🧑‍💻 Technologies Used

* **Frontend:**

  * React (w/ TypeScript)
  * Vite
  * Tailwind CSS
  * shadcn/ui for styled components
  * React Router (navigation)
  * React Query (API state)
  * Recharts (data visualization)

---

## 📂 Project Structure

```bash
src/
│
├── components/     # Reusable UI components
├── contexts/       # React context providers (auth, theme, etc.)
├── hooks/          # Custom hooks (useAuth, useVote, etc.)
├── pages/          # Main app pages (Home, Dashboard, Login, etc.)
├── services/       # API integration and service logic
└── types/          # Shared TypeScript type definitions
```

---

## 🛠️ Getting Started

### 📋 Prerequisites

* Node.js & npm — [Install via NVM](https://github.com/nvm-sh/nvm#installing-and-updating)

### ⚙️ Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/Niveshpatisharma/civic-pulse.git

# 2. Navigate into the project folder
cd civic-pulse

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

---

## 📌 User Role

All users are **citizens**. Their access and privileges are scoped based on:

* **Ownership**: Users can edit or delete only their own issues
* **Status**: Users can edit/delete issues **only when Pending**
* **Voting**: One vote per user per issue

---

## 🎯 Objective Recap

CivicSync simulates a scalable MVP civic tech app with:

* Real-time issue reporting
* Geographic visualization
* Community engagement through voting
* Secure, role-based user access

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repo
2. Create a new branch (`git checkout -b feature-xyz`)
3. Commit your changes
4. Push and open a pull request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).



### Build by Nivesh