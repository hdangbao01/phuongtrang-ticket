import { useRef, useEffect } from "react";
import jSuites from "jsuites";
import "jsuites/dist/jsuites.css"
import classNames from 'classnames/bind'
import styles from './Calendar.module.css'

const cx = classNames.bind(styles)

export default function Calendar({ options }) {
    const caledarRef = useRef(null)

    useEffect(() => {
        jSuites.calendar(caledarRef.current, options)
    }, [options])

    return <input className={cx('style')} ref={caledarRef} />
}