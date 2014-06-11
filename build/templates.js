angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("components/brand-header.html","<header class=\"brand\">\n	<img src=\"img/logo.png\"/>\n	<nav>\n		<ul>\n			<li><a href=\"\" ng-click=\"doLogout()\">Logout</a></li>\n			<li>|</li>\n			<li><a href=\"\" ng-click=\"doHelp()\">Help</a></li>\n		</ul>\n	</nav>\n</header>");
$templateCache.put("components/news-list.html","<div class=\"news\">\n	<article ng-repeat=\"item in news | limitTo:limit\">\n		<p><a href title=\"{{item.headline}}\">{{item.headline}}</a> &ndash; {{item.body}}</p>\n	</article>\n\n	<div ng-hide=\"limit === 99999\">\n		<div ng-show=\"news.length > limit\" class=\"ng-hide\"><a href ng-click=\"showMore()\">More...</a></div>\n		<div ng-show=\"limit && news.length && news.length <= limit\" class=\"ng-hide\"><a href ng-click=\"showLess()\">Less...</a></div>\n	</div>\n</div>");
$templateCache.put("components/sales-table.html","<table class=\"sales\">\n	<tr>\n		<th ng-repeat=\"key in keys\">{{key}}</th>\n	</tr>\n	<tr ng-repeat=\"sale in sales\">\n		<td ng-repeat=\"key in keys\">{{sale[key]}}</td>\n	</tr>\n</table>");
$templateCache.put("main/dashboard.html","<h1 class=\"bold\">Dashboard</h1>\n\n<section class=\"expanded\">\n	<heading title=\"Latest News\" ng-click=\"toggleSection($event)\">Latest News</heading>\n	<div class=\"news content\">\n\n		<news-list news=\"news\" limit=\"limit\"></news-list>\n\n	</div>\n</section>\n\n<section class=\"collapsed\">\n	<heading \"Product Sales\" ng-click=\"toggleSection($event)\">Product Sales</heading>\n	<div class=\"sales content\">\n\n		<sales-table sales=\"sales\" keys=\"keys\"></sales-table>\n\n	</div>\n</section>");
$templateCache.put("main/news.html","<h1 class=\"bold\">News</h1>\n\n<news-list></news-list>");
$templateCache.put("main/page.html","<h1 class=\"bold\">{{title}}</h1>");
$templateCache.put("main/sales.html","<h1 class=\"bold\">Sales</h1>\n\n<sales-table sales=\"sales\" keys=\"keys\"></sales-table>");
$templateCache.put("components/nav/side-nav.html","<nav class=\"main-nav\">\n	<ul>\n		<li ng-repeat=\"item in navItems\" ng-class=\"{active:isActive(\'/{{item.route}}\')}\">\n			<a href=\"#{{item.route}}\" title=\"{{item.title}}\">{{item.title}}</a>\n		</li>\n	</ul>\n</nav>");}]);