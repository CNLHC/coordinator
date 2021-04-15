from node:lts

WORKDIR /code
RUN yarn config set registry https://registry.npm.taobao.org
RUN npm config set registry https://registry.npm.taobao.org


COPY ./package.json .
RUN yarn 

COPY . . 
RUN yarn build
CMD yarn dev
    



