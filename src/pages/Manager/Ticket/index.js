import classNames from 'classnames/bind'
import styles from './Ticket.module.css'
import { IoHome } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Ticket() {
    const [ticket, setTicket] = useState({})
    const [listTicket, setListTicket] = useState([])
    const [listTrip, setListTrip] = useState([])
    const [listBus, setListBus] = useState([])
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [pay, setPay] = useState('')
    const [trip, setTrip] = useState('')
    const [seat, setSeat] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3000/ticket`)
            .then((res) => res.json())
            .then((res) => {
                setListTicket(res)
            })

        fetch(`http://localhost:3000/trip`)
            .then((res) => res.json())
            .then((res) => {
                setListTrip(res)
            })

        fetch(`http://localhost:3000/bus`)
            .then((res) => res.json())
            .then((res) => {
                setListBus(res)
            })
    }, [])

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

    const handleSeclectTrip = (e) => {
        setTrip(e.target.value)
    }   

    useEffect(() => {
        const curSeat = listBus.find(itemBus => {
            return itemBus.id == trip
        })
        console.log(curSeat)

        setSeat(curSeat)
        console.log(seat)
    }, [trip])

    return (
        <div>
            <p className={cx('contact-header')}><IoHome className={cx('contact-icon')} /> <GrFormNext /> Quản lý vé xe</p>
            <div className={cx('block-trip')}>
                {listTrip.map(itemTrip => (
                    <p className={cx('trip')} key={itemTrip.BusId}><span>* Chuyến {itemTrip.id}:</span><br />
                        - Địa điểm đón: {itemTrip.StartPoint}<br />
                        - Địa điểm đến: {itemTrip.StartDate}<br />
                        - Giờ xuất phát: {itemTrip.EndPoint}<br />
                        - Giờ đến: {itemTrip.EndDate}<br />
                    </p>
                ))}
            </div>
            <div className={cx('block')}>
                <input className={cx('input-info')} placeholder="Họ tên.." value={name} onChange={e => { setName(e.target.value) }} />
                <input className={cx('input-info')} placeholder="Điện thoại..." value={phone} onChange={e => { setPhone(e.target.value) }} />
            </div>
            <div className={cx('block')}>
                <select className={cx('input-info')} value={trip} onChange={e => handleSeclectTrip(e)}>
                    <option value=''>-- Chọn chuyến xe --</option>
                    {listTrip.map(itemTrip => (
                        <option key={itemTrip.BusId} value={itemTrip.BusId}>{itemTrip.StartPoint} - {itemTrip.StartDate}</option>
                    ))}
                </select>
                <select className={cx('input-info')}>
                    <option>-- Chọn ghế --</option>
                    {/* {seat.Capacity} */}
                    {trip && <option>1</option>}
                </select>
            </div>
            <div className={cx('block')}>
                <select className={cx('input-info')} value={pay} onChange={e => setPay(e.target.value)}>
                    <option value=''>-- Phương thức thanh toán --</option>
                    <option>Tiền mặt</option>
                    <option>Chuyển khoản</option>
                </select>
                <button className={cx('btn-pro5')} onClick={handleAddTicket}>Thêm vé</button>
            </div>
            <h3 className={cx('table-title')}>Tất cả vé {trip}</h3>
            <div className={cx('table-ticket')}>
                <ul className={cx('table-list')}>
                    <li className={cx('table-item')}>Mã vé</li>
                    <li className={cx('table-item')}>Họ tên</li>
                    <li className={cx('table-item')}>Điện thoại</li>
                    <li className={cx('table-item')}>Chuyến</li>
                    <li className={cx('table-item')}>Số ghế</li>
                    <li className={cx('table-item')}>Thanh toán</li>
                    <li className={cx('table-item')}>Nhân viên tạo</li>
                    <li className={cx('table-item')}>Thao tác</li>
                </ul>
                {listTicket.map(itemTicket => (
                    <ul className={cx('table-list')} key={itemTicket.id}>
                        <li className={cx('table-item')}>{itemTicket.id}</li>
                        <li className={cx('table-item')}>{itemTicket.PassengerName}</li>
                        <li className={cx('table-item')}>{itemTicket.PassengerPhone}</li>
                        <li className={cx('table-item')}>{itemTicket.TripId}</li>
                        <li className={cx('table-item')}>{itemTicket.SeatNumber}</li>
                        <li className={cx('table-item')}>{itemTicket.Payment}</li>
                        <li className={cx('table-item')}>{itemTicket.EmployeeId}</li>
                        <li className={cx('table-item')}>Xoá</li>
                    </ul>
                ))}
            </div>
            <p className={cx('p')}>.</p>
        </div>
    )
}

export default Ticket