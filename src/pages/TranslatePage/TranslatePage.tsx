import React, { FC, useState, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { serialize, split, Slice} from '../../shared/helpers/serialize';
import { Button } from '../../components/Button/Button';
import { Pagination } from '../../components/Pagination/Pagination';
import { fileGet, translateSet } from '../../shared/api/routs/file';
import { getUser } from '../../shared/api/routs/user';
import { newFileRequest } from '../../store/slice/fileSlice';
import cn from "classnames"

import s from './translate.module.scss';
import { IAuth } from '../../shared/types/user';
import { Link } from 'react-router-dom';

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
      console.log(item.author)
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
        return <Author item={item} items={items} itemsKey={cellKey} />
      })
    }
  </div>
  </>
  )
}

const Author: FC<IAuthor> = ({ item, items, itemsKey }) => {
  const [score, setScore] = useState<number | null>(items[itemsKey + "__score__"])
  function plus() {
    setScore(item.setScoreByAuthorId(items.id, "+", itemsKey))

  }
  function minus() {
    setScore(item.setScoreByAuthorId(items.id, "-", itemsKey))
    
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
  const [refresh, setRefersh] = useState(false)

  
  function downloadOnClick() {
    serialized.export("score");

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(serialized, null, 4));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${file.data.name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    setRefersh( item => !item);
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

  useEffect(() => {

    if (isHides.length === 0) {
      setIsHides(isHidesArr)
    }
    getAuthor()
    getFile()
    
  }, [file.request, refresh])
  return (
	<>
		<div className={s.search_button}><button className={s.search}>search</button></div>
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
          <button onClick={downloadOnClick} className={s.download}>Download</button>
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
          return ( 
          <>
            <div key={`${item.__id}_${key}_${index}`} className={s.element_container} >
              <div className={s.element_name}>{key}:</div>
              <textarea rows={3} className={cn(s.element_input, s.element_textarea)} value={val} readOnly={true}></textarea>
            </div>
            <div className={isHides?.[index]?.[subIndex] ? s.hide : s.empty_div}>
            </div>
					</>
				  )
				})
				return (
				  <div className={s.original_container}>
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
          return <Cell value={value} setIsHides={setIsHides} index={index} subIndex={subIndex} cellKey={key} isHides={isHides} author={author} item={item} />
				})
				return(
				  <div className={s.translate_container}>
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
