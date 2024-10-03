import { $, type QRL, component$, useSignal } from '@builder.io/qwik'

import { type Question, calculateAnswer } from './quiz.controller'

import classes from './quiz.module.css'

interface QuizQuestionProps {
	question: Question
	onAnswer$: QRL<(isCorrect: boolean) => void>
}

export const QuizQuestion = component$<QuizQuestionProps>(
	({ question, onAnswer$ }) => {
		const userAnswer = useSignal('')
		const inputRef = useSignal<HTMLInputElement>()

		const handleSubmit = $((event: Event) => {
			if (userAnswer.value === '') return

			const isCorrect =
				Number.parseInt(userAnswer.value) === calculateAnswer(question)

			onAnswer$(isCorrect)
			userAnswer.value = ''
			inputRef.value?.focus()
		})

		return (
			<form preventdefault:submit onSubmit$={handleSubmit}>
				<p class={classes.question}>
					<span>{question.num1}</span>
					<span>{question.operation}</span>
					<span>{question.num2}</span>
					<span>=</span>
					<input
						type="number"
						placeholder="???"
						bind:value={userAnswer}
						ref={inputRef}
						autoFocus
					/>
				</p>
			</form>
		)
	},
)
