from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import datetime

app = Flask(__name__)
CORS(app)

@app.route('/submit-name', methods=['POST'])
def submit_name():
    try:
        # Get the name from the form
        data = request.get_json()
        name = data.get('name', 'No name provided')
        
        print(f"Received name: {name}")
        
        # Email configuration - use SAME email for both sender and receiver
        email_address = "politelygetlost@gmail.com"  # Your Gmail
        email_password = "kddx ozvh xkof wvqb"  # Get this from Google
        
        # Create email
        message = MIMEMultipart()
        message['From'] = email_address
        message['To'] = email_address  # Sending to yourself
        message['Subject'] = "Someone Said YES to Galentines!"
        
        body = f"""
Someone just said YES to being your Galentine!

Name: {name}

Submitted at: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        message.attach(MIMEText(body, 'plain'))
        
        # Send email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(email_address, email_password)
            server.send_message(message)
        
        print("Email sent successfully!")
        return jsonify({'status': 'success'}), 200
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)