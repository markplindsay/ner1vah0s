FROM mhart/alpine-node:latest

# Install nodemon for use with docker-compose.
RUN yarn global add nodemon

# Create app directory.
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies. Docker will automatically uncompress this tgz,
# which is not something I had originally expected.
ADD .yarn-cache.tgz /
ADD package.json yarn.* /app/
RUN yarn

# Copy over the app source.
COPY . /app

# Open up port 5000.
EXPOSE 5000

# Run the server.
CMD ["node", "src/ner1vah0s.js"]
