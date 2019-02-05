<template>
    <div>
         <h1>Hi {{account.user.username}}!</h1>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
        <ul>
            <li> <router-link to="/new">create items</router-link> </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState({
            account: state => state.account,
        })
    }
};
</script>
