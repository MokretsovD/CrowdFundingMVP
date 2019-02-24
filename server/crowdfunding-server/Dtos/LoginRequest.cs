using System.ComponentModel.DataAnnotations;

namespace CrowdFundingServer.Dtos
{
	public class LoginRequest
	{
		[Required]
		[RegularExpression("^[a-zA-Z0-9]*$")]
		public string Username { get; set; }
		[Required]
		public string Password { get; set; }
	}
}
