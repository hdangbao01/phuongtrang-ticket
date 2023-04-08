import classNames from 'classnames/bind'
import styles from './Profile.module.css'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Profile() {
    const [users, setUsers] = useState([])
    const user = localStorage.getItem("user");

    console.log(users);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.json())
            .then(res => {
                setUsers(res)
            })
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location="/"
    }

    return (
        <div className={cx('content-pro5')}>
            <div className={cx('infor')}>
                <img className={cx('avatar')} src='https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1' alt='avatar'></img>
                <div className={cx('left-info')}>
                    <div className={cx('about')}>
                        <h3>Giới thiệu:</h3>
                        <p>Thích hồng cánh sen ghét sự dối trá</p>
                    </div>
                    <div className={cx('about')}>
                        <h3>Kinh nghiệm làm việc:</h3>
                        <p>Tuy không có kinh nghiệm nhưng có một chái tym chân thành</p>
                    </div>
                </div>
            </div>
            <div className={cx('mana')}>
                <div className={cx('contact-info')}>
                {users.map(u => (
                    (user === u.username && <h1>{u.username}</h1> )
                ))}                    
                    <p>Nhân viên thu vé</p>
                </div>
                <div className={cx('contact-info1')}>
                    <h3>Liên lạc</h3>
                    <div className={cx('block')}>
                        <label className={cx('label-info')}>Điện thoại:</label>
                        <input className={cx('input-info')} value='0123456789' />
                    </div>
                    <div className={cx('block')}>
                        <label className={cx('label-info')}>Địa chỉ:</label>
                        <input className={cx('input-info')} value='Tứ Hà, Điện Ngọc, Điện Bàn, Quảng Nam' />
                    </div>
                    <div className={cx('block')}>
                        <label className={cx('label-info')}>Email:</label>
                        <input className={cx('input-info')} value='ivan@gmail.com' />
                    </div>
                </div>
                <div className={cx('contact-info2')}>
                    <h3>Thông tin cá nhân</h3>
                    <div className={cx('block')}>
                        <label className={cx('label-info')}>Ngày sinh:</label>
                        <input className={cx('input-info')} value='09/09/2009' />
                    </div>
                    <div className={cx('block')}>
                        <label className={cx('label-info')}>Giới tính</label>
                        <input className={cx('input-info')} value='Không xác định' />
                    </div>
                </div>
                <button className={cx('btn-pro5')} onClick={handleLogout}>Lưu</button>
            </div>            
        </div>
    )
}

export default Profile