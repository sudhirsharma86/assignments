(function ($) {

    function accountRegister() {
        $this = this;

        $this.initializeForm = function () {

            var ddlCountry = $('#ddlcountry');
            var ddlState = $('#ddlstate');
            var ddlCity = $('#ddlcity');


            $.get("/api/common/countrylist", function (data) {
                ddlCountry.html('<option>Please select any city</option>');
                $.each(data, function (index, value) {
                    ddlCountry.append('<option value="' + value.value + '">' + value.text + '</option>');
                });
            });


            ddlCountry.on('change', function () {
                ddlState.html('<option>Please select any state</option>');
                ddlCity.html('<option>Please select any city</option>');
                //  ddlState.empty();  
                $.ajax({
                    url: "/api/common/statelist",
                    type: 'post',
                    dataType: 'json',
                    data: { country_code: ddlCountry.val() },
                    success: function (data) {
                        $.each(data, function (index, value) {
                            ddlState.append('<option value="' + value.value + '">' + value.text + '</option>');
                        });
                    },
                });


            });

            ddlState.on('change', function () {
                ddlCity.html('<option>Please select any city</option>');
                //ddlCity.empty();

                var model = {
                    country_code: ddlCountry.val(),
                    state_code: $(this).val()
                };
                $.ajax({
                    url: "/api/common/citylist",
                    type: 'post',
                    data: model,
                    dataType: 'json',
                    success: function (data) {
                        $.each(data, function (index, value) {
                            ddlCity.append('<option value="' + value.value + '">' + value.text + '</option>');
                        });
                    },
                });
            });

            function checkformisvalid()
            {
                // cheaking the form input is valid
                // pending..
                return  true;
            }



            $("#form_registration").on("submit", function (event) {
                event.preventDefault();
                var isvalid = checkformisvalid();

                if (isvalid) {

                    var postdata = {
                        firstName: $("#firstName").val(),
                        lastName: $("#lastName").val(),
                        email: $("#email").val(),
                        address1: $("#address1").val(),
                        address2: $("#address2").val(),
                        country: $("#ddlcountry option:selected").text(),
                        state: $("#ddlstate option:selected").text(),
                        city: $("#ddlcity option:selected").text(),

                    };



                    $.ajax({
                        url: "/api/account/register",
                        type: 'POST',
                        dataType: 'json',
                        data: postdata,
                        success: function (response) {
                            alert(response.message);
                            if (response.success) {
                                $("#form_registration")[0].reset();
                            }
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        }
                    });
                }
            });


        }
    }

    $(function () {
        var account = new accountRegister();
        account.initializeForm();
    })


}(jQuery));