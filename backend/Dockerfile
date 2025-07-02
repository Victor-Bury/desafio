# Base image
FROM node:22-alpine

# Cria o diretório do app
WORKDIR /usr/src/app

# Copia package.json e package-lock.json 
COPY package*.json ./

# Instale as dependências do app
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Build aplicação nestJS
RUN npm run build

# port que a aplicação irá rodar
EXPOSE 3000

# Inicia o servidor
CMD [ "npm", "run", "start" ]
