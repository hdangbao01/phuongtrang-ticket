import { BrowserRouter as Router, Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Header.module.css'

const cx = classNames.bind(styles)

function Header() {
    const user = localStorage.getItem("user");   

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location="/"
    }

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('about')}>
                    <marquee dicrection="scroll" className={cx('about-text')}>Website quản lý vé xe khách Phương Trang - CHẤT LƯỢNG LÀ DANH DỰ</marquee>
                </div>
            </header>
            <div className={cx('menu')}>
                <div className={cx('menu-bar')}>
                    <div className={cx('menu-main')}>
                        <Link to='/'>
                            <img className={cx('logo')} src='https://futabus.vn/_nuxt/img/logo-img.c178602.png' alt='logo-phuong-trang' />
                        </Link>
                        <ul className={cx('menu-list')}>
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <li className={cx('menu-item')}>Trang chủ</li>
                            </Link>
                            <Link to='/manager' style={{ textDecoration: 'none' }}>
                                <li className={cx('menu-item')}>Quản lý vé</li>
                            </Link>
                        </ul>
                    </div>
                    <div className={cx('about-contry')}>
                        {!!user && <div className={cx('menu-user')}>
                            <Link to='/profile' style={{ textDecoration: 'none' }}>
                                <div className={cx('menu-item')}>Trang cá nhân</div>
                            </Link>
                            <button className={cx('menu-item', 'btn-logout')} onClick={handleLogout}>Đăng xuất</button>
                        </div>}

                        {!user && <Link to='/login' style={{ textDecoration: 'none' }}>
                            <button className={cx('menu-item', 'btn-login')}>Đăng nhập</button>
                        </Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header