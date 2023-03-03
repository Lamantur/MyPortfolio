function sendauth() {
    $.ajax({
        url: './registration_php/auth.php',
        method: 'post',
        data: { login: $("#login").val(), pass: $("#pass").val() },
        success: function (data) {
            if (data) {
                $(".auth_result").css("display", "")
                $(".auth_result").text("I'm login as " + data);
            }
            else {
                $(".auth_result").css("display", "none")
                $(".auth_result").text("");
            }
        },
        error: function (e) {
            $(".auth_result").css("display", "none")
            $(".auth_result").text("");
            alert(e.responseText);
        }
    });
}