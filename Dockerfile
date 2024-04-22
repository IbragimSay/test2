FROM node

WORKDIR /app

COPY package*.json /

COPY prisma/schema.prisma /app/prisma/


RUN npm install
RUN npx prisma generate


COPY . /app

EXPOSE 3500
CMD [ "npm", "run", "dev"]