import React from 'react'

import { serialize, split, Slice} from '../../shared/helpers/serialize';
import { mock_translate } from '../../shared/mockfolder/mock_translate';

import s from './translate.module.scss';
import { Button } from '../../components/Button/Button';

export const TranslatePage = () => {

  const original = split(mock_translate);
  const serialized = serialize(mock_translate);
  const translate = serialized.split();
  

  return (
    <div className={s.container}>
      <div className={s.original}>
        {
          original.map((item: any, index: number) => {
            let elements: any[] = [];
            for (let i in item) {
              let placeholder = typeof(item[i]) === "string" || typeof(item[i]) === "number" ? item[i] : item[i].toString()
              elements.push(<div key={`${item.__id}_${i}_${index}`} className={s.element_container}>
                  <div className={s.element_name}>{i}:</div>
                  <input type='text' className={s.element_input} value={placeholder} readOnly={true}></input>
                </div>
              )
            }
            return (
              <div className={s.original_container}>
                {
                  elements.map(item => item)
                }
              </div>
            )
          })
        }
      </div>
      
      <div className={s.translate}>
        {
          translate.map((item: Slice, index: number) => {
            let elements: any[] = [];
            
            const key = item.getDataId();
            for (let i in item) {
              let placeholder = typeof(item[i]) === "string" || typeof(item[i]) === "number" ? item[i] : item[i].toString()
            if(typeof(item[i]) !== "function")
              elements.push(<div key={`${key}_${i}_${index}`} className={s.translate_elements}>
                  <input type='text' className={s.element_input} placeholder={placeholder}></input>
                  <Button>see</Button>
                </div>
              )
            }
            return(
              <div className={s.translate_container}>
                  {
                    elements.map(item => item)
                  }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
