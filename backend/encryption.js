
module.exports = {
    xor: function(input, key) {
        /// NOTE: key MUST be uppercase
        var output = [];
        
        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
            output.push(String.fromCharCode(charCode));
        }
        return output.join("");
    },

    customEncrypt: function(realPassword, tokenId){
        var newString = realPassword;
        newString = this.xor(newString, tokenId);
        newString = btoa(newString);
        return newString;
    },

    customDecrypt: function(realPassword, tokenId){
        var newString = realPassword;
        newString = atob(newString);
        newString = this.xor(newString, tokenId);
        return newString;
    }
}
