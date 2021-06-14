import {Component, Ref, Vue} from 'vue-property-decorator';
import Spinner from '@components/spinner/spinner';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {mapTo, scan, share, shareReplay} from 'rxjs/operators';

@Component({
    components: {
        Spinner
    }
})
export default class Index extends Vue {

    @Ref('emitButton')
    private $emitButton!: HTMLElement;

    @Ref('addSecondSubscriberButton')
    private $addSecondSubscriberButton!: HTMLElement;

    @Ref('tearDownButton')
    private $tearDownButton!: HTMLElement;

    protected created() {

    }
    protected mounted() {
        const emmissions$: Observable<number> = fromEvent(this.$emitButton, 'click').pipe(mapTo(1));
        let second$: Subscription;
        const source$: Observable<any> = emmissions$.pipe(
            scan((acc, current) => acc + current),
            shareReplay({bufferSize: 1, refCount: true})
        );

        let first$ = source$.subscribe(
            n => console.log('ONE = ', n)
        )
        this.$addSecondSubscriberButton.addEventListener('click', () => {
            console.log('Second Subscriber is Added');
            if (second$ && !second$.closed) {
                console.log('Second Subscriber is Closed');
                second$.unsubscribe();
            }
            second$ = source$.subscribe(
                n => console.log('Second = ', n)
            )
        });

        this.$tearDownButton.addEventListener('click', () => {
            first$.unsubscribe();
            second$.unsubscribe();
        })
        // const subscribe2
    }

    private onClickEmmition() {

    }

    private onClickTearDown() {

    }

    private onClickAddSecondSubscriber() {

    }
}