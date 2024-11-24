<template>
    <nav class="z-50 flex justify-between p-5">
        <div class="relative z-50 flex items-center gap-2">
            <img @click="sidebarToggle" class="lg:hidden" src="../assets/bars.svg" alt="">
            <h1 class="text-[#1f1f1f] text-xl">Gemini</h1>
        </div>
        <img class="w-12 rounded-full" :src="assets.user_icon" alt="">
    </nav>
</template>

<script setup>
import { assets } from '../assets/assets';
import { useQuestions } from '../store/QuestionsList'

const questionsStore = useQuestions()

function sidebarToggle() {
    questionsStore.sidebarIsOpen = !questionsStore.sidebarIsOpen
}
</script>
