# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
#FROM node:18-alpine as build
FROM public.ecr.aws/lambda/nodejs:latest as build

# Set the working directory
WORKDIR /app

COPY package*.json .

#### install angular cli
RUN npm install -g @angular/cli
#RUN npm install -g npm@10.2.3

RUN npm install

COPY . .

# Generate the build of the application
RUN npm run build --omit=dev
#RUN ng build

# Stage 2: Serve app with nginx server
FROM quay.io/jitesoft/nginx:latest

#COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/status.conf /etc/nginx/conf.d/

#WORKDIR /code
COPY --from=build /app/dist/ /usr/share/nginx/html

#COPY --from=build /app/dist .

EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]
