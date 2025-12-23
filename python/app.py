from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from sklearn.metrics.pairwise import cosine_similarity
import os

app = Flask(__name__)
CORS(app)

# Load trained vectorizer and dataset
with open("faq_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

with open("faq_dataset.pkl", "rb") as f:
    df = pickle.load(f)

X = vectorizer.transform(df['question'])

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("question", "")
    user_vec = vectorizer.transform([user_input])
    similarity = cosine_similarity(user_vec, X)
    idx = similarity.argmax()
    score = similarity[0, idx]
    if score < 0.2:
        return jsonify({"answer": "Sorry, I couldn't find a relevant answer."})
    return jsonify({"answer": df['answer'][idx]})


@app.route("/active",methods=["Get"])
def active():
    return jsonify({
        "status": "up" ,
        "service": "flask FAQ Chat API"
    }),200
    


# ❌ DO NOT USE debug=True IN PRODUCTION
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
