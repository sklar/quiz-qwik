import { component$ } from '@builder.io/qwik'
import {
	QwikCityProvider,
	RouterOutlet,
	ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { isDev } from '@builder.io/qwik/build'

// import './main.css'

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Don't remove the `<head>` and `<body>` elements.
	 */

	return (
		<QwikCityProvider>
			<head>
				<meta charset="utf-8" />
				<link rel="icon" type="image/svg+xml" href="/vite.svg" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{!isDev && (
					<link
						rel="manifest"
						href={`${import.meta.env.BASE_URL}manifest.json`}
					/>
				)}
				<title>Qwik – Math Quiz</title>
				{!isDev && <ServiceWorkerRegister />}
			</head>
			<body>
				<RouterOutlet />
			</body>
		</QwikCityProvider>
	)
})
