export default class TweetsController {
    constructor(){
    }
    loadMore(){
        this.limit = this.limit + 5;
    }
}