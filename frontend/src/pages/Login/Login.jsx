import React, {useState} from 'react'
import styles from './Login.module.css'
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail';
import StepOTP from '../Steps/StepOTP/StepOTP';

const steps = {
    1: StepPhoneEmail,
    2: StepOTP
}


const Login = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step];
    function onClick() {
        setStep(step + 1);
    }

    return (
        <div>
            <Step onClick={onClick} />
        </div>
    )
}

export default Login
