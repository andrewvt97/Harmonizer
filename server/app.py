from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app,
    supports_credentials=True,
    origins=["http://harmonious.local:5173"]  
)

@app.route('/api/process', methods=['POST'])
def process_video():
    data = request.get_json()
    url = data.get('url')

    print("Received URL:", url)
    # TODO: download and process audio
    return jsonify({'status': 'success', 'message': 'Received', 'url': url})

if __name__ == '__main__':
    app.run(
    host='0.0.0.0',
    port=5000,
    debug=True
)