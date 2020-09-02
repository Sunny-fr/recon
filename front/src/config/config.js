const host = ''//'http://localhost:8080'

const config = {
    pollingTime: 1000,
    upload: host + '/api/upload',
    status: host + '/api/status',
    download: host + '/api/download/{id}'
}

export default config