import classNames from 'classnames/bind'
import styles from './Login.module.css'

const cx = classNames.bind(styles)

function Login() {
    return (
        <div className={cx('form')}>
            <h2 className={cx('text-login')}>FUTA Bus Lines</h2>            
            <div>
                <label className={cx('label-login')}>Tài khoản</label>
                <input className={cx('input-login')} placeholder='Nhập tài khoản...' />
            </div>
            <div>
                <label className={cx('label-login')}>Mẩu khẩu</label>
                <input className={cx('input-login')} placeholder='Nhập mật khẩu...' type={'password'} />
            </div>
            <button className={cx('btn-login')}>Đăng nhập</button>
        </div>
    )
}

export default Login