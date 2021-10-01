<template>
    <div style="border: 2px solid blue">
        <h1>_Category.vue</h1>
        <p>This Component has nuxtChild</p>
        <p>category: {{$route.params.category}}</p>
        <nuxt-child />
    </div>
</template>

<script>
export default {
    name: "Category"
}
</script>

<style scoped>

</style>
