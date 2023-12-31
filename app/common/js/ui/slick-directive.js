'use strict';

angular
  .module('slick', [])
  //global config
  .constant('slickCarouselConfig', {
    method: {},
    event: {}
  })
  .directive('slick', [
    '$timeout', 'slickCarouselConfig', function ($timeout, slickCarouselConfig) {
      var slickMethodList, slickEventList;
      slickMethodList = ['slickGoTo', 'slickNext', 'slickPrev', 'slickPause', 'slickPlay', 'slickAdd', 'slickRemove', 'slickFilter', 'slickUnfilter', 'unslick'];
      slickEventList = ['afterChange', 'beforeChange', 'breakpoint', 'destroy', 'edge', 'init', 'reInit', 'setPosition', 'swipe', 'lazyLoaded', 'lazyLoadError'];

      return {
		 restrict: 'AEC',
        scope: {
        	initOnload: '@',
        	data: '=',
          settings: '=',
          enabled: '@',
          accessibility: '@',
          adaptiveHeight: '@',
          autoplay: '@',
          autoplaySpeed: '@',
          arrows: '@',
          asNavFor: '@',
          appendArrows: '@',
          prevArrow: '@',
          nextArrow: '@',
          centerMode: '@',
          centerPadding: '@',
          cssEase: '@',
          customPaging: '&',
          dots: '@',
          draggable: '@',
          fade: '@',
          focusOnSelect: '@',
          easing: '@',
          edgeFriction: '@',
          infinite: '@',
          initialSlide: '@',
          lazyLoad: '@',
          mobileFirst: '@',
          pauseOnHover: '@',
          pauseOnDotsHover: '@',
          respondTo: '@',
          responsive: '=?',
          rows: '@',
          slide: '@',
          slidesPerRow: '@',
          slidesToShow: '@',
          slidesToScroll: '@',
          speed: '@',
          swipe: '@',
          swipeToSlide: '@',
          touchMove: '@',
          touchThreshold: '@',
          useCSS: '@',
          variableWidth: '@',
          vertical: '@',
          verticalSwiping: '@',
          rtl: '@'
        },
        restrict: 'AE',
        link: function (scope, element, attr) {
          //hide slider
          angular.element(element).css('display', 'none');

          var options, initOptions, destroy, init, destroyAndInit, currentIndex;

          initOptions = function () {
            options = angular.extend(angular.copy(slickCarouselConfig), {
              enabled: scope.enabled !== 'false',
              accessibility: scope.accessibility !== 'false',
              adaptiveHeight: scope.adaptiveHeight === 'true',
              autoplay: scope.autoplay === 'true',
              autoplaySpeed: scope.autoplaySpeed != null ? parseInt(scope.autoplaySpeed, 10) : 3000,
              arrows: scope.arrows !== 'false',
              asNavFor: scope.asNavFor ? scope.asNavFor : void 0,
              appendArrows: scope.appendArrows ? angular.element(scope.appendArrows) : angular.element(element),
              prevArrow: scope.prevArrow ? angular.element(scope.prevArrow) : void 0,
              nextArrow: scope.nextArrow ? angular.element(scope.nextArrow) : void 0,
              centerMode: scope.centerMode === 'true',
              centerPadding: scope.centerPadding || '50px',
              cssEase: scope.cssEase || 'ease',
              customPaging: attr.customPaging ? function (slick, index) {
                return scope.customPaging({slick: slick, index: index});
              } : void 0,
              dots: scope.dots === 'true',
              draggable: scope.draggable !== 'false',
              fade: scope.fade === 'true',
              focusOnSelect: scope.focusOnSelect === 'true',
              easing: scope.easing || 'linear',
              edgeFriction: scope.edgeFriction || 0.15,
              infinite: scope.infinite !== 'false',
              initialSlide: parseInt(scope.initialSlide) || 0,
              lazyLoad: scope.lazyLoad || 'ondemand',
              mobileFirst: scope.mobileFirst === 'true',
              pauseOnHover: scope.pauseOnHover !== 'false',
              pauseOnDotsHover: scope.pauseOnDotsHover === "true",
              respondTo: scope.respondTo != null ? scope.respondTo : 'window',
              responsive: scope.responsive || void 0,
              rows: scope.rows != null ? parseInt(scope.rows, 10) : 1,
              slide: scope.slide || '',
              slidesPerRow: scope.slidesPerRow != null ? parseInt(scope.slidesPerRow, 10) : 1,
              slidesToShow: scope.slidesToShow != null ? parseInt(scope.slidesToShow, 10) : 1,
              slidesToScroll: scope.slidesToScroll != null ? parseInt(scope.slidesToScroll, 10) : 1,
              speed: scope.speed != null ? parseInt(scope.speed, 10) : 300,
              swipe: scope.swipe !== 'false',
              swipeToSlide: scope.swipeToSlide === 'true',
              touchMove: scope.touchMove !== 'false',
              touchThreshold: scope.touchThreshold ? parseInt(scope.touchThreshold, 10) : 5,
              useCSS: scope.useCSS !== 'false',
              variableWidth: scope.variableWidth === 'true',
              vertical: scope.vertical === 'true',
              verticalSwiping: scope.verticalSwiping === 'true',
              rtl: scope.rtl === 'true'
            }, scope.settings);

          };

          destroy = function () {
            var slickness = angular.element(element);
            if (slickness.hasClass('slick-initialized')) {
              slickness.remove('slick-list');
              slickness.slick('unslick');
            }

            return slickness;
          };

          init = function () {
            initOptions();

            var slickness = angular.element(element);

            if (angular.element(element).hasClass('slick-initialized')) {
              if (options.enabled) {
                return slickness.slick('getSlick');
              } else {
                destroy();
              }
            } else {
              if (!options.enabled) {
                return;
              }
              // Event
              slickness.on('init', function (event, slick) {
                if (typeof options.event.init !== 'undefined') {
                  options.event.init(event, slick);
                }
                if (typeof currentIndex !== 'undefined') {
                  return slick.slideHandler(currentIndex);
                }
              });

              $timeout(function () {
                angular.element(element).css('display', 'block');
                slickness.not('.slick-initialized').slick(options);
              });
            }

            scope.internalControl = options.method || {};

            // Method
            slickMethodList.forEach(function (value) {
              scope.internalControl[value] = function () {
                var args;
                args = Array.prototype.slice.call(arguments);
                args.unshift(value);
                slickness.slick.apply(element, args);
              };
            });

            // Event
            slickness.on('afterChange', function (event, slick, currentSlide) {
              currentIndex = currentSlide;
              if (typeof options.event.afterChange !== 'undefined') {
                $timeout(function () {
                  scope.$apply(function () {
                    options.event.afterChange(event, slick, currentSlide);
                  });
                });
              }
            });

            slickness.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              if (typeof options.event.beforeChange !== 'undefined') {
                $timeout(function () {
                  $timeout(function () {
                    scope.$apply(function () {
                      options.event.beforeChange(event, slick, currentSlide, nextSlide);
                    });
                  });
                });
              }
            });

            slickness.on('reInit', function (event, slick) {
              if (typeof options.event.reInit !== 'undefined') {
                $timeout(function () {
                  scope.$apply(function () {
                    options.event.reInit(event, slick);
                  });
                });
              }
            });

            if (typeof options.event.breakpoint !== 'undefined') {
              slickness.on('breakpoint', function (event, slick, breakpoint) {
                $timeout(function () {
                  scope.$apply(function () {
                    options.event.breakpoint(event, slick, breakpoint);
                  });
                });
              });
            }
            if (typeof options.event.destroy !== 'undefined') {
              slickness.on('destroy', function (event, slick) {
                $timeout(function () {
                  scope.$apply(function () {
                    options.event.destroy(event, slick);
                  });
                });
              });
            }
            if (typeof options.event.edge !== 'undefined') {
              slickness.on('edge', function (event, slick, direction) {
                $timeout(function () {
                  scope.$apply(function () {
                    options.event.edge(event, slick, direction);
                  });
                });
              });
            }

            if (typeof options.event.setPosition !== 'undefined') {
              slickness.on('setPosition', function (event, slick) {
                $timeout(function () {
                  scope.$apply(function () {
                    options.event.setPosition(event, slick);
                  });
                });
              });
            }
            if (typeof options.event.swipe !== 'undefined') {
              slickness.on('swipe', function (event, slick, direction) {
                $timeout(function () {
                  scope.$apply(function () {
                    options.event.swipe(event, slick, direction);
                  });
                });
              });
            }
            if (typeof options.event.lazyLoaded !== 'undefined') {
              slickness.on('lazyLoaded', function (event, slick, image, imageSource) {
                $timeout(function () {
                  scope.$apply(function () {
                    options.event.lazyLoaded(event, slick, image, imageSource);
                  });
                });
              });
            }
            if (typeof options.event.lazyLoadError !== 'undefined') {
              slickness.on('lazyLoadError', function (event, slick, image, imageSource) {
                $timeout(function () {
                  scope.$apply(function () {
                    options.event.lazyLoadError(event, slick, image, imageSource);
                  });
                });
              });
            }
          };
			
		if (scope.initOnload) {
          return scope.$watch('data', function (newVal, oldVal) {
            if (newVal != null) {
            	destroy();
                init();
            }
          });
        } 
          destroyAndInit = function () {
            destroy();
            init();
          };

          element.one('$destroy', function () {
            destroy();
          });

          return scope.$watch('settings', function (newVal, oldVal) {
            if (newVal !== null) {
              return destroyAndInit();
            }
          }, true);

        }
      };
    }
  ]);

/*
'use strict';
angular.module('slick', []).directive('slick', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'AEC',
      scope: {
        initOnload: '@',
        data: '=',
        currentIndex: '=',
        accessibility: '@',
        adaptiveHeight: '@',
        arrows: '@',
        asNavFor: '@',
        appendArrows: '@',
        appendDots: '@',
        autoplay: '@',
        autoplaySpeed: '@',
        centerMode: '@',
        centerPadding: '@',
        cssEase: '@',
        customPaging: '&',
        dots: '@',
        draggable: '@',
        easing: '@',
        fade: '@',
        focusOnSelect: '@',
        infinite: '@',
        initialSlide: '@',
        lazyLoad: '@',
        onBeforeChange: '&',
        onAfterChange: '&',
        onInit: '&',
        onReInit: '&',
        onSetPosition: '&',
        pauseOnHover: '@',
        pauseOnDotsHover: '@',
        responsive: '=',
        rtl: '@',
        slide: '@',
        slidesToShow: '@',
        slidesToScroll: '@',
        speed: '@',
        swipe: '@',
        swipeToSlide: '@',
        touchMove: '@',
        touchThreshold: '@',
        useCSS: '@',
        variableWidth: '@',
        vertical: '@',
        prevArrow: '@',
        nextArrow: '@'
      },
      link: function (scope, element, attrs) {
        var destroySlick, initializeSlick, isInitialized;
        destroySlick = function () {
          return $timeout(function () {
            var slider;
            slider = $(element);
            slider.slick('unslick');
            slider.find('.slick-list').remove();
            return slider;
          });
        };
        initializeSlick = function () {
          return $timeout(function () {
            var currentIndex, customPaging, slider;
            slider = $(element);
            if (scope.currentIndex != null) {
              currentIndex = scope.currentIndex;
            }
            customPaging = function (slick, index) {
              return scope.customPaging({
                slick: slick,
                index: index
              });
            };
            slider.slick({
              accessibility: scope.accessibility !== 'false',
              adaptiveHeight: scope.adaptiveHeight === 'true',
              arrows: scope.arrows !== 'false',
              asNavFor: scope.asNavFor ? scope.asNavFor : void 0,
              appendArrows: scope.appendArrows ? $(scope.appendArrows) : $(element),
              appendDots: scope.appendDots ? $(scope.appendDots) : $(element),
              autoplay: scope.autoplay === 'true',
              autoplaySpeed: scope.autoplaySpeed != null ? parseInt(scope.autoplaySpeed, 10) : 3000,
              centerMode: scope.centerMode === 'true',
              centerPadding: scope.centerPadding || '50px',
              cssEase: scope.cssEase || 'ease',
              customPaging: attrs.customPaging ? customPaging : void 0,
              dots: scope.dots === 'true',
              draggable: scope.draggable !== 'false',
              easing: scope.easing || 'linear',
              fade: scope.fade === 'true',
              focusOnSelect: scope.focusOnSelect === 'true',
              infinite: scope.infinite !== 'false',
              initialSlide: scope.initialSlide || 0,
              lazyLoad: scope.lazyLoad || 'ondemand',
              beforeChange: attrs.onBeforeChange ? scope.onBeforeChange : void 0,
              onReInit: attrs.onReInit ? scope.onReInit : void 0,
              onSetPosition: attrs.onSetPosition ? scope.onSetPosition : void 0,
              pauseOnHover: scope.pauseOnHover !== 'false',
              responsive: scope.responsive || void 0,
              rtl: scope.rtl === 'true',
              slide: scope.slide || 'div',
              slidesToShow: scope.slidesToShow != null ? parseInt(scope.slidesToShow, 10) : 1,
              slidesToScroll: scope.slidesToScroll != null ? parseInt(scope.slidesToScroll, 10) : 1,
              speed: scope.speed != null ? parseInt(scope.speed, 10) : 300,
              swipe: scope.swipe !== 'false',
              swipeToSlide: scope.swipeToSlide === 'true',
              touchMove: scope.touchMove !== 'false',
              touchThreshold: scope.touchThreshold ? parseInt(scope.touchThreshold, 10) : 5,
              useCSS: scope.useCSS !== 'false',
              variableWidth: scope.variableWidth === 'true',
              vertical: scope.vertical === 'true',
              prevArrow: scope.prevArrow ? $(scope.prevArrow) : void 0,
              nextArrow: scope.nextArrow ? $(scope.nextArrow) : void 0
            });
            slider.on('init', function (sl) {
              if (attrs.onInit) {
                scope.onInit();
              }
              if (currentIndex != null) {
                return sl.slideHandler(currentIndex);
              }
            });
            slider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
              if (scope.onAfterChange) {
                scope.onAfterChange();
              }
              if (currentIndex != null) {
                return scope.$apply(function () {
                  currentIndex = currentSlide;
                  return scope.currentIndex = currentSlide;
                });
              }
            });
            return scope.$watch('currentIndex', function (newVal, oldVal) {
              if (currentIndex != null && newVal != null && newVal !== currentIndex) {
                return slider.slick('slickGoTo', newVal);
              }
            });
          });
        };
        if (scope.initOnload) {
          isInitialized = false;
          return scope.$watch('data', function (newVal, oldVal) {
            if (newVal != null) {
              if (isInitialized) {
                destroySlick();
              }
              initializeSlick();
              return isInitialized = true;
            }
          });
        } else {
          return initializeSlick();
        }
      }
    };
  }
]);
*/