# Base image
FROM node:22-alpine

# Crie o diretório do app
WORKDIR /usr/src/app

# Copie package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instale as dependências do app
RUN npm install

# Bundle app source
COPY . .

# Build aplicação nestJS
RUN npm run build

# port que a aplicação irá rodar
EXPOSE 3000

# Start o servidor
CMD [ "npm", "run", "start" ]
