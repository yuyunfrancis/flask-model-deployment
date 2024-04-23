from flask import Flask, jsonify, request
import uuid
from passlib.hash import pbkdf2_sha256
from app import db
from PIL import Image
import numpy as np
import tensorflow as tf
from keras.applications.resnet50 import ResNet50
from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input, decode_predictions
import base64
import io

class User:
    
    def signup(self):
        
        data = request.get_json() 

        user = {
            "_id": uuid.uuid4().hex,
            "name": data.get('name'),
            "email": data.get('email'),
            "password": data.get('password'),
        }
        
        # encrypt password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])
        
        db.users.insert_one(user)
        
        return jsonify(user), 200
    
    def login(self):
        
        data = request.get_json()
        
        user = db.users.find_one({"email": data.get('email')})
        
        if user and pbkdf2_sha256.verify(data.get('password'), user['password']):
            return jsonify(user), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401
        

IMG_SHAPE = (224, 224, 3)
class PredictionModel:
    
    def __init__(self):
        self.model = self.get_model()

    @staticmethod
    def get_model():
        model = ResNet50(include_top=True, weights='imagenet', input_shape=IMG_SHAPE)
        print("[+] model loaded")
        return model

    @staticmethod
    def decode_request(req):
        encoded = req['image']
        decoded = base64.b64decode(encoded)
        return decoded

    @staticmethod
    def preprocess(decoded):
        pil_image = Image.open(io.BytesIO(decoded)).resize((224, 224), Image.LANCZOS).convert('RGB')
        image = np.asarray(pil_image)
        batch = np.expand_dims(image, axis=0)
        return batch

    def predict(self):
        print("[+] request received")
        req = request.get_json(force=True)
        image = self.decode_request(req)
        batch = self.preprocess(image)
        prediction = self.model.predict(batch)
        top_label = [{"class": i[1], "confidence": str(i[2])} for i in decode_predictions(prediction, top=1)[0]]
        response = {"prediction": top_label}
        print("[+] results {}".format(response))
        return jsonify(response), 200
    
    
    