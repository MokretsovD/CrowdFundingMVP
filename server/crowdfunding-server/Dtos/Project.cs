namespace CrowdFundingServer.Dtos
{
	public class Project
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public int Goal { get; set; }
		public int Funded { get; set; }
		public string Description { get; set; }
	}

	public class ProjectDetails : Project
	{
		//TODO: Make an URL to display in details
		//public string ImageUrl { get; set; }
		public int Backers { get; set; }
		public bool CanBackup { get; set; }

		public static ProjectDetails FromProject(Project from)
		{
			return new ProjectDetails
			{
				Id = from.Id,
				Name = from.Name,
				Goal = from.Goal,
				Funded = from.Funded,
				Description = from.Description
			};
		}
	}
}
