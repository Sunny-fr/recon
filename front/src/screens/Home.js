import React, { useState} from 'react'
import Status from '../components/Status'
import DropZone from '../components/DropZone'
import File from '../components/File'


const styles = {

    container: {
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,.3)',
        borderRadius: 5,
        marginBottom: 20,
        animationDuration: '600ms'
    },
}

const Queue = ({files, removeFromQueue}) => {
    return <div
        className="animate__fadeIn animate__animated"
        style={styles.container}>
        {files.map((file) => (
            <File
                className="animate__fadeInDown animate__animated"
                key={file.id} file={file.data} onComplete={() => removeFromQueue(file.id)}/>
        ))}
    </div>
}

const Home = () => {

    // {
    //     id:'test',
    //         data:{
    //     name: 'hello', size: 15000000
    // }
    // }

    const [files, setFiles] = useState([])
    const fileHandler = (files) => setFiles(state => {
        const toAdd = files.reduce((s, i) => {
            const found = state.find(p => p.id === i.id)
            if (found) return s
            return s.concat(i)
        }, [])
        return state.concat(toAdd)
    })
    const removeFromQueue = (id) => setFiles(state => state.filter(p => p.id !== id))
    return (
        <div style={{margin: 50}}>
            <DropZone setFiles={fileHandler}/>
            <div style={{marginBottom: 40, textAlign: 'right', padding: 10, color: 'rgba(255,255,255,.6)'}}>
                supported files : .mp4, .mov, .jpg, .jpeg, .png
            </div>
            <Queue files={files} removeFromQueue={removeFromQueue} />
            <Status/>
        </div>
    )
}


export default Home
