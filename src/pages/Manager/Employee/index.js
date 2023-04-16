import classNames from 'classnames/bind'
import styles from './Employee.module.css'
import { IoHome } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)

function Employee() {
    const [employee, setEmployee] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [position, setPosition] = useState('')
    const [salary, setSalary] = useState('')
    const [employeedlt, setEmployeedlt] = useState('')
    const [listEmployee, setListEmployee] = useState([])

    const getListEmployee = () => {
        fetch(`http://127.0.0.1:8000/employee`)
            .then((res) => res.json())
            .then((res) => {
                setListEmployee(res)
            })
    }

    useEffect(() => {
        getListEmployee()
    }, [])

    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        }

        if (employee) {
            fetch(`http://127.0.0.1:8000/employee`, options)
                .then((res) => res.json())
                .then(() => {
                    alert("Thêm nhân viên thành công")
                    getListEmployee()
                })
        }
    }, [employee])

    useEffect(() => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (employeedlt) {
            fetch('http://127.0.0.1:8000/employee/' + employeedlt, options)
                .then((res) => res.json())
                .then(() => {
                    alert(`Xóa nhân viên ${employeedlt} thành công`)
                    getListEmployee()
                })
        }
    }, [employeedlt])

    const handleAddEmployee = () => {
        setEmployee({
            Username: email,
            Password: "123456",
            EmployeeName: name,
            EmployeePhone: Number(phone),
            EmployeePosition: position,
            Salary: Number(salary)
        })
    }

    return (
        <div>
            <p className={cx('contact-header')}><IoHome className={cx('contact-icon')} /> <GrFormNext /> Quản lý nhân viên</p>
            <div className={cx('block')}>
                <input className={cx('input-info')} placeholder="Họ tên.."
                    value={name} onChange={e => { setName(e.target.value) }}
                />
                <input className={cx('input-info')} placeholder="Số điện thoại..."
                    value={phone} onChange={e => { setPhone(e.target.value) }}
                />
            </div>
            <div className={cx('block')}>
                <input className={cx('input-info')} placeholder="Chức vụ.."
                    value={position} onChange={e => { setPosition(e.target.value) }}
                />
                <input className={cx('input-info')} placeholder="Lương..."
                    value={salary} onChange={e => { setSalary(e.target.value) }}
                />
            </div>
            <div className={cx('block')}>
                <input className={cx('input-info')} placeholder="Email..."
                    value={email} onChange={e => { setEmail(e.target.value) }}
                />
                <button className={cx('btn-pro5')} onClick={handleAddEmployee}>Thêm nhân viên</button>
            </div>
            <div className={cx('block')}>

            </div>
            <h3 className={cx('table-title')}>Tất cả nhân viên</h3>
            <div className={cx('table-ticket')}>
                <ul className={cx('table-list')}>
                    <li className={cx('table-item')}>Mã nhân viên</li>
                    <li className={cx('table-item')}>Họ tên</li>
                    <li className={cx('table-item')}>Email</li>
                    <li className={cx('table-item')}>Số điện thoại</li>
                    <li className={cx('table-item')}>Chức vụ</li>
                    <li className={cx('table-item')}>Lương</li>
                    <li className={cx('table-item')}>Thao tác</li>
                </ul>
                {listEmployee.map(itemEmployee => (
                    <ul className={cx('table-list')} key={itemEmployee.id}>
                        <li className={cx('table-item')}>{itemEmployee.id}</li>
                        <li className={cx('table-item')}>{itemEmployee.EmployeeName}</li>
                        <li className={cx('table-item', 'hide-text')}>{String(itemEmployee.Username)}</li>
                        <li className={cx('table-item')}>{itemEmployee.EmployeePhone}</li>
                        <li className={cx('table-item')}>{itemEmployee.EmployeePosition}</li>
                        <li className={cx('table-item')}>{itemEmployee.Salary}$</li>
                        <li className={cx('table-item')}>
                            <button className={cx('btn-delete')} onClick={() => setEmployeedlt(itemEmployee.id)}>Xoá</button>
                        </li>
                    </ul>
                ))}
            </div>
            <p className={cx('p')}>.</p>
        </div>
    )
}

export default Employee