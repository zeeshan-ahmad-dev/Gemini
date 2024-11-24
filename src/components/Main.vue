<template>
	<section class="w-full">
		<Navbar />
		<div :class="[['h-[94vh] md:[98vh] overflow-hidden w-[100vw] absolute z-30'],[!questionsStore.sidebarIsOpen ? 'bg-gray-400 lg:hidden' : 'hidden']]"></div>
		<section class="flex flex-col justify-between px-4 md:px-6 lg:px-20 h-[90dvh] py-7 sm:h-[90vh] md:h-[94vh] lg:h-[90vh] xl:h-[87vh]">
			<div v-if="!isGreeting" class="space-y-10">
				<div class="flex items-center self-start gap-5">
					<img class="w-10 rounded-full" :src="assets.user_icon" alt="" /><span>{{
						activeQuestion.question
					}}</span>
				</div>
				<div class="flex items-center h-[80%] gap-5 overflow-y-auto scrollbar-hide">
					<img
						:class="[['self-start w-10'], [generatingAnswer ? 'animate-spin' : '']]"
						src="../assets/gemini.svg"
						alt="gemini"
					/>

					<section v-if="generatingAnswer" class="self-start w-full">
						<div class="flex flex-col w-full max-w-3xl gap-4 pt-2 rounded-lg">
							<div
								class="h-5 w-10/12 origin-left animate-loading bg-[length:200%] rounded-sm bg-gradient-to-r from-blue-50 from-30% via-blue-600/60 to-blue-50 bg-2x opacity-0"
							></div>
							<div
								class="h-5 w-full origin-left animate-loading bg-[length:200%] rounded-sm bg-gradient-to-r from-blue-500/60 via-slate-100 via-30% to-blue-500/60 to-60% bg-2x opacity-0"
							></div>
							<div
								class="duration-600 h-5 w-3/5 origin-left animate-loading bg-[length:200%] rounded-sm bg-gradient-to-r from-blue-50 from-40% via-blue-500/60 to-blue-50 to-70% bg-2x opacity-0"
							></div>
						</div>
					</section>

					<span v-else v-html="activeQuestion.answer" class="self-start leading-7"></span>
				</div>
			</div>
			<div v-else class="grid h-[80%] place-content-center">
				<h1
					class="inline-block text-transparent bg-gradient-to-r from-[#6192F1] via-[#ac6eb2] to-[#d96570] bg-clip-text text-3xl font-semibold"
				>
					Hello, Zeeshan
				</h1>
			</div>
			<div class="flex relative justify-between bottom-0 items-center p-5 bg-[#F0F4F9] rounded-full">
				<input
					v-model="inputVal"
					@keydown.enter="onSent(inputVal)"
					class="w-full bg-transparent outline-none"
					placeholder="Ask Gemini"
					type="text"
				/>
				<div class="flex items-center">
					<img class="w-5 mr-4 lg:w-6" :src="assets.gallery_icon" alt="" />
					<img class="w-5 mr-4 lg:w-6" :src="assets.mic_icon" alt="" />
					<img
						@click="onSent(inputVal)"
						v-if="inputVal.length > 0"
						class="w-5 mr-8 lg:w-6 lg:mr-4"
						:src="assets.send_icon"
						alt=""
					/>
				</div>
			</div>
		</section>
	</section>
</template>

<script setup>
import Navbar from './Navbar.vue';
import run from '../config/geminiAPI';
import { ref, computed } from 'vue';
import { assets } from '../assets/assets';
import { useQuestions } from '../store/QuestionsList';

// Store reference
const questionsStore = useQuestions();

// Local state variables
const inputVal = ref('');
const generatingAnswer = ref(false);

// Computed property to get active question from store
const activeQuestion = computed(() => questionsStore.activeQuestion);
const isGreeting = computed(() => questionsStore.showIsGreeting);

// Handle question submission
async function onSent(prompt) {
	if (!prompt.trim()) return;
	inputVal.value = '';
	generatingAnswer.value = true;
	questionsStore.isGreeting = false;

	const newQuestion = {
		question: prompt,
		answer: '',
	};

	// Add the new question to the store
	const lastAddedQuestion = questionsStore.getQuestions.length;

	questionsStore.addQuestion(newQuestion);
	questionsStore.setActiveQuestion(lastAddedQuestion);
	questionsStore.getQuestions.forEach((q) => {
		q.active = false;
	});
	questionsStore.getQuestions[lastAddedQuestion].active = true;

	// Simulate API call to generate the answer
	try {
		const response = await run(prompt);
		let responseArray = response.split('**');
		let newResponse = '';

		for (let i = 0; i < responseArray.length; i++) {
			if (i === 0 || i % 2 !== 1) {
				newResponse += responseArray[i];
			} else {
				newResponse += '<b>' + responseArray[i] + '</b>';
			}
		}

		let newResponse2 = newResponse.split('*').join('</br>');
		let tempResponse = newResponse2.split(' ');
		let finalResponse = '';
		for (let index = 0; index < tempResponse.length; index++) {
			setTimeout(() => {
				finalResponse += (index > 0 ? ' ' : '') + tempResponse[index];
				questionsStore.getQuestions[lastAddedQuestion].answer = finalResponse;
			}, 75 * index);
		}
	} catch (error) {
		console.error('Error fetching response:', error);
		questionsStore.getQuestions[lastAddedQuestion].answer = 'An error occurred. Please try again.';
	} finally {
		generatingAnswer.value = false;
	}
}
</script>
