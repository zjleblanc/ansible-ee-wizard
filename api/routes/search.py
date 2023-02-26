from flask import Blueprint, jsonify, request
from services.pypi import PYPIService

search = Blueprint('search', __name__)

@search.route('/search/<string:query>', methods = ['GET'])
def do_search(query):
    pypi = PYPIService()
    limit = request.args.get("limit", 50)
    offset = request.args.get("offset", 0)
    results = pypi.search(query, limit, offset)
    return jsonify(results)
