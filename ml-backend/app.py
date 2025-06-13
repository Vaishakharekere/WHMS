import streamlit as st
import pandas as pd
import joblib
import os
from pymongo import MongoClient
from datetime import datetime
import pytz

# MongoDB Setup
MONGO_URI = "mongodb://localhost:27017"
client = MongoClient(MONGO_URI)
db = client["whms_db"]
collection = db["drug_forecasts"]

# Directory where .pkl models are saved
MODEL_DIR = "models"

# ----------------------------------------
# Utility: Load all available drug models
# ----------------------------------------
def get_available_drugs():
    models = [f for f in os.listdir(MODEL_DIR) if f.endswith('.pkl')]
    drugs = [f.replace("prophet_", "").replace(".pkl", "").replace("_", " ") for f in models]
    return sorted(drugs)

# ----------------------------------------
# Streamlit UI
# ----------------------------------------
st.set_page_config(page_title="Drug Demand Forecast", layout="wide")
st.title("💊 Drug Demand Forecast Dashboard")

# ------------------------
# 📈 Forecast Interface
# ------------------------
st.header("📅 Run New Forecast")

drugs = get_available_drugs()
drug_name = st.selectbox("Select Drug", drugs)
forecast_days = st.slider("Days to Forecast", 7, 60, 30)

if st.button("Run Forecast"):
    try:
        file_path = os.path.join(MODEL_DIR, f"prophet_{drug_name.replace(' ', '_')}.pkl")
        model = joblib.load(file_path)

        future = model.make_future_dataframe(periods=forecast_days)
        forecast = model.predict(future)
        forecast_tail = forecast.tail(forecast_days)
        forecast_tail["drug_name"] = drug_name

        # Format records for MongoDB
        records = []
        for _, row in forecast_tail.iterrows():
            records.append({
                "drug_name": drug_name,
                "date": row['ds'].strftime('%Y-%m-%d'),
                "forecast_quantity": round(row['yhat'], 2),
                "lower_bound": round(row['yhat_lower'], 2),
                "upper_bound": round(row['yhat_upper'], 2),
                "generated_at": datetime.now(pytz.utc)
            })

        # Store forecast in MongoDB
        collection.delete_many({"drug_name": drug_name})
        collection.insert_many(records)

        st.success(f"✅ Forecast for '{drug_name}' saved to database.")

    except Exception as e:
        st.error(f"❌ Forecasting failed: {e}")

# ------------------------
# 📋 View Forecast Results
# ------------------------
st.header("📊 View Stored Forecast")

drug_list = collection.distinct("drug_name")
selected_drug = st.selectbox("Select Drug to View", drug_list, key="view_drug")

records = list(collection.find({"drug_name": selected_drug}))
if records:
    df = pd.DataFrame(records).drop(columns=["_id"])
    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values("date")

    st.line_chart(df.set_index("date")["forecast_quantity"])
    st.dataframe(df[["date", "forecast_quantity", "lower_bound", "upper_bound"]])
else:
    st.info("ℹ No forecast data found for the selected drug.")