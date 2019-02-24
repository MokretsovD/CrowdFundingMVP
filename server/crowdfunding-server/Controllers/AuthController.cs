using System.ComponentModel.DataAnnotations;
using CrowdFundingServer.Dtos;
using CrowdFundingServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace CrowdFundingServer.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private AuthService AuthService { get; }
		public AuthController(AuthService authService)
		{
			AuthService = authService;
		}

		[HttpPost]
		public ActionResult<User> Login([Required, FromBody] LoginRequest request)
		{
			return AuthService.Login(request.Username, request.Password);
		}
	}
}
