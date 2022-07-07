FROM node

WORKDIR /app

COPY . .

RUN npm install -g npm@8.13.2
RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx 
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80