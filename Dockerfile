FROM node:12
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
ENV NODE_ENV production
RUN npm run build
CMD ["npm", "start"]
EXPOSE 5000
