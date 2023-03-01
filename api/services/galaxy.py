import requests
import os
from flask import current_app

from cachetools import cached, TTLCache
galaxy_cache = TTLCache(maxsize=100, ttl=os.environ.get("GALAXY_CACHE_TTL", 86400))

class GalaxyService(object):
  def __new__(cls):
    if not hasattr(cls, 'instance'):
      cls.instance = super(GalaxyService, cls).__new__(cls)
    return cls.instance

  def __init__(self) -> None:
    self.base_url = current_app.config["GALAXY_BASE_URL"]

  @cached(galaxy_cache)
  def search(self, query) -> list:
    resp = requests.get(f"{self.base_url}/ui/search?keywords={query}&type=collection")
    results = resp.json().get('collection', {}).get('results', [])
    collections = map(self.__parse_search_result, results)
    return list(collections)

  @cached(galaxy_cache)
  def getVersions(self, collection) -> list:
    fqcn_parts = collection.split('.')
    resp = requests.get(f"{self.base_url}/ui/repo-or-collection-detail/?namespace={fqcn_parts[0]}&name={fqcn_parts[1]}")
    results = resp.json().get('data', {}).get('collection', {}).get('all_versions', [])
    versions = map(lambda r: r['version'], results)
    return list(versions)

  def __parse_search_result(self, result):
    return result['namespace']['name'] + '.' + result['name']
