#!/bin/bash

cmd=$1

if [[ $cmd = 'stop' ]]
then
  port=9717
  pid=$(netstat -nlp | grep :$port | awk '{print $7}' | awk -F '/' '{print $1}')
  
  if [ -n '$pid' ]
  then
    kill -9 $pid
  fi
else
  nohup npm start >> console.log 2>&1 &
fi
