import s from "./Header.module.scss"
import "./header.css"

const Header = () => {
//TODO add button display depending on the router
    return (
        <div className={s.container}>
            <div className={s.title}>
                JACKJSON
            </div>
            <div className={s.description}>
                The .json translate tool | alpha
            </div>
        </div>
    )
}

export default Header