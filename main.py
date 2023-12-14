"""
// AI Chatbot
Chat with an intelligent bot using OpenAI ChatGPT API.
Use voice or text to prompt and listen to the bot’s response.

// TECHNOLOGIES
BACKEND: Python - Flask - OpenAI ChatGPT API
FRONTEND: JavaScript - HTML - CSS

// DEV: Ali Jafarbeglou - since @ Oct 12, 2023

"""

from flask import Flask, render_template, request, session
import openai


# Flask & OpenAPI Config Config
app = Flask(__name__)
API_KEY = open('API_KEY_.txt', 'r').read()
openai.api_key = API_KEY

app.secret_key = 'secret_key'
chat_log = []


# Home Page
@app.route('/', methods=['GET', 'POST'])
def home_page():
    session.setdefault('chat_log', [])  # Initialize chat log in session
    return render_template('base.html')


@app.route('/post_data', methods=['POST'])
def post_data():
    user_input = request.json
    session['chat_log'].append(f"user: {user_input}")

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=session['chat_log']
        )
        assistant_response = response['choices'][0]['message']['content'].strip()
        session['chat_log'].append(f"assistant: {assistant_response}")

        return assistant_response
    except openai.error.OpenAIError as e:  # Generic OpenAI API error
        print(f"Error: {e}")
        return "Sorry, there was an error processing your request."


if __name__ == '__main__':
    app.run(debug=True)
