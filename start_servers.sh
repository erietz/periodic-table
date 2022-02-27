#!/usr/bin/env bash

BASE_DIR=$(pwd)
SESSION_NAME="ptable"
SERVICE_DIR="$(dirname "$BASE_DIR")/WikiElementScrapper"

create_session() {
    tmux new-session -s ${SESSION_NAME} -n node-rest -c "${BASE_DIR}/rest" -d
    tmux new-window -t ${SESSION_NAME}:2 -n node-ui -c "${BASE_DIR}/ui" -d 
    tmux new-window -t ${SESSION_NAME}:3 -n microservice -c "${SERVICE_DIR}" -d 
    echo "session created"
}

start_servers() {
    tmux send-keys -t ${SESSION_NAME}:node-rest 'npm run start' Enter
    tmux send-keys -t ${SESSION_NAME}:node-ui 'npm run start' Enter
    tmux send-keys -t ${SESSION_NAME}:microservice 'source activate scrapper' Enter
    tmux send-keys -t ${SESSION_NAME}:microservice 'uvicorn main:app --reload' Enter
    echo "starting the servers"
}

# Do nothing if already running tmux
attach_safely() {
    if [ ! "$TMUX" ]; then
        tmux attach -t ${SESSION_NAME}
    fi
}

main() {
    if [ -n "$(tmux list-sessions | grep ${SESSION_NAME})" ]; then
        echo "Servers are already running..."
        exit 0
    else
        create_session
        start_servers
        attach_safely
    fi
}

main
