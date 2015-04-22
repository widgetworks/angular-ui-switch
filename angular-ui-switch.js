angular.module('uiSwitch', [])

.directive('switch', [
  '$parse',
function($parse){
  return {
    restrict: 'AE'
  , replace: true
  , transclude: true
  , compile: function(tElement, tAttrs){
    
    var isDisabled = $parse(tAttrs.ngDisabled);
    var modelGetter = $parse(tAttrs.ngModel);
    
    // Change handler.
    var change = angular.noop;
    if (tAttrs.ngChange){
      change = $parse(tAttrs.ngChange);
    }
    
    return function link($scope, element, attrs){
        
        $scope.toggleSwitch = function(event){
            // Skip if we're disabled or key was not `space`.
            var validKey = (event.keyCode == 32 /*32 == space*/ || 
                            event.keyCode == 13 /*13 == enter*/);
            
            if (isDisabled($scope) || (event.keyCode && !validKey)){
                return;
            }
            event.preventDefault();
            event.stopImmediatePropagation();
            
            // Invert.
            var newValue = !modelGetter($scope);
            modelGetter.assign($scope, newValue);
            
            // Raise change event.
            change($scope);
        }
    }
  }
  , template: function(element, attrs) {
      var html = '';
      html += '<span ng-attr-tabindex="{{'+attrs.ngDisabled+' ? undefined : 0}}"';
      html +=   ' class="switch"';
      html +=   ' ng-click="toggleSwitch($event)"';
      html +=   ' ng-keydown="toggleSwitch($event)"';
      html +=   ' ng-class="{ checked:' + attrs.ngModel + ' }"';
      html +=   '>';
      html +=   '<small></small>';
      html +=   '<input type="checkbox"';
      html +=     ' class="ui-helper-hidden-accessible"';
      html +=     attrs.id ? ' id="' + attrs.id + '"' : '';
      html +=     attrs.name ? ' name="' + attrs.name + '"' : '';
      html +=     attrs.ngModel ? ' ng-model="' + attrs.ngModel + '"' : '';
      html +=     ' />';
      html +=     '<span class="switch-text">'; /*adding new container for switch text*/
      html +=     attrs.on ? '<span class="on">'+attrs.on+'</span>' : ''; /*switch text on value set by user in directive html markup*/
      html +=     attrs.off ? '<span class="off">'+attrs.off + '</span>' : ' ';  /*switch text off value set by user in directive html markup*/
      html += '</span>';
      return html;
    }
  }
}]);
