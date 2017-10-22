# GitHub LightHouse


## A Lighthouse you say?

Through the tempests of issues we've built a lighthouse to shed a light on projects sinking under the pressure of fame and not having enough crew to fix all the issues. If you feel kind-hearted enough to help a fellow dev, pass by our [Lighthouse](https://mathiasgilson.github.io/LightHouse/).

## Does it run locally?

Yes it does!


## But how do I start it?

 Simply:

- run `docker-compose up --build -d`
- run `npm install`
- either define the github token in the `config/default.js` or in the environment variable `GITUHB_TOKEN` (`export GITHUB_TOKEN=YourRoken`)
- run `npm start`
- open `index.html` in your favorite web browser


## Development and production

Start the webpack watcher by running `npm run webpack`
Changes on the files will regenerate the css and js resources

As this project uses CSS Modules the stylesheets are injected in the html page and not compiled in a file. For production you might want to have a unique css file for catching purposes
So when you are happy with your changes check if the linter is happy by using `npm run linter` no errors means that he's happy, this guy is not very chatty

Then generate your nice js bundle and css file with the command `npm run build`


## Frontend

The frontend is developed using React.js and CSS modules. Each component is styled with it's own or shared style.scss file.

We serve it using github pages because it's free lol


## Backend

We use heroku to serve the logic of the app and a scheduled job run it for a list of famous frameworks to speedup the loading time. It generates a js files containing the lists of repos for these frameworks and stores it in the github repo. It's a hacky way to store data without paying.
Once again we're poor lol


## How does it works ?

Basically it uses black magic to determine if a repo is trendy/useful enough to worth your time and if there isn't a lot of brave dev helping out already. Then it sends you a handpicked selection of repos that you might want to help

## Whaa black magic you said ?

Yeah well not exactly, we count the number of open issues weighted by the number of day since there last update and we divide this so called "open issues score" by the code frequency. It's the average number of commit per hour done by all the project's contributors. We obviously multiply this number by over nine thousand. Then we multiply it by it's "trendyness" wich is the max between the number of stars and the number of fork.
