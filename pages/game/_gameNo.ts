import {Component, Vue} from 'nuxt-property-decorator';
import {Context} from '@nuxt/types';

@Component({
    name: 'gameNo'
})
export default class _gameNo extends Vue {
    protected asyncData({params}: Context) {
        console.log(params);
    }

    protected validate({params}: Context) {
        console.log('params gameNo = ', params.gameNo);
        console.log('params gameNo = ', (/^\d+$/).test(params.gameNo));
        return (/^\d+$/g).test(params.gameNo);
    }

    protected mounted() {
        console.log('_gameNo route = ', this.$route);
    }
}
