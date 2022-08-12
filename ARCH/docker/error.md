# question
## mysql image
```
ERROR: no matching manifest for linux/arm64/v8 in the manifest list entries
    
```
see: https://stackoverflow.com/questions/65456814/docker-apple-silicon-m1-preview-mysql-no-matching-manifest-for-linux-arm64-v8
solution 1:
```
    mysql:
    image: mysql/mysql-server:8.0.23
```
solution 2:
```
    mysql:
    platform: linux/x86_64
    image: mysql:8.0.23
```
