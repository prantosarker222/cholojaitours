import http.server
import socketserver
import json
import csv
import os
from datetime import datetime

PORT = 8080
CSV_FILE = "/root/agency_project_inquiries.csv"

# Ensure CSV header exists
if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Timestamp", "Inquiry_ID", "Name", "Contact_Email_Phone", "Project_Scope", "Estimated_Budget", "Lead_Source", "Status"])

class LeadRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Allow CORS for web applications
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/leads":
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                
                # Extract fields
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                inquiry_id = f"INQ-{int(datetime.now().timestamp())}"
                name = data.get("name", "Unknown Visitor")
                contact = data.get("phone", data.get("contact", "N/A"))
                scope = data.get("destination", data.get("scope", "General Inquiry"))
                budget = data.get("budget", "Proposal Request")
                source = data.get("source", "Apex Studio Web App")
                status = "New Inquiry"

                # Save to CSV
                with open(CSV_FILE, mode="a", newline="", encoding="utf-8") as f:
                    writer = csv.writer(f)
                    writer.writerow([timestamp, inquiry_id, name, contact, scope, budget, source, status])

                print(f"✅ New Apex Studio Project Inquiry Saved: {name} ({contact}) - {scope}")

                # Respond back to frontend
                response = {
                    "success": True,
                    "message": "Project proposal successfully saved to CSV database!",
                    "lead_id": inquiry_id,
                    "timestamp": timestamp
                }
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response).encode('utf-8'))

            except Exception as e:
                print(f"❌ Error processing project inquiry: {e}")
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
        else:
            super().do_POST()

if __name__ == "__main__":
    print(f"🚀 Apex Studio Project Inquiry Server running on http://localhost:{PORT}")
    print(f"📁 Project inquiries saved to: {CSV_FILE}")

    with socketserver.TCPServer(("", PORT), LeadRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
