[![JobExcel Logo](http://i.imgur.com/gPtaMkl.jpg)](http://jobexcel.herokuapp.com)


JobExcel is a fancy personal spreadsheet to organize and mark the jobs which you are planning to apply in the near future. You can keep track of the job description, read what the employees have to say about the job and see the glassdoor ratings all from the comfort of your personal spreadsheet.


JobExcel was built using [MEAN.JS](http://meanjs.org/), which is a full-stack JavaScript open-source solution, which provides a solid starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. 


##ISSUES 
Bower files are not installing automatically when pushed and built on heroku, I am manually adding bower files for now as a hack for this problem.

## Development
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
  * Node v5 IS NOT SUPPORTED AT THIS TIME! 
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Ruby - [Download & Install Ruby](https://www.ruby-lang.org/en/documentation/installation/)
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process. Make sure you've installed Node.js and npm first, then install grunt globally using npm:

```bash
$ npm install -g grunt-cli
```

* Sass - You're going to use [Sass](http://sass-lang.com/) to compile CSS during your grunt task. Make sure you have ruby installed, and then install Sass using gem install:

```bash
$ gem install sass
```

```bash
$ npm install -g grunt-cli
```

* Gulp - (Optional) You may use Gulp for Live Reload, Linting, and SASS or LESS.

```bash
$ npm install gulp -g
```

## Getting Started With MEAN.JS
You have your application running, but there is a lot of stuff to understand. We recommend you go over the [Official Documentation](http://meanjs.org/docs.html).
In the docs we'll try to explain both general concepts of MEAN components and give you some guidelines to help you improve your development process. We tried covering as many aspects as possible, and will keep it updated by your request. You can also help us develop and improve the documentation by checking out the *gh-pages* branch of this repository.

## Community
* Use the [Official Website](http://meanjs.org) to learn about changes and the roadmap.
* Join #meanjs on freenode.
* Discuss it in the new [Google Group](https://groups.google.com/d/forum/meanjs)
* Ping us on [Twitter](http://twitter.com/meanjsorg) and [Facebook](http://facebook.com/meanjs)

## Contributing
We welcome pull requests from the community! Just be sure to read the [contributing](https://github.com/meanjs/mean/blob/master/CONTRIBUTING.md) doc to get started.

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.