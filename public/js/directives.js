//============DIRECTIVE FOR HOME BACKGROUND IMAGE===========
myApp.directive('homeBackground', function () {
    return function (scope, element, attrs) {
        element.css({
            	'background-image': 'url(' + attrs.homeBackground + ')',
                'background-size' : 'cover',
                'background-repeat' : 'no-repeat',
                'background-position' : 'center center',
                'height' : '100%',
                'width' : '100%',
                'position' : 'fixed'
        });//css
    };//function
});//directive function

//============DIRECTIVE FOR EVENTS BACKGROUND IMAGE===========
myApp.directive('eventBackground', function () {
    return function (scope, element, attrs) {
        element.css({
            	'background-image': 'url(' + attrs.eventBackground + ')',
                'background-size' : 'cover',
                'background-repeat' : 'no-repeat',
                'background-position' : 'center center',
                'width' : '100%'
        });//css
    };//function
});//directive function

//============DIRECTIVE FOR EVENTS BACKGROUND IMAGE HEADER===========
myApp.directive('headerBackground', function () {
    return function (scope, element, attrs) {
        element.css({
                'background-image': 'url(' + attrs.headerBackground + ')',
                'background-size' : 'cover',
                'background-repeat' : 'no-repeat',
                'background-position' : 'center center',
                'width' : '100%'
        });//css
    };//function
});//directive function

//============DIRECTIVE FOR USERS BACKGROUND IMAGE HEADER===========
myApp.directive('usersBackground', function () {
    return function (scope, element, attrs) {
        element.css({
                'background-image': 'url(' + attrs.usersBackground + ')',
                'background-size' : 'cover',
                'background-repeat' : 'no-repeat',
                'background-position' : 'center center',
                'width' : '100%'
        });//css
    };//function
});//directive function