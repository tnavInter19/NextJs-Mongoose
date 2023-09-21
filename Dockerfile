# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /nextmongo/src/app

# Install OS dependencies for building native add-ons (like bcrypt) and for running the application
RUN apk add --no-cache python2 make g++

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory inside the container
COPY . .

# Build the Next.js application for production
RUN npm run build

# Expose the port that the application will listen on (usually 3000 for Next.js)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
