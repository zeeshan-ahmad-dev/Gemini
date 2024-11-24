<template>
	<aside
		:class="[
			['flex-col justify-between z-40 w-[80dvw] rounded-r-2xl absolute  h-[100dvh] bg-[#F0F4F9] flex lg:hidden px-4 py-5 transition-all'],
			[sidebarIsOpen ? '-translate-x-full' : 'w-fit'],
		]"
	>
		<div @click="toggleSidebar" class="p-2 rounded-full w-fit hover:bg-[#DFE3E8] cursor-pointer">
		</div>
		<section class="flex flex-col justify-between h-[90%]">
			<div>
				<button
					@click="newChat"
					aria-label="Create a new chat"
					class="flex justify-between w-32 px-4 py-3 items-center bg-[#DDE3EA] rounded-full text-sm text-[#444746]  transition-all font-medium my-5 hover:bg-[#CCD8E9]  h-10'"
				>
					<img class="w-[20px]" src="../assets/plus-large-svgrepo-com.svg" alt="New Chat" />
					<span class="text-nowrap"> New chat </span>
				</button>

				<section>
					<h3 class="text-sm text-[#1f1f1f] font-medium px-4 my-2">Recent</h3>
					<ul class="h-[70%] overflow-y-auto">
						<li
							v-for="(item, index) of questions.getQuestions"
							:key="index"
							@click="activateQuestion(index)"
							:class="[
								'flex items-center justify-between rounded-full px-4 py-1 font-semibold group hover:cursor-pointer',
								item.active ? 'bg-[#D3E3FD] text-[#444756] ' : ' text-[#041e49] hover:bg-[#E9EEF6]',
							]"
						>
							<img class="w-5 h-5 mr-3" :src="assets.message_icon" alt="Message" />
							<span class="text-sm w-[70%] truncate">{{ item.question }}</span>

							<div
								class="hover:bg-[#fff] p-1 rounded-full bg-transparent opacity-0 group-hover:opacity-100 cursor-default"
							>
								<img
									@click="deleteQuestion(index)"
									class="w-5"
									:src="assets.delete_icon"
									alt="Delete"
								/>
							</div>
						</li>
					</ul>
				</section>
			</div>
			<div>
				<div class="flex items-center rounded-full px-4 py-2 w-32 h-10 font-semibold text-[#041e49] group hover:cursor-pointer transition-all hover:bg-[#DFE3E8] gap-3">
					<img class="w-4" :src="assets.question_icon" alt="" />
					<span > Help </span>
				</div>
				<div
					:class="[
						[
							'flex items-center rounded-full px-4 py-2 h-10 font-semibold text-[#041e49] group hover:cursor-pointer transition-all hover:bg-[#DFE3E8] gap-3',
						],
						[sidebarIsOpen ? 'w-32 px-4 py-3' : 'w-10 py-0 pl-[.7rem] pr-0'],
					]"
				>
					<img class="w-4" :src="assets.history_icon" alt="History" />
					<span > Activity </span>
				</div>
				<div
					:class="[
						[
							'flex items-center rounded-full px-4 py-2 h-10 font-semibold text-[#041e49] group hover:cursor-pointer transition-all hover:bg-[#DFE3E8] gap-3',
						],
						[sidebarIsOpen ? 'w-32 px-4 py-3' : 'w-10 py-0 pl-[.7rem] pr-0'],
					]"
				>
					<img class="w-4" :src="assets.setting_icon" alt="Settings" /><span
						
						>Settings</span
					>
				</div>
			</div>
		</section>
	</aside>
</template>

<script setup>
import { computed } from 'vue';
import { assets } from '../assets/assets';
import { useQuestions } from '../store/QuestionsList';

// Store referance
const questions = useQuestions();
const sidebarIsOpen = computed(() => questions.showSidebarIsOpen)

function toggleSidebar() {
	questions.sidebarIsOpen = !questions.sidebarIsOpen;
}

function activateQuestion(index) {
	if (typeof index === 'string') {
		questions.getQuestions.forEach((q) => {
			q.active = false;
		});
	} else {
		questions.isGreeting = false;
		questions.getQuestions.forEach((q) => {
			q.active = false;
		});
		questions.getQuestions[index].active = true;
		questions.setActiveQuestion(index);
	}
}

function newChat() {
	questions.isGreeting = true;
	activateQuestion('none');
}

function deleteQuestion(index) {
	questions.deleteQuestion(index);
}
</script>
