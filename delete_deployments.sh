kubectl delete deployment website-deployment loginsearch explore upload-deployment
kubectl delete service website loginsearch explore upload-services
kubectl apply -f node.yaml
kubectl apply -f website_node.yaml
kubectl apply -f explore_java.yaml
kubectl apply -f python.yaml
