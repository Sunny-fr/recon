import React from 'react'
import {Check, CloudUpload, Warning} from '@material-ui/icons'
import CircularProgress from '@material-ui/core/CircularProgress'


const UploadStatus = ({state}) => {
    const {uploaded, uploading, error} = state
    if (uploaded) return (
        <React.Fragment>
            <Check style={{marginRight: 10}}/> Done !
        </React.Fragment>
    )
    if (!!error) return (
        <React.Fragment>
            <Warning  style={{marginRight: 10}}/> Error !
        </React.Fragment>
    )
    if (!error && !uploading) return (
        <React.Fragment>
            <CloudUpload  style={{marginRight: 10}}/> Go
        </React.Fragment>
    )

    return <React.Fragment>
        <CircularProgress size={20}  style={{marginRight: 10, color: '#FFF'}}/> Envoi
    </React.Fragment>

}

export default UploadStatus
