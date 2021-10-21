import {Observable, Subscriber} from 'rxjs';

export class MapSubscriber extends Subscriber<any> {
    protected projectFn: (param: any) => any;

    constructor(subscriber: Subscriber<any>, projectFn: (param: any) => any) {
        super(subscriber);
        this.projectFn = projectFn;
    }

    protected _next(value: any) {
        this.destination.next?.(this.projectFn(value));
    }
}

export class MyMergeMapSubscriber extends Subscriber<any> {
    protected project: (params: any) => any;
    constructor(subscriber: Subscriber<any>, project: (params: any) => any) {
        super(subscriber);
        this.project = project;
    }

    protected _next(value: number) {
        console.log('outer = ', value);
        const o$: Observable<number> = this.project(value);
        o$.subscribe(
            n => {
                console.log('    inner = ', value);
                this.destination.next?.(n);
            }
        )
    }
}
