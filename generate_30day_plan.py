import csv
import os

print("=== Generating 30-Day Plan to Serve 100 Travelers ===")

# 1. 30-Day Step-by-Step Action Plan CSV Data
plan_data = [
    {"Day": "Day 1-3", "Phase": "Foundation & Setup", "Focus_Area": "WhatsApp & Facebook Prep", "Action_Items": "Setup WhatsApp Business auto-reply. Test web app lead collector. Join 10 top BD travel Facebook groups.", "Target_Leads": "0", "Target_Bookings": "0"},
    {"Day": "Day 4-7", "Phase": "Organic Marketing", "Focus_Area": "Group Posting", "Action_Items": "Post Template A (Sajek Cloud Retreat) & Template B (India Visa) in 5 travel groups daily with high-quality photos.", "Target_Leads": "15-20", "Target_Bookings": "5 Travelers"},
    {"Day": "Day 8-10", "Phase": "Direct Outreach", "Focus_Area": "University Clubs", "Action_Items": "Reach out to student executive members at DU, BRAC, NSU, AIUB for weekend Sajek group tour discounts.", "Target_Leads": "30", "Target_Bookings": "15 Travelers"},
    {"Day": "Day 11-15", "Phase": "Mid-Month Campaign", "Focus_Area": "Cox's Bazar Beach Package", "Action_Items": "Launch Cox's Bazar weekend beach deal on Facebook & WhatsApp stories. Follow up with pending inquiries.", "Target_Leads": "45", "Target_Bookings": "25 Travelers (Cum: 45)"},
    {"Day": "Day 16-20", "Phase": "Corporate Outreach", "Focus_Area": "Dhaka Offices", "Action_Items": "Pitch corporate weekend retreat package (20-30 pax) to HR/admin of tech & agency offices in Banani/Gulshan.", "Target_Leads": "60", "Target_Bookings": "30 Travelers (Cum: 75)"},
    {"Day": "Day 21-25", "Phase": "High-Ticket Packages", "Focus_Area": "Kashmir & Thailand Tours", "Action_Items": "Promote Kashmir Snow Tour & Thailand Vacation packages + Visa processing bundle on social channels.", "Target_Leads": "80", "Target_Bookings": "15 Travelers (Cum: 90)"},
    {"Day": "Day 26-30", "Phase": "Final Push & Referrals", "Focus_Area": "Referral Rewards & Closing", "Action_Items": "Offer BDT 500 cashback discount for client referrals. Close remaining pending leads.", "Target_Leads": "100+", "Target_Bookings": "10 Travelers (Cum: 100)"}
]

# 2. Public Target Segments & Prospect Categories CSV Data
target_list_data = [
    {"Segment_ID": "SEG-01", "Target_Group": "Dhaka University Travel Clubs", "Target_Count": "30-40 Students", "Primary_Package": "Sajek Valley Weekend Tour (BDT 5,500)", "Strategy": "Offer group leader 1 free seat for 20+ bookings"},
    {"Segment_ID": "SEG-02", "Target_Group": "Corporate Employees (Gulshan/Banani)", "Target_Count": "20-30 Executives", "Primary_Package": "Cox's Bazar 3D2N Beach Resort (BDT 4,800)", "Strategy": "Provide customized invoice & company receipt"},
    {"Segment_ID": "SEG-03", "Target_Group": "India Medical & Tourist Travelers", "Target_Count": "15-20 Visa Applicants", "Primary_Package": "India Visa Processing & IVAC Slot (BDT 1,500)", "Strategy": "Fast document verification & appointment slot"},
    {"Segment_ID": "SEG-04", "Target_Group": "Honeymoon & Family Travelers", "Target_Count": "10-15 Travelers", "Primary_Package": "Kashmir & Gulmarg Snow Tour (BDT 28,500)", "Strategy": "Include private houseboat stay & Dal Lake boat ride"},
    {"Segment_ID": "SEG-05", "Target_Group": "Thailand Holiday Seekers", "Target_Count": "5-10 Vacationers", "Primary_Package": "Thailand Bangkok & Pattaya Tour (BDT 42,000)", "Strategy": "Full ticket, 4-star hotel & E-visa package bundle"}
]

# Save to primary /sdcard/Download/agy/ and fallback /root/Downloads/
out_dir = "/sdcard/Download/agy"
try:
    os.makedirs(out_dir, exist_ok=True)
except Exception:
    out_dir = "/root/Downloads"
    os.makedirs(out_dir, exist_ok=True)

backup_dir = "/root/Downloads"
os.makedirs(backup_dir, exist_ok=True)

plan_file = os.path.join(out_dir, "30_day_100_travelers_plan.csv")
targets_file = os.path.join(out_dir, "target_prospect_categories.csv")

plan_backup = os.path.join(backup_dir, "30_day_100_travelers_plan.csv")
targets_backup = os.path.join(backup_dir, "target_prospect_categories.csv")

for p_file in [plan_file, plan_backup]:
    with open(p_file, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["Day", "Phase", "Focus_Area", "Action_Items", "Target_Leads", "Target_Bookings"])
        writer.writeheader()
        writer.writerows(plan_data)

for t_file in [targets_file, targets_backup]:
    with open(t_file, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["Segment_ID", "Target_Group", "Target_Count", "Primary_Package", "Strategy"])
        writer.writeheader()
        writer.writerows(target_list_data)

print(f"✅ 30-Day Plan exported to: {plan_file} & {plan_backup}")
print(f"✅ Target Prospect Categories exported to: {targets_file} & {targets_backup}")
