import React, { useState } from 'react'
import Phone from './Phone/Phone';
import Email from './Email/Email';
import styles from './StepPhoneEmail.module.css'


const phoneEmailMap = {
    phone: Phone,
    email: Email
}



const StepPhoneEmail = ({onClick}) => {
    const [type, setType] = useState('phone');
    const Component = phoneEmailMap[type];
    
    // function onClick() {
    //     setType('email');
    // }

    return (
        <>
            <div className={styles.cardWrapper}>
                <div>
                    <div className={styles.buttonWrap}>
                        <button className={`${styles.tabBtn} ${type === 'phone' ? styles.active: ''}`} onClick={() => setType('phone')}>
                            <img src="/images/phone-white.png" alt="phone" />
                        </button>
                        <button className={`${styles.tabBtn} ${type === 'email' ? styles.active : ''}`} onClick={() => setType('email')}>
                            <img src="/images/mail-white.png" alt="email" />
                        </button>
                    </div>
                    <Component onNext={onClick} />
                </div>
            </div>
            {/* <Button>Email</Button> */}
        </>
    )
}

export default StepPhoneEmail
