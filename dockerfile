FROM node:20.14 as frontend

# WORKDIR /usr/app/frontend
WORKDIR /usr/app/todoapp/frontend

COPY frontend/package*.json .

RUN npm install

COPY frontend/ .

RUN npm run build

# EXPOSE 5173
# CMD node dist/index.js

EXPOSE 5173

# RUN npm run dev -- --host 0.0.0.0 --port 5173
ENTRYPOINT [ "npm" ]
# CMD [ "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173" ]
CMD [ "run", "dev", "--", "--host" ]





FROM node:20.17 as backend

EXPOSE 3000:3000

# WORKDIR /usr/app/backend
WORKDIR /usr/app/todoapp/backend

COPY backend/package*.json .

RUN npm install 

COPY backend/ .

# RUN npm start

CMD ["npm", "start"]