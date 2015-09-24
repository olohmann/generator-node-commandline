'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var changeCase = require('change-case');
var slugify = require("underscore.string/slugify");

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    this.username = this.user.git.username || process.env.user || process.env.username || null;
    this.appname = changeCase.paramCase(this.appname);

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('node commandline') + ' generator!'
    ));

    var prompts = [];

    prompts.push({
      name: 'projectname',
      message: 'What is the name of the project?',
      default: this.appname
    });

    prompts.push({
      name: 'cliname',
      message: 'What will the command line name be (e.g. `npm`, `gulp` etc)?',
      default: changeCase.paramCase(this.appname)
    });

    prompts.push({
      name: 'projectdesc',
      message: 'What is the description?',
      default: ''
    });

    prompts.push({
      name: 'authorname',
      message: 'What is the author\'s name?',
      default: this.username
    });

    prompts.push({
      name: 'authorurl',
      message: 'What is the author\'s URL?',
      default: 'https://github.com/' + this.username
    });

    prompts.push({
      name: 'authoremail',
      message: 'What is the author\'s E-Mail?',
      default: ''
    });

    prompts.push({
      name: 'username',
      message: 'If pushed to GitHub, what will the username/org be?',
      default: this.username
    });

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.projectname_slugged = slugify(this.props.projectname);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('_cli.js'),
        this.destinationPath('cli.js'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('_index.js'),
        this.destinationPath('index.js'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('_test.js'),
        this.destinationPath('test.js'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('_readme.md'),
        this.destinationPath('readme.md'),
        this.props
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copyTpl(
        this.templatePath('_LICENSE'),
        this.destinationPath('LICENSE'),
        this.props
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
