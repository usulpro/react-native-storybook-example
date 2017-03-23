# React Native Storybook Example

This is example react-native-storybook project. It is running React native (0.38, but it could be any version). 
What is special about this example is that it allows you to host your storybook to server and let them connect
to it through apps installed in their phones.

![Two simulators, two browsers one server playing together](https://media.giphy.com/media/3oKIPhYRUyUO5I6pWw/giphy.gif)

Storybook in this project has two modes:
* Local
* Hosted

## Running local mode

Run `npm run storybook` and then run `react-native run-ios' and you should instantly see working project (same as when installing new storybook).
 
 ## Running hosted mode
 
 Run `npm run storybook-hosted` and then run`react-native run-ios`. You should see a screen asking you to enter information.
 I have deployed this example storybook to heroku, so if you want to test it out leave host same and enter code displayed in browser.
 
 * Host (localhost if running locally/leave default if testing out deployed version).
 * Port (7007 if running locally)
 * Code (Insert code shown in browser)
 * Secured (leave unchecked if running locally, check it for running in server).

## Running hosted mode in your own server.
All you need to do is run `npm run storybook-hosted -- -s --skip-packager -p $PORT` command in the server.
Also make prettier code-screen, remove host/port so users wouldn't have to enter it every time.


## Things to improve

* Add batching/throttling to react-native-storybook, because it is too slow when deployed.
* Remove running webpack when starting server.
* Remove all Gongreg/** dependencies. Create new projects if necessary.
