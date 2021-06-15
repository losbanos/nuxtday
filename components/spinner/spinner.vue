<template>
    <div>
        <p><button @click="onClickSlowButton">Slow Button</button></p>
        <p><button @click="onClickVerySlowButton">Very Slow Button</button></p>
        <div ref="spinner">
            Loading Spinner
        </div>
    </div>
</template>
<script lang="ts" src="./Spinner.ts"></script>
