using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManager.API.Data;
using TaskManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.API.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public async Task<ActionResult<DashboardStatsDto>> GetStats()
        {
            var userId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var ownedProjectIds = await _context.Projects
                .Where(p => p.UserId == userId)
                .Select(p => p.Id)
                .ToListAsync();

            var tasks = await _context.Tasks
                .Where(t => ownedProjectIds.Contains(t.ProjectId))
                .ToListAsync();

            var todoCount = tasks.Count(t => t.Status == "Todo");
            var inProgressCount = tasks.Count(t => t.Status == "InProgress");
            var doneCount = tasks.Count(t => t.Status == "Done");

            var stats = new DashboardStatsDto
            {
                TotalProjects = ownedProjectIds.Count,
                TotalTasks = tasks.Count,
                TodoCount = todoCount,
                InProgressCount = inProgressCount,
                DoneCount = doneCount
            };

            return Ok(stats);
        }

    }
}
