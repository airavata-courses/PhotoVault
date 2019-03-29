kubeadm reset
systemctl stop kubelet
systemctl stop docker
etcdctl rm --recursive registry
rm -rf /var/lib/cni/
rm -rf /run/flannel
rm -rf /var/lib/kubelet/*
rm -rf /etc/cni/
ifconfig cni0 down
ifconfig flannel.1 down
ifconfig docker0 down
ip link delete cni0
ip link delete flannel.1
brctl delbr cni0
systemctl start docker

