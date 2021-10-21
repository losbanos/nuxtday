import {MonoTypeOperatorFunction, Observable, Subscriber, pipe} from 'rxjs';
import StatusSubscriber from '~/services/StatusSubscriber';
import {MapSubscriber, MyMergeMapSubscriber} from '~/services/MapSubscriber';
import {filter} from 'rxjs/operators';

const pipe2 = (...fns: Array<any>) => (source: Observable<any>) => {
    return fns.reduce((acc, fn) => fn(acc), source)
}
export const multiply: (n: number) => MonoTypeOperatorFunction<any> = (multipleUnit: number) => {
    return pipe(
        map((n: number) => n * multipleUnit),
        filter((v: any) => v < 20)
    )
}

const map: (fn: (param: any) => any) => MonoTypeOperatorFunction<any> = (projectFn: (param: any) => any) => (source: Observable<number>) => {
    return source.lift({
        call: (sub, resource) => {
            resource.subscribe(new MapSubscriber(sub, projectFn));
        }
    })
}

export const myMergeMap = (project: (params: any) => any) => (source: Observable<any>): Observable<any> => {
    return source.lift({
        call: (sub: Subscriber<any>, resource: Observable<any>) => {
            resource.subscribe(new MyMergeMapSubscriber(sub, project))
        }
    })
}
