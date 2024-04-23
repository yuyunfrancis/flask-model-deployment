from flask import Flask
from app import db
from app import app
from user.models import User, PredictionModel

@app.route('/signup', methods=['POST'])
def signup():
    user = User()
    return user.signup()

@app.route('/login', methods=['POST'])
def login():
    user = User()
    return user.login()

@app.route('/predict', methods=['POST'])
def predict():
    model = PredictionModel()
    return model.predict()