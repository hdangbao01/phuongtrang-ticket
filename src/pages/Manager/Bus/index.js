import classNames from 'classnames/bind'
import styles from './Bus.module.css'
import { IoHome } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Bus() {
    const [bus, setBus] = useState('')
    const [brand, setBrand] = useState('')
    const [seatNumber, setSeatNumber] = useState('')
    const [type, setType] = useState('')
    const [busdlt, setBusdlt] = useState('')
    const [listBus, setListBus] = useState([])
    const sv = localStorage.getItem("sv")

    const getListBus = () => {
        fetch(`http://127.0.0.1:800${sv}/bus`)
            .then((res) => res.json())
            .then((res) => {
                setListBus(res)
            })
    }

    useEffect(() => {
        getListBus()
    }, [])

    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bus)
        }

        if (bus) {
            fetch(`http://127.0.0.1:800${sv}/bus`, options)
                .then((res) => res.json())
                .then(() => {
                    alert("Them xe thanh cong")
                    getListBus()
                })
        }
    }, [bus])

    useEffect(() => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (busdlt) {
            fetch(`http://127.0.0.1:800${sv}/bus/` + busdlt, options)
                .then((res) => res.json())
                .then(() => {
                    alert(`Xoa ve ${busdlt} thanh cong`)
                    getListBus()
                })
        }
    }, [busdlt])

    const handleAddBus = () => {
        setBus({
            Brand: brand,
            Type: type,
            Capacity: seatNumber
        })
    }

    return (
        <div>
            <p className={cx('contact-header')}><IoHome className={cx('contact-icon')} /> <GrFormNext /> Quản lý xe khách</p>
            <div className={cx('block')}>
                <input className={cx('input-info')} placeholder="Thương hiệu xe.."
                    value={brand} onChange={e => { setBrand(e.target.value) }}
                />
                <input className={cx('input-info')} placeholder="Số ghế..."
                    value={seatNumber} onChange={e => { setSeatNumber(e.target.value) }}
                />
            </div>
            <div className={cx('block')}>
                <input className={cx('input-info')} placeholder="Loại xe..."
                    value={type} onChange={e => { setType(e.target.value) }}
                />
                <button className={cx('btn-pro5')} onClick={handleAddBus}>Thêm xe</button>
            </div>
            <div className={cx('block')}>

            </div>
            <h3 className={cx('table-title')}>Tất cả xe khách</h3>
            <div className={cx('table-ticket')}>
                <ul className={cx('table-list')}>
                    <li className={cx('table-item')}>Mã xe</li>
                    <li className={cx('table-item')}>Thương hiệu</li>
                    <li className={cx('table-item')}>Loại</li>
                    <li className={cx('table-item')}>Số ghế</li>
                    <li className={cx('table-item')}>Thao tác</li>
                </ul>
                {listBus.map(itemBus => (
                    <ul className={cx('table-list')} key={itemBus.id}>
                        <li className={cx('table-item')}>{itemBus.id}</li>
                        <li className={cx('table-item')}>{itemBus.Brand}</li>
                        <li className={cx('table-item')}>{itemBus.Type}</li>
                        <li className={cx('table-item')}>{itemBus.Capacity}</li>
                        <li className={cx('table-item')}>
                            <button className={cx('btn-delete')} onClick={() => setBusdlt(itemBus.id)}>Xoá</button>
                        </li>
                    </ul>
                ))}
            </div>
            <p className={cx('p')}>.</p>
        </div>
    )
}

export default Bus