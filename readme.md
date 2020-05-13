---
permalink: /index.html
---

Multimedia 2020 Web Template
============

This is a simple web starter project that includes Bootstrap, jQuery, D3, and Scrollama. This template uses build and watch Grunt tasks to stage and test a website. The build folder will be generated in `dist` and source files in `src`.

## Installation Instructions

**1. Install Node**

To install this template system, you first need to install Node/NPM on your computer. The LTS version is recommended.

[https://nodejs.org/en/](https://nodejs.org/en/)


**2. Fork this repository**

Next, visit the [repository page](https://github.com/ucbsoj/multimedia2020template/), which you might already be on right now as you read this. Press the green "template" button to fork this into your own Github account. 

**3. Clone to your Computer**

Clone this repository using the Terminal program on your Mac (command line). It is recommended to change your directory using the `cd` command to a location where you want to serve and work on your project. i.e. `cd ~/Desktop` before running the command below.

```
$ git clone https://github.com/jrue/web-template.git
```

**3. Install this template system**

Next, move into the directory you just cloned, and run the command below to install all of the dependencies. This only installs them within this folder. 

```
$ cd web-template

$ npm install
```

Now, you're ready to work on the project. Open the folder in Sublime. 

## Installing Grunt (Optional)

It's easiest to install Grunt globally, so that you can use simple grunt tasks. I've added a couple of scripts in case you wish not to install globally.

```
$ sudo npm install -g grunt-cli
```

**If you don't want to install Grunt globally**, to run the two grunt commands I've setup use `npm run`.

```
$ npm run grunt

$ npm run setup
```

## Setting up the web template for the first time

There are two Grunt commands for running this template. The first is for initial installation and setup, the second is for build/watch combination (so you can see a preview).

```
$ grunt setup
```

You should only really need to run `grunt setup` the first time you install this template. Every other time, you can just run `grunt`. The setup task cleans the build folder (deletes it), downloads local copies of any Google Fonts requested, and builds the `dist` folder from scratch. It then runs the default task. 

**How to cancel out of terminal**

You can always cancel out of the watch task by pressing <kbd>Control</kbd> + <kbd>C</kbd> on your keyboard. This will allow you to quit Terminal and go on to other things.


After initial setup, you can always relaunch the site and continue from where you left off by opening your Terminal, and `cd` into the directory of your project, and running `grunt` by itself. This will launch both the connect/watch tasks as well as create the build folder.

```
$ grunt
```


## Deploying to Github Pages

To deploy this website to Github pages, in yoru terminal run:

```
$ npm run deploy
```

This will create a `gh-pages` branch in your reposity and automaticall push the `dist` folder contents. 




