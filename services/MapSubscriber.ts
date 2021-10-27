import {Observable, Subscriber, Subscription} from 'rxjs';

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

export class MySwitchMapSubscriber extends Subscriber<any> {

    protected innerSubscription!: Subscription;
    protected project: (params: any) => Observable<any>;

    constructor(subscriber: Subscriber<any>, project: (params: any) => Observable<any>) {
        super(subscriber);
        this.project = project;
    }

    protected _next(value: any) {
        console.log('outer = ', value);
        if (this.innerSubscription) {
            console.log(this.innerSubscription);
            this.innerSubscription.unsubscribe();
        }

        const o$: Observable<any> = this.project(value);
        this.innerSubscription = o$.subscribe(
            n => {
                console.log('inner = ', n);
                this.destination.next?.(n);
            }
        )
    }
}

export class MyConcatMapSubscriber extends Subscriber<any> {
    private project: (params: any) => Observable<any>;
    private innerSubscription!: Subscription;
    private buffer: Array<any> = [];

    constructor(subscriber: Subscriber<any>, project: (params: any) => Observable<any>) {
        super(subscriber);
        this.project = project;
    }

    protected _next(value: Observable<any>) {
        const {isStopped} = this.innerSubscription || {isStopped: true};

        if (!isStopped) {
            this.buffer = [...this.buffer, value];
        } else {
            const o$: Observable<any> = this.project(value);
            this.innerSubscription = o$.subscribe(
                n => {
                    console.log('inner = ', n);
                    this.destination.next?.(n);
                },
                e => console.error(e.message),
                () => {
                    console.log('buffer = ', this.buffer);
                    if (this.buffer.length) {
                        const [first$, ...rest] = this.buffer;
                        this.buffer = rest;
                        this._next(first$);
                    }
                }
            )
            this.add(this.innerSubscription);
        }
    }
}
