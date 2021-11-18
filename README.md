# HTK

## Deploy

### Build

``` sh
$ docker build -t htk .
```

### Run

``` sh
$ docker run -d --name htk-s -p 9717:9717 -p 9718:9718 -v $PWD/htks/data:/app/db.tmp htk
```

### Remove

``` sh
$ docker stop htk-s
$ docker rm -v htk-s
$ docker rmi htk
```

### Test

``` sh
$ docker run -d --name htk-s -P htk:1.1
$ docker run -d --name htk-s-2 -P htk:1.2

$ docker rm -v $(docker stop $(docker ps -a --filter "name=htk-*" -q))
$ docker rmi $(docker images htk -q)
```
