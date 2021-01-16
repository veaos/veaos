FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

CMD ["npm", "run", "start"]
