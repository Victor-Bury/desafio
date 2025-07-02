# imagem base
FROM node:22-alpine

# cria o diretório do app
WORKDIR /app

# Copia o package.json e o package-lock.json 
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta padrão do servidor de desenvolvimento Vite
EXPOSE 5173

# Inicia o servidor de desenvolvimento Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
