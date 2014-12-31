'use strict';

var app = angular.module('Hangman', ['ui.utils']);

app.constant('HG_CONFIG', {
    maxlength: 24,
    minlength: 5
});

app.controller('HangmanController',['$scope', 'HG_CONFIG', function($scope, HG_CONFIG) {
    $scope.HG_CONFIG = HG_CONFIG;
    $scope.category = '';
    $scope.sentences = [];
    $scope.players = [];
    $scope.letters = [];
    $scope.lettersShowing = "";
    $scope.currentSentence = '';
    $scope.gameStarted = false;
    $scope.alphabet = 'ABCDEFGHIJKLMNOPQRSTUWXYZ';
    $scope.alphabetArray = [];

    var truncate = [];

    $scope.validate = function(){
        var sentences = $scope.sentences.split('\n');
        truncate = [];

        angular.forEach(sentences, function(text){
            if(text.length >= HG_CONFIG.maxlength){
                text = text.substring(0,HG_CONFIG.maxlength);
            }

            if(text.length < HG_CONFIG.minlength){
                $scope.options.sentences.$setValidity('size', false);
            }
            else{
                $scope.options.sentences.$setValidity('size', true);
            }

            truncate.push(text);

        });
        $scope.sentences = truncate.join('\n');
    };

    $scope.startGame = function(){
        $scope.gameStarted = true;
        $scope.currentSentence = truncate[0].toUpperCase();;
        $scope.letters = $scope.currentSentence.split('');
        $scope.alphabetArray = $scope.alphabet.split('');
        $scope.checkLetter(' ');
    };

    $scope.checkLetter = function(letter){
        console.log(letter);
        if($scope.currentSentence.indexOf(letter) !=-1){
            $scope.currentSentence = $scope.currentSentence.split(letter).join('');
            $scope.lettersShowing += letter;
        }
    };

    $scope.letterExists = function(letter){
        return $scope.lettersShowing.indexOf(letter) >= 0;
    };
}]);




