'use strict';
/* globals FieldDB */

angular.module('fielddbAngularApp').controller('FieldDBController', ['$scope', '$routeParams', '$rootScope',
  function($scope, $routeParams, $rootScope) {
    $scope.connection = {
      online: true,
      apiURL: 'https://localhost:3181/v2/',
      offlineCouchURL: 'https://localhost:6984'
    };
    FieldDB.FieldDBConnection.connection.localCouch.url = FieldDB.BASE_DB_URL;

    $scope.authentication = $scope.authentication || {
      user: {
        authenticated: false
      }
    };
    $scope.loginDetails = $scope.loginDetails || {
      username: '',
      password: ''
    };

    $scope.speakersList = new FieldDB.DataList({
      api: 'speakers'
    });
    $scope.consultantsList = new FieldDB.DataList({
      api: 'consultants'
    });
    $scope.participantsList = new FieldDB.DataList({
      api: 'participants'
    });
    $scope.usersList = new FieldDB.DataList({
      api: 'users'
    });

    $scope.sessionsList = new FieldDB.DataList({
      api: 'sessions'
    });
    $scope.datalistsList = new FieldDB.DataList({
      api: 'datalists'
    });
    $scope.datumsList = new FieldDB.DataList({
      api: 'datums'
    });

    $scope.responsesList = new FieldDB.DataList({
      api: 'responses'
    });
    $scope.reportsList = new FieldDB.DataList({
      api: 'reports'
    });

    $scope.importer = $scope.importer || null;
    $scope.search = $scope.search || null;
    $scope.currentDoc = $scope.currentDoc || null;
    $scope.team = $scope.team || null;
    $scope.corpus = $scope.corpus || null;
    $scope.thisyear = (new Date()).getFullYear();

    $scope.hasParticipants = function() {
      if (!$scope.participantsList || !$scope.participantsList.docs || !$scope.participantsList.docs.length) {
        return false;
      }
      return $scope.participantsList.docs.length > 0;
    };

    var processRouteParams = function() {
      if (!$routeParams) {
        console.warn('Route params are undefined, not loading anything');
        return;
      }
      $scope.routeParams = $routeParams;

      /*
       * Handle precise routes
       */
      if ($routeParams.importType) {
        $scope.importer = $scope.importer || new FieldDB.Import({
          importType: $routeParams.importType
        });
      } else if ($routeParams.reportType) {
        $scope.reportsList.filter = function(report) {
          if ($routeParams.reportType.match(report.type.toLowerCase())) {
            return true;
          } else {
            return false;
          }
        };
      } else if ($routeParams.speakerType) {
        $scope.speakersList.filter = function(speaker) {
          if ($routeParams.speakerType.match(speaker.type.toLowerCase())) {
            return true;
          } else {
            return false;
          }
        };
      } else if ($routeParams.searchQuery) {
        $scope.search = $scope.search || new FieldDB.Search({
          searchKeywords: $routeParams.searchQuery
        });
      } else if ($routeParams.docid) {
        if ($scope.doc && $scope.doc.save) {
          $scope.doc.bug('Switching to another document without saving...');
        }
        $scope.doc = new FieldDB.FieldDBObject({
          id: $routeParams.docid
        });
      }

      /*
       * Letting the url determine which team is loaded
       */
      if ($routeParams.team) {
        if ($scope.team && $scope.team.save) {
          $scope.team.bug('Switching to another team without saving...');
        }
        $scope.team = new FieldDB.Team({
          username: $routeParams.team
        });

        /*
         * Letting the url determine which corpus is loaded
         */
        if ($routeParams.corpusid) {
          $rootScope.currentCorpusDashboardDBname = $scope.team.validateUsername($routeParams.team).username + '-' + $scope.team.validateUsername($routeParams.corpusid).username;
          if ($rootScope.currentCorpusDashboardDBname.split('-').length < 2) {
            $scope.status = 'Please try another url of the form teamname/corpusname ' + $rootScope.currentCorpusDashboardDBname + ' is not valid.';
            return;
          }

          $scope.team.dbname = $rootScope.currentCorpusDashboardDBname;
          if ($scope.corpus && $scope.corpus.save) {
            $scope.corpus.bug('Switching to another corpus without saving...');
          }
          if (!$scope.corpus || $rootScope.currentCorpusDashboardDBname !== $scope.corpus.dbname) {
            $scope.corpus = new FieldDB.Corpus({
              dbname: $rootScope.currentCorpusDashboardDBname
            });
          }
        }
      }

      /*
       * Fetching models if they are not complete
       */

      // FieldDB.FieldDBConnection.connect().done(function(userroles) {
      // $scope.authentication.userroles = userroles;
      if ($scope.team && !$scope.team.gravatar) {
        $scope.team.status = 'Loading team details.';
        $scope.team.fetch(FieldDB.FieldDBConnection.connection.localCouch.url).then(function(result) {
          console.log('Suceeded to download team\'s public details.', result);
          $rootScope.status = $scope.team.status = 'Loaded team details.';
          $scope.$apply();
        }, function(result) {
          console.log('Failed to download team public details.', result);
          $rootScope.status = $scope.team.status = 'Failed to download team public details.';
          $scope.$apply();
        });
      }

      if ($scope.corpus && !$scope.corpus.title) {
        $scope.corpus.status = 'Loading corpus details.';
        $scope.corpus.loadOrCreateCorpusByPouchName($scope.corpus.dbname).then(function(result) {
          console.log('Suceeded to download corpus details.', result);
          $rootScope.status = $scope.corpus.status = 'Loaded corpus details.';
          $scope.$apply();
        }, function(result) {
          console.log('Failed to download corpus details.', result);

          $rootScope.status = $scope.corpus.status = 'Failed to download corpus details. Are you sure this is the corpus you wanted to see: ' + $scope.corpus.dbname;
          $scope.loginDetails.username = $scope.team.username;
          $scope.$apply();
        }).catch(function(error) {
          console.log(error);
        });
      }

    };
    processRouteParams();
    // FieldDB.FieldDBConnection.connect();

    console.log('In the FieldDBController', $scope.connection);
  }
]);
