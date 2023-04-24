document.getElementById("input_ava").addEventListener("change", function () {
    if (this.files[0]) {
        var fr = new FileReader();

        fr.addEventListener("label_ava", function () {
            document.getElementById("label_ava").style.backgroundImage = "url(" + fr.result + ")";
        }, false);

        fr.readAsDataURL(this.files[0]);
    }
});