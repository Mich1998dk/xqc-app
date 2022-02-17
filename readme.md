# Gudie for XQC

## Prerequisites 
Make sure that Node.js is installed: https://nodejs.org/en/download/

Use the command below to install Yarn or follow the directions of the website: https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable  
npm install --global yarn     

## Commands to run XQC
- yarn
- npm start 

## Server Commands

- Connect to server: ssh vbs@bjth.itu.dk
- Check exquisitor server: tmux a -t 2
- Check Images server: tmux a -t 3
- Stop server: ctrl + z
- Run server: python app21.py
- Close tmux: ctrl + b -> d
- If server socket is taken:
- Check processes: htop
- Search by clicking f3 for "python app21.py" 
- Take note of the PID of the top one
- Quit htop with pressing: q
- To kill the remaining process taking up the socket: kill -9 PID