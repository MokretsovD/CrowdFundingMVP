using System.Collections.Generic;
using System.Linq;
using CrowdFundingServer.Dtos;

namespace CrowdFundingServer.Services
{
	// Mock, Any kind of optimistic locking algorithm can be used on the Db level for the horizontal scaling,
	// i.e. using revision for each record (Some DBMS like CosmosDB even natively support that).
	// In case of relational DB besides optimistic approach it could be enough to have table with
	// a key (UserId, ProjectId) and heck that record with this key does not already exist 
	// Currently all data is stored in memory in this POC implementation
	public class ProjectsService
	{
		private readonly Dictionary<string, Project> _projects = new Dictionary<string, Project>();
		private readonly Dictionary<string, Dictionary<string, int>> _projectsUserMapping = new Dictionary<string, Dictionary<string, int>>();

		public ProjectsService()
		{
			_projects.Add("1", new Project
			{
				Id = "1",
				Name = "Super new house",
				Goal = 2000,
				Funded = 100,
				Description = "Super cool project, back it up"
			});

			_projects.Add("2", new Project
			{
				Id = "2",
				Name = "Old and boring building",
				Goal = 1000,
				Funded = 100,
				Description = "Super old project, don't back it up"
			});

			_projects.Add("3", new Project
			{
				Id = "3",
				Name = "So-so building",
				Goal = 500,
				Funded = 100,
				Description = "Just back it up"
			});

			_projectsUserMapping.Add("1", new Dictionary<string, int>());
			_projectsUserMapping["1"].Add("richUser", 100);
			_projectsUserMapping.Add("2", new Dictionary<string, int>());
			_projectsUserMapping["2"].Add("richUser", 100);
			_projectsUserMapping.Add("3", new Dictionary<string, int>());
			_projectsUserMapping["3"].Add("richUser", 100);
		}
		public IEnumerable<Project> GetList(string userId)
		{
			//TODO: sort projects based on userToken (backed projects first)
			return _projects.Values.ToList();
		}

		public ProjectDetails Get(string userId, string projectId)
		{
			var project = _projects[projectId];
			var mapping = _projectsUserMapping[projectId];

			lock (mapping)
			{
				return GetProjectDetails(project, mapping, userId);
			}
		}

		public ProjectDetails Backup(string userId, string projectId, int amount)
		{
			var project = _projects[projectId];
			var mapping = _projectsUserMapping[projectId];
			lock (mapping)
			{
				if (!mapping.ContainsKey(userId))
				{
					mapping.Add(userId, amount);

					lock (project)
					{
						project.Funded += amount;
					}
				}

				return GetProjectDetails(project, mapping, userId);
			}
		}

		private static ProjectDetails GetProjectDetails(
			Project project, 
			IReadOnlyDictionary<string, int> mapping, 
			string userId)
		{
			var result = ProjectDetails.FromProject(project);
			result.Backers = mapping.Count;
			result.CanBackup = !mapping.ContainsKey(userId);
			//TODO: value should be cached and stored in a dictionary
			result.Funded = mapping.Sum(item => item.Value);
			return result;
		}
	}
}