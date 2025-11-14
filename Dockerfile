# Stage 1: Build the application
FROM node:20-alpine AS build
WORKDIR /app

# Copy package configuration and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the built assets from the 'build' stage to the Nginx web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
