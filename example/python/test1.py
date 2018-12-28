import os
from kinto_http import Client

kinto_url = os.getenv('KINTO_URL', 'http://localhost:8888/v1')
kinto_user = os.getenv('KINTO_USER', 'admin')
kinto_password = os.getenv('KINTO_PASSWORD', 'admin')

client = Client(server_url=kinto_url,
                auth=(kinto_user, kinto_password))

records = client.get_records(bucket='default', collection='todos')
for i, record in enumerate(records):
    record['title'] = 'Todo {}'.format(i)

for record in records:
    client.update_record(record)
