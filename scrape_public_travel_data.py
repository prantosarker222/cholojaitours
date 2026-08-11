import csv
import json
import os
import urllib.request
import re

print("=== Public Travel & Business Directory Collector ===")

# Sample structure for Public Travel Packages & Business Directory
public_travel_data = [
    {
        "Category": "Domestic Tour",
        "Title": "Sajek Valley 3D2N Package",
        "Location": "Rangamati, Bangladesh",
        "Public_Price_BDT": 5500,
        "Includes": "Bus, Chander Gari, Resort Stay, Alutila Cave",
        "Target_Audience": "Weekend Travelers, Students"
    },
    {
        "Category": "Domestic Tour",
        "Title": "Cox's Bazar Beach & Marine Drive 3D2N",
        "Location": "Cox's Bazar, Bangladesh",
        "Public_Price_BDT": 4800,
        "Includes": "AC Bus, 3-Star Beach Hotel, Inani Visit",
        "Target_Audience": "Families, Couples, Groups"
    },
    {
        "Category": "Domestic Tour",
        "Title": "Sylhet & Ratargul Swamp Forest 2D1N",
        "Location": "Sylhet, Bangladesh",
        "Public_Price_BDT": 5200,
        "Includes": "Train/Bus, Boat Ride, Resort Stay, Jaflong",
        "Target_Audience": "Nature Lovers, Student Groups"
    },
    {
        "Category": "International Tour",
        "Title": "Kashmir & Gulmarg Snow Package 6D5N",
        "Location": "Srinagar, Kashmir, India",
        "Public_Price_BDT": 28500,
        "Includes": "Houseboat Stay, Gondola Pass, Transfers, Meals",
        "Target_Audience": "Honeymooners, Winter Travelers"
    },
    {
        "Category": "International Tour",
        "Title": "Bangkok & Pattaya Island Explorer 5D4N",
        "Location": "Thailand",
        "Public_Price_BDT": 42000,
        "Includes": "Airfare, 4-Star Hotel, Coral Island Tour",
        "Target_Audience": "International Vacationers"
    },
    {
        "Category": "Visa Processing",
        "Title": "India Sticker & Medical Visa Consultancy",
        "Location": "Dhaka Embassy / IVAC",
        "Public_Price_BDT": 1500,
        "Includes": "Slot Booking, Document Checklist, Form Filling",
        "Target_Audience": "Medical Tourists, Shoppers, Students"
    },
    {
        "Category": "Visa Processing",
        "Title": "Thailand E-Visa Processing",
        "Location": "Royal Thai Embassy Dhaka",
        "Public_Price_BDT": 5500,
        "Includes": "Embassy Submission, Ticket & Hotel Booking",
        "Target_Audience": "Tourists, Business Travelers"
    },
    {
        "Category": "Visa Processing",
        "Title": "Dubai 30-Day Tourist E-Visa",
        "Location": "UAE Immigration",
        "Public_Price_BDT": 14500,
        "Includes": "E-Visa Issuance, Express 48h Processing",
        "Target_Audience": "Transit Passengers, Tourists"
    }
]

# Output CSV Path
csv_file_path = "/root/public_travel_data.csv"

# Write to CSV
headers = ["Category", "Title", "Location", "Public_Price_BDT", "Includes", "Target_Audience"]

with open(csv_file_path, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=headers)
    writer.writeheader()
    for item in public_travel_data:
        writer.writerow(item)

print(f"✅ Successfully compiled {len(public_travel_data)} public travel market packages!")
print(f"📁 CSV File created at: {csv_file_path}")
