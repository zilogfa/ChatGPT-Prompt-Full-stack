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
API_KEY = open('API_KEY.txt', 'r').read()
openai.api_key = API_KEY

chat_log = []

# Home Page


@app.route('/', methods=['GET', 'POST'])
def home_page():

    return render_template('base.html')


@app.route('/post_data', methods=['POST'])
def post_data():
    user_input = request.json
    print(user_input)
    chat_log.append({"role": "user", "content": user_input})
    print("user data appended to chatlog")
    print(chat_log)
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-instruct",
            prompt=chat_log
        )
        print('msg sent to ChatGPT')
        assistant_response = response['choices'][0]['message']['content']
        print('response from Chat GPT')
        gpt = assistant_response.strip("\n").strip()
        print(gpt)
        chat_log.append(
            {"role": "assistant", "content": assistant_response.strip("\n").strip()})
        print(f'*** response appended to chatLog: \n{chat_log}')
        return gpt
    except openai.error.RateLimitError:
        print(f':::::::: except :::::::: {openai.error.RateLimitError}')
        return "Sorry, we have exceeded our chat limit. Please try again later."


if __name__ == '__main__':
    app.run(debug=True)
