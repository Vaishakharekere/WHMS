import streamlit as st
import pandas as pd
import joblib
from pymongo import MongoClient
from datetime import datetime
import pytz

# MongoDB connection
MONGO_URI = "mongodb://localhost:27017"
client = MongoClient(MONGO_URI)
db = client["whms_db"]
collection = db["ot-schedules"]

# Load ML model
model = joblib.load("emergency_ot_model.pkl")

st.set_page_config(page_title="OT Status Board", layout="wide")
st.title("🏥 OT Emergency Dashboard")

# ------------------------
# 🚨 Emergency Triage Form
# ------------------------
st.header("🚨 New Patient Triage")

with st.form("triage_form"):
    col1, col2 = st.columns(2)
    with col1:
        name = st.text_input("Patient Name")
        patient_id = st.text_input("Patient ID")
        ot_no = st.selectbox("OT No", ["OT-1", "OT-2", "OT-3"])
    with col2:
        eta_time = st.time_input("Estimated OT Time")
        heart_rate = st.number_input("Heart Rate", value=80)
        bp_sys = st.number_input("Systolic BP", value=120)
        bp_dia = st.number_input("Diastolic BP", value=80)
        spo2 = st.number_input("SpO2 (%)", value=97)
        resp_rate = st.number_input("Respiratory Rate", value=18)
        diagnosis_severity = st.slider("Diagnosis Severity", 1, 5, 3)
        time_since_admission = st.number_input("Time Since Admission (hrs)", value=5.0)
        admission_type = st.selectbox("Admission Type", ['elective', 'emergency'])

    submit = st.form_submit_button("Submit and Predict")

if submit:
    # Construct model input
    df_input = pd.DataFrame([{
        'heart_rate': heart_rate,
        'bp_sys': bp_sys,
        'bp_dia': bp_dia,
        'spo2': spo2,
        'resp_rate': resp_rate,
        'diagnosis_severity': diagnosis_severity,
        'time_since_admission': time_since_admission,
        #'admission_type_emergency': 1 if admission_type == 'emergency' else 0
    }])
   
    emergency = int(model.predict(df_input)[0])
    eta_str = eta_time.strftime("%H:%M")

    # Save to MongoDB
    record = {
        "patient_id": patient_id,
        "name": name,
        "ot_no": ot_no,
        "eta": eta_str,
        "status": "scheduled",
        "emergency": bool(emergency),
        "timestamp": datetime.now(pytz.utc)
    }
    collection.insert_one(record)

    st.success("Triage submitted.")
    if emergency:
        st.error("🚨 Emergency Detected — Alert OT Team!")
        #st.audio("code_blue_alert.mp3", format="audio/mp3")
    else:
        st.success("✅ Patient Stable — Scheduled normally.")

# ------------------------
# 📋 OT Schedules Overview
# ------------------------
st.header("📋 Current OT Schedules")

records = list(collection.find())
if records:
    df = pd.DataFrame(records).drop(columns=["_id"])
    df = df.sort_values(by="eta")
    df_display = df[["patient_id", "name", "ot_no", "eta", "status", "emergency"]]
    st.dataframe(df_display, use_container_width=True)
else:
    st.info("No OT schedules found.")

# ------------------------
# 🔄 Update OT Status
# ------------------------
st.header("🧑‍⚕️ Update Surgery Status")

with st.form("update_status"):
    update_id = st.text_input("Patient ID")
    new_status = st.selectbox("New Status", ['scheduled', 'ongoing', 'delayed', 'cancelled', 'completed'])
    submit_update = st.form_submit_button("Update Status")

if submit_update:
    result = collection.update_one({"patient_id": update_id}, {"$set": {"status": new_status}})
    if result.matched_count:
        st.success(f"Updated status for {update_id} to '{new_status}'")
    else:
        st.error("❌ Patient ID not found.")

# ------------------------
# 🔊 Emergency Alerts
# ------------------------
st.header("⚠️ Manual Emergency Alerts")

alert = st.selectbox("Trigger Alert", ["None", "Code Blue", "Code Red"])
if alert == "Code Blue":
    st.error("🚨 Code Blue Triggered")
    #st.audio("code_blue_alert.mp3", format="audio/mp3")
elif alert == "Code Red":
    st.warning("🔥 Code Red Triggered")
    #st.audio("code_red_alert.mp3", format="audio/mp3")
