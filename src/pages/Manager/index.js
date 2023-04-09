import classNames from 'classnames/bind'
import styles from './Manager.module.css'
import { IoTicketOutline, IoBusOutline, IoHome } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Manager() {
    const [ticket, setTicket] = useState({})
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        }

        fetch(`https://jsonplaceholder.typicode.com/posts`, options)
            .then((res) => res.json())
    }, [ticket])

    const handleAddTicket = () => {
        setTicket({ title: name, body: phone })
    }

    return (
        <div className={cx('content-pro5')}>
            <div className={cx('infor')}>
                <div className={cx('left-info')}>
                    <ul className={cx('manager-list')}>
                        <li className={cx('manager-item')}>DANH MỤC</li>
                        <li className={cx('manager-item')}><IoTicketOutline className={cx('manager-icon')} />Quản lý vé xe</li>
                        <li className={cx('manager-item')}><IoBusOutline className={cx('manager-icon')} />Tất cả xe khách</li>
                    </ul>
                </div>
            </div>

            <div className={cx('mana')}>
                <div className={cx('contact-info1')}>
                    <p className={cx('contact-header')}><IoHome className={cx('contact-icon')} /> <GrFormNext /> Quản lý vé xe</p>
                    <div className={cx('block-trip')}>
                        <p className={cx('trip')}><span>* Chuyến BN:</span><br />
                            - Địa điểm đón: Hà Nội<br />
                            - Địa điểm đến: TP.Hồ Chí Minh<br />
                            - Giờ xuất phát: 6:00 AM<br />
                        </p>
                        <p className={cx('trip')}><span>* Chuyến NB:</span><br />
                            - Địa điểm đón: TP.Hồ Chí Minh<br />
                            - Địa điểm đến: Hà Nội<br />
                            - Giờ xuất phát: 17:00 AM<br />
                        </p>
                    </div>
                    <div className={cx('block')}>
                        <input className={cx('input-info')} placeholder="Họ tên.." value={name} onChange={e => { setName(e.target.value) }} />
                        <input className={cx('input-info')} placeholder="Điện thoại..." value={phone} onChange={e => { setPhone(e.target.value) }} />
                    </div>
                    <div className={cx('block')}>
                        <select className={cx('input-info')}>
                            <option>-- Chọn chuyến xe --</option>
                            <option value="BN">BN</option>
                            <option value="NB">NB</option>
                        </select>
                        <select className={cx('input-info')}>
                            <option>-- Chọn ghế --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className={cx('block')}>
                        <select className={cx('input-info')}>
                            <option>-- Phương thức thanh toán --</option>
                            <option value="one">Tiền mặt</option>
                            <option value="two">Chuyển khoản</option>
                        </select>
                        <button className={cx('btn-pro5')} onClick={handleAddTicket}>Đặt vé</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manager