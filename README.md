# HTK

## Deploy

### Build

``` sh
$ docker build -t htk .
```

### Run

``` sh
$ docker run -d --name htk-s -p 8080:9717 htk
```

### Remove

``` sh
$ docker rm -v htk-s

$ docker rmi htk
```
