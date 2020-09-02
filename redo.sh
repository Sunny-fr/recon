#/bin/bash
docker stop recon
docker rm recon
docker build --build-arg build_front="true" -t sunny/recon .
