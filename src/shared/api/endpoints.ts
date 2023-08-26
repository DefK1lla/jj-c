
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
  get_game: `/game/id`,
  set_game: `/game/set`,
  delete_game: `/game/delete`,
  update_game: `/game/update`,
}

export const endpoints_folder = {
  get_folders: '/folder/all',
  get_folder: '/folder/id',
  set_folder: '/folder/set',
  delete_folder: '/folder/delete',
  update_folder: '/folder/update'
}

export const endpoints_file = {
  get_files: '/file/all',
  get_file: '/file/id',
  set_file: '/file/set',
  set_translate: '/file/translate',
  delete_file: '/file/delete',
  update_file: '/file/update'
}