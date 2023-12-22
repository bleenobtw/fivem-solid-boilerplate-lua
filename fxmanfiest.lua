fx_version 'cerulean'
games { 'gta5' }
use_experimental_fxv2_oal 'yes'
lua54 'yes'

description 'Basic Solid (Typescript) & Lua Game Scripts Boilerplate'
author 'Bleeno'
version '1.0.0'
repository 'https://github.com/bleenobtw/fivem-solid-boilerplate-lua'

ui_page 'web/dist/index.html'

client_script './client/**/*.lua'
server_script './server/**/*.lua'

files {
  'web/dist/index.html',
  'web/dist/**/*',
}