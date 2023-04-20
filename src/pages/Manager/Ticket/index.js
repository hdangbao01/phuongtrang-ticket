import classNames from 'classnames/bind'
import styles from './Ticket.module.css'
import { IoHome } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Ticket() {
    const [userLogin, setUserLogin] = useState({})
    const [ticket, setTicket] = useState('')
    const [listTicket, setListTicket] = useState([])
    const [listTrip, setListTrip] = useState([])
    const [listBus, setListBus] = useState([])
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [pay, setPay] = useState('')
    const [trip, setTrip] = useState('')
    const [seat, setSeat] = useState('')
    const [seats, setSeats] = useState('')
    const [seatEmp, setSeatEmp] = useState([])
    const [listSeatEmp, setListSeatEmp] = useState([])
    const [tripArr, setTripArr] = useState([])
    const [ticketdlt, setTicketdlt] = useState('')
    const sv = localStorage.getItem("sv")

    const getListTicket = () => {
        fetch(`http://127.0.0.1:800${sv}/ticket`)
            .then((res) => res.json())
            .then((res) => {
                setListTicket(res)
            })
    }

    useEffect(() => {
        getListTicket()

        fetch(`http://127.0.0.1:800${sv}/employee`)
            .then((res) => res.json())
            .then((res) => {
                setUserLogin(res)
            })

        fetch(`http://127.0.0.1:800${sv}/trip`)
            .then((res) => res.json())
            .then((res) => {
                setListTrip(res)
            })

        fetch(`http://127.0.0.1:800${sv}/bus`)
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

        if (ticket) {
            fetch(`http://127.0.0.1:800${sv}/ticket`, options)
                .then((res) => res.json())
                .then((res) => {
                    alert("Thêm vé thành công")
                    getListTicket()
                })
                .catch((res) => {
                    alert("Thêm vé thất bại")
                })
        }
    }, [ticket])

    useEffect(() => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (ticketdlt) {
            fetch(`http://127.0.0.1:800${sv}/ticket/` + ticketdlt, options)
                .then((res) => res.json())
                .then(() => {
                    alert(`Xoa ve ${ticketdlt} thanh cong`)
                    getListTicket()
                })
        }
    }, [ticketdlt])

    const handleAddTicket = () => {
        const today = new Date()

        const date = today.getDate()
        const month = today.getMonth() + 1
        const year = today.getFullYear()
        const hour = today.getHours()
        const minutes = today.getMinutes()

        setTicket({
            tripId: Number(trip),
            PassengerName: name,
            PassengerPhone: Number(phone),
            SeatNumber: seat,
            Price: 1000.0,
            Payment: pay,
            DateOfPurchase: `${year}-0${month}-${date}T${hour}:${minutes}:00Z`,
            employeeId: Number(userLogin[0].id)
        })
    }

    const handleSeclectTrip = (e) => {
        setTrip(e.target.value)
    }

    useEffect(() => {
        const getTrip = listTrip.find(itemTrip => {
            return itemTrip.id == trip
        })

        const seatCur = listBus.find(itemBus => {
            return itemBus.id == getTrip.busId
        })

        if (seatCur) {
            setSeats(seatCur.Capacity)

            let seatList = []
            const tripCurs = listTicket.filter(itemTicket => {
                return itemTicket.tripId == trip
            })
            tripCurs.forEach((tripCur) => {
                seatList.push(tripCur.SeatNumber)
            })
            setTripArr(seatList);
        }
    }, [trip])

    useEffect(() => {
        let seatEmpty = []
        for (let i = 1; i <= seats; i++) {
            seatEmpty.push(i)
        }
        setSeatEmp(seatEmpty)
    }, [seats])

    useEffect(() => {
        const filteredSeat = seatEmp.filter(itemEmp => !tripArr.includes(itemEmp))
        setListSeatEmp(filteredSeat)
    }, [seatEmp])

    return (
        <div>
            <p className={cx('contact-header')}><IoHome className={cx('contact-icon')} /> <GrFormNext /> Quản lý vé xe</p>
            <div className={cx('block-trip')}>
                {listTrip.map(itemTrip => (
                    <p className={cx('trip')} key={itemTrip.id}><span>* Chuyến {itemTrip.id}:</span><br />
                        - Địa điểm đón: {itemTrip.StartPoint}<br />
                        - Địa điểm đến: {itemTrip.EndPoint}<br />
                        - Ngày khởi hành: {itemTrip.StartDate.slice(8, 10)}-{itemTrip.StartDate.slice(5, 7)}-{itemTrip.StartDate.slice(0, 4)}<br />
                        - Giờ xuất phát: {itemTrip.StartDate.slice(11, 16)}<br />
                        - Giờ đến: {itemTrip.EndDate.slice(11, 16)}
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
                        <option key={itemTrip.id} value={itemTrip.id}>{`Chuyến ${itemTrip.id} (${itemTrip.StartPoint} - ${itemTrip.EndPoint})`}</option>
                    ))}
                </select>
                <select className={cx('input-info')} value={seat} onChange={e => setSeat(Number(e.target.value))}>
                    <option value=''>-- Chọn ghế --</option>
                    {trip &&
                        listSeatEmp.map(itemSeatEmp => (
                            <option key={itemSeatEmp}>{itemSeatEmp}</option>
                        ))}
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
            <h3 className={cx('table-title')}>Tất cả vé</h3>
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
                        <li className={cx('table-item')}>{itemTicket.tripId}</li>
                        <li className={cx('table-item')}>{itemTicket.SeatNumber}</li>
                        <li className={cx('table-item')}>{itemTicket.Payment}</li>
                        <li className={cx('table-item')}>{itemTicket.employeeId}</li>
                        <li className={cx('table-item')}>
                            <button className={cx('btn-delete')} onClick={() => setTicketdlt(itemTicket.id)}>Xoá</button>
                        </li>
                    </ul>
                ))}
            </div>
            <p className={cx('p')}>.</p>
        </div>
    )
}

export default Ticket