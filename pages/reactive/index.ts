import {Component, Vue} from 'vue-property-decorator';
import {interval, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Component
export default class Index extends Vue {
    protected asyncData() {
        console.log('asyncData')
    }

    protected created() {
        const i$: Observable<number> = interval(1000).pipe(take(2));
        i$.subscribe(n => console.log(n));
    }
    protected mounted() {
        console.log('reactive mounted');
    }
}