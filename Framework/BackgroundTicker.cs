using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

// 03/03/2021 07:15 am - SSN - [20210303-0656] - [003] - M03-09 - Integrating the SignalR service


using Microsoft.AspNet.SignalR;
using System.Threading;
using System.Web.Hosting;


namespace RealtimeAngular
{
    public class BackgroundTicker : IRegisteredObject
    {

        private Timer taskTimer;
        private IHubContext hub;

        public double bandwidthPct = 20.0;
        public double cpuPct = 10.0;
        public double salesAmt = 1000.0;
        public double alphaSalesAmt = 700;
        public double betaSalesAmt = 300.0;


        public BackgroundTicker()
        {
            HostingEnvironment.RegisterObject(this);

            hub = GlobalHost.ConnectionManager.GetHubContext<MetricHub>();

            taskTimer = new Timer(onTimerElased, null, TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(5));
        }


        private void onTimerElased(object state)
        {
            hub.Clients.All.broadcastMessage(DateTime.UtcNow.ToString(), bandwidthPct, cpuPct, salesAmt, alphaSalesAmt, betaSalesAmt);

            Random r = new Random();

            bandwidthPct = 65 * r.NextDouble();
            if (bandwidthPct > 100) bandwidthPct = 100;
            if (bandwidthPct < 0) bandwidthPct = 0;

            // cpuPct = 15 * r.NextDouble() - 7.5;
            cpuPct = 20 + 15 * r.NextDouble() ;
            if (cpuPct > 100) cpuPct = 100;
            if (cpuPct < 0) cpuPct = 0;

            alphaSalesAmt += r.NextDouble() * 10;

            betaSalesAmt += r.NextDouble() * 10;

            salesAmt = alphaSalesAmt + betaSalesAmt;

        }


        public void Stop(bool immediate)
        {
            taskTimer.Dispose();
            HostingEnvironment.UnregisterObject(this);
        }


    }
}