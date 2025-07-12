# 🏥 Wenlock Hospital Management System (WHMS)

A **Centralized Patient & Resource Management System** developed for **Wenlock District Hospital**, Mangalore.  
WHMS integrates real-time monitoring, IoT-based infrastructure, emergency triage, and predictive analytics to streamline hospital operations and improve patient care.

![GitHub repo size](https://img.shields.io/github/repo-size/vaishakharekere/WHMS)
![GitHub stars](https://img.shields.io/github/stars/vaishakharekere/WHMS)
![GitHub forks](https://img.shields.io/github/forks/vaishakharekere/WHMS)
![License](https://img.shields.io/github/license/vaishakharekere/WHMS)

---

## 🚀 Features

### ✅ Core Modules
- **Patient & Token Management**: Department-wise token flow, status updates, emergency flagging.
- **Doctor Dashboard**: Live updates of patient queue and emergency cases.
- **OT Emergency Management**: ML-based emergency triage using XGBoost, OT scheduling, and override.
- **IoT-Based Bed Monitoring**: Live occupancy, vitals tracking using ESP32/Arduino.
- **Drug Demand Forecasting**: Predictive analytics using Prophet on Synthea COVID-19 dataset.
- **Real-time Updates**: Integrated Socket.IO for live status sync across dashboards.

---

## 🛠️ Tech Stack

| Layer        | Technologies                          |
|--------------|----------------------------------------|
| Frontend     | Streamlit                             |
| Backend      | Node.js (Express), REST API, Socket.IO |
| Database     | MongoDB (Atlas/local)                 |
| Machine Learning | XGBoost, Prophet, Pandas          |
| IoT          | ESP32, Arduino, Serial Communication   |

---

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/vaishakharekere/WHMS.git
cd WHMS
```
### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```
### 3. Setup Streamlit Dashboard
```bash
cd ../streamlit_dashboard
pip install -r requirements.txt
streamlit run Home.py
```
### 4. MongoDB Setup
#### Use a MongoDB Atlas instance or local MongoDB server.

#### Import schema/data from the database/ folder using:
```bash
mongoimport --db WHMS --collection patients --file database/patients.json --jsonArray

```
## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
