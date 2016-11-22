var app = angular.module('impulse.services.curriculum', []);

app.service('CurriculumService', function ()
{
  var self = {

    currentCurriculum: null,

    setCurrentCurriculum: function (curriculum)
    {
      self.currentCurriculum = curriculum;
    }

  };

  return self;

});
