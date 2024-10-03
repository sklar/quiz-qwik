import { type QRL, component$ } from '@builder.io/qwik'

import classes from './quiz.module.css'

interface QuizResultProps {
	time: number
	onReload$: QRL<() => void>
}

export const QuizResult = component$<QuizResultProps>(({ time, onReload$ }) => {
	return (
		<p class={classes.result}>
			<time
				class={classes.timer}
				aria-label="Time to complete the questions set"
			>
				{time.toFixed(0)} seconds
			</time>
			<button
				type="button"
				class={classes.button}
				aria-label="Load another set of questions"
				onClick$={onReload$}
			>
				Reload
			</button>
		</p>
	)
})
