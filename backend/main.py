#main.py file (backend)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import uvicorn

# Initialize the FastAPI app
app = FastAPI()

# Load the model
try:
    model = joblib.load("./models/logistic-regression-model.pkl")
    vectorizer = joblib.load("./models/vectorizer.pkl")
    class_labels = model.classes_
except Exception as e:
    raise RuntimeError(f"Model loading failed: {e}")


# Initialise pydantic model
class Text_Input(BaseModel):
    text: str

# Handle CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def display_msg():
    return {"message": "Hello from backend"}

@app.post("/predict")
def predict_emotion(request: Text_Input):
    text = request.text
    text_tfidf = vectorizer.transform([text])
    
    prediction = model.predict(text_tfidf)[0]
    probabilities = model.predict_proba(text_tfidf)[0]

    Confidence_Scores = {
        label : round(float(prob),4)
        for label, prob in zip(class_labels, probabilities)
        }
    
    print(prediction)
    print(Confidence_Scores)
    return {
        "prediction": prediction,
        "confidence_scores": Confidence_Scores
        }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)