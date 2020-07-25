git pull

yarn && yarn build

#删除容器
docker rm -f ctkb-nginx &> /dev/null

#启动容器
docker run -d --restart=on-failure:5\
    -p 80:80 \
    -v $PWD/dist:/usr/share/nginx/html \
    --name ctkb-nginx nginx
