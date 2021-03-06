const host = window.location.host === 'localhost:3010' ? 'http://localhost:8080' : ''

const config = {
    pollingTime: 1000,
    host,
    upload: host + '/api/upload',
    status: host + '/api/status',
    download: host + '/api/download/{id}'
}

export default config