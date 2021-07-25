$('.wp').attr('href', `whatsapp://send?text=${window.location.href}`);
$('.fb').on('click', function () {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
        'facebook-share-dialog',
        'width=800,height=600'
    );
    return false;
});
$('.copy').on('click', function (text) {
    var inputc = document.body.appendChild(document.createElement("input"));
    inputc.value = window.location.href;
    inputc.focus();
    inputc.select();
    document.execCommand('copy');
    inputc.parentNode.removeChild(inputc);
    alert("Link Copied Successfully.");
});