/**
 * Created by Prince on 25/06/2017.
 */
$(document).ready(function() {
    $("[rel='tooltip']").tooltip();

    $('.thumbnail').hover(
        function(){
            $(this).find('.caption').slideDown(250); //.fadeIn(250)
        },
        function(){
            $(this).find('.caption').slideUp(250); //.fadeOut(205)
        }
    );
});

$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 700) {
            $(".navbar").css("background" , "rgba(61,61,61, .5)");
        }

        else{
            $(".navbar").css("background" , "transparent");
        }
    })
});
