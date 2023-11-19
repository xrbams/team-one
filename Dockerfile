FROM nginx

WORKDIR /

RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install npm -y


COPY package*.json ./
RUN npm install 

COPY . .
RUN npm run build

RUN rm -r /usr/share/nginx/html/*

RUN cp -a dist/. /usr/share/nginx/html/