import React, {useState} from 'react'
import styles from './stepOTP.module.css'
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Buttom/Button'
import TextInput from '../../../components/shared/TextInput/TextInput'
import { verifyOtp } from '../../../http'
import { useSelector } from 'react-redux'
import { setAuth } from '../../../store/auth_slice'
import { useDispatch } from 'react-redux'


const StepOTP = ({onClick}) => {
    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()
    const {phone, hash} = useSelector((state) => state.auth.otp);



    async function submit() {
        try{
            const { data } = await verifyOtp({otp, phone, hash})
            console.log(data);
            dispatch(setAuth(data))
        }catch(err){
            console.log(err);
        }

        // onNext()
    }

    return (
        <div className={styles.cardWrapper}>
            <div>
                <Card title="Enter the code we just text you" icon="lock-emoji">
                    <TextInput 
                        value={otp} onChange={(e) => setOtp(e.target.value)}
                    />
                    <div>
                        <div className={styles.actionButtonWrap}>
                            <Button className="" onClick = {submit} text="Next" />
                        </div>
                        <p className={styles.bottomParagraph}>By entering your number, you're aggerring to our Terms of Service and Privacy Policy. Thanks!</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default StepOTP
