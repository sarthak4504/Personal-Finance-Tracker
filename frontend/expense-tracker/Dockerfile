FROM node:20.17.0

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm rebuild esbuild

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
