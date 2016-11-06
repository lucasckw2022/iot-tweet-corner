export default class MainController {
    constructor($http){
      this.state = {imageEnable: true, text: "Show"};
      this.message = "Twitter with #iot";
      this.$http = $http;
    }
    search(){
        this.tweets = "";
        this.$http.post("/authorize").then((res)=>{
          this.$http.post("/search",
                      'q='+this.searchTweets,
                      { headers: { 'Content-Type' : 'application/X-www-form-urlencoded'}
          })
          .then((res)=>{
            console.log(res.data.data)
            this.tweets = res.data.data.statuses;
          })
        })
    }
    imageToggle(){
      console.log("before: "+this.state.imageEnable)
      this.state.imageEnable = !this.state.imageEnable;
      console.log("after: "+this.state.imageEnable);
    }
}