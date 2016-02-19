module.exports = function (SweetAlert) {
  'ngInject';

  return {
    'destroy' : function (callback) {
      SweetAlert.swal({
        title: 'Esta seguro de eliminar?',
        text: 'No sera capaz de recuperar el registro!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, eliminalo!',
        closeOnConfirm: true,
      }, function(isConfirm) {
        if (isConfirm) {
          callback();
        }
      });
    }
  };
};
