FROM node:lts-alpine
WORKDIR /scheduleapp
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
