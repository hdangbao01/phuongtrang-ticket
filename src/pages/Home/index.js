import classNames from 'classnames/bind'
import styles from './Home.module.css'

const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('content-home')}>
            <h1 className={cx('title-home')}>Quản lý vé xe khách Phương Trang</h1>
            <img src='https://futabus.vn/_nuxt/img/aboutus-01.86f1c35.jpg' />
            <h2 className={cx('title-home')}>Giới thiệu</h2>
            <h2 className={cx('title-home')}>Tính năng</h2>
        </div>
    )
}

export default Home