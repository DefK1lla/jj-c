import React, { useState, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { serialize, split, Slice} from '../../shared/helpers/serialize';
import { Button } from '../../components/Button/Button';
import { Pagination } from '../../components/Pagination/Pagination';
import { fileGet, translateSet } from '../../shared/api/routs/file';
import { newFileRequest } from '../../store/slice/fileSlice';
import cn from "classnames"

import s from './translate.module.scss';

export const TranslatePage = () => {
  const id = window.location.search.slice(1).split("=")[1];
  const dispatch = useAppDispatch();
  const author = "Adam";
  const { file } = useAppSelector(
    state => state.file
  )
  
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
  const page: number = Math.ceil(translate.length / 10);
  const pages: number[] = Array.from({length: page}, (v, i) => i);
  
  const sliced = translate.slice(0 + (selectedPage * 10), 10 + (selectedPage * 10));
  const objCounts = sliced.map(item => Object.keys(item).length);
	const buttonSeesArr:string[][] = objCounts.map(count => new Array(count).fill("see"));
	const isHidesArr:boolean[][] = objCounts.map(count => new Array(count).fill(true));
	
	const [buttonSees, setButtonSees] = useState<string[][]>([]);
	const [isHides, setIsHides] = useState<boolean[][]>([]);
 
  const [refresh, setRefersh] = useState(false)

	useEffect(() => {
    if (buttonSees.length === 0) {
      setButtonSees(buttonSeesArr);
    }

    if (isHides.length === 0) {
      setIsHides(isHidesArr)
    }
    getFile()

	}, [file.request, refresh])

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
      window.location.reload();
    })
  }

  function backOnClick() {
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", `/file?id=${file.data.folder_id}`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  return (
	<>
		<div className={s.search_button}><button className={s.search}>search</button></div>
		<div className={s.head_back}>
			<div className={s.head_text}>
				{`${file.data.name}.json`}
			</div>
			<button onClick={backOnClick} className={s.back_button}>Back</button>
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
			  original.slice(0 + (selectedPage * 10), 10 + (selectedPage * 10)).map((item, index: number) => {
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
            <div style={{height: "300px", display: `${  !isHides[index]?.[subIndex] ? "block" : "none"}`} }>
              
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
			  translate.slice(0 + (selectedPage * 10), 10 + (selectedPage * 10)).map((item: Slice, index: number) => {
				const id = Math.random().toString()
			  
				const elements = Object.entries(item)
				.filter(([key, value]) =>  typeof value !== "function" )
				.map(([key, value], subIndex) => {
          if(key === "author" && Array.isArray(value)) {
            return value.find((elm)=>{
              console.log(elm.__isAuthorElement)
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
            setButtonSees((prev) => {
              return prev.map((itemB, indexB) =>{
                if(indexB == index) {
                  return itemB.map((subItemB, subIndexB) => {
                    if(subIndex === subIndexB) {
                      return subItemB === "see" ? "back" : "see";
                    } else {
                      return subItemB
                    }
                  })
                } else {
                  return itemB
                }
              })
            });
          };  
          let inputValue: any = "";
          function onInputChange(event: any) {
            const data = event.target.value.includes("||") ? event.target.value.split("||") : event.target.value
            
            if (typeof item.author === "undefined") {
              item.setAuthor("123", author, data, key, 0)
            } else if (item.author.find((value: any) => {
              return value.name !== author 
            })) {
              item.setAuthor("123", author, data, key, 0)
            } else {
              item.setDataByAuthorId("123", data, key)
            }
            inputValue = item.author?.find((value: any) => {
              return value.name === author ? value.data : data
            })
          }
          
				  return(<>
					<div key={`${key}_${Math.random()}`} id={id} className={s.translate_elements}>
					  <textarea rows={3} onChange={onInputChange} id={id} className={s.element_input} value={inputValue.data}></textarea>
					  <Button onClick={onClickInputButton}>{buttonSees[index]?.[subIndex]}</Button>
					</div>
          
					<div className={isHides[index]?.[subIndex] ? s.hide : s.authors}>
					  <div className={s.authors_title}>Version of translation:</div>
					  {
						  item.author?.map((items: any) => {
                if (items[key]) {
                  
                  return (
                    <div className={s.author_container}>
                      <div className={s.author_text}>
                        {items[key]}
                      </div>
                      <div className={s.score_container}>
                        <div className={s.score}>{items.score}</div>
                        <button className={s.plus}>+</button>
                        <button className={s.minus}>-</button>
                      </div>
                      <div className={s.author_name}>
                        {items.name}
                      </div>
                    </div>
                  )
                } else {
                  return null
                }
						  })
						}
					</div>
					</>
				  )
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
		  <Pagination page={selectedPage} pages={pages} setSelectedPage={setSelectedPage} />
		</div>
	</>
  )
}
