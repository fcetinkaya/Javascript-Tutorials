 $(document).ready(function () {
     $("#newPersonForm").validate({
         rules: {
             'fnamebox': {
                 required: true
             },
             'snamebox': {
                 required: true
             },
             'countrybox': {
                 required: true
             },
             'citybox': {
                 required: true
             },
             'phonebox': {
                 required: true,
                 minlength: 7
             },
             'emailbox': {
                 required: true,
                 email: true,
             },
             'adressbox': {
                 required: true,
                 minlength: 10
             },
         },
         messages: {
             phonebox: {
                 minlength: "Your phone must be at least 7 characters long"
             },
             emailbox: {
                 email: "Check your e-mail address"
             },
             adressbox: {
                 minlength: "Your adress must be at least 10 characters long"
             }
         },
         highlight: function (element) {
             $(element).parent().addClass('error')
         },
         unhighlight: function (element) {
             $(element).parent().removeClass('error')
         }
     });
 });
