from flask import Flask, jsonify, request
from routes.packages import packages
import json

app = Flask(__name__)
app.config.from_file("config.json", load=json.load)
app.register_blueprint(packages)

@app.route('/', methods = ['GET'])
def home():
  if(request.method == 'GET'):
    return jsonify({'message': 'success'})
  return jsonify({'message': 'method not supported'})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

if __name__ == '__main__':
    app.run(debug = True)
