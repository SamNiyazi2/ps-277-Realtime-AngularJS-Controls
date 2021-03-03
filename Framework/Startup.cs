using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Owin;
using Owin;

namespace RealtimeAngular
{

    // 03/03/2021 07:12 am - SSN - [20210303-0656] - [001] - M03-09 - Integrating the SignalR service

    public class Startup
    {
        private BackgroundTicker _backgroundTicker;

        public void Configuration(IAppBuilder app)
        {
            _backgroundTicker = new BackgroundTicker();
            app.MapSignalR();
        }
    }

}