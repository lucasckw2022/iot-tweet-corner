export default class MainController {
    constructor($http, $animate){
      this.state = {imageEnable     : true, 
                    text            : "Show",
                    title           : "#IoT Tweets Corner",
                    imageToggleLabel: "Check to hide",
                    searched        : false,
                    fadeOut         : "",
                    loadingTweets   : false
                    };
      this.$http    = $http;
      this.$animate = $animate;
    }
    search(){
        this.tweets        = "";
        this.state.fadeOut = "fade-out";
        this.state.loadingTweets = true;
        this.searchLimit = 5;
        this.$http.post("/authorize")
        .success(res =>{
            this.$http.post("/search",
                            'q='+this.searchTweets,
                            { headers: { 'Content-Type' : 'application/X-www-form-urlencoded'}
            })
            .then(res =>{
              this.state.loadingTweets = false;
              this.state.searched = true;
              res.data.data.statuses.length == 0 ? this.state.error = true : this.state.error = false;
              this.tweets = res.data.data.statuses;
            })
          })
    }
    imageToggle(){
      this.state.imageEnable = !this.state.imageEnable;
      this.state.imageEnable ? this.state.imageToggleLabel = "Check to hide" : this.state.imageToggleLabel = "Uncheck to show"
    }
}