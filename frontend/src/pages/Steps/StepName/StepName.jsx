import React, {useState} from 'react'
import styles from './stepName.module.css'
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Buttom/Button'
import TextInput from '../../../components/shared/TextInput/TextInput'
import { useSelector, useDispatch } from 'react-redux'
import { setName } from '../../../store/activation_slice'


const StepName = ({onClick}) => {
    const {name} = useSelector((state) => state.activate )
    const dispatch = useDispatch()
    const [fullName, setFullName] = useState(name)
    
    function nextStep() {
        if (!fullName){
            return;
        }

        dispatch(setName(fullName))
        onClick();
    }

    return (
        <>
            <div>
                <Card title="What’s your full name?" icon="goggle-emoji">
                    <TextInput
                        value={fullName} onChange={(e) => setFullName(e.target.value)}
                    />
                    <div>
                        <p className={styles.bottomParagraph}>People use real names at codershouse :) </p>
                        <div className={styles.actionButtonWrap}>
                            <Button className="" onClick={nextStep} text="Next" />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default StepName
