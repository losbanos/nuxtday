import {Component, Vue} from 'nuxt-property-decorator';

@Component
export default class Index extends Vue {
    protected mounted() {
        console.log('game index route = ', this.$route);
    }
}
