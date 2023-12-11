# Use node 16 Alpine as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies including 'react-app-rewired'
RUN npm install

RUN npm install jwt-decode

# Copy the rest of the frontend application to the container
COPY . .

# Expose the port that the React app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
