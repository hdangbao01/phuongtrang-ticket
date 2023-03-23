import Header from './Header'
import classNames from 'classnames/bind'
import styles from './Layout.module.css'

const cx = classNames.bind(styles)

function Layout({ children }) {
    return (
        <div className={cx('main')}>
            <Header />
            <div className={cx('content')}>{children}</div>
        </div>
    )
}

export default Layout