import React from 'react'
import styles from './TextInput.module.css'

const TextInput = (props) => {
    return (
        <div>
            <input className={styles.input} type="text" {...props} required/>
        </div>
    )
}

export default TextInput;
