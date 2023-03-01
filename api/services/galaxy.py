import requests
from flask import current_app

class GalaxyService(object):
  def __new__(cls):
    if not hasattr(cls, 'instance'):
      cls.instance = super(GalaxyService, cls).__new__(cls)
    return cls.instance

  def __init__(self) -> None:
    self.base_url = current_app.config["GALAXY_BASE_URL"]

  def search(self, query) -> list:
    resp = requests.get(f"{self.base_url}/ui/search?keywords={query}&type=collection")
    results = resp.json().get('collection', {}).get('results', [])
    collections = map(self.__parse_search_result, results)
    return list(collections)

  def __parse_search_result(self, result):
    return result['namespace']['name'] + '.' + result['name']
