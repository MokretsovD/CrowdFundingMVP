using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CrowdFundingServer.Dtos;
using CrowdFundingServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace CrowdFundingServer.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProjectsController : ControllerBase
	{
		private AuthService AuthService { get; }
		private ProjectsService ProjectsService { get; }
		public ProjectsController(ProjectsService projectsService, AuthService authService)
		{
			ProjectsService = projectsService;
			AuthService = authService;
		}

		[HttpGet("{projectId}")]
		public ActionResult<ProjectDetails> Get([FromHeader]string userToken, [Required]string projectId)
		{
			//NOTE: for now userToken = userId. Separate
			return ProjectsService.Get(AuthService.GetUserId(userToken), projectId);
		}

		// POST api/projects
		[HttpGet]
		public ActionResult<IEnumerable<Project>> GetList([FromHeader]string userToken)
		{
			return Ok(ProjectsService.GetList(AuthService.GetUserId(userToken)));
		}

		// PUT api/projects/1
		[HttpPut("{projectId}")]
		public ActionResult<ProjectDetails> Put([Required, FromHeader]string userToken, [Required]string projectId,
			[Range(100, 10000), FromBody] int amount)
		{
			return ProjectsService.Backup(AuthService.GetUserId(userToken), projectId, amount);
		}
	}
}
