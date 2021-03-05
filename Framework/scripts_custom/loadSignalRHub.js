
// 03/052021 07:37 am - SSN 


$(function() {
     
    console.log('loaded-404-A');

    const signalRHubUrl = `${document.location.protocol}//${document.location.host}/signalr/hubs`;

    console.log( 'signalRHubUrl')
    console.log( signalRHubUrl)
    let scriptElement = document.createElement('script');
    scriptElement.src = signalRHubUrl;

    var heads = document.getElementsByTagName('head');
    heads[0].appendChild(scriptElement);
     
    console.log('loaded-404-Z');

});


