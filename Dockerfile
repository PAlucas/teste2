# Imagem base
FROM node:14.17-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências para diretório temporário
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install --frozen-lockfile

# Copia arquivos do projeto para o diretório de trabalho
COPY . .

# Build da aplicação
CMD ["yarn", "start"]

