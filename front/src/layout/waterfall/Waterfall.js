import React, { useState, useEffect } from 'react'

const Waterfall = ({ children, delay = 200 }) => {
    const [current, setCurrent] = useState(1)
    const parking = React.Children.map(children, (child, i) => {
        return child
    })
    useEffect(() => {
        //EFFECT SAFE
        const fn = () => {
            if (current < parking.length) {
                setCurrent(current + 1)
            }
        }
        const timeout = setTimeout(fn, delay)
        return () => clearTimeout(timeout)
    })
    return parking.slice(0, current)
}

export default Waterfall
