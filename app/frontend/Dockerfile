FROM node:16.14-alpine

WORKDIR /app-frontend

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
