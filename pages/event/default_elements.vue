<template>
    <div>
        <h1>Default Elements</h1><br>
        <b>Roboto-bold</b><br>
        <i>Roboto-italic</i><br>
        <span class="font-light">Roboto-light</span><br>
        <span class="font-light gray">gray</span><br>
        <span class="font-light light-gray">light gray</span><br>
        <span class="font-light dark-gray">dark gray</span><br>
        <span class="font-light extra-dark-gray">extra dark gray</span><br>
        <span class="font-light orange">orange</span><br>
        <span class="font-light light-blue">light gray</span><br>
        <span class="font-light yellow">yellow</span><br>
        <span class="font-light green">green</span><br>
    </div>
</template>

<script>
export default {}
</script>
<style lang="scss">
    @import '~assets/scss/_variable';
    .font-light{font-family: $font-light;}
    .gray{ color:$gray;}
    .light-gray{ color: $light-gray;}
    .dark-gray{ color: $dark-gray;}
    .extra-dark-gray{ color:$extra-dark-gray;}
    .orange{ color:$orange;}
    .light-blue{ color:$light-blue;}
    .blue{ color:$blue;}
    .yellow{ color:$yellow;}
    .green{ color:$green;}
</style>
