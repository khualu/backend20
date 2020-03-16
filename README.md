# AITE
![Logo AITE](https://imgur.com/XjhxRWL.png)
Repository for the backend course and project of CMD Amsterdam. 

This represents a dynamic website using NodeJs, Express, MongoDB and Mongoose. AITE is a datingsite for gamers. The premise is that they could match each other on their favorite games and plan a gaming date. 

At this moment the app can story user names and favorite games, which can be retrieved from the database to the server and not to the frontend. 

## Install
To install this project, you have to clone it to your computer first. In your terminal `CMD` or `bash` (or whatever) open the folder you want to have this project in, then execute the next code in your terminal:

_This code will clone the repository in to your desired folder and then move you into the folder_
```bash
git clone https://github.com/khualu/project_tech.git
cd project_tech
```

The next step is to install all the dependencies, execute:
```bash
npm install
```

If I gave you my `.env` file you should be able to run the app. If not you need to make one yourself. Since I'm working with Mongo Atlas the `.env` should look like this:
```
DB_USER=<username>
DB_PASS=<password>
DB_URI=<uri string, get yours at mongo atlas>
```

Start the app with the next command
```
node server.js
``` 

## Information structure
In Mongo I made a scheme to structure the information of the favorite games. The schema looks like this: 
```js 
const favGamesSchema = new Schema({
  userName: String,
  titleGame1: String,
  titleGame2: String,
  titleGame3: String,
  date: {
    type: String,
    default: Date.now()
  }
})
```

## (Dev)Dependecies
* [body-parser](https://www.npmjs.com/package/body-parser)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [ejs](https://www.npmjs.com/package/ejs)
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [eslint](https://www.npmjs.com/package/eslint)

## Sources
All used sources are linked in the wiki.

## License
MIT © [Andres Pinto](www.github.com/khualu)