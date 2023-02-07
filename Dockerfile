# Imagem Docker do Sistema de Ouvidoria; Utlizando a imagem base do NODEJS na versão 16;

FROM node:16 as base

WORKDIR /home/node/app

WORKDIR    /opt/oracle
RUN        apt-get update && apt-get install -y libaio1 wget unzip \
     && wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip \
     && unzip instantclient-basiclite-linuxx64.zip \
     && rm -f instantclient-basiclite-linuxx64.zip \
     && cd /opt/oracle/instantclient* \
     && rm -f *jdbc* *occi* *mysql* *README *jar uidrvci genezi adrci \
     && echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf \
     && ldconfig

WORKDIR /home/node/app
COPY package*.json ./

RUN yarn cache clean --force \
     yarn cache verify 
     
RUN yarn install

COPY . .

COPY .env ./

FROM base as production

ENV NODE_PATH=./dist

#RUN yarn dev