# Example "admin_users" application that manages users 

## Technologies used:
react, typescript, styled-components, axios and msw to make app interactive on network level without backend

## Project structure:
```src
+-- api               # api data class build on top of axios
|
+-- App               # main application 
    +-- Userlist           # user list component(normal and loading state)
    |
    +-- UserForm           # user form component
    |
    +-- usersSlice         # user data handling for optimized performance and minimum api calls and peristent storage
    |
    +-- types              # related app types
    |
    +-- index              # main application
|
+-- components        # atomic components
|
+-- util              # app utilities (helper and hooks) 
    +-- localstorage.ts    # helper for localstorage handling
    |
    +-- useFormValidation  # hook for form validation inspired from react-hook-form
|
+-- theme             # app theme configured with styled components
|
+-- tests             # test configured with vitest and some helpers, integrated with msw
```


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
"test": to run tests,  
