
// export const endpoints_game = {
//   get_games: '/game/all',
//   set_game: (name: string, img: string, author_id: string) => 
//     `/game/set?name=${name}&img=${img}&author_id=${author_id}`,
//   delete_game: (id: string) => 
//     `/game/delete?id=${id}`,
//   update_game: (id:string, name: string, img: string, author_id: string) =>  
//     `/game/update?id=${id}&name=${name}&`, //d
//   get_game: (id: string) =>  
//     `/game/id?id=${id}`
// }


export const endpoints_game = {
  get_games: '/game/all',
  set_game: `/game/set`,
  delete_game: `/game/delete`,
  update_game: `/game/update`,
  get_game: `/game/id`
}