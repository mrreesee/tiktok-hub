FROM node:18-alpine AS builder
WORKDIR /app

# copy package files from src (project's frontend lives in `src`)
COPY src/package*.json ./
COPY src/tsconfig*.json ./
COPY src/vite.config.ts ./
COPY src/ .

RUN npm ci
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
