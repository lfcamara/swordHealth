FROM node:16

COPY . ./swordhealth

WORKDIR /swordhealth

RUN npm i

RUN npm run build

EXPOSE 3333

CMD npm start