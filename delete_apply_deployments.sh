kubectl delete pods --all
kubectl delete deployments --all
kubectl delete services --all
kubectl delete ingress --all
kubectl apply -f loginsearch_node.yaml 
kubectl apply -f website_node.yaml 
kubectl apply -f explore_java.yaml 
kubectl apply -f upload_python.yaml
