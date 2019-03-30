apiVersion: apps/v1
kind: Deployment
metadata:
  name: photovault-deployment
spec:
  selector:
    matchLabels:
      app: photovault
      tier: loginsearch
      track: stable
  replicas: 1
  template:
    metadata:
      labels:
        app: photovault
        run: login_search-services
    spec:
      containers:
        - name: loginsearch-container
          image: photovault/login_search
          imagePullPolicy: Always
          ports:
            - containerPort: 5000
              name: http
kind: Service
apiVersion: v1
metadata:
 name: login_search
