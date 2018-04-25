#!/bin/bash

serve -s build --port 3000 &
SERVER_PID=$!
echo Server PID: $SERVER_PID
