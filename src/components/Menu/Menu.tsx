import { FC, useState } from "react";

import { Avatar } from "../Avatar/Avatar";
import { mockFilesUsers } from "../../shared/mockfolder/mock";
import { GameFileName } from "../GameFileName/GameFileName";
import { Button } from "../Button/Button";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { percents } from "../../shared/mockfolder/mock_percents";
import cn from "classnames";

import s from "./menu.module.scss";


interface Menu {
    buttonType: "CREATE GAME" | "CREATE FOLDER" | "UPLOAD .JSON";
    id?: string;
    haveProgressBarr?: boolean;
}

export const Menu: FC<Menu> = ({ buttonType, haveProgressBarr }) => {
    let label: string;
    if(buttonType === "UPLOAD .JSON") {
        label = "file";
    } else {
        label = "img"
    }
    const id = window.location.search.slice(1).split("=")[1];
    const [isVisible, setIsVisible] = useState(false)
    function onClickButton() {
         setIsVisible(!isVisible);
    }

    function formElements() {

        return (
            <>
                <div className={s.popup_input}>
                    <label className={s.popup_label} htmlFor="name">name</label>
                    <input type={"text"} name="name" id="name"required />
                </div>
                <div className={s.popup_input}>
                    <label className={s.popup_label} htmlFor="file">{label}</label>
                    <input className={s.input} type={"file"} name={label} required id="file"/>
                </div>
                <input className={s.popup_submit} onClick={() => {return null}} type={"submit"} value={"SAVE"}/>
            </>
        )
    }

    function onSubmit(event:any) {
        event.preventDefault();
        
        const file = (document.getElementById("file") as HTMLInputElement)?.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(subEvent) {
                const base64 = subEvent.target?.result;
                
                if (buttonType === "CREATE GAME") {
                    const json = JSON.stringify({
                        name: event.target.name.value,
                        author_id: id,
                        img: base64
                    })
                    fetch("http://localhost:7000/game", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: json
                    }).catch((e) => {
                        alert(e.message);
                    }).finally(() => {
                        window.location.reload()
                    }); 
                } else if (buttonType === "CREATE FOLDER") {
                    console.log(id)
                    const json = JSON.stringify({
                        name: event.target.name.value,
                        game_id: id,
                        img: base64
                    })
                    fetch("http://localhost:7000/folder", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: json
                    }).catch((e) => {
                        alert(e.message);
                    }).finally(() => {
                        window.location.reload();
                    }); 
                }
                
            }
            reader.readAsDataURL(file);

        }
        

    }


    return(
        <div className={s.menu}>
            <Avatar name={mockFilesUsers[0].name}/>
            {haveProgressBarr ? <div className={s.progress_bar_title}>The Jackbox Party Starter</div> : null }
            <div className={s.progress_bar_container}>
            {haveProgressBarr ? percents.map(item => {
               return <ProgressBar percent={item.percent} name={item.name} />
            }) : null}

            </div>
            <div className={s.recent_json_title}>Recent jsons</div>
            <GameFileName />
            <div className={s.button}>
                <Button onClick={onClickButton}>{buttonType}</Button>
                <div className={isVisible ? s.popup: s.hide}>
                    <div className={s.popup_container}>
                        <div className={s.close_popup}>
                            <button onClick={onClickButton} className={s.button_popup}>
                                X
                            </button>
                        </div>
                        <div className={s.popup_body}>
                            <h2 className={s.popup_title}>{buttonType}</h2>
                            <form onSubmit={onSubmit}>
                                {formElements()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}