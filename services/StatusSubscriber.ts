import {Subscriber} from 'rxjs';

export default class StatusSubscriber extends Subscriber<number> {
    protected unit: number = 1;

    constructor(subscriber: Subscriber<any>, multipleUnit: number = 1) {
        super(subscriber);
        this.unit = multipleUnit;
    }
    protected _next(value: number) {
        this.destination.next?.(value * this.unit);
    }
}
