import { $, component$, useSignal, useStore, useTask$ } from '@builder.io/qwik'
import { isBrowser } from '@builder.io/qwik/build'

import { QuizProgress } from './quiz-progress'
import { QuizQuestion } from './quiz-question'
import { QuizResult } from './quiz-result'
import { createQuiz } from './quiz.controller'

import classes from './quiz.module.css'

const celebrationGifs = [
	'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
	'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
	'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
	'https://media.giphy.com/media/l0MYGzh7pUL2SOyty/giphy.gif',
	'https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif',
	'https://media.giphy.com/media/cXaeWuJ1oKO4g/giphy.gif',
	'https://media.giphy.com/media/6MMxtt269tcAM/giphy.gif',
	'https://media.giphy.com/media/fwqAg6ZS6ebL2/giphy.gif',
	'https://media.giphy.com/media/DqZKCC1rRht8FmnKbv/giphy.gif',
	'https://media.giphy.com/media/Swx36wwSsU49HAnIhC/giphy.gif',
	'https://media.giphy.com/media/xDpB3lRInUYla/giphy.gif',
	'https://media.giphy.com/media/ujUdrdpX7Ok5W/giphy.gif',
]

export const Quiz = component$(() => {
	const celebrationGif = useSignal('')
	const confettiRef = useSignal<HTMLDivElement>()

	const quiz = useStore(createQuiz())

	const handleReload = $(() => {
		celebrationGif.value = ''
		quiz.generateNewSet()
	})

	useTask$(({ track }) => {
		const isComplete = track(() => quiz.isSetComplete.value)

		if (isComplete && isBrowser) {
			celebrationGif.value =
				celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)]
			if (confettiRef.value) {
				import('party-js').then((party) => {
					party.confetti(confettiRef.value!, {
						count: party.variation.range(80, 160),
					})
				})
			}
		}
	})

	useTask$(() => {
		quiz.generateNewSet()
	})

	return (
		<section class={classes.container}>
			<header class={classes.header}>
				<h1>Math Quiz</h1>
			</header>
			<div class={classes.body}>
				{!quiz.isSetComplete.value && quiz.currentQuestion.value && (
					<QuizQuestion
						question={quiz.currentQuestion.value}
						onAnswer$={quiz.answerQuestion}
					/>
				)}
			</div>
			<footer>
				{!quiz.isSetComplete.value ? (
					<QuizProgress questions={quiz.questions.value} />
				) : (
					<QuizResult time={quiz.timeTaken.value} onReload$={handleReload} />
				)}
			</footer>
			<div ref={confettiRef} class={classes.confetti} />
			<div
				class={classes.celebrationGif}
				style={{ backgroundImage: `url(${celebrationGif.value})` }}
			/>
		</section>
	)
})
