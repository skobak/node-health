// Authour Aleksandr Skobeltcyn
// This is simple module that return health information from nodejs
// No dependencies 

const { exec } = require('child_process')
const os = require('os')

async function health() {
    return {
        name: "node",
        status: 'ok',
        timestamp: Date.now(),
        process: {
            uptime: process.uptime(),
            cpuUsage: process.cpuUsage(),
        },
        memory: {
            size: os.totalmem(),
            avail: os.freemem(),
            usePercentage: getUsagePercent(os.totalmem(), os.freemem),
        },
        space: await getSpace(),
    }
}

const getSpace = async() => {
    return new Promise((resolve, reject) => {
        try {
            exec('df -h', function(error, stdout, stderr) {
                const arr = stdout.split('\n')
                arr.forEach((line) => {
                    // /dev/sda1        39G   11G   29G  27% /
                    if (line[line.length - 1] === '/') {
                        //if last characther it means ROOT for linux systems
                        const [
                            _,
                            size,
                            used,
                            avail,
                            usePercentage,
                        ] = parseStringWithColumns(line)
                        resolve({ size, used, avail, usePercentage: parseInt(usePercentage.slice(0, -1)) })
                    }
                })
            })
        } catch (error) {}
    })
}

// Helper functions
const getUsagePercent = (total, free) => {
    return Math.round(((total - free) / total) * 100)
}

// parse linux output with columns like:
//  name     data1  data2     etc.
const parseStringWithColumns = (line) => {
    const arr = []
    let tempString = ''
    for (let index = 0; index < line.length; index++) {
        const char = line[index]
        if (char !== ' ') {
            tempString += char
        } else if (tempString != '') {
            arr.push(tempString)
            tempString = ''
        }
    }
    return arr
}

module.exports = { health }