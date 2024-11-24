<template>
	<section class="flex">
		<Sidebar />
		<ResponsiveSidebar />
		<Main />
	</section>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import ResponsiveSidebar from './components/ResponsiveSidebar.vue';
import Main from './components/Main.vue';
</script>
