# Development Certificate

Create a development certificate with the following commands:

```
openssl genrsa 1024 > server.key
chmod 400 server.key
openssl req -new -x509 -nodes -sha1 -days 365 -key server.key > server.crt
```
