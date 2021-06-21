import {merge, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, filter, mapTo, pairwise, scan, shareReplay, startWith, switchMap, takeUntil} from 'rxjs/operators';
import { initLoadingSpinner, Spinner } from './LoadingSpinnerService';

const taskStarts: Subject<any> = new Subject();
const taskCompletes: Subject<any> = new Subject();
const showSpinner: Observable<any> = new Observable();

const loadUp: Observable<any> = taskStarts.pipe(mapTo(1));
const loadDown: Observable<any> = taskCompletes.pipe(mapTo(-1));

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

showSpinner.pipe(
    switchMap(() => shouldShowSpinner.pipe(
        takeUntil(shouldHidSpinner)
    ))
).subscribe()

const loadingSpinnerPromise = initLoadingSpinner();

loadingSpinnerPromise.then(spinner => {
    spinner.show()
})

export function newTaskStarted() {
    taskStarts.next();
}

export function exsitingTaskCompleted() {
    taskCompletes.next();
}
