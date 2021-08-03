import React from 'react'
import styles from './Home.module.css'
import { useHistory } from "react-router-dom";
import Card from '../../components/shared/Card/Card'
import Button from '../../components/shared/Buttom/Button'

const Home = () => {
    const history = useHistory();

    function startRegister(){
        console.log('Button Clicked!');
        history.push('/authenticate');
    }

    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to Codershouse!" icon = "logo">
                <p className={styles.text}>
                    We’re working hard to get Codershouse ready for everyone! While we wrap up the finishing youches, we’re adding people gradually to make sure nothing breaks :)
                </p>
                <Button onClick={startRegister} text="Let's Go"/>
                <div className={styles.signInWrapper}>
                    <span className={styles.invite}>Have an invite text?</span>
                    {/* <Link style={signInLink} to="/login">Sign in</Link> */}
                </div>
            </Card>
        </div>
    )
}

export default Home
