import { Component, Vue } from 'nuxt-property-decorator';
import { exsitingTaskCompleted, newTaskStarted } from '@services/SpinnerService';

@Component
export default class FastButton extends Vue {
    
    private onClickFastButton() {
        newTaskStarted();
        new Promise((resolve) => {
            setTimeout(() => {
                exsitingTaskCompleted;
                resolve(1);
            }, 300)
        })
    }

    private onClickVeryFastButton() {
        newTaskStarted();
        new Promise((resolve) => {
            setTimeout(() => {
                exsitingTaskCompleted();
                resolve(1);
            }, 100);
        })
    }
}