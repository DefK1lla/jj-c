import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { Avatar } from "../Avatar/Avatar";
import { GameFileName } from "../GameFileName/GameFileName";
import { Button } from "../Button/Button";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { gameSet, gameDelete} from "../../shared/api/routs/game";
import { folderSet, folderDelete } from "../../shared/api/routs/folder";
import { fileSet, newFilesGet, filesByAuthorIdGet } from "../../shared/api/routs/file";
import { getUser } from '../../shared/api/routs/user';
import { IAuth } from "../../shared/types/user";
import { path } from "../../shared/constants/paths";
import { IFilesByAuthorId, INewFile } from "../../shared/types/file";
import { serialize } from "../../shared/helpers/serialize";
import { setUser } from "../../store/slice/userSlice";
import { useAppSelector, useAppDispatch } from "../../shared/hooks/redux";

import s from "./menu.module.scss";


interface Menu {
    buttonType: "CREATE GAME" | "CREATE FOLDER" | "UPLOAD .JSON"
    haveProgressBarr?: boolean
}

interface IProgress {
    name: string
    local: string
    percent: number
}   

export const Menu: FC<Menu> = ({ buttonType, haveProgressBarr }) => {
    let label: string;
    if(buttonType === "UPLOAD .JSON") {
        label = "file";
    } else {
        label = "img"
    }
    const { id , username, admin } = useAppSelector(
        state => state.user
    )

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const windowId = window.location.search.slice(1).split("=")[1];
    const [author, setAuthor] = useState<IAuth | any>();
    const [isVisible, setIsVisible] = useState(false)
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [newFiles, setNewFiles] = useState<INewFile[]>()
    const [progresses, setProgresses] = useState<IProgress[]>([])
    const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false)

    async function getAuthor() {
        getUser()
        .then((item) => {
            setAuthor(item.data)
            dispatch(setUser({ id: item.data.id!, username: item.data.username!, admin: item.data.admin!}))
            newFilesGet({ id: item.data.id! })
            .then((files) => {
                setNewFiles(files.data);
            })

            filesByAuthorIdGet({ id: item.data.id! })
            .then((files) => {
                setProgresses(makeProgress(files.data as IFilesByAuthorId[]))
            })
        })
    }

    function formElements() {
        return (
            <>
                <div className={s.popup_input}>
                    <label className={s.popup_label} htmlFor="name">name</label>
                    <input type={"text"} name="name" id="name"required />
                </div>
                {
                    buttonType === "UPLOAD .JSON" ? (
                        <div className={s.popup_radio}>
                            <div className={s.recent_json_title}>Select a language</div>
                            <input type={'radio'} id="lah" name={"radio"} value={"lah"} required />
                            <label htmlFor="lah">Latvian</label>
                            <br/>
                            <input type={"radio"} id ="lit" name={"radio"} value={"lit"} />
                            <label htmlFor="lit">Lithuanian</label>
                            <br/>
                            <input type={"radio"} id="est" name={"radio"} value={"est"} />
                            <label htmlFor="est">Estonian</label>
                        </div> ) : null
                }
                <div className={s.popup_input}>
                    <label className={s.popup_label} htmlFor="file">{label}</label>
                    <input className={s.input} type={"file"} name={label} required id="file"/>
                    {
                        typeof message === "undefined" ? null : <div className={s.warn}>{message}</div>
                    }
                </div>
                <input className={s.popup_submit} type={"submit"} value={"SAVE"}/>
            </>
        )
    }

    function makeProgress(files: IFilesByAuthorId[]) {
        const filesArr = files.map((file) => {
            const translate = JSON.parse(file.translate);
            const slices = serialize(translate).split()
            const total = slices.length;
            const done = slices.reduce((accumulator, item, index, array) => {
                if (Array.isArray(item.author)) {
                    return ++accumulator
                } else {
                    return accumulator
                }
            }, 0)
            return {
                name: file.name,
                local: file.local,
                percent: Math.trunc((done / total) * 100)
            }
        })
        return filesArr
    }

    function onClickButton() {
        if (author?.id === undefined) {
            alert("Unauthorized")
            setTimeout(() => {
                window.location.href = path.REGISTRATION_ROUTE
            }, 500)
            return null
        }
         setIsVisible(!isVisible);
    }

    function setGame(event: any, subEvent: ProgressEvent<FileReader>) {
        const base64 = subEvent.target?.result;

        const json = {
            name: event.target.name.value,
            author_id: author.id,
            img: base64
        }
        
        gameSet(json)

        .finally(() => {
            window.location.reload()
        })

    }

    function setFolder(event: any, subEvent: ProgressEvent<FileReader>) {
        const base64 = subEvent.target?.result;
        


        const json = {
            name: event.target.name.value,
            game_id: windowId,
            img: base64
        }

        folderSet(json)

        .finally(() => {
            window.location.reload()
        })
    }

    function setFile(event: any, reader: FileReader) {
        try {
            if (typeof reader.result === "string"){
                JSON.parse(reader.result)
                setMessage(undefined);
            const json = {
                name: event.target.name.value,
                local: event.target.radio.value,
                data: reader.result,
                folder_id: windowId,
                author_id: author.id
            }

            fileSet(json)

            .finally(() => {
                window.location.reload()
            })
        }
        
        } catch (e: any) {
            console.log(e.message)
            setMessage('is not valid json file')
        }
    }

    function deleteOnClick() {
        if (window.location.href.includes(path.FOLDER_ROUTE)) {
            gameDelete({id: windowId})
            navigate(`/`)
        } else 
        if (window.location.href.includes(path.FILE_ROUTE)) {
            folderDelete({id: windowId})
            
            navigate(`/`)
        } else {

        }
    }

    function onSubmit(event: any) {
        event.preventDefault();
        
        const file = (document.getElementById("file") as HTMLInputElement)?.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onload = function(subEvent) {   
                if (buttonType === "CREATE GAME") {

                    setGame(event, subEvent)

                } else if (buttonType === "CREATE FOLDER") {
                    setFolder(event, subEvent)
                }
            }
            reader.readAsDataURL(file)
            
        } else if(file) {
            const reader = new FileReader()
            reader.onload = function(subEvent) {
                setFile(event, reader)
            }
            reader.readAsText(file)
        }        
    }
    
    
    useEffect(() => {
        getAuthor()
        if(admin) {
            if (window.location.pathname === path.HOME_ROUTE ||
                window.location.href.includes(path.GAME_ROUTE)) {
                setIsDeleteVisible(false);
            } else {
                setIsDeleteVisible(true);
            }
        } else {
            setIsDeleteVisible(false);
        }
    }, [message])
    return(
        <div className={s.menu}>
            <Avatar name={author?.username}/>
            {haveProgressBarr ? <div className={s.progress_bar_title}>The Jackbox Party Starter</div> : null }
            <div className={s.progress_bar_container}>
            {progresses ? progresses.map(item => {
                const key = Math.random().toString(16).slice(2);
               return <ProgressBar key={key} percent={item.percent} name={item.name} local={item.local}/>
            }) : null}
            </div>
            <div className={s.recent_json_title}>Recent jsons</div>
            <GameFileName newFiles={newFiles}/>
            <div className={s.button}>
                <Button onClick={onClickButton}>{buttonType}</Button>
                {
                    isDeleteVisible ? <button onClick={deleteOnClick} className={s.delete}>Delete</button> : null
                }
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