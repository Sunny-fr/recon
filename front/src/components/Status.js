import React, {useEffect, useRef, useState} from 'react'
import useFetch from 'use-http'
import config from '../config/config'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import {Check, CloudDownload} from '@material-ui/icons'
import './status.scss'
import Button from '@material-ui/core/Button'
import {readableFileSize} from '../utils/file'

const styles = {
    cell: {
        height: 50,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
    },
    statusCell: {
        backgroundColor: '#F0F0F0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 20px',
        height: '100%'
    }
}


const FileStatus = ({file}) => {
    const {status} = file
    if (status === 'pending') {
        return <div style={styles.statusCell}>
            Traitement...
            <CircularProgress style={{marginLeft: 10}} size={20}/>
        </div>
    }

    if (status === 'success') {
        return <div style={styles.statusCell}>
            Traité
            <Check style={{marginLeft: 10}}/>
        </div>
    }

    if (status === 'queued') {
        return <div style={styles.statusCell}>
            En attente
            <CircularProgress style={{marginLeft: 10}} size={20}/>
        </div>
    }

}

const DownloadButton = ({file}) => {
    const {status, id} = file
    const path = config.download.replace('{id}', id)
    if (status === 'success') {
        return <Button
            size="small"
            disableElevation
            variant="contained"
            style={{
                backgroundColor: '#42b983',
                color: '#FFF',
                fontSize: '13px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "'Lato', sans-serif",
                fontWeight: 'bold'
            }} href={path} download>
            <CloudDownload style={{marginRight: 10}}/>
            Choper ({readableFileSize(file.size)})
        </Button>
    }

    return null

}

const File = ({file}) => {
    return <div style={{animationDuration: '300ms'}} className="list-item animate__animated animate__fadeInDown">
        <Grid container>
            <Grid item style={{flexGrow: 1}}>
                <div style={styles.cell}>
                    <strong>{file.name} {' '} ({readableFileSize(file.originalSize)}) </strong>
                </div>
            </Grid>
            <Grid item>
                <div style={styles.cell}>
                    <DownloadButton file={file}/>
                </div>
            </Grid>
            <Grid item style={{flexBasis: 100}}>
                {file.status === "success" && (
                    <div style={{...styles.cell, justifyContent: 'center'}}>
                        {file.optimization} %
                    </div>)}
            </Grid>
            <Grid item style={{flexBasis: 150}}>
                <FileStatus file={file}/>
            </Grid>
        </Grid>
    </div>
}

const Status = () => {

    const [history, setHistory] = useState([])
    const {get, response} = useFetch(config.status, {
        cacheLife: 10
    })

    const fetchData = useRef(() => get('/')
        .then(data => setHistory(response.ok ? data : [])))

    useEffect(() => {
        const refresh = fetchData.current
        let timeout
        const fetch = () => refresh().finally(() => {
            clearTimeout(timeout)
            timeout = setTimeout(fetch, config.pollingTime)
        })
        fetch()
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div className="status-list list">
            {history.map(file => <File key={file.id} file={file}/>)}
        </div>
    )
}


export default Status