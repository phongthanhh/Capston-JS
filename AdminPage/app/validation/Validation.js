function Validation(){
    this.checkEmpty = function(valInput, msgErr, spanID){
        if (valInput.trim() == ""){
            document.getElementById(spanID).innerHTML = msgErr;
            return false;
        }
        document.getElementById(spanID).innerHTML = "";
        return true;
    }

    this.checkPrice = function(valInput, msgErr, spanID){
        var pattern = /^[1-9]\d*$/;
        if(valInput.match(pattern)){
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
        document.getElementById(spanID).innerHTML = msgErr;
        return false;
    }

    this.checkDropdown = function(selectID, msgErr, spanID){
        var index = document.getElementById(selectID).selectedIndex;
        if(index == 0){
            document.getElementById(spanID).innerHTML = msgErr;
            return false;
        }
        document.getElementById(spanID).innerHTML = "";
        return true;
    }
}