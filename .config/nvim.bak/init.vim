set mouse
set number
set smarttab
set tabstop=2
set shiftwidth=2
set softtabstop=2
set autoindent
set guifont = "JetBrains Mono Nerd Font":h12

nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>

call plug#begin()

Plug 'https://github.com/vim-airline/vim-airline' 
Plug 'https://github.com/preservim/nerdtree'
Plug 'https://github.com/ryanoasis/vim-devicons'

call plug#end()
