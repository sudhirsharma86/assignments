using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SampleAPI.Models;

namespace SampleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SampleDBContext _context;
        public AccountController(SampleDBContext context)
        {
            _context=context;
        }

        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromForm] User model)
        {
            if(ModelState.IsValid){
               _context.Users.Add(model);
               _context.SaveChanges();

               return Ok(new { success = true, message= "Account added successfuly!"});
            }
           
            return Ok(new { success = false, message= "Error invalid data!"});
        }

        [Route("users")]
        [HttpGet]
        public IEnumerable<User> userlist()
        {
            return _context.Users.ToList();
        }
    }
}