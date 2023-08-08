<template>
    <div class="home">
        <NavBar/>
        <TradeHistory/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TradeHistory from '@/components/TradeHistory.vue';

export default {
    name: "TradeHistoryView",
    components: {
        NavBar,
        TradeHistory
    }
}
</script>