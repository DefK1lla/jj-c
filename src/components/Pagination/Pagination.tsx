import React, { useState, FC } from "react";
import s from "./pagination.module.scss";
import cn from 'classnames'

const PAGE_NUMBERS = 10;

interface pagination {
    page: number;
    pages: number[];
    setSelectedPage: React.Dispatch<React.SetStateAction<number>>

}

export const Pagination: FC<pagination> = ({page, pages, setSelectedPage}) => {

  let start = 0;
  let end = PAGE_NUMBERS;

  
  if (page >= Math.ceil(PAGE_NUMBERS / 2)) {
    
    start += page - Math.ceil(PAGE_NUMBERS / 2);
    end += page - Math.ceil(PAGE_NUMBERS / 2);
  }

  
  if (end >= pages.length) {
    
    start -= end - pages.length;
    end -= end - pages.length;
  }

  
  const pageNumbers = pages.slice(start, end);

  
  return (
    <div className={s.pagination_container}>
      
      <button
        className={s.pagination_button}
        onClick={() => setSelectedPage((prev: number) => prev - 1)}
        disabled={page === 0} 
      >
        Назад
      </button>
      
      {pageNumbers.map((number) => (
        
        <button
          key={number} 
          className={cn(s.pagination_button,  number === page ? s.active : undefined)}
          
          onClick={() => setSelectedPage(number)} 
        >
          {number + 1} 
        </button>
      ))}
      
      <button
        className={s.pagination_button}
        onClick={() => setSelectedPage((prev: number) => prev + 1)}
        disabled={page === pages.length - 1} 
      >
        Вперед
      </button>
    </div>
  );
};