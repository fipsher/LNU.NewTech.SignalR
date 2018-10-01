using Microsoft.AspNetCore.Mvc;

namespace SignalRChat
{
    public class HomeController : Controller
    {
        [Route("")]
        public IActionResult Index() => View();
    }
}