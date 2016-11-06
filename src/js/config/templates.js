angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('main/main.html','<section class="top-area {{$main.state.fadeOut}}" ng-class="$main.state.searched ? \'searched\' : \'search\'">\n  <h1>{{ $main.state.title }}</h1>\n  <form class="search-area">\n    <input type="text" data-ng-model="$main.searchTweets" placeholder="Search Tweets Here"></input>\n    <button class="btn btn-primary" data-ng-click="$main.search()">Search</button>\n  </form>\n  <div class="image-toggle">\n    <input type="checkbox" data-ng-click="$main.imageToggle()" id="image-toggle"></input>\n    <label for="image-toggle">{{$main.state.imageToggleLabel}} Tweets Image</label>\n  </div>\n<div ng-show="$main.state.error">Opsss. No Tweets Searched</div>\n</section>\n<section class="tweets-list">\n  <tweets-list tweets="$main.tweets" image-enable="$main.state.imageEnable" limit="$main.state.searchLimit"></tweets-list>\n</section>');
$templateCache.put('tweets/tweets.html','<div class="tweets">\n  <div class="card" data-ng-repeat="tweet in $tweets.tweets | limitTo:$tweets.limit">\n    <div class="card-block text-xs-center">\n      {{ tweet.text }}\n    </div>\n    <img  data-ng-src={{tweet.entities.media[0].media_url}} \n          data-ng-class="{\'ng-hide\' : !$tweets.imageEnable }" \n          alt="">\n  </div>\n  <button class="btn btn-secondary" \n          ng-show="$tweets.tweets.length > 0" \n          data-ng-click="$tweets.loadMore()">Load More</button>\n</div>\n<a  class="back-to-top btn btn-secondary" \n    ng-show="$tweets.tweets.length > 0" \n    href="#">\n  <i class="fa fa-angle-up"></i>\n</a>');}]);