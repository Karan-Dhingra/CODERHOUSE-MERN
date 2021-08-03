import React, {useState} from 'react'
import Card from '../../../../components/shared/Card/Card'
import Button from '../../../../components/shared/Buttom/Button'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'

const Email = ({onNext}) => {
    const [email, setEmail] = useState('');

    return (
        <Card title="Enter Your email id" icon="email-emoji">
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={onNext}/>
                </div>
                <p className={styles.bottomParagraph}>By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
            </div>        
        </Card>
    )
}

export default Email
