import React from 'react'

const styles = {
    container: {
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animationDuration: '400ms',
        perspective: '800px',
        perspectiveOrigin: '50% 50%'

    },
    title: {
        transformStyle: 'preserve-3d',
        fontFamily: '\'Lobster\', cursive',
        fontSize: '60px',
        transform: 'translateY(-30px) rotateZ(-10deg) scale(1)',
        textShadow: '7px 10px 3px rgba(0,0,0,.4)',
        transition: 'all 300ms ease-out'
    },
    subtitle: {
        animationDelay: '100ms',
        fontFamily: '\'Lobster\', cursive',
        fontSize: '20px',
        position: 'absolute',
        bottom: 10,
        textAlign: 'center',
        width: '100%',
        textShadow: '1px 1px 1px rgba(0,0,0,.4)'
    }
}
const DropzoneTitle = ({title = 'Drop it!', active = false}) => {
    const titleStyle = {
        ...styles.title,
        transform: active ? styles.title.transform + ' scale(1.7)' : styles.title.transform,
    }
    return (
        <div style={{position: 'relative'}}>
            <div style={styles.container} className="animate__animated animate__zoomIn">
                <div style={titleStyle}>
                    {title}
                </div>
            </div>
            <div
                className="animate__animated fadeInLeftShort"
                style={styles.subtitle}>...like it's hot
            </div>
        </div>

    )
}


export default DropzoneTitle
