using CrowdFundingServer.Dtos;

namespace CrowdFundingServer.Services
{
	// Mock. Auth should be handled here
	public class AuthService
	{
		public User Login(string user, string password)
		{
			return new User
			{
				Id = user,
				Name = user,
				Token = user
			};
		}

		// Mock, should map token to the userId
		public string GetUserId(string userToken)
		{
			return string.IsNullOrWhiteSpace(userToken) ? "_reserved_anon_user" : userToken;
		}
	}
}
