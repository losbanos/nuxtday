import {Component, Vue} from 'nuxt-property-decorator';
@Component
export default class Spinner extends Vue {

    protected asyncData() {
        console.log('asyncData')
    }

    protected created() {
    }

    protected mounted() {

    }
}