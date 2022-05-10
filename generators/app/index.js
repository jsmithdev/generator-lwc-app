"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stellar ${chalk.red("generator-lwc-app")} generator!`
      )
    );

    const prompts = [
      {
        type: "string",
        name: "name",
        message: "What's the name of the project?",
      },
      {
        type: "confirm",
        name: "AreYouSure",
        message: "Would you like to enable this option?",
        default: true
      },
    ];

    return this.prompt(prompts).then(props => {
      console.log(props)
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    console.log(`${this.props.name} is ready to go!`);
    this.fs.copy(
      this.templatePath(`dummyfile.txt`),
      this.destinationPath(`${this.props.name}/dummyfile.txt`)
    );
  }

};
