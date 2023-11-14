# Instructions to run app
### app was developed using node `18.14.2`
### package manager yarn `1.22.19` , npm works as well
***
## yarn install

## run app on dev by
`yarn run dev`
or
`npx run dev`

## run app on dev by
`yarn run dev`
or
`npx run dev`

## build production app and serve with node
`npm run build`
and
`npx serve -s dist --listen 3030`

## build and run with docker
`docker build -t admin_users .`
and
`docker run -p 3030:3030 admin_users`

***
~ you can set userSlice cache policy also from the .env file

~ error handling on requests, change their url so reproduce , replace ``/users => /userr``

***


running port is 3030 //vite.config to change it
available scripts

"dev": for development,
"build": for build",
"lint": to lint,
"format": to format,
###use npm run {script} to execute

`for commit 
you have to format code run, npm run format
you have to fix linter fun, npm run lint`