Example Universal Web App
=========================
Renders through the [`create-render-4r` server module](https://github.com/heroku/create-render-4r).

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/heroku/create-render-4r-example)

### After initial Deploy
You may see an **Application error**, because Redis was not provisioned quickly enough. To fix, restart the app:

[Dashboard](https://dashboard.heroku.com):

![Restart in Heroku app menu](http://universal-web-apps.s3.amazonaws.com/restart-app.png)

CLI:
```
heroku restart -a my-app
```

Usage
-----

```bash
git clone https://github.com/heroku/create-render-4r-example.git

cd create-render-4r-example
npm install
npm start

open http://localhost:3000/
```


About
-----
Based on [Redux's universal example](https://github.com/rackt/redux/tree/master/examples/universal) at [`dedc5392`](https://github.com/rackt/redux/tree/dedc53925ef289582be04128681306deb72066d6)
