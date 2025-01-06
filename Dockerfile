# Use the official Node.js image
FROM node:22-alpine

RUN mkdir -p /usr/app/
# Set the working directory
WORKDIR /usr/app

# Copy the rest of the application code
COPY ./ ./



RUN npm install

RUN npm run lint && npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Set the command to start the app in production
CMD ["npm", "start"]
