import React from 'react'
import styles from './RoomCard.module.css'

export const RoomCard = ({room}) => {
    return (
        <div className={styles.card}>
            {/* This is RoomCard */}
            <h3 className={styles.topic}>{room.topic}</h3>
            <div className={styles.speakers}>
                <div className={styles.avatars}>
                    {room.speakers.map(speaker => (
                        <img src={speaker.avatar} alt="avatar" />
                    ))}
                </div>
                <div className={styles.names}>
                    {room.speakers.map(speaker => (
                        <div className={styles.nameWrapper}>
                            <span>{speaker.name}</span>
                            <img src="/images/chat-bubble.png" alt="chat bubble" />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.peopleCount}>
                <span>{room.totalPeople}</span>
                <img src="/images/user-icon.png" alt="users" />
            </div>
        </div>
    )
}
