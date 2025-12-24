import sys
import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime

SPORT_CONFIG = {
    "mbb": {
        "url": "https://texaslonghorns.com/sports/mens-basketball/schedule",
        "sport": "mbb",
        "big_ticket": True
    },
    "wbb": {
        "url": "https://texaslonghorns.com/sports/womens-basketball/schedule",
        "sport": "wbb",
        "big_ticket": True
    }
}

def fetch_html(url):
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    return resp.text

if __name__ == "__main__":
    sport_key = sys.argv[1]
    html = fetch_html(SPORT_CONFIG[sport_key]["url"])

    with open("debug.html", "w") as f:
        f.write(html)

    print("Saved debug.html")
