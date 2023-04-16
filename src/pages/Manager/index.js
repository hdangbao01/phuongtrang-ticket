import classNames from 'classnames/bind'
import styles from './Manager.module.css'
import { IoTicketOutline, IoBusOutline } from "react-icons/io5";
import { BiTrip, BiUser } from "react-icons/bi";
import { useEffect, useState, useRef } from 'react'
import Ticket from './Ticket';
import Bus from './Bus';
import Trip from './Trip';
import Employee from './Employee';

const cx = classNames.bind(styles)

function Manager() {
    const user = localStorage.getItem("user");

    const [menuTicket, setMenuTicket] = useState(true)
    const [menuBus, setMenuBus] = useState(false)
    const [menuTrip, setMenuTrip] = useState(false)
    const [menuEmployee, setMenuEmployee] = useState(false)

    const ticketRef = useRef()
    const busRef = useRef()
    const tripRef = useRef()
    const employeeRef = useRef()

    useEffect(() => {
        const handleMenuTicket = () => {
            setMenuTicket(true)
            setMenuBus(false)
            setMenuTrip(false)
            setMenuEmployee(false)
        }

        const handleMenuBus = () => {
            setMenuTicket(false)
            setMenuBus(true)
            setMenuTrip(false)
            setMenuEmployee(false)
        }

        const handleMenuTrip = () => {
            setMenuTicket(false)
            setMenuBus(false)
            setMenuTrip(true)
            setMenuEmployee(false)
        }

        const handleMenuEmployee = () => {
            setMenuTicket(false)
            setMenuBus(false)
            setMenuTrip(false)
            setMenuEmployee(true)
        }

        ticketRef.current.addEventListener('click', handleMenuTicket)
        busRef.current.addEventListener('click', handleMenuBus)
        tripRef.current.addEventListener('click', handleMenuTrip)
        employeeRef.current.addEventListener('click', handleMenuEmployee)
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
                            <IoBusOutline className={cx('manager-icon')} />Quản lý xe khách
                        </li>
                        <li ref={tripRef} className={cx('manager-item', (menuTrip && 'active'))}>
                            <BiTrip className={cx('manager-icon')} />Quản lý chuyến xe
                        </li>
                        <li ref={employeeRef} className={cx('manager-item', (menuEmployee && 'active'))}>
                            <BiUser className={cx('manager-icon')} />Quản lý nhân viên
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cx('mana')}>
                <div className={cx('contact-info1')}>
                    {user ? <div>
                        {menuTicket && <Ticket />}
                        {menuBus && <Bus />}
                        {menuTrip && <Trip />}
                        {menuEmployee && <Employee />}
                    </div> : <div>Vui lòng đăng nhập để quản lý</div>}
                </div>
            </div>
        </div>
    )
}

export default Manager