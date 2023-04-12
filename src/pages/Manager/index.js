import classNames from 'classnames/bind'
import styles from './Manager.module.css'
import { IoTicketOutline, IoBusOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from 'react'
import Ticket from './Ticket';
import Bus from './Bus';

const cx = classNames.bind(styles)

function Manager() {
    const [menuTicket, setMenuTicket] = useState(true)
    const [menuBus, setMenuBus] = useState(false)

    const ticketRef = useRef()
    const busRef = useRef()

    useEffect(() => {
        const handleMenuTicket = () => {
            setMenuTicket(true)
            setMenuBus(false)
        }
    
        const handleMenuBus = () => {
            setMenuTicket(false)
            setMenuBus(true)
        }    

        ticketRef.current.addEventListener('click', handleMenuTicket)
        busRef.current.addEventListener('click', handleMenuBus)        
    }, [])

    return (
        <div className={cx('content-pro5')}>
            <div className={cx('infor')}>
                <div className={cx('left-info')}>
                    <ul className={cx('manager-list')}>
                        <li className={cx('manager-item')}>
                            DANH MỤC
                        </li>
                        <li ref={ticketRef} className={cx('manager-item', (menuTicket && 'active'))}>
                            <IoTicketOutline className={cx('manager-icon')} />Quản lý vé xe
                        </li>
                        <li ref={busRef} className={cx('manager-item', (menuBus && 'active'))}>
                            <IoBusOutline className={cx('manager-icon')} />Tất cả xe khách
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cx('mana')}>
                <div className={cx('contact-info1')}>                    
                    {menuTicket && <Ticket />}
                    {menuBus && <Bus />}
                </div>
            </div>
        </div>
    )
}

export default Manager