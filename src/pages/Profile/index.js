import classNames from 'classnames/bind'
import styles from './Profile.module.css'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Profile() {
    const [infor, setInfor] = useState({})
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState([])
    const user = localStorage.getItem("user");

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.json())
            .then(res => {
                setUsers(res)
            })
    }, [])

    useEffect(() => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infor)
        }

        fetch(`https://jsonplaceholder.typicode.com/posts/1`, options)
            .then((res) => res.json())
    }, [infor])

    const handleUpdateInfor = () => {
        setInfor({ title: address, body: phone })
    }

    return (
        <div className={cx('wwrapper')}>
            {users.map(u => (
                user === u.username && <div className={cx('content-pro5')} key={u.username} >
                    <div className={cx('infor')}>
                        <img className={cx('avatar')} src="https://cornerstoneia.com/wp-content/uploads/2019/08/avatar-placeholder.jpeg" alt='avatar'></img>
                        <div className={cx('left-info')}>
                            <div className={cx('about')}>
                                <h3>Giới thiệu:</h3>
                                <p>{u.about}</p>
                            </div>
                            <div className={cx('about')}>
                                <h3>Kinh nghiệm làm việc:</h3>
                                <p>{u.experience}</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('mana')} key={u.username}>
                        <div className={cx('contact-info')}>
                            <h1>{u.username}</h1>
                            <p>{u.role}</p>
                        </div>
                        <div className={cx('contact-info1')}>
                            <h3>Liên lạc</h3>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Điện thoại:</label>
                                <input className={cx('input-info')} placeholder={u.phone} value={phone} onChange={e => {setPhone(e.target.value)}} />
                            </div>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Địa chỉ:</label>
                                <input className={cx('input-info')} placeholder={u.address.city} value={address} onChange={e => {setAddress(e.target.value)}} />
                            </div>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Email:</label>
                                <input className={cx('input-info')} placeholder={u.email} value={email} onChange={e => {setEmail(e.target.value)}} />
                            </div>
                        </div>
                        <div className={cx('contact-info2')}>
                            <h3>Thông tin cá nhân</h3>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Ngày sinh:</label>
                                <input className={cx('input-info')} value={u.birthday} />
                            </div>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Giới tính:</label>
                                <input className={cx('input-info')} value={u.gender} />
                            </div>
                        </div>
                        <button className={cx('btn-pro5')} onClick={handleUpdateInfor}>Lưu</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Profile