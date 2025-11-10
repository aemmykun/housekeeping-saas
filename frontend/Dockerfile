# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Stage 1: Build
FROM node:16-alpine AS builder

WORKDIR /app

# Install Angular CLI
RUN npm install -g @angular/cli

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 4200

# Start development server
CMD ["npm", "start"]
# Build the application
RUN ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built application from builder
COPY --from=builder /app/dist/housekeeping-saas /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
