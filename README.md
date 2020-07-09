# Slot Machine

## Description

An extensible slot-machine built with Vanilla javascript and canvas.

## Requirements to run

A web Browser, NodeJs
run `npm install`
then `npm run start` the server should start the application on http://localhost:8080

## Design Pattern

The entire design is broken down into modules and each major part built as a component and rendered on the canvas, it's more of a modular approach to problem solving.
I stored global variables in a config.js file, i could have stored them under a namespace to avoid conflicts if this project was to be used as part of a much larger project.
I also used Scss to make my modular approach much more comfortable.

## Code Description

I used webpack to bundle all my stylesheets and js files into two separate files to reduce the number of http requests needed to load the page.
Having a look at the index.html file would be a good start to going through this project then the config.js file to see the constants, a quick tour of the components would be necessary to understand some of the methods used in the main.js file.

I added two new features the ability to hold a reel as well as nudge a reel. I also thought of implementing a checkout feature.
