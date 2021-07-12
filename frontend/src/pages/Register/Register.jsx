import React, {useState} from 'react'
import styles from './Register.module.css'
import StepAvatar from '../Steps/StepAvatar/StepAvatar'
import StepName from '../Steps/StepName/StepName';
import StepOTP from '../Steps/StepOTP/StepOTP';
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail';
import StepUsername from '../Steps/StepUsername/StepUsername';

const steps = {
    1: StepPhoneEmail,
    2: StepOTP,
    3: StepName,
    4: StepAvatar,
    5: StepUsername
}

const Register = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step];
    function onClick(){
        setStep(step + 1);
    }

    return (
        <div>
            <Step onClick={onClick} />
        </div>
    )
}

export default Register
