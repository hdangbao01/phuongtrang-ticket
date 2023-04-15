import classNames from 'classnames/bind'
import styles from './Profile.module.css'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Profile() {
    const [infor, setInfor] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState([])
    const [idUser, setIdUser] = useState('')
    const user = localStorage.getItem("user");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/employee`)
            .then(res => res.json())
            .then(res => {
                setUsers(res)
                setIdUser(res[0].EmployeeId);
            })
    }, [])

    useEffect(() => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infor)
        }

        if (infor) {
            fetch(`http://localhost:3000/employee`, options)
                .then((res) => res.json())
                .then(() => {
                    alert("Sửa thông tin thành công")
                    localStorage.removeItem("user")
                    localStorage.setItem("user", email)
                    window.location='/profile'
                })
        }
    }, [infor])

    const handleUpdateInfor = () => {
        setInfor({
            EmployeeId: idUser,
            Username: email,
            Password: users[0].Password,
            EmployeeName: name,
            EmployeePhone: phone,
            EmployeePositon: users[0].EmployeePositon,
            Salary: users[0].Salary
        })
    }

    return (
        <div className={cx('wwrapper')}>
            {users.map(u => (
                user === u.Username && <div className={cx('content-pro5')} key={u.EmployeeId} >
                    <div className={cx('infor')}>
                        <img className={cx('avatar')} src="https://cornerstoneia.com/wp-content/uploads/2019/08/avatar-placeholder.jpeg" alt='avatar'></img>
                        <div className={cx('left-info')}>
                            <div className={cx('about')}>
                                <h3>Chức vụ:</h3>
                                <p>{u.EmployeePositon}</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('mana')}>
                        <div className={cx('contact-info')}>
                        </div>
                        <div className={cx('contact-info2')}>
                            <h3>Thông tin cá nhân</h3>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Họ tên:</label>
                                <input className={cx('input-info')} placeholder={u.EmployeeName} value={name} onChange={e => { setName(e.target.value) }}  />
                            </div>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Ngày sinh:</label>
                                <input className={cx('input-info')} />
                            </div>
                            <div className={cx('block')}>
                                <label className={cx('label-info')}>Giới tính:</label>
                                <input className={cx('input-info')} />
                            </div>
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
                        
                        <button className={cx('btn-pro5')} onClick={handleUpdateInfor}>Lưu</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Profile