<template>
    <div class="home">
        <NavBar/>
        <Trade/>
    </div>
</template>

<script>
import Trade from '@/components/Trade.vue';
import NavBar from '@/components/NavBar.vue';

export default {
    name: "TradeView",
    components: {
        Trade,
        NavBar,
    }
}
</script>