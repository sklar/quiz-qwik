import { component$ } from '@builder.io/qwik'

import type { Question } from './quiz.controller'

import classes from './quiz.module.css'

interface QuizProgressProps {
	questions: Question[]
}

export const QuizProgress = component$<QuizProgressProps>(({ questions }) => {
	return (
		<p class={classes.result} aria-label="Correct answers of all answers">
			{questions.filter((q) => q.isCorrect).length} of {questions.length}
		</p>
	)
})
