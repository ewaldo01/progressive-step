from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

# Load model
model = joblib.load("titanic_model.joblib")

# Define input data schema
class Passenger(BaseModel):
    Pclass: int
    Age: float
    SibSp: int
    Parch: int
    Fare: float
    Sex_male: int
    Embarked_Q: int
    Embarked_S: int
        
app = FastAPI()

# Serve static files (html, css, js)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    # Serve the index.html file
    return HTMLResponse(content=open("static/index.html").read(), status_code=200)

@app.post("/predict")
def predict_survival(data: Passenger):
    input_df = pd.DataFrame([data.dict()])
    prediction = model.predict(input_df)
    return {"prediction": int(prediction[0])}