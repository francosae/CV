from threading import Lock
import io
import base64
from flask import Flask, render_template, session, request, \
    copy_current_request_context
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
import os
from lavague.core import ActionEngine, WorldModel, WebAgent
from lavague.drivers.selenium import SeleniumDriver
from lavague.core import WorldModel
from openai import OpenAI


# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()


def background_thread():
    """Example of how to send server generated events to clients."""
    count = 0
    while True:
        socketio.sleep(10)
        count += 1
        socketio.emit('my_response',
                      {'data': 'Server generated event', 'count': count})


@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

@socketio.event
def generate_prompt(message):
    client = OpenAI(
        organization=os.environ['OPENAI_ORG'],
        project='$PROJECT_ID',
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            # {"role": "system", "content": "You are a ."},
            {"role": "user", 
             "content": "You will generate a new series of prompts for a large action model to complete. " +
             "The prompts will be in the form of a list of dictionaries, where each dictionary has a 'type' key and a 'value' key. " +
             "The 'type' key will be either 'url' or 'command'. " +
             "If the 'type' key is 'url', the 'value' key will be a URL to navigate to. " +
             "If the 'type' key is 'command', the 'value' key will be a command to run. " +
             "The action model will execute the prompts in order, and return the output of the last command. " +
             "The action model will be a web agent that can interact with web pages. " +
             "The goal of the prompts will be: " + message['goal']
             }
        
        ]
    )
    
    return response

@socketio.event
def ai_event(message):
    # Initialize the required objects
    selenium_driver = SeleniumDriver()
    action_engine = ActionEngine(selenium_driver)
    world_model = WorldModel()
    agent = WebAgent(world_model, action_engine)
    
    # Perform the desired action
    for i, prompt in enumerate(message['prompts']):
      emit('output', {'data': "starting prompt"})
      if prompt['type'] == 'url':
        agent.get(prompt['value'])
      elif prompt['type'] == 'command':
        agent.run(prompt['value'])
        df_logs = agent.logger.return_pandas()
        out = df_logs.iloc[-1]
        out.to_csv('output.csv')
        print(out)
        emit('output', {'data': "t", 'failed': False, 'completed': i == len(message['prompts']) - 1})
        image = out['screenshots'][-1]
        buffered = io.BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')

        emit('receive_image', {'image_data': img_str})

if __name__ == '__main__':
    socketio.run(app, port=8000)

# @socketio.event
# def my_event(message):
#     session['receive_count'] = session.get('receive_count', 0) + 1
#     emit('my_response',
#          {'data': message['data'], 'count': session['receive_count']})


# @socketio.event
# def my_broadcast_event(message):
#     session['receive_count'] = session.get('receive_count', 0) + 1
#     emit('my_response',
#          {'data': message['data'], 'count': session['receive_count']},
#          broadcast=True)


# @socketio.event
# def join(message):
#     join_room(message['room'])
#     session['receive_count'] = session.get('receive_count', 0) + 1
#     emit('my_response',
#          {'data': 'In rooms: ' + ', '.join(rooms()),
#           'count': session['receive_count']})


# @socketio.event
# def leave(message):
#     leave_room(message['room'])
#     session['receive_count'] = session.get('receive_count', 0) + 1
#     emit('my_response',
#          {'data': 'In rooms: ' + ', '.join(rooms()),
#           'count': session['receive_count']})


# @socketio.on('close_room')
# def on_close_room(message):
#     session['receive_count'] = session.get('receive_count', 0) + 1
#     emit('my_response', {'data': 'Room ' + message['room'] + ' is closing.',
#                          'count': session['receive_count']},
#          to=message['room'])
#     close_room(message['room'])


# @socketio.event
# def my_room_event(message):
#     session['receive_count'] = session.get('receive_count', 0) + 1
#     emit('my_response',
#          {'data': message['data'], 'count': session['receive_count']},
#          to=message['room'])


# @socketio.event
# def disconnect_request():
#     @copy_current_request_context
#     def can_disconnect():
#         disconnect()

#     session['receive_count'] = session.get('receive_count', 0) + 1
#     # for this emit we use a callback function
#     # when the callback function is invoked we know that the message has been
#     # received and it is safe to disconnect
#     emit('my_response',
#          {'data': 'Disconnected!', 'count': session['receive_count']},
#          callback=can_disconnect)


# @socketio.event
# def my_ping():
#     emit('my_pong')


# @socketio.event
# def connect():
#     global thread
#     with thread_lock:
#         if thread is None:
#             thread = socketio.start_background_task(background_thread)
#     emit('my_response', {'data': 'Connected', 'count': 0})


# @socketio.on('disconnect')
# def test_disconnect():
#     print('Client disconnected', request.sid)

