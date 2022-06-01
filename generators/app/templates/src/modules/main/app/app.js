import { track, LightningElement } from 'lwc';

export default class App extends LightningElement {

	currentView = 'home';
	offline = false;
	hideViews = false;
	loading = false;

	@track toast = {
		title: 'Default title',
		message: 'Default message',
		variant: 'info',
		classes: 'toast close',
		mode: 'closeable',
		open: (event) => {

			const { title, message, variant, mode, duration } = event.detail;

			this.toast.title = title ? title : '';
			this.toast.message = message;
			this.toast.variant = variant;
			this.toast.classes = 'toast';

			if (mode !== 'sticky') {
				setTimeout(() => this.toast.close(), duration || 4000);
			}
		},
		close: () => {
			this.toast.classes = 'toast close';
		}
	}

	async connectedCallback() {
		if (this._init) {
			return;
		}

		this._init = true;

		console.log('App Ready');
	}

	navigate(event) {

		const { view } = event.detail;

		if (view !== this.currentView) {
			this.currentView = view;
		}
	}

	setListeners() {

		window.addEventListener('load', () => window.history.pushState({}, ''));

		window.addEventListener('popstate', () => window.history.pushState({}, ''));

		window.addEventListener('online', () => this.isOnline());

		window.addEventListener('offline', () => this.isOffline());

		window.addEventListener('toast', e => this.toast.open( e ));
	}

	isOnline() {
		this.offline = false;
	}
	isOffline() {
		this.offline = true;
	}

	reload(hard) {
		if (hard) {
			const form = document.createElement('form');
			form.method = 'GET';
			form.action = window.location.href;
			document.body.appendChild(form);
			form.submit();
		} else {
			window.location.reload();
		}
	}
}
