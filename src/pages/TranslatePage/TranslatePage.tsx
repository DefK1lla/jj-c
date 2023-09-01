import React, { FC, useState, useEffect } from 'react'
import cn from "classnames"
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { serialize, split, Slice} from '../../shared/helpers/serialize';
import { Button } from '../../components/Button/Button';
import { Pagination } from '../../components/Pagination/Pagination';
import { fileGet, translateSet, fileDelete } from '../../shared/api/routs/file';
import { getUser } from '../../shared/api/routs/user';
import { newFileRequest } from '../../store/slice/fileSlice';
import { IAuth } from '../../shared/types/user';
import { Link } from 'react-router-dom';

import s from './translate.module.scss';

interface ICell {
  value: any
  setIsHides: React.Dispatch<React.SetStateAction<boolean[][]>>
  index: number
  subIndex: number
  cellKey: string
  isHides: boolean[][]
  author: any
  item: any
}

interface IAuthor {
  item: Slice
  items: any
  itemsKey: string
  author: string

}

const Cell: FC<ICell> = ({ value, setIsHides, index, subIndex, cellKey, isHides, author, item}) => {
  const [button, setButton] = useState<"See" | "Back">("See")
  if(cellKey === "author" && Array.isArray(value)) {
    return value.find((elm)=>{
      if(elm.__isAuthorElement === "__isAuthorElement") return null
    })
  }
  const onClickInputButton = () => {
    setIsHides(prevIsHides => {
        return prevIsHides.map((itemH, indexH) => {
          if(indexH === index) {
            return itemH.map((subItemH, subIndexH) => {
              if (subIndex === subIndexH) {
                return subItemH = !subItemH 
              } else {
                return subItemH
              }
            })
          } else {
            return itemH
          }
        })
        
      })
      setButton((btn) => {
        return btn === "See" ? "Back" : "See"
      })
  };  

  let inputValue: any = "";
  function onInputChange(event: any) {
    
    if ( author  === "Unauthorized") {
      return null
    }
    
    const data = event.target.value.includes("||") ? event.target.value.split("||") : event.target.value
    const key = event.target.name
    
    if (typeof item.author === "undefined") {
      item.setAuthor(author.id, author.username, data, key, 0)
    } else if (!item.author.find((value: any) => {
      return value.name === author.username
    })) {

      item.setAuthor(author.id, author.username, data, key, 0)
    } else {

      item.setDataByAuthorId(author.id, data, key)
    }
    inputValue = data
  }
  
  return(<>
  <div key={`${cellKey}_${Math.random()}`} className={s.translate_elements}>
    <textarea rows={3} name={cellKey} onChange={onInputChange} className={s.element_input}></textarea>
    <Button onClick={onClickInputButton}>{button}</Button>
  </div>
  
  <div className={isHides[index]?.[subIndex] ? s.hide : s.authors}>
    <div className={s.authors_title}>Version of translation:</div>
    {
      item.author?.map((items: any) => {
        return <Author item={item} items={items} itemsKey={cellKey} author={author?.id}/>
      })
    }
  </div>
  </>
  )
}

const Author: FC<IAuthor> = ({ item, items, itemsKey, author }) => {
  const [score, setScore] = useState<number | null>(items[itemsKey + "__score__"])
  function plus() {
    setScore(item.setScoreByAuthorId(items.id, "+", itemsKey, author))

  }
  function minus() {
    setScore(item.setScoreByAuthorId(items.id, "-", itemsKey, author))
    
  }

  if (items[itemsKey]) {
    const text = Array.isArray(items[itemsKey]) ? items[itemsKey].join("||") : items[itemsKey]
    return (
      <div className={s.author_container}>
        <div className={s.author_text}>
          {text}
        </div>
        <div className={s.score_container}>
          <div className={s.score}>{score}</div>
          <button onClick={plus} className={s.plus}>+</button>
          <button  onClick={minus} className={s.minus}>-</button>
        </div>
        <div className={s.author_name}>
          {items.name}
        </div>
      </div>
    )
  } else {
    return null
  }
}

export const TranslatePage = () => {
  const id = window.location.search.slice(1).split("=")[1];
  const ELEMENT_COUNT = 10;
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { file } = useAppSelector(
    state => state.file
  )

  const [author, setAuthor] = useState<IAuth | any>()

  async function getAuthor() {
    setAuthor((await getUser()).data)
  }

  const getFile = async () => {
    try {
      const data = await fileGet({ id: id })
      dispatch(newFileRequest({ file: data.data}))
    } catch (e) {
      console.error(e)
    }
  }
  
  const serialized = serialize(JSON.parse(
    typeof(file.data.translate) === "string" ? file.data.translate! : "{}"
  ));
  const original: any[] = split(JSON.parse(
    typeof(file.data.data!) === "string" ? file.data.data : "{}"
  ));
  const translate: any[] = serialized.split();

  const [selectedPage, setSelectedPage] = useState(0);
  const page: number = Math.ceil(translate.length / ELEMENT_COUNT);
  const pages: number[] = Array.from({length: page}, (v, i) => i);
  
  const sliced = translate.slice(0 + (selectedPage * ELEMENT_COUNT), ELEMENT_COUNT + (selectedPage * ELEMENT_COUNT));
  const objCounts = sliced.map(item => Object.keys(item).length);

	const isHidesArr:boolean[][] = objCounts.map(count => new Array(count).fill(true));

	const [isHides, setIsHides] = useState<boolean[][]>([]);
  const [isSearchPopupVisible, setIsSearchPopupVisible] = useState(false);
  const [refresh, setRefersh] = useState(false)
  const [isDownloadPopupVisible, setIsDownloadPopupVisible] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  function downloadOnClick() {
    setIsDownloadPopupVisible(!isDownloadPopupVisible);
  }
  
  function handleChange (e: any) {
    if (e.target.id === "name") {
      setIsInputVisible(true);
    } else if (e.target.id === "score") {
      setIsInputVisible(false)
    }
  }

  function downloadPopup(e: any) {
    e.preventDefault()
    if (e.target.name === "name") {
      serialized.export("name", e.target.name[1].value);
    } else {
      serialized.export('score');
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(serialized, null, 4));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${file.data.name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    setRefersh( item => !item);
  }
  
  function findByKeyValue(array: any[], key?: string, value?: string) {
    for (let i = 0; i < array.length; i++) {
      let obj = array[i];
      if (key) {
        if (obj[key] == value && obj.hasOwnProperty(key)) {
          return i
        }
      }
    }
    for (let i = 0; i < array.length; i++) {
      let obj = array[i];
      if (obj.hasOwnProperty(key)) {
        return i
      } else {
        return -1
      }
    }
  }

  function saveOnClick() {
    const json = serialized.json();
    const data = {
      id: id,
      translate: json
    }
    translateSet(data)
    
    .finally(() => {
      setRefersh(item => !item)
    })
  }

  function searchOnClick() {
    setIsSearchPopupVisible(!isSearchPopupVisible);
  }
  function closePopupOnClick() {
    setIsSearchPopupVisible(!isSearchPopupVisible);
  }

  function deleteOnClick() {
    fileDelete({id: id})
    navigate('/')

  }

  function onSubmit(e: any) {
    e.preventDefault();
    const key = e.target.key.value;
    const value = e.target.value.value;

    const page = findByKeyValue(original, key, value);
    if (page !== -1 && typeof page === "number") {
      setSelectedPage(Math.ceil(page/ELEMENT_COUNT) - 1);
      setIsSearchPopupVisible(!isSearchPopupVisible)
    } else {
      alert("Not found");
      setIsSearchPopupVisible(!isSearchPopupVisible)
    }
  }

  useEffect(() => {

    if (isHides.length === 0) {
      setIsHides(isHidesArr)
    }
    getAuthor()
    getFile()
  }, [file.request, refresh])
  return (
	<>
		<div className={s.search_button}>
      <button className={s.search} onClick={searchOnClick}>search</button>
      <div className={isSearchPopupVisible ? s.popup_container : s.hide}>
    <div className={s.popup}>
      <div className={s.close_popup}>
        <button className={s.button_popup} onClick={closePopupOnClick}>
          X
        </button>
      </div>
      <div className={s.popup_body}>
        <h2 className={s.popup_title}>Search</h2>
        <form onSubmit={onSubmit}>
          <div className={s.input1}>
          <label className={s.popup_label} htmlFor='key'>Key</label>
          <input type='text' name="key" id="key" />
          </div>
          <div className={s.input2}>
          <label className={s.popup_label} htmlFor='value'>Value</label>
          <input type='text' name="value" id='value' />
          </div>
          <button>Find</button>
        </form>
      </div>
    </div>
      </div>
      </div>
		<div className={s.head_back}>
			<div className={s.head_text}>
				{`${file.data.name}.json`}
			</div>
      <Link to={`/file?id=${file.data.folder_id}`}>
			  <button className={s.back_button}>Back</button>
      </Link>
			</div>
      <div className={s.save_and_download_container}>
      <div className={s.backgraund_element}></div>
        <div className={s.save_and_download}>
          <button onClick={saveOnClick} className={s.save}>Save</button>
          {
            author?.admin ?
            <button onClick={deleteOnClick} className={s.delete}>Delete</button> :
            null
          }
          <button onClick={downloadOnClick} className={s.download}>Download</button>
          <div className={isDownloadPopupVisible ? s.download_popup : s.hide}>
            <div className={s.popup}>
              <div className={s.close_popup}>
                <button onClick={downloadOnClick} className={s.button_popup}>
                  X
                </button>
              </div>
              <h2 className={s.popup_title}>Download json</h2>
              <form onSubmit={downloadPopup} onChange={handleChange}>
                <div>
                  <label htmlFor='score'>By score</label>
                  <input type={'radio'} id="score" name='radio' required />
                </div>
                <div>
                  <label htmlFor='name'>By name</label>
                  <input type={'radio'} id="name" name='radio'/>
                </div>
                {
                  isInputVisible ? 
                  <input type='text' name='name'></input> : 
                  null
                }
                <button>Download</button>
              </form>
            </div>
          </div>
        </div>
      </div>
		<div className={s.container}>
		  <div className={s.original}>
			{
			  original.slice(0 + (selectedPage * ELEMENT_COUNT), ELEMENT_COUNT + (selectedPage * ELEMENT_COUNT)).map((item, index: number) => {
				const elements = Object.entries(item)
				.filter(([key, value]) => typeof value !== "function" )
				.map(([key, value], subIndex: number) => {
          const val = Array.isArray(item[key]) ? item[key].join("||") : item[key]
          const htmlId = Math.random().toString(16).slice(2)
          return ( 
          <div key={htmlId}>
            <div className={s.element_container} >
              <div className={s.element_name}>{key}:</div>
              <textarea rows={3} className={cn(s.element_input, s.element_textarea)} value={val} readOnly={true}></textarea>
            </div>
            <div className={isHides?.[index]?.[subIndex] ? s.hide : s.empty_div}>
            </div>
					</div>
				  )
				})
        const htmlId = Math.random().toString(16).slice(2)
				return (
				  <div key={htmlId} className={s.original_container}>
					{
					  elements.map((item: any) => item)
					}
				  </div>
				)
			  })
			}
		  </div>
		  
		  <div className={s.translate}>
			{
			  translate.slice(0 + (selectedPage * ELEMENT_COUNT), ELEMENT_COUNT + (selectedPage * ELEMENT_COUNT)).map((item: Slice, index: number) => {
				const elements = Object.entries(item)
				.filter(([key, value]) =>  typeof value !== "function" )
				.map(([key, value], subIndex) => {
          const htmlId = Math.random().toString(16).slice(2)
          return <Cell value={value} setIsHides={setIsHides} index={index} subIndex={subIndex} cellKey={key} isHides={isHides} author={author} item={item} />
				})
        const htmlId = Math.random().toString(16).slice(2)
				return(
          
				  <div key={htmlId} className={s.translate_container}>
					  {
						elements.map((item: any) => item)
					  }
				  </div>
				)
			  })
			}
		  </div>
		</div>
		<div className={s.pagination}>
		  <Pagination page={selectedPage} pages={pages} setSelectedPage={setSelectedPage} elementCount={ELEMENT_COUNT}/>
		</div>
	</>
  )
}
