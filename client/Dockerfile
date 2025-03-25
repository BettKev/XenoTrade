FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Add healthcheck dependencies
RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0"]
