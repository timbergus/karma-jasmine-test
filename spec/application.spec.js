describe('MainController', function() {
    // We will use this scope in our tests.
    var scope;
    // Mock app to allow us to inject our own dependencies.
    beforeEach(angular.mock.module('app'));
    // Mock the controller for the same reason and include
    // $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        // Create an empty scope.
        scope = $rootScope.$new();
        // Declare the controller and inject our empty scope.
        $controller('MainController', {
            $scope: scope
        });
    }));
    // The test starts here.
    it('should contain a variable text = "Hello World!"', function() {
        expect(scope.message).toBe('Hello World!');
    });
    // And this test will fail.
    it('should contain a variable text = "Hello Earth!"', function() {
        expect(scope.message).toBe('Hello Earth!');
    });
});
