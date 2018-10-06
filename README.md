# weihnachtsmarkt.ms

## 🚀 Quick start

    yarn
    yarn develop

## 📚 Quick start backend development server

Start kinto

    docker-compose up -d kinto postgres

Install kinto-wizard

    pip3 install kinto-wizard

Create an admin account

     curl -XPUT -H 'content-type: application/json' -d '{"data": {"password": "SUPER-SECURE-PASSWORD"}}' http://localhost:8888/v1/accounts/admin

Let the wizard do its magic 🧙‍♂️

    kinto-wizard load --server http://localhost:8888/v1 --auth admin:SUPER-SECURE-PASSWORD kinto/kinto-weihnachtsmarkt.yml

Optional: Import example data

    kinto-wizard load --server http://localhost:8888/v1 --auth admin:SUPER-SECURE-PASSWORD kinto/weihnachtsmarkt-records.yml


## Deployment

For some example manifests for Kubernetes see: [codeformuenster/kubernetes-deployment/manifests/weihnachtsmarkt](https://github.com/codeformuenster/kubernetes-deployment/tree/master/manifests/weihnachtsmarkt)

.
