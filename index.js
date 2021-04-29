const { health } = require('./health')

void async function main() {
    console.log(await health('my server'))
}()