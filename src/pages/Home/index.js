import classNames from 'classnames/bind'
import styles from './Home.module.css'

const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('content-home')}>
            <img src='https://futabus.vn/_nuxt/img/aboutus-01.86f1c35.jpg' />
            <h2 className={cx('title-home')}>Hệ thống CTY cổ phần xe khách Phương Trang</h2>
        </div>
    )
}

export default Home