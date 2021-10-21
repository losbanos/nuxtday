<template>
    <div>
        <div id="game_user">{{$route.params.gameNo}}</div>
        <nuxt-child></nuxt-child>
    </div>
</template>

<script lang="ts" src="./_gameNo.ts"></script>
