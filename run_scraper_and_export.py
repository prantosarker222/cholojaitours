import urllib.request
import json
import csv
import os
import re

print("=== Running Live Public Data Collector ===")

# Fetching live public news & travel destination trends via HackerNews public API & JSON endpoints
url = "https://hacker-news.firebaseio.com/v0/topstories.json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

try:
    with urllib.request.urlopen(req) as response:
        top_ids = json.loads(response.read().decode())[:15]
    
    results = []
    for rank, story_id in enumerate(top_ids, start=1):
        item_url = f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json"
        item_req = urllib.request.Request(item_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(item_req) as item_res:
            item_data = json.loads(item_res.read().decode())
            results.append({
                "Rank": rank,
                "Title": item_data.get("title", "N/A"),
                "Source_URL": item_data.get("url", f"https://news.ycombinator.com/item?id={story_id}"),
                "Score_Points": item_data.get("score", 0),
                "Category": "Public Web Data"
            })
            
    # Output CSV file paths (primary: /sdcard/Download/agy/, fallbacks: /root/Downloads/, /root/)
    csv_file = "/sdcard/Download/agy/scraped_public_data.csv"
    try:
        os.makedirs(os.path.dirname(csv_file), exist_ok=True)
    except Exception:
        csv_file = "/root/Downloads/scraped_public_data.csv"
        os.makedirs(os.path.dirname(csv_file), exist_ok=True)

    with open(csv_file, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["Rank", "Title", "Source_URL", "Score_Points", "Category"])
        writer.writeheader()
        writer.writerows(results)

    # Also save a copy in /root/scraped_public_data.csv for root access
    root_csv = "/root/scraped_public_data.csv"
    with open(root_csv, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["Rank", "Title", "Source_URL", "Score_Points", "Category"])
        writer.writeheader()
        writer.writerows(results)

    print(f"✅ Successfully scraped {len(results)} live public data entries!")
    print(f"📁 Saved to: {csv_file} & {root_csv}")

except Exception as e:
    print(f"❌ Error during scraping: {e}")
