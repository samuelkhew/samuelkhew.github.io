
    //Collapse Navbar on mobile view when a link is clicked
    $('.navbar-nav>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });

    //Download Form: Setting the Place of Practice Variable to "N/A"
    function setPlaceVariable() {
        if (!document.getElementById('downloadYes').checked) {
            document.getElementById("downloadPlaceInput").value = "N/A";
        }
    }

    //Download Form: Show "Place of Practice" field if user clicks "Yes"
    function yesNoCheck() {
        if (document.getElementById('downloadYes').checked) {
            document.getElementById('placeOfPracticeDiv').style.display = "block";
            document.getElementById('downloadPlaceInput').focus();
            document.getElementById("downloadPlaceInput").value = "";
        }
        else {
            document.getElementById('placeOfPracticeDiv').style.display = "none";
            document.getElementById("downloadPlaceInput").value = "N/A";
        }
    }

    //Download Form: (1)Validation. (2)Upon successful submission, hide download button and show success message. (3)Save to Google Sheet.
    function submitDownloadForm() {
        var form = document.getElementById('downloadForm');
        if (form.checkValidity() == true) {
            //Show success message
            document.getElementById('downloadThankYouMessage').style.display = "block";
            document.getElementById('downloadToggleButton').style.display = "none";
            document.getElementById('downloadCollapse').style.display = "none";

            //Save details to Google Sheet
            var $form = $('form#downloadForm'),
                url = 'https://script.google.com/macros/s/AKfycbwHUBjJ82PvINsqadmIIfuRYkwTPIPst48CQ7TZoyN0iuohtTg/exec'
            var jqxhr = $.ajax({
                url: url,
                method: "GET",
                dataType: "json",
                data: $form.serializeObject()
            })
        }
    }

    //Prevent Product Catalogue download form from submitting by pressing "Enter"
    /*document.getElementById('downloadForm').addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
        e.preventDefault();  
        }
    });*/


    /*(1)Show thank you alert (2)Send email to Jetpharma.
    Note: The email is sending from jetpharmasdnbhd@gmail.com to enquiry@jetpharma.com.my
    If you exceed the daily send limit, it will NOT send.  However, the enquiry will appear in the jetpharmasdnbhd@gmail.com inbox.
    https://ctrlq.org/docs/20309-gmail-message-not-sent
    */
    function submitContactForm(e) {
        var form = document.getElementById('contactForm');
        if (form.checkValidity() == true) {
            document.getElementById('contactSuccessAlert').style.display = "block";
            form.style.display = "none";

            e.preventDefault();

            const POST_URL = 'https://script.google.com/macros/s/AKfycbwMnGgxNKIFjLMpU-hiD4aYdXZ4bYTolxLuwTAuz_8RsDAF_MYM/exec';
        
            const postRequest = {
            name: e.target['c_name'].value,
            email: e.target['c_email'].value,
            phone: e.target['c_phone'].value,
            message: e.target['c_message'].value
            };
            
            $.post(POST_URL, JSON.stringify(postRequest));
        }
    }

    //Prevent Contact form from submitting by pressing "Enter"
    var area = document.getElementById('contactMessageInput');

    document.getElementById('contactForm').addEventListener('keydown', function (e) {
        if (e.keyCode === 13 && e.target !== area) {
            e.preventDefault();  
        }
    });

    //Form validation script from getbootstrap.com
    (function () {
        'use strict';
        window.addEventListener('load', function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');

                }, false);
            });
        }, false);
    })();
    
//Remove #id from URL
$(function() {
    var uri = window.location.toString();
    if (uri.indexOf("#") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("#"));
        window.history.replaceState({}, document.title, clean_uri);
    }
});

//Smooth Scrolling
$("#mainNavbar a").on('click', function(event) {
    
    var uri = window.location.toString();
    if (uri.indexOf("#") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("#"));
        window.history.replaceState({}, document.title, clean_uri);
    }

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){

        });
    } // End if
});
