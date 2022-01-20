## SERVIDOR DEFAULT
## ---------------
>node /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8089

Servidor HTTP escuchando en el puerto 8089 - PID WORKER 22899
## ---------------
## SERVIDOR CLUSTER
## ---------------
>node /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8089 -m CLUSTER

Número de procesadores: 8
PID MASTER 22926
Servidor HTTP escuchando en el puerto 8089 - PID WORKER 22939
Servidor HTTP escuchando en el puerto 8089 - PID WORKER 22936
Servidor HTTP escuchando en el puerto 8089 - PID WORKER 22930
Servidor HTTP escuchando en el puerto 8089 - PID WORKER 22938
Servidor HTTP escuchando en el puerto 8089 - PID WORKER 22934
Servidor HTTP escuchando en el puerto 8089 - PID WORKER 22937
Servidor HTTP escuchando en el puerto 8089 - PID WORKER 22935
Servidor HTTP escuchando en el puerto 8089 - PID WORKER 22933
## ---------------
## NODEMON CLUSTER
## ---------------
>nodemon /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8081 -m CLUSTER

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8081 -m CLUSTER`
Número de procesadores: 8
PID MASTER 22986
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 22990
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 22992
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 22991
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 22994
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 22989
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 22995
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 22996
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 22993
## ---------------
## NODEMON FORK
## ---------------
>nodemon /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8081 -m FORK[nodemon] 2.0.15

[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8081 -m FORK`
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 23074
## ---------------
## FOREVER CLUSTER
## ---------------
>forever /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8081 -m CLUSTER

warn:    --minUptime not set. Defaulting to: 1000ms
warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
(node:23326) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:23326) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
Número de procesadores: 8
PID MASTER 23327
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 23336
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 23339
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 23334
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 23335
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 23333
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 23340
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 23338
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 23337
## ---------------
## FOREVER FORK
## ---------------
>forever /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8081
         warn:    --minUptime not set. Defaulting to: 1000ms
warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
(node:23472) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:23472) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
Servidor HTTP escuchando en el puerto 8081 - PID WORKER 23473
## ---------------
## PM2 FORK
## ---------------
 >pm2 start /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js --name="ServerFork" --watch -- -p 8081

[PM2] Starting /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js in fork_mode (1 instance)
[PM2] Done.
┌─────┬───────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name          │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ ServerFork    │ default     │ 1.0.0   │ fork    │ 23716    │ 0s     │ 0    │ online    │ 0%       │ 10.2mb   │ lcotton  │ enabled  │
└─────┴───────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
>lcotton@MBP-de-Lucas 15-Cluster-Escalabilidad % pm2 save

[PM2] Saving current process list...
[PM2] Successfully saved in /Users/lcotton/.pm2/dump.pm2

>lcotton@MBP-de-Lucas 15-Cluster-Escalabilidad % pm2 list

┌─────┬───────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name          │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ ServerFork    │ default     │ 1.0.0   │ fork    │ 23716    │ 9s     │ 0    │ online    │ 0%       │ 92.5mb   │ lcotton  │ enabled  │
└─────┴───────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
## ---------------
## PM2 CLUSTER
## ---------------
>pm2 start /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js --name="ServerCluster" --watch -i max -- -p 8082

[PM2] Starting /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js in cluster_mode (0 instance)
[PM2] Done.
┌─────┬──────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name             │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼──────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 23820    │ 0s     │ 0    │ online    │ 0%       │ 65.6mb   │ lcotton  │ enabled  │
│ 1   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 23821    │ 0s     │ 0    │ online    │ 0%       │ 61.5mb   │ lcotton  │ enabled  │
│ 2   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 23824    │ 0s     │ 0    │ online    │ 0%       │ 56.4mb   │ lcotton  │ enabled  │
│ 3   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 23829    │ 0s     │ 0    │ online    │ 0%       │ 58.2mb   │ lcotton  │ enabled  │
│ 4   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 23832    │ 0s     │ 0    │ online    │ 0%       │ 50.0mb   │ lcotton  │ enabled  │
│ 5   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 23835    │ 0s     │ 0    │ online    │ 0%       │ 40.2mb   │ lcotton  │ enabled  │
│ 6   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 23840    │ 0s     │ 0    │ online    │ 0%       │ 38.7mb   │ lcotton  │ enabled  │
│ 7   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 23843    │ 0s     │ 0    │ online    │ 0%       │ 27.4mb   │ lcotton  │ enabled  │
└─────┴──────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
[PM2][WARN] Current process list is not synchronized with saved list. App ServerFork differs. Type 'pm2 save' to synchronize.
lcotton@MBP-de-Lucas 15-Cluster-Escalabilidad % pm2 save
[PM2] Saving current process list...
[PM2] Successfully saved in /Users/lcotton/.pm2/dump.pm2

>lcotton@MBP-de-Lucas 15-Cluster-Escalabilidad % pm2 stop /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js

[PM2] Applying action stopProcessId on app [/Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js](ids: [
  0, 1, 2, 3,
  4, 5, 6, 7
])
[PM2] [ServerCluster](0) ✓
[PM2] [ServerCluster](1) ✓
[PM2] [ServerCluster](2) ✓
[PM2] [ServerCluster](3) ✓
[PM2] [ServerCluster](4) ✓
[PM2] [ServerCluster](5) ✓
[PM2] [ServerCluster](6) ✓
[PM2] [ServerCluster](7) ✓
┌─────┬──────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name             │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼──────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ lcotton  │ disabled │
│ 1   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ lcotton  │ disabled │
│ 2   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ lcotton  │ disabled │
│ 3   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ lcotton  │ disabled │
│ 4   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ lcotton  │ disabled │
│ 5   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ lcotton  │ disabled │
│ 6   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ lcotton  │ disabled │
│ 7   │ ServerCluster    │ default     │ 1.0.0   │ cluster │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ lcotton  │ disabled │
└─────┴──────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

>lcotton@MBP-de-Lucas 15-Cluster-Escalabilidad % pm2 delete /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js

[PM2] Applying action deleteProcessId on app [/Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js](ids: [
  0, 1, 2, 3,
  4, 5, 6, 7
])
[PM2] [ServerCluster](0) ✓
[PM2] [ServerCluster](1) ✓
[PM2] [ServerCluster](2) ✓
[PM2] [ServerCluster](3) ✓
[PM2] [ServerCluster](4) ✓
[PM2] [ServerCluster](5) ✓
[PM2] [ServerCluster](6) ✓
[PM2] [ServerCluster](7) ✓
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
[PM2][WARN] Current process list is not synchronized with saved list. App ServerCluster ServerCluster ServerCluster ServerCluster ServerCluster ServerCluster ServerCluster ServerCluster differs. Type 'pm2 save' to synchronize.

>lcotton@MBP-de-Lucas 15-Cluster-Escalabilidad % pm2 save

[PM2] Saving current process list...
[PM2][WARN] PM2 is not managing any process, skipping save...
[PM2][WARN] To force saving use: pm2 save --force
## ---------------
## NGINX DOCKER
## ---------------
>docker run --name nginxCoderhouse -p 80:80 -d -v /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/nginx.conf:/etc/nginx/conf.d/default.conf nginx

>npm start

>node /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8082

>node /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8083

>node /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8084

>node /Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/server.js -p 8085