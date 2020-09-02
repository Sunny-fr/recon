#/bin/bash
docker run -p 49160:8080 -d  --name recon -v /Users/sunny/workspace/recon/server/share/output:/usr/src/app/share/output sunny/recon:latest
