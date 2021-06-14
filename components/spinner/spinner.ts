import {Component, Vue} from 'vue-property-decorator';
import {merge, Observable} from 'rxjs';
import {distinctUntilChanged, filter, mapTo, pairwise, scan, shareReplay, startWith} from 'rxjs/operators';

@Component
export default class Spinner extends Vue {
    protected taskStarts: Observable<any> = new Observable();
    protected taskCompletes: Observable<any> = new Observable();
    protected showSpinner: Observable<any> = new Observable();

    protected asyncData() {
        console.log('asyncData')
    }

    protected created() {
        const loadUp: Observable<any> = this.taskStarts.pipe(mapTo(1));
        const loadDown: Observable<any> = this.taskCompletes.pipe(mapTo(-1));

        const loadVariations: Observable<any> = merge(loadUp, loadDown);
        const currentLoadCount: Observable<number> = loadVariations.pipe(
            startWith(0),
            scan((totalCount, changeCount) => {
                return totalCount + changeCount;
            }),
            distinctUntilChanged(),
            shareReplay({bufferSize: 1, refCount: true})
        )

        const shouldHidSpinner: Observable<any> = currentLoadCount.pipe(
            filter(count => count === 0)
        );
        const shouldShowSpinner: Observable<any> = currentLoadCount.pipe(
            pairwise(),
            filter(([prevCount, currentCount]) => prevCount === 0 && currentCount === 1)
        )
    }
    protected mounted() {
        
    }
}