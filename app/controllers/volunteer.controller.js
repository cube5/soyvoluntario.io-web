export default class VolunteerController {
  constructor($rootScope, $scope, $resource, $timeout, $filter, $routeParams) {
    var id = $routeParams.id;
    var urlVolunteers = urlContext + "/volunteers",
      urlVolunteer = urlVolunteers + "/" + id,
      urlVolEvents = urlVolunteer + "/events",
      urlVolOngs = urlVolunteer + "/ongs";

    $scope.volunteerResource = {};
    $scope.volunteerEvents = [];
    $scope.volunteerOngs = [];

    var Volunteer = $resource(urlVolunteer);
    var VolunteerEvents = $resource(urlVolEvents);
    var VolunteerOngs = $resource(urlVolOngs);

    $scope.volunteerResource = Volunteer.get();

    VolunteerEvents.get().$promise.then(function(response) {
      angular.forEach(response.content, function(eventResource, key) {
        $scope.volunteerEvents.push(eventResource);
      });
    });

    VolunteerOngs.get().$promise.then(function(response) {
      angular.forEach(response.content, function(ongResource) {
        $scope.volunteerOngs.push(ongResource);
      });
    });

    //temp
    var randomId = Math.floor(Math.random() * 10);
    $scope.randomPhotoMed = "https://randomuser.me/api/portraits/med/lego/"+randomId+".jpg";
  }
}
