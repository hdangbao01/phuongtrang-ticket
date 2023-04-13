import classNames from 'classnames/bind'
import styles from './Profile.module.css'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Profile() {
    const [infor, setInfor] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState([])
    const [idUser, setIdUser] = useState('')
    const user = localStorage.getItem("user");

    useEffect(() => {
        fetch(`http://localhost:3000/employee`)
            .then(res => res.json())
            .then(res => {
                setUsers(res)
                setIdUser(res[0].id);
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

        if (infor) {
            fetch(`http://localhost:3000/employee/` + idUser, options)
                .then((res) => res.json())
                .then((res) => {
                    console.log("Sua thanh cong")
                    localStorage.removeItem("user")
                    localStorage.setItem("user", email)
                })
        }
    }, [infor])

    const handleUpdateInfor = () => {
        setInfor({
            Username: email,
            EmployeeName: users[0].EmployeeName,
            EmployeePhone: phone,
            EmployeePositon: users[0].EmployeePositon,
            Salary: users[0].Salary
        })
    }

    return (
        <div className={cx('wwrapper')}>
            {users.map(u => (
                user === u.Username && <div className={cx('content-pro5')} key={u.Username} >
                    <div className={cx('infor')}>
                        <img className={cx('avatar')} src="https://cornerstoneia.com/wp-content/uploads/2019/08/avatar-placeholder.jpeg" alt='avatar'></img>
                        <div className={cx('left-info')}>
                            <div className={cx('about')}>
                                <h3>Giới thiệu:</h3>
                                <p></p>
                            </div>
                            <div className={cx('about')}>
                                <h3>Kinh nghiệm làm việc:</h3>
                                <p></p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('mana')} key={u.EmployeeName}>
                        <div className={cx('contact-info')}>
                            <h1>{u.EmployeeName}</h1>
                            <p>{u.EmployeePositon}</p>
                        </div>
                        <div className={cx('contact-info1')}>
                            <h3>Liên lạc</h3>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Email:</label>
                                <input className={cx('input-info')} placeholder={u.Username} value={email} onChange={e => { setEmail(e.target.value) }} />
                            </div>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Điện thoại:</label>
                                <input className={cx('input-info')} placeholder={u.EmployeePhone} value={phone} onChange={e => { setPhone(e.target.value) }} />
                            </div>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Địa chỉ:</label>
                                <input className={cx('input-info')} />
                            </div>                            
                        </div>
                        <div className={cx('contact-info2')}>
                            <h3>Thông tin cá nhân</h3>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Ngày sinh:</label>
                                <input className={cx('input-info')} />
                            </div>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Giới tính:</label>
                                <input className={cx('input-info')} />
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