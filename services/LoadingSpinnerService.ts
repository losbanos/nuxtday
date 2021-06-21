import {timer} from 'rxjs';

export class Spinner {
    public show() {
        console.log('spinner show');
        return this;
    }

    public hide() {
        console.log('spinner hide');
        return this;
    }
}
export function initLoadingSpinner() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Spinner());
        }, 2000);
    })
}