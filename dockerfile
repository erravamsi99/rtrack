# Dockerfile

# ---- Stage 1: Build the React application ----
# Use an official Node.js runtime as a parent image.
# Choose a specific LTS version for reproducibility (e.g., 18-alpine, 20-alpine).
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
# This leverages Docker's layer caching. If these files haven't changed,
# Docker won't re-run 'npm install'
COPY package*.json ./
# If you use yarn:
# COPY package.json yarn.lock ./

# Install project dependencies
# Use 'npm ci' for cleaner, more reliable builds from package-lock.json
RUN npm ci
# If you use yarn:
# RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the React application for production
# This will create a 'build' or 'dist' folder
RUN npm run build
# If your build output folder is different (e.g., 'dist'), adjust accordingly in the next stage.

# ---- Stage 2: Serve the application with Nginx ----
# Use an official Nginx image. Alpine versions are lightweight.
FROM nginx:1.25-alpine
# FROM nginx:stable-alpine # Or use stable-alpine

# Remove default Nginx public content
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the 'builder' stage to Nginx's web root directory
COPY --from=builder /app/build /usr/share/nginx/html
# If your build output folder was 'dist', use:
# COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
# Assumes nginx.conf is in the same directory as the Dockerfile.
# If it's in a subfolder like 'nginx/nginx.conf', use: COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Nginx default HTTP port)
EXPOSE 80

# Command to run Nginx in the foreground
# This is important because Docker containers exit if the main process exits.
CMD ["nginx", "-g", "daemon off;"]