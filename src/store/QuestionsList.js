import { defineStore } from 'pinia'

export const useQuestions = defineStore('questionlist', {
    state: () => ({
        questions: [],
        currentIndex: 0,
        isGreeting: true
    }),
    getters: {
        getQuestions() {
            return this.questions
        },
        getCurrentIndex() {
            return this.currentIndex
        },
        activeQuestion() {
            return this.questions[this.currentIndex]
        },
        showIsGreeting() {
            return this.isGreeting
        }
    },
    actions: {
        addQuestion(question) {
            this.questions.push(question)
        },
        setActiveQuestion(index) {
            this.currentIndex = index
        },
        deleteQuestion(index) {
            if (index >= 0 && index < this.questions.length) {
                this.questions.splice(index, 1)
            }
        }
    }
})