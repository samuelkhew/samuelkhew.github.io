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
            url = 'https://script.google.com/macros/s/AKfycbxitHoscAQZYkI1zhSY-g-HJ7ZMgAEJjUYsKVXGelmEwxp4o3_t/exec'
        var jqxhr = $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: $form.serializeObject()
        })
    }
}

//(1)Show thank you alert (2)Send email to Jetpharma.
function submitContactForm(e) {
    var form = document.getElementById('contactForm');
    if (form.checkValidity() == true) {
        document.getElementById('contactSuccessAlert').style.display = "block";
        form.style.display = "none";

        e.preventDefault();
  
        const POST_URL = 'https://script.google.com/macros/s/AKfycbwM8IsIM0yEqegEfehwLvA5V2DJjDfU0GBTyHxh436NUVixAu6J/exec';
    
        const postRequest = {
        name: e.target['c_name'].value,
        email: e.target['c_email'].value,
        phone: e.target['c_phone'].value,
        message: e.target['c_message'].value
        };
        
        $.post(POST_URL, JSON.stringify(postRequest));
    }
}

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

//Smooth Scrolling
$("#mainNavbar a").on('click', function(event) {

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
  
      // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });