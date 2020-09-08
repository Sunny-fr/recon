import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import DropzoneTitle from './DropzoneTitle'
import unique from '../utils/unique'


const styles = {
    container: {
        padding: 30,
        margin: '40px auto 0 auto',
        borderRadius: 10,
        border: '3px dashed #FFF',
        transition: 'background-color 300ms ease-out'
    }
}

const DropZone = ({setFiles}) => {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        //console.log(acceptedFiles)
        setFiles(acceptedFiles.map(file => ({
            id: unique(),
            data: file
        })))
    }, [setFiles])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div style={{
            ...styles.container,
            backgroundColor: isDragActive ? 'rgba(0,0,0,.3)' : 'transparent'
        }} {...getRootProps()}>

            <DropzoneTitle active={isDragActive} title={isDragActive ? 'Release it!' : 'Drop it!'}/>
            <input {...getInputProps()} />
        </div>
    )
}


export default DropZone
