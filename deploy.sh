docker build -t berek94/multi-client:latest -t berek94/multi-client:$GIT_SHA -f ./client/Dockerfile ./client
docker build -t berek94/multi-server:latest -t berek94/multi-server:$GIT_SHA -f ./server/Dockerfile ./server
docker build -t berek94/multi-worker:latest -t berek94/multi-worker:$GIT_SHA -f ./worker/Dockerfile ./worker

docker push berek94/multi-client
docker push berek94/multi-server
docker push berek94/multi-worker
docker push berek94/multi-client:$GIT_SHA
docker push berek94/multi-server:$GIT_SHA
docker push berek94/multi-worker:$GIT_SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=berek94/multi-server:$GIT_SHA
kubectl set image deployments/client-deployment client=berek94/multi-client:$GIT_SHA
kubectl set image deployments/worker-deployment worker=berek94/multi-worker:$GIT_SHA
