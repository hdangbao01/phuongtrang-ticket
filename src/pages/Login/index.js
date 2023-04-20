import classNames from 'classnames/bind'
import styles from './Login.module.css'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Login() {    
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [userLogin, setUserLogin] = useState(false)
    const [server, setServer] = useState('')

    useEffect(() => {
        fetch(`http://127.0.0.1:8001/employee`)
            .then(res => res.json())
            .then(res => {
                setUsers(res)
            })
    }, [])

    const handleUser = () => {
        window.location="/"
        localStorage.setItem("user", username);
        localStorage.setItem("sv", server);
    }

    if(userLogin) {
        handleUser()
    }

    const handleLogin = () => {
        users.find((user) => (
            (user.Username === username && user.Password === pass && setUserLogin(true) )
        ))
    }

    return (
        <div className={cx('form')}>
            <h2 className={cx('text-login')}>FUTA Bus Lines</h2>            
            <div>
                <label className={cx('label-login')}>Tài khoản</label>
                <input className={cx('input-login')} placeholder='Nhập tài khoản...' value={username} onChange={e => {setUsername(e.target.value)}} />
            </div>
            <div>
                <label className={cx('label-login')}>Mẩu khẩu</label>
                <input className={cx('input-login')} placeholder='Nhập mật khẩu...' type={'password'} value={pass} onChange={e => {setPass(e.target.value)}} />
            </div>
            <div>
                <label className={cx('label-login')}>Chọn server</label>
                <select className={cx('input-login')} value={server} onChange={e => {setServer(e.target.value)}}>
                    <option value='1'>Server 1</option>
                    <option value='2'>Server 2</option>
                    <option value='3'>Server 3</option>
                </select>
            </div>
            <button className={cx('btn-login')} onClick={handleLogin}>Đăng nhập</button>
        </div>
    )
}

export default Login