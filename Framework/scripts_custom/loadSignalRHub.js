
// 03/052021 07:37 am - SSN 


$(function() {
 
    const signalRHubUrl = `${document.location.protocol}//${document.location.host}/signalr/hubs`;
 
    let scriptElement = document.createElement('script');
    scriptElement.src = signalRHubUrl;

    var heads = document.getElementsByTagName('head');
    heads[0].appendChild(scriptElement);
 

});


