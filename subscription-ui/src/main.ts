import "./assets/style.css"

import { createApp } from 'vue'
import App from './App.vue'
import { H } from 'highlight.run';


H.init('0dqvlnqg', {
    environment:  import.meta.env.VITE_ENVIRONMENT,
    version: import.meta.env.VITE_VERSION,
	networkRecording: {
		enabled: true,
		recordHeadersAndBody: true,
        urlBlocklist: [
            // insert full or partial urls that you don't want to record here
			// Out of the box, Highlight will not record these URLs (they can be safely removed):
			"https://www.googleapis.com/identitytoolkit",
			"https://securetoken.googleapis.com",
        ],
	},
});

createApp(App).mount('#app')
