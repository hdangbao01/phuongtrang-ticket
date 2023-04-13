import classNames from 'classnames/bind'
import styles from './Trip.module.css'
import { IoHome } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Trip() {
    const [trip, setTrip] = useState('')
    const [busId, setBusId] = useState('')
    const [startPoint, setStartPoint] = useState('')
    const [endPoint, setEndPoint] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [tripdlt, setTripdlt] = useState('')
    const [listTrip, setListTrip] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/trip`)
            .then((res) => res.json())
            .then((res) => {
                setListTrip(res)
            })
    }, [])

    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trip)
        }

        if (trip) {
            fetch(`http://localhost:3000/trip`, options)
                .then((res) => res.json())
                .then(() => {
                    alert("Thêm chuyến thành công")
                    window.location = "/manager"
                })
        }
    }, [trip])

    useEffect(() => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (tripdlt) {
            fetch('http://localhost:3000/trip/' + tripdlt, options)
                .then((res) => res.json())
                .then(() => {
                    alert(`Xoá chuyến ${tripdlt} thành công`)
                    window.location = "/manager"
                })
        }
    }, [tripdlt])

    const handleAddBus = () => {
        setTrip({
            BusId: busId,
            StartPoint: startPoint,
            StartDate: startDate,
            EndPoint: endPoint,
            EndDate: endDate
        })
    }

    return (
        <div>
            <p className={cx('contact-header')}><IoHome className={cx('contact-icon')} /> <GrFormNext /> Quản lý chuyến xe</p>
            <div className={cx('block')}>
                <input className={cx('input-info')} placeholder="Mã xe khách.."
                    value={busId} onChange={e => { setBusId(e.target.value) }}
                />
            </div>
            <div className={cx('block')}>
                <input className={cx('input-info')} placeholder="Điểm đón..."
                    value={startPoint} onChange={e => { setStartPoint(e.target.value) }}
                />
                <input className={cx('input-info')} placeholder="Điểm đến..."
                    value={endPoint} onChange={e => { setEndPoint(e.target.value) }}
                />
            </div>
            <div className={cx('block')}>
                <input className={cx('input-info')} placeholder="Thời gian đón..."
                    value={startDate} onChange={e => { setStartDate(e.target.value) }}
                />
                <input className={cx('input-info')} placeholder="Thời gian đến..."
                    value={endDate} onChange={e => { setEndDate(e.target.value) }}
                />
            </div>
            <div className={cx('block')}>
                <button className={cx('btn-pro5')} onClick={handleAddBus}>Thêm chuyến</button>
            </div>
            <h3 className={cx('table-title')}>Tất cả chuyến xe</h3>
            <div className={cx('table-ticket')}>
                <ul className={cx('table-list')}>
                    <li className={cx('table-item')}>Mã chuyến</li>
                    <li className={cx('table-item')}>Mã xe</li>
                    <li className={cx('table-item')}>Điểm đón</li>
                    <li className={cx('table-item')}>Điểm đến</li>
                    <li className={cx('table-item')}>Thời gian đón</li>
                    <li className={cx('table-item')}>Thời gian đến</li>
                    <li className={cx('table-item')}>Thao tác</li>
                </ul>
                {listTrip.map(itemTrip => (
                    <ul className={cx('table-list')} key={itemTrip.id}>
                        <li className={cx('table-item')}>{itemTrip.id}</li>
                        <li className={cx('table-item')}>{itemTrip.BusId}</li>
                        <li className={cx('table-item')}>{itemTrip.StartPoint}</li>
                        <li className={cx('table-item')}>{itemTrip.EndPoint}</li>
                        <li className={cx('table-item')}>{itemTrip.StartDate}</li>
                        <li className={cx('table-item')}>{itemTrip.EndDate}</li>
                        <li className={cx('table-item')}>
                            <button className={cx('btn-delete')} onClick={() => setTripdlt(itemTrip.id)}>Xoá</button>
                        </li>
                    </ul>
                ))}
            </div>
            <p className={cx('p')}>.</p>
        </div>
    )
}

export default Trip