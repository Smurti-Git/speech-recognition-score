# speech-recognition-score-&-Tesk

# 🧂 Salt & Pepper – Elegant Answer Scoring App

Salt & Pepper is a beautifully designed web application built for manually scoring subjective answers with real-time history tracking and theme switching. This minimalist app offers a clean, distraction-free UI with a powerful use case for trainers, teachers, evaluators, and anyone needing to record answers with their scores.

---

## 🌟 Full Feature List & Use Cases

### ✍️ 1. **Answer Input Field**
- **What It Does:** A large textarea where users type in subjective answers.
- **Use Case:** Trainers can write or paste responses given by students during assessments.

### 🔢 2. **Score Input Field**
- **What It Does:** An adjacent field for entering a score (e.g., out of 5 or 10).
- **Use Case:** Assign a mark or score to the submitted answer based on evaluation.

### ✅ 3. **Submit Button**
- **What It Does:** Submits the answer and score, and logs them into the history.
- **Use Case:** Every time you complete evaluating one answer, you hit submit to log it.

### 📜 4. **Real-Time History Tracking**
- **What It Does:** Displays all previously submitted answers with scores.
- **Use Case:** Quickly review previous evaluations without flipping through paper or tabs.

### 🎨 5. **Theme Toggle (Salt & Pepper Mode)**
- **What It Does:** A floating button to switch between light mode (Salt) and dark mode (Pepper).
- **Use Case:** Reduce eye strain during night-time usage or improve visibility during the day.

### 🔍 6. **Clean, Responsive Design**
- **What It Does:** Adapts the layout for desktops, tablets, and mobile devices.
- **Use Case:** Use the app conveniently in classroom settings, meetings, or while traveling.

### 📏 7. **Aligned Input Fields**
- **What It Does:** Input fields for answer and score are horizontally aligned with a submit button below.
- **Use Case:** Enables fast, intuitive data entry while maintaining form clarity.

### 🧾 8. **History Cards with Styling**
- **What It Does:** Submitted entries are shown in visually separated cards.
- **Use Case:** Helps visually distinguish one student’s answer from another’s for easy readability.

### 🧠 9. **Mode-Aware Styling**
- **What It Does:** All elements like buttons, inputs, and cards adapt to the selected theme.
- **Use Case:** Maintains consistent appearance and usability regardless of light/dark mode.

### 📱 10. **Responsive Media Queries**
- **What It Does:** Adjusts font sizes, button padding, and layout for smaller screens.
- **Use Case:** Use seamlessly on phones and tablets during mobile evaluations or fieldwork.

---

## 🚀 How to Use

1. **Enter Answer** → Write the answer in the textarea.
2. **Enter Score** → Type the score in the small input box.
3. **Submit** → Click the “Submit” button to save the entry.
4. **Review History** → See all submissions in the History section below.
5. **Switch Theme** → Use the toggle button on the top-right corner to change between light/dark.

---

## 💾 How History is Stored

- **Temporary In-Memory**: The history is stored in memory using a JavaScript array.
- **Reset on Refresh**: Currently, the history is cleared if the page is refreshed.
- **Extendable**: You can easily connect this to `localStorage`, or backend APIs for permanent logging.

---

## 🔍 Matching & Scoring (Manual, Future AI Ready)

- ✅ **Current Version**: Manual entry only.
- 🔜 **Future Version**: Could integrate automatic evaluation using:
  - SBERT or other sentence similarity models
  - Keyword-based match scoring
  - AI-based subjective answer grading (planned)

---

## 🖼️ Example Use Cases

| Role         | Use Case                                                                 |
|--------------|--------------------------------------------------------------------------|
| Trainer      | Scoring live assessments or mock interviews                             |
| Teacher      | Evaluating long-answer questions during class tests                     |
| Evaluator    | Maintaining a quick audit of graded subjective answers                  |
| Researcher   | Collecting response samples and tagging them with categories/scores     |
| QA Reviewer  | Noting responses and giving scores in usability or survey feedback rounds |

---

## ✒️ Signature & Ownership

This application is developed and owned by: @Smurti
Email: smurtiswain1999@gmail.com

