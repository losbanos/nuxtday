<template>
    <div id="reactive">
        <p><button ref="emitButton">Emit</button></p>
        <p><button ref="addSecondSubscriberButton" @click="onClickAddSecondSubscriber">Add Second Subscribe</button></p>
        <p><button ref="tearDownButton">Tear Down</button></p>
        <br />
        <p>----------------------------------------------------</p>
        <spinner></spinner>
        <fast-button></fast-button>
    </div>
</template>
<script lang="ts" src="./index.ts"></script>