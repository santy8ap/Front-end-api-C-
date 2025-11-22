FROM node:18-alpine

WORKDIR /app

# Copiar los package.json
COPY MultiDBAcademy/package*.json ./ 

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY MultiDBAcademy/ ./

EXPOSE 3000

CMD ["npm", "run", "start"]
