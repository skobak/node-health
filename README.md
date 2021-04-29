# Nodejs async health method/end-point

Return vital server information that you can place on a /health enpoint in order
to collect information about your servers

# Return JSON example

```
{
  name: 'node',
  status: 'ok',
  timestamp: 1619714675360,
  process: { uptime: 0.0984217, cpuUsage: { user: 82971, system: 10371 } },
  memory: { size: 13244952576, avail: 12808945664, usePercentage: 3 },
  space: { size: '251G', used: '9.1G', avail: '230G', usePercentage: 4 }
}

```

# Install

Not in npm, just one file health.js

# Usage

```
const { health } = require('./health')

void async function main() {
    console.log(await health('server name'))
}()
```

or in Express

```
router.get('/health', async(_, res) => { res.json(await health(process.env.SERVER)) })
```


# Licence
MIT

# Contribution
PR are welcome but without extra dependencies