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
  update_file: '/file/update',
  get_newfile: '/file/news',
  get_files_by_author_id: '/file/author-id'
}

export const endpoints_user = {
  login: "/login",
  logout: "/logout",
  signup: "/signup",
  get_user: "/user",
  put_password: '/password'
}