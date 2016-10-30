/**!
 * NgCoverVid
 * Make your HTML5 video behave like a background cover image with this lightweight Angular directive
 * @author  James Feigel <james.feigel@gmail.com>
 * @version 0.1.0
 */
angular.module('ngCovervid',[])
	.directive('covervid', ['$window', '$timeout', function($window, $timeout){
		return {
			replace: true,
			restrict: 'EA',
			scope: {
				height: '@',
				width: '@'
			},
			template: '<video ng-transclude></video>',
			transclude: true,
			link: function(scope, elem, attrs) {
				function debounce(fn, delay) {
					var timer = null;

					return function () {
						var context = this,
							args = arguments;

						$timeout.cancel(timer);

						timer = $timeout(function () {
							fn.apply(context, args);
						}, delay);
					};
				};

				var height = parseInt(scope.height);
				var width = parseInt(scope.width);

				if (scope.height !== undefined && isNaN(height)) {
					console.error("Error: [covervid] 'height' provided is not a number. Found '" + scope.height + "'. Using native height of video.");
				}
				if (scope.width !== undefined && isNaN(width)) {
					console.error("Error: [covervid] 'width' provided is not a number. Found '" + scope.width + "'. Using native width of video.");
				}

				// call sizeVideo on resize
				angular.element($window).bind('resize', function() {
	                debounce(sizeVideo(), 50);
	            });

				// Set necessary styles to position video "center center"
				elem.css('position','absolute');
				elem.css('top','50%');
				elem.css('left','50%');
				elem.css('-webkit-transform','translate(-50%, -50%)');
				elem.css('-ms-transform','translate(-50%, -50%)');
				elem.css('transform','translate(-50%, -50%)');

				// Set overflow hidden on parent element
				elem.parent().css('overflow','hidden');

				// Define the attached selector
				function sizeVideo() {
					// Get parent element height and width
					var parentHeight = elem.parent()[0].offsetHeight;
					var parentWidth = elem.parent()[0].offsetWidth;

					// Get native video height and width
					var nativeHeight = height;
					var nativeWidth = width;

					// Get the scale factors
					var heightScaleFactor = parentHeight / nativeHeight;
					var widthScaleFactor = parentWidth / nativeWidth;

					// Based on highest scale factor set width and height
					if (widthScaleFactor > heightScaleFactor) {
						elem.css('height','auto');
						elem.css('width',parentWidth+'px');
					} else {
						elem.css('height',parentHeight+'px');
						elem.css('width','auto');
					}
				}

				if (isNaN(width) || isNaN(height)) {
					elem.bind('loadedmetadata', function() {
						width = elem[0].videoWidth;
						height = elem[0].videoHeight;
						sizeVideo();
					});
				}
				else {
					sizeVideo();
				}
			}
		}
	}]);