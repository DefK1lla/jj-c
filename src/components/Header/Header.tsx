import "../../styles/header.scss";

const Header = () => {
//TODO add button display depending on the router
    return (
        <div className="container">
            <div className="title">
                JACKJSON
            </div>
            <div className="description">
                The .json translate tool | alpha
            </div>
        </div>
    )
}

export default Header