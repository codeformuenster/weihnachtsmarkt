
```bash
cat ./secrets/KINTO_PASSWORD | read -x KINTO_PASSWORD
sudo --preserve-env docker-compose run -e KINTO_PASSWORD app python test1.py
```
