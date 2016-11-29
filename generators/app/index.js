'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the terrific ' + chalk.red('TotalJS') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'App Name :'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author :'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    /* Copy all */
    var array_struct = ['controllers','definitions','public', 'views']
    for(var i in array_struct){
      this.fs.copy(this.templatePath(array_struct[i]+'/'),this.destinationPath(array_struct[i]+'/'));
    }

    /* Copy file */
    var array_file = ['debug.js', 'release.js', 'test.js', 'bower.json', '.bowerrc', 'gulpfile.js']
    for(var i in array_file){
      this.fs.copy(this.templatePath(array_file[i]),this.destinationPath(array_file[i]));
    };

    /* Config */
    let tokken = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    this.fs.copyTpl(
      this.templatePath('_config'),
      this.destinationPath('config'), {
        name: this.props.name,
        author: this.props.author,
        secret: tokken
      }
    );

    /* Package */
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        author: this.props.author
      }
    );
  },

  install: function () {
    this.installDependencies();
    this.log(yosay(
      'I have unpack the boxes'
    ));
  },

  end: function() {
    this.spawnCommand('gulp', ['bower']);
    this.log(yosay(
      'Launch NPN RUN START / DEBUG for start server !'
    ));
  }
});
