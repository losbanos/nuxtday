import {Component, Vue} from 'nuxt-property-decorator';
import {newTaskStarted, exsitingTaskCompleted} from '@/services/SpinnerService';
import {Observable, timer} from 'rxjs';

@Component
export default class SlowButton extends Vue {

    private slowWork$: Observable<number> = timer(2000);
    private veryslowWork$: Observable<number> = timer(6000);

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