import { $, useComputed$, useSignal, useTask$ } from '@builder.io/qwik'

type Operation = '+' | '-'

export interface Question {
	num1: number
	num2: number
	operation: Operation
	isCorrect: boolean
}

const NUMBER_OF_QUESTIONS = 5

const generateQuestion = (): Question => {
	const operation: Operation = Math.random() < 0.5 ? '+' : '-'
	const num1 = Math.floor(Math.random() * (operation === '+' ? 50 : 100)) + 1
	const num2 =
		Math.floor(Math.random() * (operation === '+' ? 100 - num1 : num1)) + 1

	return { num1, num2, operation, isCorrect: false }
}

export const calculateAnswer = ({
	num1,
	num2,
	operation,
}: Question): number => {
	return operation === '+' ? num1 + num2 : num1 - num2
}

export const createQuiz = () => {
	const questions = useSignal<Question[]>([])
	const currentQuestionIndex = useSignal(0)
	const startTime = useSignal(0)
	const timeTaken = useSignal(0)

	const isSetComplete = useComputed$(() =>
		questions.value.every((q) => q.isCorrect),
	)

	const currentQuestion = useComputed$(
		() => questions.value[currentQuestionIndex.value],
	)

	const generateNewSet = $(() => {
		questions.value = Array.from(
			{ length: NUMBER_OF_QUESTIONS },
			generateQuestion,
		)
		currentQuestionIndex.value = 0
		startTime.value = Date.now()
		timeTaken.value = 0
	})

	const answerQuestion = $((isCorrect: boolean) => {
		questions.value = questions.value.map((q, index) =>
			index === currentQuestionIndex.value ? { ...q, isCorrect } : q,
		)

		if (isCorrect) {
			const nextIncorrectIndex = questions.value.findIndex(
				(q, index) => !q.isCorrect && index > currentQuestionIndex.value,
			)
			currentQuestionIndex.value =
				nextIncorrectIndex !== -1
					? nextIncorrectIndex
					: questions.value.findIndex((q) => !q.isCorrect)
		}

		if (questions.value.every((q) => q.isCorrect)) {
			timeTaken.value = (Date.now() - startTime.value) / 1000
		}
	})

	return {
		answerQuestion,
		currentQuestion,
		generateNewSet,
		isSetComplete,
		questions,
		timeTaken,
	}
}
