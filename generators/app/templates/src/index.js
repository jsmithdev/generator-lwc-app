//import '@lwc/synthetic-shadow'; //https://salesforce.stackexchange.com/questions/269615/lightning-web-components-open-source-with-lightning-design-system-lwc-with-slds

import { createElement } from 'lwc';
import MainApp from 'main/app';

const app = createElement('main-app', { is: MainApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);

/* https://github.com/w3c/csswg-drafts/issues/4329 */
function handleSize() {
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	const vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

handleSize();

window.addEventListener('resize', handleSize);
