import { BrowserRouter as Router, Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Header.module.css'
import { useState } from 'react'

const cx = classNames.bind(styles)

function Header() {
    const user = localStorage.getItem("user");

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
                        {!!user && <Link to='/profile' style={{ textDecoration: 'none' }}>
                            <li className={cx('menu-item')}>Trang cá nhân</li>
                        </Link>}
                        
                        {!user && <Link to='/login' style={{ textDecoration: 'none' }}>
                            <li className={cx('menu-item', 'btn-login')}>Đăng nhập</li>
                        </Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header