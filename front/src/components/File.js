import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import config from '../config/config'
import UploadStatus from './UploadStatus'
import {readableFileSize} from '../utils/file'
import axios from 'axios'


const styles = {
    cell: {
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
}


const upload = (file, {onProgress} = {}) => {
    const formData = new FormData()
    formData.append('file', file)
    return axios({
        url: config.upload,
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data' },
        onUploadProgress: (p) => {
            const progress = p.loaded / p.total
            if (onProgress) {
                onProgress(progress)
            }
        }
    }).then((response) => {
        console.log('upload success')
        console.log(response.data)
        return response.data
    }).catch(e => {
        console.log('error upload')
        return Promise.reject(e)
    })

    // return fetch(config.upload, {
    //     method: 'POST',
    //     body: formData,
    // }).then((response) => {
    //     console.log('upload success')
    //     console.log(response)
    //     return response
    // }).catch(e => {
    //     console.log('error upload')
    //     return Promise.reject(e)
    // })
}

const useUpload = ({onProgress}= {}) => {
    const [state, setState] = useState({
        uploaded: false,
        error: null,
        uploading: false
    })
    const startUpload = (file) => {
        setState(() => ({
            uploaded: false,
            uploading: true,
            error: null
        }))
        return upload(file, {onProgress})
            .then((response) => {
                setState(() => ({
                    uploaded: true,
                    uploading: false,
                    error: null
                }))
                return response
            })
            .catch((error) => {
                setState(() => ({
                    uploaded: false,
                    uploading: false,
                    error: error
                }))
                return Promise.reject(error)
            })
    }
    return [state, startUpload]
}


const File = ({file, onComplete, className}) => {
    const [progress, setProgress] = useState(0)
    const [state, startUpload] = useUpload({onProgress: setProgress})
    const [isUploaded, setIsUploaded] = useState(false)
    const {uploading, uploaded} = state
    const uploadHandler = () => {
        if (!uploading && uploaded === false && isUploaded === false) {
            startUpload(file)
                .then(() => {
                    setIsUploaded(true)
                    if (onComplete)
                        onComplete()
                })
        }
    }
    useEffect(() => {
        uploadHandler()
    })
    return <div style={{animationDuration: '400ms'}} className={className}>
        <Grid container>
            <Grid item style={{flexGrow:1}}>
                <div className="ellipsis" style={{...styles.cell, justifyContent: 'flex-start'}}>
                    {file.name}
                </div>
            </Grid>
            <Grid item style={{flexBasis: 100}}>
                <div style={styles.cell}>
                    {progress.toFixed(2)}%
                </div>
            </Grid>
            <Grid item>
                <div style={styles.cell}>
                    {readableFileSize(file.size)}
                </div>
            </Grid>
            <Grid item style={{flexBasis: 150}}>
                <div style={styles.cell}>
                    <UploadStatus state={state}/>
                </div>
            </Grid>
        </Grid>
    </div>
}


export default File
