FROM mhart/alpine-node:latest

# Create app directory.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies.
COPY package.json /usr/src/app/
RUN npm install --silent --progress=false -g nodemon
RUN npm install --production --silent --progress=false

# Bundle app source.
COPY . /usr/src/app

# Open up port 5000.
EXPOSE 5000

CMD ["node", "src/ner1vah0s.js"]
