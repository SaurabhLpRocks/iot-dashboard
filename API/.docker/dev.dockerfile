FROM node:latest

LABEL author="Saurabh Palatkar"

# create a specific user to run this container
# RUN adduser -S -D user-app

# add files to container
ADD . /app

# specify the working directory
WORKDIR app
RUN chmod -R 777 .
RUN npm i gulp --g
# build process
RUN npm install
# RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm run build
# RUN npm prune --production
EXPOSE 8080
# run application
CMD ["npm", "start"]