<template>
    <div id="reactive">
        <spinner></spinner>
        <p><button ref="emitButton">Emit</button></p>
        <p><button ref="addSecondSubscriberButton" @click="onClickAddSecondSubscriber">Add Second Subscribe</button></p>
        <p><button ref="tearDownButton">Tear Down</button></p>
    </div>
</template>
<script lang="ts" src="./index.ts"></script>