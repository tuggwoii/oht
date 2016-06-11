﻿'use strict';
module.controller('HotelController', ['$scope', '$timeout', '$location', 'HotelService', 'NotificationService',
    function ($scope, $timeout, $location, HotelService, NotificationService) {

    $scope.state = {};
    $scope.user = {};
    $scope.params = $location.search();

    function setArea(key) {
        console.log(key);
        angular.forEach($scope.areas, function (area) {
            if (area.key === key) {
                $scope.area = area;
            }
        });
        console.log($scope.area);
    }

    $scope.onLoad = function () {
        $scope.loadModel();
    };

    $scope.loadModel = function () {
        NotificationService.loading();
        HotelService.get($scope.params.id).success(function (res) {
            $scope.model = res.data;
            $scope.areas = areas;
            setArea($scope.model.area);
        }).error(function () {
            NotificationService.openDialog({
                message: $scope.strings['cant_load_hotel']
            });
        }).finally(function () {
            NotificationService.stopLoading();
        });
    };

    $scope.save = function () {
        NotificationService.loading();
        HotelService.save($scope.model).success(function (res) {
            $scope.model = res.data;
            NotificationService.openNotify({
                title: $scope.strings['success'],
                message: $scope.strings['save_hotel_success'],
                type: 'success'
            });
        }).error(function () {
            NotificationService.openDialog({
                message: $scope.strings['cant_save_hotel']
            });
        }).finally(function () {
            NotificationService.stopLoading();
        });
    };

    $scope.onDelete = function () {
        NotificationService.confirm(function () {
            NotificationService.loading();
            HotelService.delete($scope.model.id).success(function () {
                NotificationService.openNotify({
                    title: $scope.strings['success'],
                    message: $scope.strings['delete_hotel_success'],
                    type: 'success'
                });
                window.location.href = '/dashboard#/hotels';
            }).error(function () {
                NotificationService.openDialog({
                    message: $scope.strings['cant_delete_hotel']
                });
            }).finally(function () {
                NotificationService.stopLoading();
            });
        });
    };

    $scope.changeArea = function () {
        setArea($scope.model.area);
    };

    $scope.onLoad();

}]);
