import {Component, Vue} from 'nuxt-property-decorator';
import {Context} from '@nuxt/types';

@Component({
})
export default class index extends Vue {
    protected asyncData({params}: Context) {
        console.log('_category/index : params -= ', params);
    }
}
