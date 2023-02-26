from flask import Flask, jsonify, request
from routes.search import search
import json

app = Flask(__name__)
app.config.from_file("config.json", load=json.load)
app.register_blueprint(search)

@app.route('/', methods = ['GET'])
def home():
  if(request.method == 'GET'):
    return jsonify({'message': 'success'})
  return jsonify({'message': 'method not supported'})

if __name__ == '__main__':
    app.run(debug = True)
