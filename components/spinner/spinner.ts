import { Observable, timer } from 'rxjs';
import {Component, Vue} from 'nuxt-property-decorator';
import { exsitingTaskCompleted, newTaskStarted } from '@services/SpinnerService';
@Component
export default class Spinner extends Vue {

    private slowWork$: Observable<number> = timer(2000);
    private veryslowWork$: Observable<number> = timer(6000);

    protected asyncData() {
        console.log('asyncData')
    }

    protected created() {
    }

    protected mounted() {

    }

    private onClickSlowButton() {
        newTaskStarted();
        this.slowWork$.subscribe(
            n => exsitingTaskCompleted()
        );
    }

    private onClickVerySlowButton() {
        newTaskStarted();
        this.veryslowWork$.subscribe(
            n => exsitingTaskCompleted()
        );
    }
}