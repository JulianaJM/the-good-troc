<template>
    <div>
        <h1>Barters available</h1>
        <span v-if="barters.error" class="text-danger">ERROR: {{barters.error}}</span>
        <div v-if="barters">
            <ul v-for="barter in barters" :key="barter.id">
                <li>
                    <p>{{barter.title}}</p>
                    <img :src="barter.image" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState({
            barters: state => state.barters
        })
    },
    created () {
        this.getAllBarters();
    },
    methods: {
        ...mapActions('barters', {
            getAllBarters: 'getAll',
        })
    }
};
</script>