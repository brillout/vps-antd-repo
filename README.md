Bug reproduction.

```bash
git clone git@github.com:brillout/vps-antd-repo
cd vps-antd-repo/
pnpm install
pnpm run dev
```

Same as single line (copy-paste me):

```shell
git clone git@github.com:brillout/vps-antd-repo && cd vps-antd-repo/ && pnpm install && pnpm run dev
```

Got to [localhost:3001](http://localhost:3001) and observe how slow the app starts.

On the following linux machine it takes ~37 seconds for the first start and ~30 seconds for subsequent starts.

```
System:
  OS: Linux 5.10 Debian GNU/Linux 10 (buster) 10 (buster)
  CPU: (2) x64 Intel(R) Celeron(R) N4020 CPU @ 1.10GHz
  Memory: 489.80 MB / 2.71 GB
  Container: Yes
  Shell: 5.0.3 - /bin/bash
```
