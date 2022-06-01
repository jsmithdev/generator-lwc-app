"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

const execute = require('util').promisify(require('child_process').exec);
module.exports = class extends Generator {
  	prompting() {
		
		this.log(
			yosay( `Welcome to the ${chalk.blue("lwc-app")} generator!` )
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
				message: `Would you like to create the project?`,
				default: true
			},
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		})
	}

  	writing() {
		if(this.props.AreYouSure) {
			this.log( chalk.blue(`🎉 Creating ${this.props.name} and copying files...`) )
			this.fs.copyTpl(
				this.templatePath(),
				this.destinationPath(`${this.props.name}`),
				{ title: this.props.name }
			);
		}
		else {
			this.log( chalk.red(`🔥 Canceling ${this.props.name}...`) )
		}
	}

	async install(){
		try {


			if(!this.props.AreYouSure) return undefined;

			this.log( chalk.green(`🎉 Created ${this.props.name} and copied files...`) )

			this.log( `${chalk.blue(`📚 Installing dependencies...`)}` )

			await execute(`cd ${this.props.name} && npm i`);

			this.log( `${chalk.green(`📚 Installed dependencies...`)}` )

			this.log()
			this.log(`🚀 Run ${chalk.blue(`cd ${this.props.name} && npm start`)} to go to your new project and start it up` )
			this.log()
		}
		catch (error) {
			this.log( `🔥 ${chalk.red(`Error Installing: ${error.message}`)}` )
		}
	}
}