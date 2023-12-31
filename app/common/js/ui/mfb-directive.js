+(function(window, angular, undefined){

  'use strict';

  var mfb = angular.module('ng-mfb', []);

  mfb.run(['$templateCache', function($templateCache) {
    $templateCache.put('ng-mfb-menu-default.tpl.html',
    '<ul class="mfb-component--{{position}} mfb-{{effect}}"' +
    '    data-mfb-toggle="{{togglingMethod}}" data-mfb-state="{{menuState}}">' +
    '  <li class="mfb-component__wrap">' +
    '    <a ng-click="clicked()" ng-mouseenter="hovered()" ng-mouseleave="hovered()"' +
    '       ng-attr-data-mfb-label="{{label}}" class="mfb-component__button--main" style="background-color:{{bgcolor}}">' +
    '     <i class="mfb-component__main-icon--resting material-icons">edit</i>' +
    '     <i class="mfb-component__main-icon--active material-icons">close</i>' +
    '    </a>' +
    '    <ul class="mfb-component__list" ng-transclude>' +
    '    </ul>' +
    '</li>' +
    '</ul>'
    );

    $templateCache.put('ng-mfb-menu-md.tpl.html',
    '<ul class="mfb-component--{{position}} mfb-{{effect}}"' +
    '    data-mfb-toggle="{{togglingMethod}}" data-mfb-state="{{menuState}}">' +
    '  <li class="mfb-component__wrap">' +
    '    <a ng-click="clicked()" ng-mouseenter="hovered()" ng-mouseleave="hovered()"' +
    '       style="box-shadow: none; background-color:{{bgcolor}}"' +
    '       ng-attr-data-mfb-label="{{label}}" class="mfb-component__button--main mfb-main-bg">' +
    '     <md-button class="md-fab md-primary" aria-label={{label}}>' +
    '       <md-icon style="position:initial;" md-svg-icon="{{resting}}"' +
    '         class="mfb-component__main-icon--resting"></md-icon>' +
    '       <md-icon style="position:initial;" md-svg-icon="{{active}}"' +
    '         class="mfb-component__main-icon--active"></md-icon>' +
    '     </md-button>' +
    '    </a>' +
    '    <ul class="mfb-component__list" ng-transclude>' +
    '    </ul>' +
    '</li>' +
    '</ul>'
    );

    $templateCache.put('ng-mfb-button-default.tpl.html',
    '<li>' +
    '  <a data-mfb-label="{{label}}" class="mfb-component__button--child" style="background-color:{{bgcolor}}">' +
    '    <i class="mfb-component__child-icon material-icons"> {{icon}}' +
    '    </i>' +
    '  </a>' +
    '</li>'
    );

    $templateCache.put('ng-mfb-button-md.tpl.html',
    '<li>' +
    '  <a href="" data-mfb-label="{{label}}" class="mfb-component__button--child" ' +
    '     style="box-shadow: none; background-color:{{bgcolor}}">' +
    '     <md-button class="md-fab md-primary" aria-label={{label}}>' +
    '       <md-icon md-svg-icon="{{icon}}"></md-icon>' +
    '     </md-button>' +
    '  </a>' +
    '</li>'
    );
  }]);

  mfb.directive('mfbMenu', ['$timeout',function($timeout){
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        position: '@',
        effect: '@',
        label: '@',
        bgcolor: '@',
        resting: '@restingIcon',
        active: '@activeIcon',
        menuState: '=?',
        togglingMethod: '@',
      },
      templateUrl: function(elem, attrs) {
        return attrs.templateUrl || 'ng-mfb-menu-default.tpl.html';
      },
      link: function(scope, elem, attrs) {

        var openState = 'open',
            closedState = 'closed';

        /**
         * Check if we're on a touch-enabled device.
         * Requires Modernizr to run, otherwise simply returns false
         */
        function _isTouchDevice(){
          return window.Modernizr && Modernizr.touch;
        }

        function _isHoverActive(){
          return scope.togglingMethod === 'hover';
        }

        /**
         * Convert the toggling method to 'click'.
         * This is used when 'hover' is selected by the user
         * but a touch device is enabled.
         */
        function useClick(){
          scope.$apply(function(){
            scope.togglingMethod = 'click';
          });
        }
        /**
         * Invert the current state of the menu.
         */
        function flipState() {
          scope.menuState = scope.menuState === openState ? closedState : openState;
        }

        /**
         * Set the state to user-defined value. Fallback to closed if no
         * value is passed from the outside.
         */
        //scope.menuState = attrs.menuState || closedState;
        if(!scope.menuState){
          scope.menuState = closedState;
        }

        scope.clicked = function() {
          if(!_isHoverActive()){
            flipState();
          }
        };
        scope.hovered = function() {
          if(_isHoverActive()){
            //flipState();
          }
        };

        /**
         * If on touch device AND 'hover' method is selected:
         * wait for the digest to perform and then change hover to click.
         */
        if ( _isTouchDevice() && _isHoverActive() ){
          $timeout(useClick);
        }

        attrs.$observe('menuState', function(){
          scope.currentState = scope.menuState;
        });

      }
    };
  }]);


  mfb.directive('mfbButton', [function(){
    return {
      require: '^mfbMenu',
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        icon: '@',
        label: '@',
        bgcolor: '@'
      },
      templateUrl: function(elem, attrs) {
        return attrs.templateUrl || 'ng-mfb-button-default.tpl.html';
      }
    };
  }]);
  
  

})(window, angular);
