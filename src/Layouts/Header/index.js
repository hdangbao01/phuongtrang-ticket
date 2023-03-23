import { BrowserRouter as Router, Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Header.module.css'

const cx = classNames.bind(styles)

function Header() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('about')}>
                    {/* <p className={cx('about-text')}>Website quản lý vé xe khách Phương Trang - CHẤT LƯỢNG LÀ DANH DỰ</p>        */}
                    <marquee dicrection="scroll" className={cx('about-text')}>Website quản lý vé xe khách Phương Trang - CHẤT LƯỢNG LÀ DANH DỰ</marquee>
                </div>
            </header>
            <div className={cx('menu')}>
                <div className={cx('menu-bar')}>
                    <Link to='/'><img className={cx('logo')} src='https://futabus.vn/_nuxt/img/logo-img.c178602.png' alt='logo-phuong-trang' /></Link>
                    <ul className={cx('menu-list')}>
                        <Link to='/' style={{textDecoration: 'none'}}>
                            <li className={cx('menu-item')}>Trang chủ</li>
                        </Link>
                        <Link to='/manager' style={{textDecoration: 'none'}}>
                            <li className={cx('menu-item')}>Quản lý vé</li>
                        </Link>
                        <Link to='/profile' style={{textDecoration: 'none'}}>
                            <li className={cx('menu-item')}>Trang cá nhân</li>
                        </Link>
                        <Link to='/login' style={{textDecoration: 'none'}}>
                            <li className={cx('menu-item')}>Đăng nhập</li>
                        </Link>
                    </ul>
                    <div className={cx('about-contry')}>
                        <img className={cx('about-logo')} src='https://static.vecteezy.com/system/resources/previews/016/328/942/original/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png' alt='co-viet-nam' />
                        <span>VN</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header