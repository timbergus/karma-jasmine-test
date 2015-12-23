# Testing with Karma and Jasmine a Full Stack JavaScript Web Application

## Intro

Lately, there is a new methodology to work in web development called TDD (test-driven development) that consists basically in creating the test before the function. And how we do that? Well, following these steps:

1. We create the test to test the functionality we need.
2. We check the result of the test. It MUST fail because the function to test is empty. If it works, then we need to check the test and redesign it.
3. Once filed, we create the function that response to the test.
4. If the test fails, we check the function code and test again.
5. Once the test has passed, we know our function works and now is time to improve the code and test again to check if the changes we made don't broke our function.

So what is this useful for? Well, mainly because if you know the exact point where you function is failing, you don't need to check all the possibilities for the error (the server return, the data structure, the client interpretation...).

So this tutorial tries to give the tools to follow this methodology. We are going to use Angular and Node.js in our web application full stack, and we need to know how to test every step to be sure we are dong things in the right way. For the moment I have found three ways to do tests. Two in client and one in server. I suppose there are more, but for a first approach I thing this article is a good start. The three ways are:

* Jasmine standalone in the client side
* Karma using Jasmine in the client side
* Jasmine-node in the server side

## What is Jasmine?

[Jasmine](http://jasmine.github.io/) is a behavior-driven test framework that gives us the tools to test our code. For example, if we need to know if our function returns true, we can use this structure without needing anything else:

    describe('Our function should return', function() {
        it('true', function() {
            expect(ourFuntion()).toBe(true);
        });
    });

In this case, we suppose our function returns true, so we execute our function inside the `expect`, and we check the output with `toBe` to see if it is really `true`. So if our function return `true`, we should see and output like:

    $ Our function should return true

## What is Karma?

[Karma](http://karma-runner.github.io/0.10/index.html) is a test runner that use a test framework to test the code helping the developer to avoid complex configurations and creating a dynamic workflow to save time and effort. It works mainly watching our sources and our code tests, and running the tests automatically. For example, we can test our code in different browsers or we can exclude files from our tests.

## What is Jasmine-Node?

Well, basically a port of Jasmine to Node. Very useful to test the server and our Node functions.

## And now?

Well, now just change your mind and do TDD! Easy, isn't it? We know the tools and we have the methodology, so now we just need to know how to put all together.

#### How to obtain the tools

First of all, `$ sudo npm install`.

In the previous section you have the links to the sites of the tools and the proper documentation to learn to use these tools. I don't pretend to show you how to use Karma or Jasmine. There are a lot of great tutorials to do it. I pretend to show you how to put them to work to test you code, so let's go!

1. To install Jasmine standalone just go to its site (almost at the end of the document) and download the zip. That's all. Jasmine is inside.
2. To install Karma, we need to have [Node.js](http://nodejs.org/) installed. Then you need to use __npm__ to install it: `$ sudo npm install -g karma` and `$ sudo npm install -g karma-cli`. Very important; install it globally because we are going to use it as a tool in the terminal.
3. To install Jasmine-Node we use again the terminal and __npm__: `$ sudo npm install -g jasmine-node`. Again, we install it globally to use it in the terminal.

So now, we are going to analyze the configuration and methodology to use all these tools. I asume you have a project already working, so I'm going to explain how to integrate the tools in your project more than how to use the tools as they come to start creating you project from scratch.

For this article examples I will have a simple web application with Angular with the following structure:

    index.html
    /css
        styles.css
    /js
        application.js
        /libs
            angular.js
            angular-route.js

## Jasmine Standalone

Well, this is of course the easy way of testing when things are not too big or not too messy. Once you have download Jasmine, just unzip it and check the inner fulder structure. This is what we have:

    SpecRunner.html
    MIT.LICENSE
    /libs
        /jasmine-2.0.0
    /spec
    /src

What we are going to use is the `jasmine-2.0.0` (the elements to make the tests work) folder and the `SpecRunner.html` (the web page that integrates all the files we need and show the test results in our browser). The rest of the folders, `/spec` and `/src` contains an example. If you want to see how it works, just launc a server on this folder and open `SpecRunner.html` in your browser. It just works!

We are not going to use them (`/spec` and `/src`) but they give us a first idea of what folder structure we will need to be able to test our application. This structure contains a `spec` folder where we are going to store all our test files, and a source folder where our application code will be.

So what we need to integrate Jasmine in our application is to put the `jasmine-2.0.0` folder in our `libs` folder and the `SpecRunner.html` in our application root folder. Our new project structure will be:

    index.html
    SpecRunner.html
    /css
        styles.css
    /spec
        application.spec.js
    /js
        application.js
        /libs
            angular.js
            angular-route.js
            /jasmine-2.0.0

__IMPORTANT__
    
When creating the test files we need to maintain this nomenclature to be able to use the same files for all the test tools. The first part is optional, but you always need to end the name with `spec.js` (jasmine-node looks for them by default and it has no sense to be creative about the name of a file).

    <file to test name>.spec.js
    
    For example:
    
    application.js
    application.spec.js

Easy to inspect, easy to remember.

So now we need two more things to test our code:

1. We need to configure the `SpecRunner.html` file to point to the proper folders and files.
2. We need to launch our test site on our browser to test our application.

To configure our `SpecRunner.html` file we need to change the default header for the one we need. The default header is configure to run the example that comes with the Jasmine code and has this appearance:

* The style for the test site

        <link rel="stylesheet" type="text/css" href="lib/jasmine-2.0.0/jasmine.css">

* The Jasmine files contained inside the `jasmine-2.0.0` folder.

        <script type="text/javascript" src="lib/jasmine-2.0.0/jasmine.js"></script>
        <script type="text/javascript" src="lib/jasmine-2.0.0/jasmine-html.js"></script>
        <script type="text/javascript" src="lib/jasmine-2.0.0/boot.js"></script>

* The sources files of our application.

        <script type="text/javascript" src="src/Player.js"></script>
        <script type="text/javascript" src="src/Song.js"></script>

* The test files for our code.

        <script type="text/javascript" src="spec/SpecHelper.js"></script>
        <script type="text/javascript" src="spec/PlayerSpec.js"></script>

And this is what we need to do to obtain the file structure for our application.

* The style for the test site

        <link rel="stylesheet" type="text/css" href="js/libs/jasmine-2.0.0/jasmine.css">

* The Jasmine files contained inside the `jasmine-2.0.0` folder.

        <script type="text/javascript" src="js/libs/jasmine-2.0.0/jasmine.js"></script>
        <script type="text/javascript" src="js/libs/jasmine-2.0.0/jasmine-html.js"></script>
        <script type="text/javascript" src="js/libs/jasmine-2.0.0/boot.js"></script>

* The Angular files that we need to test the application.

        <script src="js/libs/angular.js"></script>
        <script src="js/libs/angular-route.js"></script>
        <script src="js/libs/angular-mocks.js"></script>

* The sources files of our application.

        <script type="text/javascript" src="js/application.js"></script>

* The test files for our code.

        <script type="text/javascript" src="spec/application.spec.js"></script>

__NOTE__ that there is a new file in the Angular includes that is not in our project structure. We need to download and add it to be able to test, so now our project structure should be:

    index.html
    SpecRunner.html
    /css
        styles.css
    /spec
        application.spec.js
    /js
        application.js
        /libs
            angular.js
            angular-route.js
            angular-mocks.js
            /jasmine-2.0.0

And that's all!

Now we just need something to test, and for create a quick example, we are going to test if a var is defined inside a controller.

First we create a module and a controller in our `application.js` and then the test for it. This is the code inside our files:

#### _application.js_

    var app = angular.module('app', []).controller('MainController', ['$scope',
    	function($scope) {
    		$scope.message = 'Hello World!';
    	}
    ]);

#### _application.spec.js_
    
    describe('MainController', function() {
        // We will use this scope in our tests.
        var scope;
        // Mock app to allow us to inject our own dependencies.
        beforeEach(angular.mock.module('app'));
        // Mock the controller for the same reason and include
        // $rootScope and $controller
        beforeEach(angular.mock.inject(function($rootScope, $controller) {
            //create an empty scope
            scope = $rootScope.$new();
            //declare the controller and inject our empty scope
            $controller('MainController', {
                $scope: scope
            });
        }));
        // The test starts here.
        it('should contain a variable text = "Hello World!"', function() {
            expect(scope.message).toBe('Hello World!');
        });
        // And this test will fail.
        it('should contain a variable text = "Hello Earth!"', function() {
            expect(scope.message).toBe('Hello Earth!');
        });
    });

> __TRICK__
> 
> Once you have installed PHP, Apache... in your machine, how can you
> launch a quick server on you project folder? Well, you can try this
> amazing trick. Use the terminal to go to your project folder, where
> you have your `index.html` file, and then just execute:
> 
>     $ php -S localhost:<port>
> 
> With `<port>` for example 5000 (`$ php -S localhost:5000`).
>
> Or using our npm script in package.json with port 5000 by default:
>
>     $ npm run serve

And voilà! Go to your browser, navigate to __http://localhost:5000__ and there is your web application running. To show the test page, just add the route to the spec runner file: __http://localhost:5000/SpecRunner.html__.

In this particular case, you will see two tests, on pass and one not. Try to check the code and see why it works like that. Read the test result. It is all there.

## Jasmine with Karma

So now we are going to do the same but with Karma. And to do it, first we need to create a Karma configuration file where we will put the files and folders we need to link for our test. To create the file, we will execute the automated process Karma provides to us. The steps we are going to follow are:

1. Create a configuration file for Karma called `karma.config.js`
2. Configure this file with our files and paths, browsers, exclusions...
3. Launch the Karma server and see what happens

So to create the configuration file, we just need to execute this command in the terminal, and push ENTER all the time because we are going to configure it by hand.

    $ karma init karma.config.js

This will create the file, and now our project structure will look like this:

    index.html
    SpecRunner.html
    karma.config.js
    /css
        styles.css
    /spec
        application.spec.js
    /js
        application.js
        /libs
            angular.js
            angular-route.js
            angular-mocks.js
            /jasmine-2.0.0

And what are we going to change inside `karma.config.js` file? Easy! The two structures where we define the included and excluded files.

    // list of files / patterns to load in the browser
    files: [
    ],

    // list of files to exclude
    exclude: [
    ],

To look like this:

    // list of files / patterns to load in the browser
    files: [
      'js/libs/angular.js',
      'js/libs/angular-mocks.js',
      'js/libs/angular-route.js',
      'js/application.js',
      'spec/*.spec.js'
    ],

    // list of files to exclude
    exclude: [
      'karma.config.js'
    ],

> __WARNING__
> 
> Be very careful with the insertion order of the files because it could
> stop working. Try to use the order you show in this document before
> trying new and exciting things. You know, the programmer methodology:
> 
> 1. Check that it works as others have told you it should work
> 2. Break it and enjoy!

Once you have all configured, save the file, and run the test server (Karma). To do this, just execute the following command in your terminal and enjoy:

    $ karma start karma.config.js
    
Or using the npm script you have in __package.json__ `$ npm test`.

The amazing thing is that by default, the server will watch changes in the code to retest it, so you don't need to relaunch manually the server every time you change you code. Karma do it automatically for you!

Now that you have launch the test, check the result and that we have the two tests and the pass and fail from before.

Karma also open a browser window when running. This is the browser you have set in the configuration file. It has nothing inside apart from a header and a big __DEBUG__ button on it. Well, if you push this button, another tab will open empty! So where is the trick then! Well, try to check the JavaScript console in the Developer Tools of the browser. There you have the result of the test.

Well, not as pretty as Jasmine, but at least you won't need to launch all the browser by hand to open on every one the `SpecRunner.html` page. But why?

Because you have another configuration line where you can specify in which browser you want to test you application, and Karma will launch all the browsers at the same time to let you debug the test result. By default you get the Chrome browser, but you can add all browsers you want.

    browsers: ['Chrome'],

For example could look like:

    browsers: ['Chrome', 'Firefox'],

Try to change it and see the result. It is really amazing and useful when you need to check compatibility between browsers.

> __WARNING__
> 
> Be careful because you need to have installed all the browser where
> you want to test in your computer. Otherwise Karma won't find them.

## Jasmine-Node

And finally, we are going to test the server. I suppose that it is possible to test it from Jasmine using Angular `$http` to call and test the server routes, but we are going to use __jasmine-node__ to learn another interesting tool that we can use to test Node.js functions and not only the server part. These are the steps we need to fulfill to test our server:

1. Create the `server.spec.js` file to store the tests we want to do to the server inside the `spec` folder
2. Exclude this file from the `karma.config.js` in order to avoid conflicts between our test tools
3. Launch the jasmine-node tool to test the server and show the result in the termianal

So let's get to work!

The `server.spec.js` looks like this:

    var http = require('http');

    describe('Server should respond to', function() {
        it('/', function(done) {
            http.get('http://localhost:5000/', function(response) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

If you don't know Node.js, this is the best moment to learn it. I swear you it worth it! In any case, just let you know that we are requiring `http` to have the tools to call the server and get the __response__. In this response, we are going to check the property __statusCode__ to see if it is what we need, in this case, 200, the __OK, everything works :)__ Internet code.

Because we are using an asynchronous call to the server we need to tell the test when it is finished, so we use the function __done__. We pass it in the code test and call it when finished: __done()__. This is because the server is asked and we wait the server to answer, but we don't know a priori when this is going to happen and we can't block the program execution just waiting. So we use a "callback" that is launched when the server answer our petition.

Once we have the `server.spec.js` configured, we are going to add it to the excluded files into the `karma.config.js`, so the code inside the `karma.config.js`:

    // list of files to exclude
    exclude: [
      'karma.config.js'
    ],

Should look like this:

    // list of files to exclude
    exclude: [
      'karma.config.js',
      'spec/server.spec.js'
    ],

And everything will work as usual.

And finally, with everything prepared, we just need to launch the __jasmine-node__ application to test our code. And how are we going to do that? First of all, opening a terminal, and then executing the following command line:

    $ jasmine-node --autotest --color --verbose spec/server.spec.js --watch js

And that's all! Check the output and you will see that our server responds to the route __localhost:5000/__. If you want to see it failing, change the response value in the test, for example, with __404__ (page not found) and see what happens.

And the question here is, what all the babbling of this command line means? Well, more or less this:

* __`--autotest`__ refreshes the test when there are changes into the test definition files (`server.spec.js`).
* __`--color`__ colors our output to make it prettier.
* __`--verbose`__ writes in the console the result of every test.
* __`--watch`__ indicates the folder we want to look after it changes. In this case, our source code folder __js__.

After the __`--autotest`__ group (`--autotest --color --verbose`) we need to indicate the file where the test are, in this case `spec/server.spec.js`.

And after this apparently never ending article, you are prepared to use TDD and test you web applications in the client and server side. I hope it helps you a little to understand this amazing world of testing, and that it encorage you to learn what I don't cover here.

Good luck :)
