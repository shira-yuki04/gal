from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import datetime
import os
app = Flask(__name__)
CORS(app)

@app.route('/submit-name', methods=['POST'])
def submit_name():
    try:
       
        data = request.get_json()
        name = data.get('name', 'No name provided')
        
        print(f"Received name: {name}")
       
        email_address = "politelygetlost@gmail.com" 
        email_password = "kddx ozvh xkof wvqb"  
        
     
        message = MIMEMultipart()
        message['From'] = email_address
        message['To'] = email_address  
        message['Subject'] = "Someone Said YES to Galentines!"
        
        body = f"""
Someone just said YES to being your Galentine!

Name: {name}

Submitted at: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        message.attach(MIMEText(body, 'plain'))
        
       
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
   port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

flask
flask-cors

web: python server.py
