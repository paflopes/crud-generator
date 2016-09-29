'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ultimate ' + chalk.red('Preferriti CRUD') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'version',
        message: 'What\'s the crud version?',
        default: 1
      },
      {
        type: 'input',
        name: 'crud',
        message: 'What\'s the crud name?',
        default: 'test'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var tplPaths = [
      'src/models/foo/fooSchema.js',
      'src/models/foo/index.js',
      'src/v1/services/foo/__tests__/foo.spec.js',
      'src/v1/services/foo/fooService.js',
      'src/v1/services/foo/index.js',
      'src/v1/routes/foo/fooRoute.js',
      'src/v1/routes/foo/index.js'
    ];

    tplPaths.forEach(path => {
      this.fs.copyTpl(
        this.templatePath(path),
        this.destinationPath(path.replace(/foo/g, this.props.crud)),
        {crud: this.props.crud, version: this.props.version}
      );
    });
  }

});
