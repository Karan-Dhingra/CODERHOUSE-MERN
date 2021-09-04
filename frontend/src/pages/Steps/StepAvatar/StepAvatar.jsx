import React, { useState, useEffect } from 'react'
import styles from './stepAvatar.module.css'
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Buttom/Button'
import { useSelector, useDispatch } from 'react-redux'
import { setAvatar} from '../../../store/activation_slice'
import {activate} from '../../../http'
import {setAuth} from '../../../store/auth_slice'
import Loader from '../../../components/shared/Loader/Loader'

const StepAvatar = (onClick) => {
    const { name, avatar } = useSelector((state) => state.activate)
    const dispatch = useDispatch()
    const [image, setImage] = useState('/images/monkey-avatar.png')
    const [loading, setLoading] = useState(false);
    const [unmounted, setUnmounted] = useState(false);

    async function submit() {
        if(!name && !avatar) return;
        setLoading(true);
        try {
            const { data } = await activate({ name, avatar });
            if (data.flag) {
                // console.log("HIIIIIII");
                if(!unmounted){
                    dispatch(setAuth(data));
                }
            }
            console.log(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => {
            setUnmounted(true);
        }
    }, [])
    
    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
        };
    }

    if (loading) return <Loader message="Activation in progress..." />;

    return (
        <>
            <div>
                <Card title={`Okay, ${name}!`} icon="monkey-emoji">
                    <p className={styles.subHeading}>How’s this photo?</p>
                    <div className={styles.avatarWrapper}>
                        <img src={image} alt="avatar" />
                    </div>
                    <div>
                        <input 
                            onChange = {captureImage}
                            id="avatarInput" 
                            type="file" 
                            className={styles.avatarInput}/>
                        <label htmlFor="avatarInput" className={styles.avatarLabel}>
                            Choose a different Photo
                        </label>
                    </div>
                    <div>
                        <div className={styles.actionButtonWrap}>
                            <Button className="" onClick={submit} text="Next" />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default StepAvatar
