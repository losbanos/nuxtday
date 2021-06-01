import {Component, Vue} from 'vue-property-decorator';
import {Observable,interval} from 'rxjs';

@Component
export default class Index extends Vue {
    protected mounted() {
        console.log('mounted');
        const itv: Observable<number> = interval(100).pipe()   
    }
}