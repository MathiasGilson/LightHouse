# GitHub LightHouse


## A Lighthouse you say?

Through the tempests of issues we've built a lighthouse to shed a light on projects sinking under the pressure of fame and not having enough crew to fix all the issues. If you feel kind-hearted enough to help a fellow dev, pass by our [lighthouse](https://mathiasgilson.github.io/LightHouse).

## Does it run locally?

Yes it does!


## But how do I start it?

 Simply:

- run `docker-compose up --build -d`
- run `npm install`
- either define the github token in the `config/default.js` or in the environment variable `GITUHB_TOKEN` (`export GITHUB_TOKEN=YourRoken`)
- run `node index.js`
- open `index.html` in your favorite web browser
