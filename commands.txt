#docker run -p 49160:8080 -d  \
#--name recon \
#-v source=server/share/output,target=/usr/src/app/share/output \
#sunny/recon:latest

#docker run -p 49160:8080 -d  \
#--name recon \
#sunny/recon:latest
#
#docker run -p 49160:8080 \
#-d  \
#--name recon \
#-v server/share/output:/usr/src/app/share/output \
#sunny/recon:latest


#docker run -p 49160:8080 -d  --name recon -v server/share/output:/usr/src/app/share/output sunny/recon:latest

docker run -p 49160:8080 -d  --name recon -v /Users/sunny/workspace/recon/server/share/output:/usr/src/app/share/output sunny/recon:latest
