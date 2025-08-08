# 📊 Portfolio Planner

**A responsive web-based app for planning investment portfolios focused on the Ethiopian market.**
Define your goals, get auto-allocated portfolios based on your investor type, and check if your financial goals are met.

---

## ✨ Features

* 🧾 **Investor Setup**: Enter initial capital, target goal, and investor type (Active or Passive).
* 📈 **Portfolio Breakdown**: View asset allocations and expected yields via **pie** and **bar charts**.
* 🧮 **Result Summary**: See returns per asset, total projected return, and a clear **Goal Met / Missed** message.
* 📱 **Responsive Design**: Mobile-friendly and desktop-optimized.
* ✅ **Input Validation**: Robust real-time form validation using **Zod + React Hook Form**.
* 💾 **State Persistence**: Save progress across sessions via **Zustand persist middleware**.
* 📊 **Visualizations**: Interactive charts using **Recharts**.

---

## 🛠️ Tech Stack

| Category         | Stack                                               |
| ---------------- | --------------------------------------------------- |
| 🧑‍💻 Frontend   | Next.js, React, TypeScript                          |
| 📦 State Mgmt    | Zustand + `persist` middleware                      |
| 📝 Forms         | React Hook Form + Zod                               |
| 🎨 UI            | Shadcn UI (Form, Button, Card, etc.) + Tailwind CSS |
| 📊 Charts        | Recharts (Pie & Bar charts)                         |
| 🌗 Theme         | Light/Dark mode via ThemeProvider                   |
| 🔠 Fonts & Icons | Geist Sans/Mono, Lucide React                       |

---

## 🗂️ Project Structure

```bash
app/
  └── page.tsx (Home, Setup, Portfolio, Results)
  └── layout.tsx (Metadata, fonts, theme)

components/
  ├── ProgressSteps.tsx
  ├── StatCard.tsx
  ├── Spinner.tsx
  └── Header.tsx

store/
  └── portfolio-store.ts

entities/
  └── investor-setup.ts

lib/
  ├── constants.ts
  └── utils.ts

public/
  └── (static assets)
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Melki123shi/portfolio-planner.git
cd portfolio-planner

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
# Open http://localhost:3000
```

```bash
# Build for production
npm run build
npm start
```

---

## 💡 Usage Guide

1. **🏠 Home**: Click **"Start Planning"** to begin.
2. **📝 Investor Setup**:

   * Enter capital & goal (≥ \$1,000, goal > capital).
   * Choose investor type (Active or Passive).
3. **📊 Portfolio Breakdown**:

   * View asset allocation & expected yields.
4. **📈 Results**:

   * See total return and **Goal Achieved / Missed**.
   * Start a new plan anytime.

---

## 📊 Data & Calculations

| Asset                | Return/Yield |
| -------------------- | ------------ |
| EthioTelecom (Stock) | 20%          |
| Gov. Bond (Bond)     | 10%          |
| BIRR (Cash)          | 7%           |

### 🧠 Allocation

* **Active**: 60% Stock, 30% Bond, 10% Cash
* **Passive**: 30% Stock, 50% Bond, 20% Cash

### 📐 Formula

```ts
Total Return = Σ (allocation % × capital × yield %)
Goal Met = (capital + return) ≥ goal amount
```

---

## ✅ Acceptance Criteria

* All pages work without errors.
* Calculations match predefined yields.
* Form validation is enforced.
* Charts are responsive and accurate.
* Goal result is clear and visible.
* State persists across sessions.

---

## 🔭 Future Improvements

* 🔄 Real-time data via external APIs
* ➕ Add more or custom Ethiopian assets
* 🧑‍💼 User authentication & multi-plan storage
* 🧠 Interactive chart features (tooltips, filtering)
* ♿ Accessibility improvements (ARIA, keyboard nav)

---

## 📷 Screenshots
# Light Mode
<img width="1539" height="898" alt="image" src="https://github.com/user-attachments/assets/9dbb279f-a689-4bd9-ad5d-60867c2569fa" />
<img width="1539" height="898" alt="image" src="https://github.com/user-attachments/assets/471cc6fa-ab1b-47ce-83c5-c18422d528d6" />
<img width="1539" height="898" alt="image" src="https://github.com/user-attachments/assets/cf696181-91f8-4288-8879-d4060902ab3a" />


# Dark Mode
<img width="1539" height="898" alt="image" src="https://github.com/user-attachments/assets/b55a628f-f901-443b-91b4-6f66259b863e" />
<img width="1539" height="898" alt="image" src="https://github.com/user-attachments/assets/93166dc1-075a-4808-b164-f159d438af54" />
<img width="1539" height="898" alt="image" src="https://github.com/user-attachments/assets/293186af-33e6-4e0f-bb40-9f23dc0ac4a0" />

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork & clone
git checkout -b feature/your-feature
git commit -m "Add feature"
git push origin feature/your-feature
# Open a pull request
```
