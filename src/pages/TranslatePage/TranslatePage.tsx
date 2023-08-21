import React, { useState, useRef, useEffect, useId } from 'react'

import { serialize, split, Slice} from '../../shared/helpers/serialize';
import { Button } from '../../components/Button/Button';
import { Pagination } from '../../components/Pagination/Pagination';
import { mock_translate } from '../../shared/mockfolder/mock_translate';
import { authors } from '../../shared/mockfolder/mock_authors';

import s from './translate.module.scss';

interface IChangeDiv {
	index: number;
	subIndex: number;
	height?: number;
	isHide: boolean;
}

export const TranslatePage = () => {

  const original: any[] = split(mock_translate);
  const serialized = serialize(mock_translate);
  const translate: any[] = serialized.split();

  const [selectedPage, setSelectedPage] = useState(0);
  const page: number = Math.ceil(translate.length / 10);
  const pages: number[] = Array.from({length: page}, (v, i) => i);
  
	const [changeDiv, setChangeDiv] = useState<IChangeDiv>({index: NaN, subIndex: NaN, height: 0, isHide: true})

  return (
	<>
		<div className={s.search_button}><button className={s.search}>search</button></div>
		<div className={s.head_back}>
			<div className={s.head_text}>
				AsShirtSlogan.json
			</div>
			<button className={s.back_button}>Back</button>
			</div>
		<div className={s.container}>
		  <div className={s.original}>
			{
			  original.slice(0 + (selectedPage * 10), 10 + (selectedPage * 10)).map((item: any, index: number) => {
				const elements = Object.entries(item)
				.filter(([key, value]) => typeof value !== "function" )
				.map(([key, value], subIndex: number) => {
				  const placeholder = typeof(item[key]) === "string" || typeof(item[key]) === "number" ? item[key] : Array.isArray(item[key]) ? item[key].join("||") : item[key].toString(); 
				  const [height, setHeight] = useState<number | undefined>(undefined) 
				  useEffect(() => {
					
					  if(changeDiv.index === index && changeDiv.subIndex === subIndex){
						setHeight(changeDiv.height);
						console.log(changeDiv)
						}
				  }, [changeDiv])
				  return ( <>
					<div key={`${item.__id}_${key}_${index}`} className={s.element_container} >
					  <div className={s.element_name}>{key}:</div>
					  <input type='text' className={s.element_input} value={placeholder} readOnly={true}></input>
					</div>
					<div style={{height: height, display: `${height ? "block" : "none"}`} }>
						
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
				const id = useId();
			  
				const elements = Object.entries(item)
				.filter(([key, value]) => typeof value !== "function")
				.map(([key, value], subIndex) => {
				  const placeholder = typeof(item[key]) === "string" || typeof(item[key]) === "number" ? item[key] : Array.isArray(item[key]) ? item[key].join("||") : item[key].toString(); 
				  const [buttonSee, setButtonSee] = useState<string[]>(new Array(Object.entries(item).length).fill("see"));
				  const [isHide, setIsHide] = useState<boolean>(true);
					const ref = useRef<HTMLDivElement>(null);
				  const onClickInputButton = () => {
						
					setIsHide((prev) => !prev)
					setTimeout(() => {
						setChangeDiv({index: index, subIndex: subIndex, height: ref.current?.clientHeight, isHide: isHide});
					}, 20)
					setButtonSee((prev: string[] ) => {
						return prev.map((item: string, j) =>{
							if(j === subIndex) {
								return item === "see" ? "back" : "see";
							} else {
								
								return item;
							}
						})
						
					});

					
				  };
				  return(<>
					<div key={`${key}_${Math.random()}`} id={id} className={s.translate_elements}>
					  <input id={id} type='text' className={s.element_input} placeholder={placeholder}></input>
					  <Button onClick={onClickInputButton}>{buttonSee[subIndex]}</Button>
					</div>
					<div ref={ref} className={isHide ? s.hide : s.authors}>
					  <div className={s.authors_title}>Version of translation:</div>
					  {
						  authors.map((items: any) => {
							const [score, setScore] = useState(0);
							function onPlusClick() {
							  setScore(score + 1);
							  
							  
							}
							function onMinusClick() {
							  setScore(score - 1);
							  
							  
							}
							return (
							  <div className={s.author_container}>
									<div className={s.author_text}>
										{items.text}
									</div>
									<div className={s.score_container}>
										<div className={s.score}>{score}</div>
										<button className={s.plus} onClick={onPlusClick}>+</button>
										<button className={s.minus} onClick={onMinusClick}>-</button>
									</div>
									<div className={s.author_name}>
										{items.author}
									</div>
							  </div>
							)
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
