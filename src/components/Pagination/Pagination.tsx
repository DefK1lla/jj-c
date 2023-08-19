import React, { useState, FC } from "react";
import s from "./pagination.module.scss";
import cn from 'classnames'
// определяем константу для количества номеров страниц, которые выводятся
const PAGE_NUMBERS = 10;

interface pagination {
    page: number;
    pages: number[];
    setSelectedPage: React.Dispatch<React.SetStateAction<number>>

}

// создаем компонент пагинации
export const Pagination: FC<pagination> = ({page, pages, setSelectedPage}) => {
  // определяем начальный и конечный индекс номеров страниц
  let start = 0;
  let end = PAGE_NUMBERS;

  // если текущая страница больше или равна середине номеров страниц
  if (page >= Math.ceil(PAGE_NUMBERS / 2)) {
    // сдвигаем начальный и конечный индекс на разницу между текущей страницей и серединой номеров страниц
    start += page - Math.ceil(PAGE_NUMBERS / 2);
    end += page - Math.ceil(PAGE_NUMBERS / 2);
  }

  // если конечный индекс больше или равен общему количеству страниц
  if (end >= pages.length) {
    // сдвигаем начальный и конечный индекс на разницу между конечным индексом и общим количеством страниц
    start -= end - pages.length;
    end -= end - pages.length;
  }

  // создаем массив номеров страниц, которые будут отображаться
  const pageNumbers = pages.slice(start, end);

  // возвращаем JSX-элемент с кнопками пагинации
  return (
    <div className={s.pagination_container}>
      {/* кнопка "Назад", которая уменьшает текущую страницу на единицу */}
      <button
        className={s.pagination_button}
        onClick={() => setSelectedPage((prev: number) => prev - 1)}
        disabled={page === 0} // кнопка неактивна, если текущая страница равна нулю
      >
        Назад
      </button>
      {/* цикл по массиву номеров страниц */}
      {pageNumbers.map((number) => (
        // кнопка с номером страницы, которая устанавливает текущую страницу равной этому номеру
        <button
          key={number} // уникальный ключ для каждого элемента списка
          className={cn(s.pagination_button,  number === page ? s.active : undefined)}
          
          onClick={() => setSelectedPage(number)} // обработчик клика по кнопке
        >
          {number + 1} {/* отображаем номер страницы с единичным смещением */}
        </button>
      ))}
      {/* кнопка "Вперед", которая увеличивает текущую страницу на единицу */}
      <button
        className={s.pagination_button}
        onClick={() => setSelectedPage((prev: number) => prev + 1)}
        disabled={page === pages.length - 1} // кнопка неактивна, если текущая страница равна последней странице
      >
        Вперед
      </button>
    </div>
  );
};