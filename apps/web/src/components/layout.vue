<template>
    <div class="router">
        <router-link to="/edit">eidt</router-link>
        <router-link to="/">home</router-link>
    </div>
    <RouterView />
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
.router {
    height: 40px;
}
</style>
