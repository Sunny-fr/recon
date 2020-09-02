# Recon(vert)

Video file optimizer

## docker

Build image
```
docker build --build-arg build_front="true" -t sunny/recon .
```

Run image
```
docker run \
-p 40600:8080 \
-d  \
--name recon \
-v /Users/YOUR_USER/PATH_TO_YOUR_WORKSPACE/recon/server/share/output:/usr/src/app/server/share/output \
sunny/recon:latest
```

##Development

## back end
```
cd server && npm install && npm start
```
## front end
```
cd front && npm install && npm start
```

