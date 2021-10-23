import {Component, Vue} from 'nuxt-property-decorator';
import {Context} from '@nuxt/types';
import {
    from,
    MonoTypeOperatorFunction,
    Observable,
    Subscriber,
    TeardownLogic,
    of,
    fromEvent,
    OperatorFunction
} from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';
import StatusSubscriber from '~/services/StatusSubscriber';
import {multiply, mySwitchMap} from '~/services/StatusOperators';
import {delay, scan} from 'rxjs/operators';
import {MyMergeMapSubscriber} from '~/services/MapSubscriber';
import {myMergeMap} from '~/services/StatusOperators';

@Component({
    name: 'gameNo'
})
export default class _gameNo extends Vue {
    protected asyncData({params}: Context) {
        console.log(params);
    }

    protected validate({params}: Context) {
        return (/^\d+$/g).test(params.gameNo);
    }

    protected mounted() {
        console.log('_gameNo route = ', this.$route);

        const arrSubscriber = {
            next: (n: number) => {
                console.log('n = ', n)
            },
            error: (e: Error) => console.error(e.message),
            complete: () => console.log('COMPLETE')
        }
        const ob$: Observable<number> = from([1, 2, 3, 4]);
        // ob$.subscribe(new StatusSubscriber(arrSubscriber));


        // const myMergeMap = (project: (params: any) => any) => (source: Observable<any>) => {
        //     return source.lift({
        //         call: (subscriber: Subscriber<any>, resource: Observable<any>) => {
        //             resource.subscribe(new MyMergeMapSubscriber(subscriber, project));
        //         }
        //     })
        // }
        const click$: Observable<Event> = fromEvent(document, 'click');
        click$.pipe(
            scan(i => i + 1, 0),
            mySwitchMap((n: any) => of(n).pipe(delay(1000)))
        ).subscribe(arrSubscriber);

        // ob$.pipe(multiply(4)).subscribe(arrSubscriber);
    }
}
